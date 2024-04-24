import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrelloQuadroDto } from './dto/create-trello-quadro.dto';
import { UpdateTrelloQuadroDto } from './dto/update-trello-quadro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrelloQuadro } from './entities/trello-quadro.entity';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { Setores } from 'src/setores/entities/setores.entity';
import { CreateBoardDto } from 'src/bot-trello/dto/createboard.dto';
import { create } from 'domain';
import { trelloClient } from 'src/bot-trello/Req.Client';

@Injectable()
export class TrelloQuadroService {

  constructor(
    @InjectRepository(TrelloQuadro) private trelloQuadro: Repository<TrelloQuadro>
  ) { }

  async getMainBoards() {
    return await this.trelloQuadro.find({
      where: {
        isMain: true
      }, relations: ['setor']
    })
  }

  async getAllBoards() {
    const local_trello_boards = await this.trelloQuadro.find({
      relations: ['setor']
    })
    const promise = local_trello_boards
      .map(board => this.getBoardMembers(board.idTrello)
        .then((data => board['members'] = data)))
    await Promise.all(promise)
    return local_trello_boards
  }

  async getBoardMembers(idBoard: string) {
    try {
      const { data } = await trelloClient.get(`/boards/${idBoard}/members?key=${process.env.api_key}&token=${process.env.api_token}`)
      return data

    }
    catch (err) {
      throw new HttpException('nao foi possivel pegar o cartao', 500)
    }
  }

  async createWebHook(idboard: string): Promise<void> {
    try {
      await trelloClient.post(`webhooks/?callbackURL=http://201.46.33.3:8092/webhook2&idModel=${idboard}&key=${process.env.api_key}&token=${process.env.api_token}`)
    }
    catch (err) {
      console.log('webhook ja criado', 400)
    }
  }
  async createBoard(createdto: CreateBoardDto, setor: any): Promise<string> {
    if (!setor) throw new HttpException('nao foi passado o setor', 500)
    await this.uniqueIdTrello(createdto.idTrello)
    const { generatedMaps } = await this.trelloQuadro.insert({
      idTrello: createdto.idTrello,
      isMain: createdto.isMain,
      nome: createdto.nome,
      setor: setor
    })
    console.log(generatedMaps)
    return generatedMaps[0].idQuadro
  }
  async uniqueIdTrello(idTrello: string) {
    const boards = await this.getAllBoards()
    const result = boards.find(board => idTrello === board.idTrello)
    if (result) {
      // throw new HttpException('Já existe o cadastro do quadro', 500)
    }
  }
  async getBoardbySetor(setor: string): Promise<TrelloQuadro> {
    const boards = await this.getAllBoards()
    const board = boards.find(board => board.setor.nome === setor)
    if (!board) throw new Error("nao existe o setor da etiqueta")
    return board
  }

  async getBoardbyIdTrello(id: string) {
    return await this.trelloQuadro.findOne({
      where: {
        idTrello: id
      }
    })
  }

  async mainBoard(idTrello: string): Promise<boolean> {
    const board = await this.trelloQuadro.findOne({
      where: {
        idTrello: idTrello
      }
    })
    if (!board) throw new Error("Quadro sem cadastro no banco de dados")
    return board?.isMain
  }


}
