import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from 'src/shared/db/entities/field.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectModel(Field)
    private readonly fieldModel: typeof Field,
  ) {}

  async processFile(file: any) {
    // const workbook = XLSX.readFile(file.path);
    // const sheet_name_list = workbook.SheetNames;
    // const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //   const result = await this.sequelize.query(
    //     `INSERT INTO [test].[dbo].[excel] (name, age) VALUES ${data
    //       .map((item) => `('${item.name}', ${item.age})`)
    //       .join(',')}`,
    //   );
    return file;
  }
}
