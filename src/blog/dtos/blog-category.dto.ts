import { IsString, IsNotEmpty } from 'class-validator';
export class BlogCategoryDto {
        @IsString()
        @IsNotEmpty({ message: "Title should not be empty" })
        title: string;
        @IsString()
        @IsNotEmpty()
        content: string;
        @IsString()
        @IsNotEmpty()
        image: string;
}