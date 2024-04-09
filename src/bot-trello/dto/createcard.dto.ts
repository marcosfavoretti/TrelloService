import { IsObject, IsString, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';
import { ModelDto } from "./model.dto";
import { ActionDto } from "./actioncard.dto";
export class WebHookDto {
    @ValidateNested()
    @Type(() => ModelDto)
    model: ModelDto

    @ValidateNested()
    @Type(() => ActionDto)
    action: ActionDto
}