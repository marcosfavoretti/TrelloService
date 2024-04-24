import { HttpException, Injectable } from '@nestjs/common';
import { IWhActions } from 'src/Interfaces/IWhActions';
import { WebHookDto } from 'src/bot-trello/dto/createcard.dto';
import { mapActionType } from '../map.action.type';
import { TrelloQuadroService } from 'src/trello-quadro/trello-quadro.service';
import { LabelService } from 'src/label/labelService/label.service';
import { SetoresService } from 'src/setores/setores/setores.service';
import { ListeHandleSubService } from 'src/listen-handle-sub/liste-handle-sub/liste-handle-sub.service';
import { TrelloCartaoService } from 'src/trello-cartao/trello-cartao.service';
import { TrelloListService } from 'src/trello-list/trello-list-service/trello-list.service';

@Injectable()
export class ListenHandleAdmService implements IWhActions {
    constructor(
        private cartaoService: TrelloCartaoService,
        private quardoService: TrelloQuadroService,
        private listaService: TrelloListService,
    ) { }

    mapControll: { [key: string]: (webhookdto: WebHookDto) => Promise<void> } = {//cadastro qual e o nome da ação e qual a func que vai ser executada
        addLabelToCard: this.addLabelHandle.bind(this),
        removeLabelFromCard: this.removerLabel.bind(this),

    }
    async actionManager(webhookdto: WebHookDto) {
        if (!(Object.keys(this.mapControll).includes(webhookdto.action.type))) return //se nao tiver na lista da return
        this.mapControll[webhookdto.action.type](webhookdto)
    }

    private async addLabelHandle(webhookdto: WebHookDto): Promise<void> {
        try {
            const idCard = webhookdto.action.data.card.id
            const setorStr = webhookdto.action.data.text
            const setorBoard = await this.quardoService.getBoardbySetor(setorStr)
            const idTodoList = await this.listaService.getListToDo(setorBoard.idTrello)
            const cloneCard = await this.cartaoService.cloneCard(idCard, idTodoList.id)
            await this.cartaoService.createCardonLocalDataBase(cloneCard.id, idCard)
        }
        catch (err) {
            return
        }
    }

    private async removerLabel(webhookdto: WebHookDto): Promise<void> {
        try {

            const setorStr = webhookdto.action.data.text
            const destinyBoard = await this.quardoService.getBoardbySetor(setorStr)
            const allCards = await this.cartaoService.getCardsOnBoard(destinyBoard.idTrello)
            const deletedCard = allCards.filter(card => card.name === webhookdto.action.data.card.name)
            deletedCard.forEach(async (card) => {
                await this.cartaoService.deleteCard(card.id)
                await this.cartaoService.deteleCardonLocalDataBase(card.id)
            });
        }
        catch (err) {
            return
        }
    }

}
