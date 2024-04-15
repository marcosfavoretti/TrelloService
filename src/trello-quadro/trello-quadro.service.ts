import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrelloQuadroDto } from './dto/create-trello-quadro.dto';
import { UpdateTrelloQuadroDto } from './dto/update-trello-quadro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrelloQuadro } from './entities/trello-quadro.entity';
import { Repository } from 'typeorm';
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
    return await this.trelloQuadro.find({
      relations: ['setor']
    })
  }

  async createWebHook(idboard: string) {
    try {

      return await trelloClient.post(`webhooks/?callbackURL=http://201.46.33.3:8092/webhook&idModel=${idboard}&key=${process.env.api_key}&token=${process.env.api_token}`)
    }
    catch (err) {
      throw new HttpException('webhook ja criado', 400)
    }
  }
  async createBoard(createdto: CreateBoardDto, setor: any) {
    if (!setor) throw new HttpException('nao foi passado o setor', 500)
    return await this.trelloQuadro.insert({
      idTrello: createdto.idTrello,
      isMain: createdto.isMain,
      nome: createdto.nome,
      setor: setor
    })


  }
  async getBoardbySetor(setor: string): Promise<TrelloQuadro> {
    const boards = await this.getAllBoards()
    return boards.find(board => board.setor.nome === setor)
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
