import { Type } from "class-transformer"
import { IsBoolean, IsString, ValidateNested } from "class-validator"
import { CreateSetorDto } from "./createsetore.dto"
export class CreateBoardDto {
    @IsString()
    idTrello: string
    @IsString()
    nome: string
    @IsBoolean()
    isMain: boolean
    @ValidateNested()
    @Type(() => CreateSetorDto)
    setores: CreateSetorDto

}   