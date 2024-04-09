import { TrelloList } from "src/trello-list/entities/trello-list.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class TrelloCartao {

    @PrimaryGeneratedColumn()
    idCartao: number
    @Column({ type: 'varchar' })
    idTrello: string
    @Column({ type: 'varchar' })
    idTrelloFather: string
    @Column({ type: "varchar" })
    initAvalTime: string
    @Column({ type: "varchar" })
    finishAvalTime: string
    @Column({ type: "int" })
    numAlteracao: number

    @Column({ type: "varchar" })
    startTime: string

    @Column({ type: "varchar" })
    endTime: string

    @Column({ type: 'boolean' })
    done: boolean
    @Column({ type: 'varchar' })
    doneDate: string
}


