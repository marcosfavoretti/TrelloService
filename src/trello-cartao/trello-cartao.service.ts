import { Injectable } from '@nestjs/common';
import { CreateTrelloCartaoDto } from './dto/create-trello-cartao.dto';
import { UpdateTrelloCartaoDto } from './dto/update-trello-cartao.dto';
import { trelloClient } from 'src/bot-trello/Req.Client';
import { TrelloCard } from './objects/TreloCard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ReturnDocument } from 'typeorm';
import { TrelloCartao } from './entities/trello-cartao.entity';
import { add, compareAsc, format, parse } from "date-fns"
@Injectable()
export class TrelloCartaoService {
  constructor(@InjectRepository(TrelloCartao) private trelloCard: Repository<TrelloCartao>) { }

  async getSomeCard(cardid: string): Promise<TrelloCard> {
    const { data } = await trelloClient.get(`/cards/${cardid}?key=${process.env.api_key}&token=${process.env.api_token}`)
    return data
  }

  async getCardsOnBoard(idBoard: string): Promise<TrelloCard[]> {
    const { data } = await trelloClient.get(`/boards/${idBoard}/cards?key=${process.env.api_key}&token=${process.env.api_token}`)
    return data
  }

  async cloneCard(idCard: string, idList: string): Promise<TrelloCard> {
    const { data } = await trelloClient.post(`/cards?idList=${idList}&idCardSource=${idCard}&key=${process.env.api_key}&token=${process.env.api_token}`)
    return data
  }

  async deleteCard(idCard: string) {
    await trelloClient.delete(`/cards/${idCard}?key=${process.env.api_key}&token=${process.env.api_token}`)
  }
  async updateCardDateOrigin({
    idTrelloCard,
    info
  }: {
    idTrelloCard: string,
    info: { [key: string]: string }
  }) {
    const queryString = Object.entries(info)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const url = `/cards/${idTrelloCard}?${queryString}&key=${process.env.api_key}&token=${process.env.api_token}`;

    await trelloClient.put(url);
  }



  async getCardOnLocalDataBase(trelloId: string): Promise<TrelloCartao> {
    return await this.trelloCard.findOne({
      where: {
        idTrello: trelloId
      }
    })
  }
  async cardsSemValidação(): Promise<TrelloCartao[]> {
    return await this.trelloCard.find({
      where: {
        finishAvalTime: ""
      }
    })
  }
  async createCardonLocalDataBase(trelloId: string, trelloidcardOrigin: string) {
    await this.trelloCard.insert({
      idTrello: trelloId,
      idTrelloFather: trelloidcardOrigin,
      done: false,
      //
      startTime: '',
      endTime: '',
      //
      initAvalTime: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
      finishAvalTime: '',
      //
      numAlteracao: 0,
    })
  }

  async deteleCardonLocalDataBase(trelloId: string) {
    await this.trelloCard.delete({
      idTrello: trelloId
    })
  }

  async updateAvalTime({ cardTrelloId, finishAvalTime, startTime }: { cardTrelloId: string, finishAvalTime: string, startTime: string }) {
    await this.trelloCard.update({
      idTrello: cardTrelloId
    },
      {
        endTime: startTime,
        finishAvalTime: finishAvalTime
      })
  }

  async incrementUpdate(cardIdTrello: string) {
    await this.trelloCard.increment({ idTrello: cardIdTrello }, "numAlteracao", 1)
  }

  async updateStartTime({ cardIdTrello, startDate }: { cardIdTrello: string, startDate: string }) {
    await this.trelloCard.update({
      idTrello: cardIdTrello
    }, {
      startTime: startDate
    })
  }

  async taskFinished(idTrello: string, status: boolean) {
    return await this.trelloCard.update({
      idTrello: idTrello
    },
      {
        done: status,
        doneDate: status ? format(new Date(), "dd-MM-yyyy HH:mm:ss") : ""
      })
  }

  async getVencimento(date: Date) {
    const tasks = await this.trelloCard.find()
    const notDoneTasks = tasks.filter(task => !task.done && task.endTime !== '')
    //pego os cards que nao estao feito que ja tem endTime
    const expiredTasks = notDoneTasks.filter(task =>
      compareAsc(parse(task.endTime, "dd-MM-yyyy HH:mm:ss", new Date()), add(date, { days: 2 })) <= 0
    )//pega os cards vencidos e os que vao vencer daqui 2 dias 
    return expiredTasks
  }


}
