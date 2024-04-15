import { HttpException, Injectable } from '@nestjs/common';
import { mapActionSub } from '../map.action.types.sub';
import { WebHookDto } from 'src/bot-trello/dto/createcard.dto';
import { TrelloCartaoService } from 'src/trello-cartao/trello-cartao.service';
import { TrelloQuadroService } from 'src/trello-quadro/trello-quadro.service';
import { TrelloListService } from 'src/trello-list/trello-list-service/trello-list.service';
import { LabelService } from 'src/label/labelService/label.service';
import { SetoresService } from 'src/setores/setores/setores.service';
import { format } from "date-fns"

@Injectable()
export class ListeHandleSubService {
    constructor(
        private cartaoService: TrelloCartaoService,
        private quardoService: TrelloQuadroService,
        private listaService: TrelloListService,
        private labelService: LabelService,
        private setoresService: SetoresService,
    ) { }

    mapControll: { [key: string]: (webhookdto: WebHookDto) => Promise<void> } = {//cadastro qual e o nome da ação e qual a func que vai ser executada
        updateCard: this.update.bind(this),
    }

    mapUpdateControll: { [key: string]: (WebHookDto) => Promise<void> } = {
        due: this.insertedDate.bind(this),
        start: this.startAction.bind(this),
        dueComplete: this.dueComplete.bind(this),
        idList: this.completeInList.bind(this)
    }

    actionManager(webhookdto: WebHookDto) {
        if (!Object.keys(this.mapControll).includes(webhookdto.action.type)) return //se nao tiver na lista da return
        this.mapControll[webhookdto.action.type](webhookdto)
    }

    private async update(webhook: WebHookDto) {
        // console.log(webhook.action.data.old)
        const action = this.mapUpdateControll[Object.keys(webhook.action.data.old)[0]]//pega o primeiro elemento da primeira chave do obj old 
        if (action === undefined) return
        await action(webhook)
    }

    private async dueComplete(webhook: WebHookDto) {
        //logica para finalização do cartão

        const status = webhook.action.data.card.dueComplete ? [
            this.cartaoService.taskFinished(webhook.action.data.card.id, true),
            this.callBackToOrigin(webhook.action.data.card.id, {
                dueComplete: true,
            }),
            this.moveCardToDoneList(webhook.action.data.card.id)
        ] : [
            this.cartaoService.taskFinished(webhook.action.data.card.id, false),
            this.callBackToOrigin(webhook.action.data.card.id, {
                dueComplete: false,
            })
        ]
        await Promise.all(status)
    }
    private async completeInList(webhook: WebHookDto) {
        const status = String(webhook.action.data.listAfter.name).toLowerCase() !== 'feito' || String(webhook.action.data.listAfter.name).toLowerCase() !== 'concluído' ?
            [this.cartaoService.taskFinished(webhook.action.data.card.id, false),
            this.callBackToOrigin(webhook.action.data.card.id, { dueComplete: false })] :
            [this.cartaoService.taskFinished(webhook.action.data.card.id, true),
            this.callBackToOrigin(webhook.action.data.card.id,
                {
                    dueComplete: true,
                }),
            this.moveCardToDoneList(webhook.action.data.card.id)
            ]

        await Promise.all(status)
    }

    private async insertedDate(webhook: WebHookDto) {

        const incrementPromise = !this.isFrstDate(webhook)
            ? this.cartaoService.incrementUpdate(webhook.action.data.card.id)
            : Promise.resolve();

        const changeDatePromise = this.cartaoService.updateAvalTime({
            cardTrelloId: webhook.action.data.card.id,
            finishAvalTime: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
            startTime: format(new Date(webhook.action.data.card.due), 'dd-MM-yyyy HH:mm:ss')
        });

        const callback = this.callBackToOrigin(webhook.action.data.card.id, { due: webhook.action.data.card.due })

        await Promise.all([
            incrementPromise,
            changeDatePromise,
            callback
        ]);
    }

    private async callBackToOrigin(idTrello: string, info: any) {
        try {
            // console.log(idTrello)
            const cardInfos = await this.cartaoService.getCardOnLocalDataBase(idTrello)
            await this.cartaoService.updateCardDateOrigin({
                idTrelloCard: cardInfos.idTrelloFather,
                info: info
            })
        }
        catch (err) {
            throw new HttpException('nao foi possivel dar o retorno pro cartao pai', 500)

        }
    }

    private async moveCardToDoneList(cardTrelloId: string) {
        try {
            const localCardInfo = await this.cartaoService.getCardOnLocalDataBase(cardTrelloId)
            const fatherCard = await this.cartaoService.getSomeCard(localCardInfo.idTrelloFather)
            const ListDoneFather = await this.listaService.getListDone(fatherCard.idBoard)
            this.cartaoService.updateCardDateOrigin({
                idTrelloCard: fatherCard.id,
                info: {
                    idList: ListDoneFather.id
                }
            })
        }
        catch (err) {
            throw new HttpException('nao foi possivel mover o cartao para lista de feitos', 500)
        }
    }

    private async startAction(webhook: WebHookDto) {
        const updateStart = this.cartaoService.updateStartTime({
            cardIdTrello: webhook.action.data.card.id,
            startDate: format(new Date(webhook.action.data.card.start), 'dd-MM-yyyy HH:mm:ss')
        })
        const callBack = this.callBackToOrigin(webhook.action.data.card.id, { start: webhook.action.data.card.start })

        await Promise.all([
            updateStart,
            callBack
        ])
    }


    private isFrstDate(webhook: WebHookDto): boolean {
        return !webhook.action.data.old.due ? true : false
    }
}
