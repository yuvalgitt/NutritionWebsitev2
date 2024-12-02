import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  imgUrl? : string

  @IsNotEmpty()
  @IsNumber()
  calories: number;

  @IsNotEmpty()
  @IsNumber()
  carbohydrates: number;

  @IsNotEmpty()
  @IsNumber()
  fats: number;

  @IsNotEmpty()
  @IsNumber()
  proteins: number;
}
