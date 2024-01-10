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
      host: 'EFEHAN',
      username: 'sa',
      password: 'root',
      database: 'localhost',
      models: [Field, Grid, Record, RecordValue],
      dialectOptions: {
        options: {
          instanceName: 'MSSQLLOCALSERVER',
        },
      },
    }),
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
