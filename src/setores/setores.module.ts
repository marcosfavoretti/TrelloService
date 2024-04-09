import { Module } from '@nestjs/common';
import { SetoresService } from './setores/setores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setores } from './entities/setores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setores])],
  providers: [SetoresService],
  exports: [SetoresService]
})
export class SetoresModule { }
