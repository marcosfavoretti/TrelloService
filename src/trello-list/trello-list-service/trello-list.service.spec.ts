import { Test, TestingModule } from '@nestjs/testing';
import { TrelloListService } from './trello-list.service';

describe('TrelloListService', () => {
  let service: TrelloListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrelloListService],
    }).compile();

    service = module.get<TrelloListService>(TrelloListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
