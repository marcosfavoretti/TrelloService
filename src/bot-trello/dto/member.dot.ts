import { IsString } from "class-validator"
export class MemberDto {
    @IsString()
    id: string
    @IsString()
    fullName: string
    @IsString()
    username: string
}
