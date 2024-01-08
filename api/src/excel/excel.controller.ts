import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @Post('upload')
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.excelService.processFile(file);
  }
}
