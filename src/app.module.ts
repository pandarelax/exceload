import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExcelModule } from './excel/excel.module';
import { development } from './shared/db/sequelize.config';

@Module({
  imports: [SequelizeModule.forRoot(development), ExcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
