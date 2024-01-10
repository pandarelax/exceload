import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Field } from 'src/shared/db/entities/field.model';
import { Grid } from 'src/shared/db/entities/grid.model';
import { Record } from 'src/shared/db/entities/record.model';
import { RecordValue } from 'src/shared/db/entities/recordvalue.model';
import ExcelJs from 'exceljs';
import { UUIDV4 } from 'sequelize';

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
      await workbook.xlsx.load(file.buffer);
      const worksheet = workbook.worksheets[0];

      await this.sequelize.transaction(async (transaction) => {
        const grid = await this.gridModel.create(
          {
            id: UUIDV4,
            name: worksheet.name,
            order: 1,
          },
          { transaction },
        );

        const fields: Field[] = [];
        worksheet.getRow(1).eachCell(async (cell, colNumber) => {
          const field = await this.fieldModel.create(
            {
              id: UUIDV4,
              name: cell.value,
              order: colNumber,
              gridId: grid.id,
            },
            { transaction },
          );
          fields.push(field);
        });

        const records: Record[] = [];
        const recordValues: RecordValue[] = [];
        worksheet.getRows(2, worksheet.rowCount).forEach(async (row, index) => {
          const record = await this.recordModel.create(
            {
              id: UUIDV4,
              name: `Record ${index + 1}`,
              order: index + 1,
              gridId: grid.id,
            },
            { transaction },
          );
          records.push(record);

          row.eachCell(async (cell, colNumber) => {
            const recordValue = await this.recordValueModel.create(
              {
                id: UUIDV4,
                value: cell.value,
                fieldId: fields[colNumber - 1].id,
                recordId: record.id,
              },
              { transaction },
            );
            recordValues.push(recordValue);
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
