import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Field } from 'src/shared/db/entities/field.entity';
import { Grid } from 'src/shared/db/entities/grid.entity';
import { Record } from 'src/shared/db/entities/record.entity';
import { RecordValue } from 'src/shared/db/entities/recordvalue.entity';

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
    console.log(file);
  }
}
