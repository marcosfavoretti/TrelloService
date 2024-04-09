import { WebHookDto } from "src/bot-trello/dto/createcard.dto";

export interface IWhActions {
    mapControll
    actionManager(webhookdto: WebHookDto)
}