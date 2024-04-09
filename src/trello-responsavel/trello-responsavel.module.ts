import { Module } from '@nestjs/common';
import { TrelloResponsavelService } from './trello-responsavel/trello-responsavel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloResponsavel } from './entities/trello-responsavel.entity';

@Module({
  providers: [TrelloResponsavelService],
  imports: [TypeOrmModule.forFeature([TrelloResponsavel])],
  exports: [TrelloResponsavelService]
})
export class TrelloResponsavelModule { }
