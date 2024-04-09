import { Module } from '@nestjs/common';
import { CronnService } from './cronn-service/cronn.service';
import { TrelloCard } from 'src/trello-cartao/objects/TreloCard';
import { TrelloCartaoModule } from 'src/trello-cartao/trello-cartao.module';
import { EmailNotificationModule } from 'src/email-notification/email-notification.module';
import { TrelloResponsavelModule } from 'src/trello-responsavel/trello-responsavel.module';
import { Setores } from 'src/setores/entities/setores.entity';
import { SetoresModule } from 'src/setores/setores.module';
import { TrelloQuadroModule } from 'src/trello-quadro/trello-quadro.module';

@Module({
    providers: [CronnService],
    imports: [
        TrelloCartaoModule,
        EmailNotificationModule,
        TrelloResponsavelModule,
        SetoresModule,
        TrelloQuadroModule,
    ],
    exports: [CronnService]
})
export class CronnJobsModule { }
