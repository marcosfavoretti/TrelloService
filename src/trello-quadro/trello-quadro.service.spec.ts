import { Test, TestingModule } from '@nestjs/testing';
import { TrelloQuadroService } from './trello-quadro.service';

describe('TrelloQuadroService', () => {
  let service: TrelloQuadroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrelloQuadroService],
    }).compile();

    service = module.get<TrelloQuadroService>(TrelloQuadroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
