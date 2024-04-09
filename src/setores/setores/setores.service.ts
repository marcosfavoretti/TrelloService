import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setores } from '../entities/setores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SetoresService {
    constructor(@InjectRepository(Setores) private setores: Repository<Setores>) {

    }

    async getSetores() {
        return await this.setores.find()
    }


}
