import { Module } from '@nestjs/common';
import { TrelloCartaoService } from './trello-cartao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloCartao } from './entities/trello-cartao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloCartao])],
  providers: [TrelloCartaoService],
  exports: [TrelloCartaoService]
})
export class TrelloCartaoModule { }
