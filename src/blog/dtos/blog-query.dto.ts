import { IsOptional, IsPositive, IsString } from "class-validator";

export class BlogQueryDto{

    @IsOptional()
    @IsPositive()
    page?:number;

    @IsOptional()
    @IsPositive()
    limit?:number;

    @IsOptional()
    @IsString()
    title?:string;
}