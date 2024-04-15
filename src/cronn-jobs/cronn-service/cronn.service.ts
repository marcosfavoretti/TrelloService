import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from "@nestjs/schedule"
import { TrelloCartaoService } from 'src/trello-cartao/trello-cartao.service';
import { parse, add, compareAsc } from "date-fns"
import { EmailNotificationModule } from 'src/email-notification/email-notification.module';
import { EmailService } from 'src/email-notification/email-services/email.service';
import { TrelloResponsavelService } from 'src/trello-responsavel/trello-responsavel/trello-responsavel.service';
import { SetoresService } from 'src/setores/setores/setores.service';
import { TrelloQuadroService } from 'src/trello-quadro/trello-quadro.service';
import { getEmailContent } from 'src/email-notification/emailgem/email.gem';
@Injectable()
export class CronnService {
    constructor(private trellocard: TrelloCartaoService,
        private email: EmailService,
        private trelloResponsavel: TrelloResponsavelService,
        private setores: SetoresService,
        private boardService: TrelloQuadroService) { }
    @Cron(CronExpression.EVERY_DAY_AT_8AM)
    /*
        valida todos os dias 8 am quais cartoes nao foram validados ainda e se estao dentro do 
        prazo de uma semana para validação
    */
    public async validaSemRepostas() {
        const cards_local = await this.trellocard.cardsSemValidação()
        cards_local.forEach(async (card) => {
            const initDate = parse(card.initAvalTime, 'dd-MM-yyyy HH:mm:ss', new Date())
            const finalDate = add(initDate, {
                days: 7
            })
            const today = new Date()
            if (compareAsc(today, finalDate) > 0) return //caso o valor for menor que zero eu retorno pq ainda esta no prazo
            const trello_card = await this.trellocard.getSomeCard(card.idTrello)
            const responsaveis = await this.trelloResponsavel.getResponsaveis(trello_card.idBoard)
            await this.email.sendEmail({
                subject: `Cartão "${trello_card.name}" expirou o tempo de planejamento`,
                html: getEmailContent([trello_card], responsaveis[0].idQuadro, `O tempo de validação do Cartão "${trello_card.name}" acabou, entre no trello e de um prazo para a ação ser realizada`),
                reciver: [...responsaveis.map(person => person.email), 'marcos.junior@ethos.ind.br']//passar quem é reponsavel pelo quadro
            });
        })
    }

    @Cron(CronExpression.EVERY_DAY_AT_7AM)
    /*
        valida toda meia noite quais cartoes esta com a data de validade perto do fim ou ja estao vencidos
    */
    public async validaVencimentos() {
        const [notDone, boards] = await Promise.all([
            this.trellocard.getVencimento(new Date()),
            this.boardService.getAllBoards()
        ]);

        for (const board of boards) {
            const tasks = await Promise.all(notDone.map(async (task) => {
                const card = await this.trellocard.getSomeCard(task.idTrello);
                if (card.idBoard === board.idTrello) return card;
            }));

            const recivers = await this.trelloResponsavel.getResponsaveis(board.idTrello);

            if (tasks.every(task => !task)) {
                // console.log('Sem nada para reportar', board.nome);
                continue;
            }
            await this.email.sendEmail({
                subject: `Cartões vencidos ou perto do vencimento ${board.nome}`,
                html: getEmailContent(tasks, board, `Os cartões : ${tasks.map(card => card.name).join(', ')} necessitam de uma resposta urgente`),
                reciver: [...recivers.map(person => person.email), 'marcos.junior@ethos.ind.br']
            })

        }
    }


}
