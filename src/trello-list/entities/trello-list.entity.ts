import { TrelloQuadro } from "src/trello-quadro/entities/trello-quadro.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrelloList {
    @PrimaryGeneratedColumn()
    idList: string

    @ManyToOne(() => TrelloQuadro)
    @JoinColumn({ name: "idQuadro" })
    idQuadro: TrelloQuadro

    @Column({ type: "varchar" })
    idTrello: string

    @Column({ type: "varchar" })
    nome: string

}


