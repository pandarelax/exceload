import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Field } from 'src/shared/db/entities/field.entity';
import { Grid } from 'src/shared/db/entities/grid.entity';
import { Record } from 'src/shared/db/entities/record.entity';
import { RecordValue } from 'src/shared/db/entities/recordvalue.entity';

@Module({
  imports: [SequelizeModule.forFeature([Field, Grid, Record, RecordValue])],
  providers: [ExcelService],
  controllers: [ExcelController],
})
export class ExcelModule {}
