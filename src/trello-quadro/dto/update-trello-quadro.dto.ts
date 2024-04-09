import { PartialType } from '@nestjs/mapped-types';
import { CreateTrelloQuadroDto } from './create-trello-quadro.dto';

export class UpdateTrelloQuadroDto extends PartialType(CreateTrelloQuadroDto) {}
