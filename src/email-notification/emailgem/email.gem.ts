import { TrelloCard } from "src/trello-cartao/objects/TreloCard"
import { TrelloQuadro } from "src/trello-quadro/entities/trello-quadro.entity"
import { TrelloResponsavel } from "src/trello-responsavel/entities/trello-responsavel.entity"

const mailgen = require('mailgen')

export function getEmailContent(trellocard: TrelloCard[], idTrelloBoard: string, msg: string) {

    const mailgenerator = new mailgen({
        theme: "cerberus",
        product: {
            name: "TrelloService",
            link: `https://trello.com/b/${idTrelloBoard}`,
            copyright: 'Reports de cartões do Trello',
        }
    })

    const email = () => {
        const data = () => {
            return trellocard.map(task => {
                return {
                    instructions: `•\t${task.name}`,
                    button: {
                        color: "#2255bc",
                        text: "Visualizar Cartão",
                        link: task.shortUrl
                    }
                }
            })

        }

        return {
            body: {
                signature: false,
                greeting: false,

                intro: msg,
                action: data()
            }
        }
    }
    return mailgenerator.generate(email())
}