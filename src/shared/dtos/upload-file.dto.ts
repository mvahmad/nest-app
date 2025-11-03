import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UploadFileDto {
 
  @IsOptional()
  @ApiProperty({
    description: 'Target folder name',
    type: 'string',
    required: true,
  })
  folder: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: any;
}
