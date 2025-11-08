import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-file.dto';
import { UploadFilesDto } from './shared/dtos/upload-files.dto';
import { saveImages , saveImage} from './shared/utils/file-utils';

@ApiTags("Shared")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ✅ Single File Upload
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

  // Multiple File Upload
  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10)) // handles multiple files (max 10)
  @ApiBody({ type: UploadFilesDto })
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
   return saveImages(files , body)
   
  }
}
