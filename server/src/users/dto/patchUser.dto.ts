import { IsOptional, IsString } from "class-validator";

export class PatchUserDto {
    @IsOptional()
    @IsString()
    displayName? : string;

    @IsOptional()
    @IsString()
    avatarUrl? : string;
}