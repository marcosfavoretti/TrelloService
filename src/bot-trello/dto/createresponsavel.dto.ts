import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { ResponsavelDto } from "./responsavel.dto"

export class CreateResponsavelDto extends ResponsavelDto {
    @ApiProperty()
    @IsString()
    idTrello: string
}