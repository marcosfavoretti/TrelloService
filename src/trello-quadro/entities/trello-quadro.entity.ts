import { Setores } from "src/setores/entities/setores.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrelloQuadro {
    @PrimaryGeneratedColumn()
    idQuadro: number

    @OneToOne(() => Setores, setores => setores.id)
    @JoinColumn({ name: 'setores' })
    setor: Setores

    @Column({ type: "varchar" })
    idTrello: string

    @Column({ type: "varchar" })
    nome: string

    @Column({ type: "boolean" })
    isMain: boolean
}
