import { Type } from "class-transformer"
import { IsBoolean, IsString, ValidateNested } from "class-validator"
import { CreateSetorDto } from "./createsetor.dto"
import { CreateResponsavelDto } from "./createresponsavel.dto"
import { ApiProperty } from "@nestjs/swagger"
import { ResponsavelDto } from "./responsavel.dto"
export class CreateBoardDto {
    @ApiProperty()
    @IsString()
    idTrello: string
    @ApiProperty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsBoolean()
    isMain: boolean
    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateSetorDto)
    setores: CreateSetorDto
    @ApiProperty()
    @ValidateNested()
    @Type(() => ResponsavelDto)
    responsavel: ResponsavelDto
}   