import { Body, Controller, Get, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common';
import { BotTrelloService } from './bot-trello.service';
import { Request } from 'express';
import { WebHookDto } from './dto/createcard.dto';
import { CreateBoardDto } from './dto/createboard.dto';

@Controller('trello')
export class BotTrelloController {
  constructor(private readonly botTrelloService: BotTrelloService) { }


  @Post('/listenwebhook')
  async linstenWebHook(@Req() req: Request, @Body() data: WebHookDto) {
    // console.log(data.action.type)
    this.botTrelloService.processListen(data)
  }

  @Post('/create-board')
  async createBoard(@Body() createdto: CreateBoardDto) {
    await this.botTrelloService.cadastraBoard(createdto)
  }
}
