import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Field } from 'src/shared/db/entities/field.entity';
import { Grid } from 'src/shared/db/entities/grid.entity';
import { Record } from 'src/shared/db/entities/record.entity';
import { RecordValue } from 'src/shared/db/entities/recordvalue.entity';
import ExcelJs from 'exceljs';
import fs from 'fs';

@Injectable()
export class ExcelService {
  constructor(
    @InjectModel(Field)
    private readonly fieldModel: typeof Field,
    @InjectModel(Grid)
    private readonly gridModel: typeof Grid,
    @InjectModel(Record)
    private readonly recordModel: typeof Record,
    @InjectModel(RecordValue)
    private readonly recordValueModel: typeof RecordValue,
    private sequelize: Sequelize,
  ) {}

  async processFile(file: Express.Multer.File) {
    try {
      const workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(file.path);

      const worksheet = workbook.worksheets[0];

      await this.sequelize.transaction(async (t) => {
        // Grid tablosuna veri eklemek
        const grid = await Grid.create(
          {
            name: 'your-grid-name',
            order: 1,
          },
          { transaction: t },
        );

        const fields: Field[] = [];

        // Excel dosyasından alanları oku ve fields dizisine ekle
        worksheet.getRow(1).eachCell((cell, colNumber) => {
          const field = new Field({
            name: cell.value,
            gridId: grid.id,
            isPrimary: false, // Buraya uygun değerleri ekleyin
            isUnique: false, // Buraya uygun değerleri ekleyin
            order: colNumber,
          });

          fields.push(field);
        });

        // Alanları veritabanına kaydet
        await Field.bulkCreate<Field>(
          fields.map((field: Field) => ({ ...field })),
          { transaction: t },
        );

        worksheet.eachRow(async (row) => {
          const record = await Record.create(
            {
              gridId: grid.id,
              createdAt: new Date(),
            },
            { transaction: t },
          );

          row.eachCell(async (cell, colNumber) => {
            const field = fields.find((f) => f.order === colNumber);

            if (field) {
              await RecordValue.create(
                {
                  recordId: record.id,
                  fieldId: field.id,
                  value: cell.value,
                  createdAt: new Date(),
                },
                { transaction: t },
              );
            }
          });
        });
      });

      fs.unlinkSync(file.path);
      return console.log('File uploaded successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
