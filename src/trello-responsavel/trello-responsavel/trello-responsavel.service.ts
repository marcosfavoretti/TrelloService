import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrelloResponsavel } from '../entities/trello-responsavel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrelloResponsavelService {
    constructor(@InjectRepository(TrelloResponsavel) private trelloResposavel: Repository<TrelloResponsavel>) { }


    async getResponsaveis(idTrelloBoard: string) {
        const queryBuilder = this.trelloResposavel.createQueryBuilder('trelloResponsavel')
        queryBuilder
            .leftJoinAndSelect('trelloResponsavel.idQuadro', 'TrelloQuadro')
        const result = await queryBuilder.getMany()
        return result.filter(board => board.idQuadro.idTrello === idTrelloBoard)

    }
}
