import { TrelloQuadro } from "src/trello-quadro/entities/trello-quadro.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrelloResponsavel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @ManyToOne(() => TrelloQuadro, trelloQuadro => trelloQuadro.idQuadro)
    @JoinColumn({ name: "idQuadro" })
    idQuadro: TrelloQuadro

}