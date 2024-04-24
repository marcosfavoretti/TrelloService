import { Body, Controller, Get, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common';
import { BotTrelloService } from './bot-trello.service';
import { Request } from 'express';
import { WebHookDto } from './dto/createcard.dto';
import { CreateBoardDto } from './dto/createboard.dto';
import { CreateResponsavelDto } from './dto/createresponsavel.dto';

@Controller('trello')
export class BotTrelloController {
  constructor(private readonly botTrelloService: BotTrelloService) { }


  @Post('/listenwebhook')
  async linstenWebHook(@Req() req: Request, @Body() data: WebHookDto) {
    console.log(data.action.type)
    this.botTrelloService.processListen(data)
  }

  @Post('/create-board')
  async createBoard(@Body() createdto: CreateBoardDto) {
    await this.botTrelloService.cadastraBoard(createdto)
  }

  @Post('/create-responsavel')
  async createResponsavel(@Body() createResponsavel: CreateResponsavelDto) {
    await this.botTrelloService.cadastraResponsavel(createResponsavel)
  }

  @Get('/getAllCards')
  async getCardsCadastrados() {
    return await this.botTrelloService.getAllCards()
  }

  @Get('/getAllBoards')
  async getAllBoards() {
    return await this.botTrelloService.getAllBoards()
  }
}
