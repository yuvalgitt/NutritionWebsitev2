import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PatchFoodDto {
    @IsOptional()
    @IsNumber()
    calories?: number;

    @IsOptional()
    @IsNumber()
    carbohydrates?: number;

    @IsOptional()
    @IsNumber()
    fats?: number;

    @IsOptional()
    @IsNumber()
    protein?: number;

    @IsOptional()
    @IsString()
    imgUrl? : string

    @IsOptional()
    @IsNumber()
    portionSize: number;
}