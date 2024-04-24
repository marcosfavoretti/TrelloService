import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class ResponsavelDto {
    @ApiProperty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsEmail()
    email: string
}