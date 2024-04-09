import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrelloQuadroModule } from './trello-quadro/trello-quadro.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotTrelloModule } from './bot-trello/bot-trello.module';
import { TrelloListModule } from './trello-list/trello-list.module';
import { TrelloCartaoModule } from './trello-cartao/trello-cartao.module';
import { TrelloCartao } from './trello-cartao/entities/trello-cartao.entity';
import { TrelloQuadro } from './trello-quadro/entities/trello-quadro.entity';
import { TrelloList } from './trello-list/entities/trello-list.entity';
import { SetoresModule } from './setores/setores.module';
import { Setores } from './setores/entities/setores.entity';
import { LabelModule } from './label/label.module';
import { ListenHandleAdmModule } from './listen-handle-adm/listen-handle.module';
import { ListenHandleSubModule } from './listen-handle-sub/list-handle-sub.module';
import { CronnJobsModule } from './cronn-jobs/cronn-jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TrelloResponsavelModule } from './trello-responsavel/trello-responsavel.module';
import { TrelloResponsavel } from './trello-responsavel/entities/trello-responsavel.entity';
require("dotenv").config()

@Module({
  imports: [
    TrelloQuadroModule,
    BotTrelloModule,
    TrelloListModule,
    TrelloCartaoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      port: 3306,
      username: process.env.dbuser,
      password: process.env.dbsenha,
      database: process.env.dbdatabase,
      entities: [TrelloResponsavel, TrelloCartao, Setores, TrelloQuadro, TrelloList],
      synchronize: false
    }),
    ScheduleModule.forRoot(),
    SetoresModule,
    LabelModule,
    ListenHandleAdmModule,
    ListenHandleSubModule,
    CronnJobsModule,
    TrelloResponsavelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log(`
___________              .__  .__             
\\__    ___/______   ____ |  | |  |   ____     
  |    |  \\_  __ \\_/ __ \\|  | |  |  /  _ \\    
  |    |   |  | \\/\\  ___/|  |_|  |_(  <_> )   
  |____|   |__|    \\___  >____/____/\\____/    
                       \\/                     
  _________                  .__              
 /   _____/ ______________  _|__| ____  ____  
 \\_____  \\_/ __ \\_  __ \\  \\/ /  |/ ___\\/ __ \\ 
 /        \\  ___/|  | \\/\\   /|  \\  \\__\\  ___/ 
/_______  /\\___  >__|    \\_/ |__|\\___  >___  >
        \\/     \\/                    \\/    \\/ 
        `)
  }
}
