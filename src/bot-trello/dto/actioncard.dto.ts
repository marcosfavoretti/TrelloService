import { IsObject, IsString, ValidateNested } from "class-validator"
import { MemberDto } from "./member.dot"
import { Type } from "class-transformer"
export class ActionDto {
    @IsString()
    id: string

    @IsObject()
    data: any

    @IsString()
    type: string

    @IsString()
    date: string

    @ValidateNested()
    @Type(() => MemberDto)
    memberCreator: MemberDto
}