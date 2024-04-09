import { Module } from '@nestjs/common';
import { ListenHandleAdmService } from './listen-handle-adm/listen-handle-adm.service';
import { TrelloCartaoModule } from 'src/trello-cartao/trello-cartao.module';
import { TrelloListModule } from 'src/trello-list/trello-list.module';
import { TrelloQuadroModule } from 'src/trello-quadro/trello-quadro.module';
import { SetoresModule } from 'src/setores/setores.module';
import { LabelModule } from 'src/label/label.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloCartao } from 'src/trello-cartao/entities/trello-cartao.entity';

@Module({
    imports: [TrelloCartaoModule, TrelloListModule, TrelloQuadroModule, SetoresModule, LabelModule,
    ],
    providers: [ListenHandleAdmService],
    exports: [ListenHandleAdmService],
})
export class ListenHandleAdmModule { }
