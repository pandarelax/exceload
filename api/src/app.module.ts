import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      port: 1433,
      username: 'root',
      password: 'root',
      database: 'test',
      host: 'localhost',
      dialect: 'mssql',
      autoLoadModels: true,
      synchronize: true,
    }),
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
