import { Module } from '@nestjs/common';
import { TrelloListService } from './trello-list-service/trello-list.service';

@Module({
  providers: [TrelloListService],
  exports: [TrelloListService]
})
export class TrelloListModule { }
