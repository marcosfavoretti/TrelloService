import { IsString } from "class-validator"
export class ModelDto {//dto onde fica as infos sobre o quadro que esta sendo mandando no wb
    @IsString()
    name: string
    @IsString()
    id: string
}

