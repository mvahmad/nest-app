import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-file.dto';
import { saveImage } from './shared/utils/file-utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Post('upload-file')
@ApiConsumes('multipart/form-data')
@UseInterceptors(FileInterceptor('file'))
@ApiBody({ type: UploadFileDto })
async uploadFile(
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 20_000_000 }),
        new FileTypeValidator({
          fileType: /(image\/(png|jpeg|jpg|gif))$/,
        }),
      ],
    }),
  )
  file: Express.Multer.File,
  @Body() body: any,
) {
  const result = await saveImage(file, body);
  return {
    message: 'File uploaded successfully!',
    ...result,
  };
}

  
  // 
}
