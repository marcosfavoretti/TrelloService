import { Module } from '@nestjs/common';
import { ListeHandleSubService } from './liste-handle-sub/liste-handle-sub.service';
import { TrelloCartaoModule } from 'src/trello-cartao/trello-cartao.module';
import { TrelloListModule } from 'src/trello-list/trello-list.module';
import { TrelloQuadroModule } from 'src/trello-quadro/trello-quadro.module';
import { SetoresModule } from 'src/setores/setores.module';
import { LabelModule } from 'src/label/label.module';
import { EmailNotificationModule } from '../email-notification/email-notification.module';

@Module({
    imports: [TrelloCartaoModule, TrelloListModule, TrelloQuadroModule, SetoresModule, LabelModule, EmailNotificationModule],

    providers: [ListeHandleSubService],
    exports: [ListeHandleSubService]
})
export class ListenHandleSubModule { }
