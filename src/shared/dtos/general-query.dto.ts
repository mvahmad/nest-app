import { IsEnum, IsOptional, IsPositive, IsString } from "class-validator";
import { Sort } from "src/shared/enums/sort.enum";

export class GeneralQueryDto{

    @IsOptional()
    @IsPositive()
    page?:number;

    @IsOptional()
    @IsPositive()
    limit?:number;

    @IsOptional()
    @IsString()
    title?:string;

    @IsOptional()
    @IsEnum(Sort)
    sort?:Sort;
}