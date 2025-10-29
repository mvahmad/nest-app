import { IsString, IsNotEmpty } from 'class-validator';
//for data transfer object

export class BlogDto {
    @IsString()
    @IsNotEmpty({ message: "Title should not be empty" })
    title: string;
    @IsString()
    @IsNotEmpty()
    content: string;
}