import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsObject()
  dateOfBirth?: { day: number; month: number; year: number };

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsOptional()
  @IsString()
  AvatarUrl?: string;
}
