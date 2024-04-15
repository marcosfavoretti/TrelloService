import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrelloListDto } from '../dto/create-trello-list.dto';
import { UpdateTrelloListDto } from '../dto/update-trello-list.dto';
import { trelloClient } from 'src/bot-trello/Req.Client';
import { List } from '../objects/List';
import { todo } from 'node:test';

@Injectable()
export class TrelloListService {
  async getListToDo(idBoard: string): Promise<List> {
    // console.log(data)
    const allLists = await this.getAllListOnBoard(idBoard)
    const toDo = allLists.find(success => String(success.name).toLowerCase() === 'para fazer' || String(success.name).toLowerCase() === 'a fazer')//definir o nome que ser o toDO
    if (!toDo) return allLists[0] // nao achar a lista todo volto a primeira lista do quadro
    return toDo
  }

  private async getAllListOnBoard(idBoard: string): Promise<List[]> {
    try {
      const { data } = await trelloClient.get(`https://api.trello.com/1/boards/${idBoard}/lists?key=${process.env.api_key}&token=${process.env.api_token}`)
      return data

    }
    catch (err) {
      throw new HttpException('nao foi possivel pegar as listas do quadro', 500)
    }
  }

  async getListDone(idBoard: string): Promise<List> {
    // console.log(data)
    const allLists = await this.getAllListOnBoard(idBoard)
    const done = allLists.find(success => String(success.name).toLowerCase() === 'feito' || String(success.name).toLowerCase() === 'concluído')//definir o nome que ser o done
    if (!done) return allLists[allLists.length - 1] // nao achar a lista todo volto a primeira lista do quadro
    return done
  }

}
