import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { TrelloQuadroService } from 'src/trello-quadro/trello-quadro.service';
import { ModelDto } from './dto/model.dto';
import { TrelloCartaoService } from 'src/trello-cartao/trello-cartao.service';
import { LabelService } from 'src/label/labelService/label.service';
import { SetoresService } from 'src/setores/setores/setores.service';
import { WebHookDto } from './dto/createcard.dto';
import { ListenHandleAdmService } from 'src/listen-handle-adm/listen-handle-adm/listen-handle-adm.service';
import { ListeHandleSubService } from 'src/listen-handle-sub/liste-handle-sub/liste-handle-sub.service';
import { CreateBoardDto } from './dto/createboard.dto';
import { TrelloResponsavelService } from 'src/trello-responsavel/trello-responsavel/trello-responsavel.service';
import { CreateResponsavelDto } from './dto/createresponsavel.dto';

@Injectable()
export class BotTrelloService implements OnModuleInit {

    constructor(
        private responsavel: TrelloResponsavelService,
        private cartao: TrelloCartaoService,
        private quardoService: TrelloQuadroService,
        private labelService: LabelService,
        private setoresService: SetoresService,
        private listenAdm: ListenHandleAdmService,
        private listenSub: ListeHandleSubService
    ) { }

    async onModuleInit() {
        await this.verfifyLabels()
    }

    async verfifyLabels() {
        const boards = await this.quardoService.getAllBoards()
        const mainboards = boards.filter(board => board.isMain)
        const ordinaryBoard = boards.filter(board => !board.isMain)
        mainboards.forEach(async (board) => {
            await this.labelService.checkLabels(board.idTrello, ordinaryBoard.map(board => board.setor)) //verifico se existe o label de todos os setores cadastrados e se nao tiver eu crio eles no quadro
        })
    }

    async processListen(data: WebHookDto) {//core para reqs
        await this.checkAdmin(data.model) ? await this.listenAdm.actionManager(data) : await this.listenSub.actionManager(data)
    }

    async cadastraBoard(create: CreateBoardDto) {
        const { generatedMaps } = await this.setoresService.createSetor(create.setores)
        const id_setor = generatedMaps[0].id
        const process = [
            this.quardoService.createBoard(create, id_setor),
            this.quardoService.createWebHook(create.idTrello),
        ]
        await Promise.all(process)
        //nao posso jogar na promise all pq ele so pode ser feito dps de criar o quadro
        await this.cadastraResponsavel({
            ...create.responsavel,
            idTrello: create.idTrello
        })
        await this.verfifyLabels()
    }

    async cadastraResponsavel(createResponsavel: CreateResponsavelDto) {
        const quadro = await this.quardoService.getBoardbyIdTrello(createResponsavel.idTrello)
        if (!quadro) throw new HttpException('Esse quadro nao foi encontrado', 404)
        await this.responsavel.createReponsavel(createResponsavel, quadro)
    }
    async getAllCards() {
        return await this.cartao.getAllInformationsCards()
    }
    async getAllBoards() {
        return await this.quardoService.getAllBoards()
    }
    async checkAdmin(model: ModelDto) {
        try {
            return await this.quardoService.mainBoard(model.id)
        }
        catch (err) {
            console.log(err)
        }
    }

}
