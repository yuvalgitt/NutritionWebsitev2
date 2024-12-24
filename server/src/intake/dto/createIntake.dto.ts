import { IsMongoId, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateIntakeDto {

  @IsMongoId()
  @IsNotEmpty()
  userForeignKey : string

  @IsMongoId()
  @IsNotEmpty()
  foodForeignKey : string

  @IsNumber()
  @IsNotEmpty()
  amountInGrams: number;

  @IsNotEmpty()
  @IsObject()
  date: { day: number; month: number; year: number , hour : number ,minute : number };
}
