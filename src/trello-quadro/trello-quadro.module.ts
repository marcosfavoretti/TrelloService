import { Module } from '@nestjs/common';
import { TrelloQuadroService } from './trello-quadro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloQuadro } from './entities/trello-quadro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloQuadro])],
  providers: [TrelloQuadroService],
  exports: [TrelloQuadroService]
})
export class TrelloQuadroModule { }
