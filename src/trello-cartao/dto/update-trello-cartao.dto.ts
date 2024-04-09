import { PartialType } from '@nestjs/mapped-types';
import { CreateTrelloCartaoDto } from './create-trello-cartao.dto';

export class UpdateTrelloCartaoDto extends PartialType(CreateTrelloCartaoDto) {}
