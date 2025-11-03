import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-file.dto';
//controlers are Task of directing all types of requests
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: UploadFileDto })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // 
    return { filename: file.originalname };
  }

  
}
