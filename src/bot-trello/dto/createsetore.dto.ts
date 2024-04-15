import { IsString } from "class-validator";

export class CreateSetorDto {
    @IsString()
    nome
}