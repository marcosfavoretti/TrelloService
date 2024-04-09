import { Injectable } from '@nestjs/common';
import { CreateTrelloQuadroDto } from './dto/create-trello-quadro.dto';
import { UpdateTrelloQuadroDto } from './dto/update-trello-quadro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrelloQuadro } from './entities/trello-quadro.entity';
import { Repository } from 'typeorm';
import { Setores } from 'src/setores/entities/setores.entity';

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

  //logica para gerar o labels caso nao tenha no quadro
  async labelGenerator() {

  }
}
