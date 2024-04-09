import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { TrelloQuadroService } from 'src/trello-quadro/trello-quadro.service';
import { ModelDto } from './dto/model.dto';
import { TrelloCartaoService } from 'src/trello-cartao/trello-cartao.service';
import { LabelService } from 'src/label/labelService/label.service';
import { SetoresService } from 'src/setores/setores/setores.service';
import { WebHookDto } from './dto/createcard.dto';
import { ListenHandleAdmService } from 'src/listen-handle-adm/listen-handle-adm/listen-handle-adm.service';
import { ListeHandleSubService } from 'src/listen-handle-sub/liste-handle-sub/liste-handle-sub.service';
@Injectable()
export class BotTrelloService implements OnModuleInit {
    constructor(
        private quardoService: TrelloQuadroService,
        private labelService: LabelService,
        private setoresService: SetoresService,
        private listenAdm: ListenHandleAdmService,
        private listenSub: ListeHandleSubService
    ) { }

    async onModuleInit() {
        const mainboards = await this.quardoService.getMainBoards()
        console.log(mainboards)
        const setores = await this.setoresService.getSetores()
        console.log(setores)
        mainboards.forEach(async (board) => {
            await this.labelService.checkLabels(board.idTrello, setores) //verifico se existe o label de todos os setores cadastrados e se nao tiver eu crio eles no quadro
        })
    }

    async processListen(data: WebHookDto) {//core para reqs
        await this.checkAdmin(data.model) ? await this.listenAdm.actionManager(data) : await this.listenSub.actionManager(data)
    }

    async checkAdmin(model: ModelDto) {
        return await this.quardoService.mainBoard(model.id)
    }




}
