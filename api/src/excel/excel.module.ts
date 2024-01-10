import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Field } from 'src/shared/db/entities/field.model';
import { Grid } from 'src/shared/db/entities/grid.model';
import { Record } from 'src/shared/db/entities/record.model';
import { RecordValue } from 'src/shared/db/entities/recordvalue.model';

@Module({
  imports: [SequelizeModule.forFeature([Field, Grid, Record, RecordValue])],
  providers: [ExcelService],
  controllers: [ExcelController],
})
export class ExcelModule {}
