import { Module } from '@nestjs/common';
import { BotTrelloService } from './bot-trello.service';
import { BotTrelloController } from './bot-trello.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloQuadro } from 'src/trello-quadro/entities/trello-quadro.entity';
import { TrelloQuadroModule } from 'src/trello-quadro/trello-quadro.module';
import { TrelloCartaoModule } from 'src/trello-cartao/trello-cartao.module';
import { LabelModule } from 'src/label/label.module';
import { SetoresModule } from 'src/setores/setores.module';
import { ListenHandleAdmModule } from 'src/listen-handle-adm/listen-handle.module';
import { ListenHandleSubModule } from 'src/listen-handle-sub/list-handle-sub.module';
import { TrelloResponsavelModule } from 'src/trello-responsavel/trello-responsavel.module';
import { EmailNotificationModule } from 'src/email-notification/email-notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    TrelloQuadro,
  ]),
    TrelloQuadroModule,
    TrelloCartaoModule,
    LabelModule,
    SetoresModule,
    ListenHandleAdmModule,
    ListenHandleSubModule,
    TrelloResponsavelModule,
    EmailNotificationModule
  ]
  ,
  controllers: [BotTrelloController],
  providers: [BotTrelloService],

})
export class BotTrelloModule { }
