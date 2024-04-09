import { Test, TestingModule } from '@nestjs/testing';
import { TrelloCartaoService } from './trello-cartao.service';

describe('TrelloCartaoService', () => {
  let service: TrelloCartaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrelloCartaoService],
    }).compile();

    service = module.get<TrelloCartaoService>(TrelloCartaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
