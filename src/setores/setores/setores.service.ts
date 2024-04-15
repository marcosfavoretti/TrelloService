import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setores } from '../entities/setores.entity';
import { Repository } from 'typeorm';
import { CreateSetorDto } from 'src/bot-trello/dto/createsetore.dto';

@Injectable()
export class SetoresService {
    constructor(@InjectRepository(Setores) private setores: Repository<Setores>) {

    }

    async getSetores() {
        return await this.setores.find()
    }

    async createSetor(setor: CreateSetorDto) {
        return await this.setores.insert({
            nome: setor.nome
        })
    }

}
