import { Test, TestingModule } from '@nestjs/testing';
import { BotTrelloService } from './bot-trello.service';

describe('BotTrelloService', () => {
  let service: BotTrelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotTrelloService],
    }).compile();

    service = module.get<BotTrelloService>(BotTrelloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
