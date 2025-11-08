import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UploadFilesDto {
    
    @IsOptional()
    height?:number;

    @IsOptional()
    width?:number;

    @ApiProperty({
        type: 'array',
        required: true,
        items: { type: 'string', format: 'binary' },
    })
    files:any[];

    @IsOptional()
    @ApiProperty({
      description: 'Target folder name',
      type: 'string',
      required: true,
     })
      folder?: string;
}