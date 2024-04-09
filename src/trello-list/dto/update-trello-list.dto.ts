import { PartialType } from '@nestjs/mapped-types';
import { CreateTrelloListDto } from './create-trello-list.dto';

export class UpdateTrelloListDto extends PartialType(CreateTrelloListDto) {}
