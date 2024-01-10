import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelModule } from './excel/excel.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Field } from './shared/db/entities/field.model';
import { Grid } from './shared/db/entities/grid.model';
import { Record } from './shared/db/entities/record.model';
import { RecordValue } from './shared/db/entities/recordvalue.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      username: 'sa',
      password: 'Ebeninki1327.',
      database: 'test',
      models: [Field, Grid, Record, RecordValue],
      port: 1433,
    }),
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
