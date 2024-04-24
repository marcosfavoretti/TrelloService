import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrelloResponsavel } from '../entities/trello-responsavel.entity';
import { Repository } from 'typeorm';
import { CreateResponsavelDto } from 'src/bot-trello/dto/createresponsavel.dto';
import { TrelloQuadro } from 'src/trello-quadro/entities/trello-quadro.entity';

@Injectable()
export class TrelloResponsavelService {
    constructor(@InjectRepository(TrelloResponsavel) private trelloResposavel: Repository<TrelloResponsavel>) { }

    async getResponsaveisAdmin() {
        const queryBuilder = this.trelloResposavel.createQueryBuilder('trelloResponsavel')
        queryBuilder
            .leftJoinAndSelect('trelloResponsavel.idQuadro', 'TrelloQuadro')
            .where("TrelloQuadro.isMain = :status", {
                status: true
            })

        // Executando a consulta e aguardando os resultados
        const result = await queryBuilder.getMany()
        return result
    }

    async getResponsaveis(idTrelloBoard: string) {
        const queryBuilder = this.trelloResposavel.createQueryBuilder('trelloResponsavel')
        queryBuilder
            .leftJoinAndSelect('trelloResponsavel.idQuadro', 'TrelloQuadro')
        const result = await queryBuilder.getMany()
        return result.filter(board => board.idQuadro.idTrello === idTrelloBoard)

    }

    async createReponsavel(createResponsavel: CreateResponsavelDto, quadro: TrelloQuadro) {
        await this.trelloResposavel.insert({
            email: createResponsavel.email,
            idQuadro: quadro,
            name: createResponsavel.nome
        })
    }

    // async getResponsavelbyQuadro(quadro: TrelloQuadro) {
    //     return await this.trelloResposavel.find({
    //         where: {
    //             idQuadro: quadro
    //         }
    //     })
    // }
}
