import { Test, TestingModule } from '@nestjs/testing';
import { TrelloResponsavelService } from './trello-responsavel.service';

describe('TrelloResponsavelService', () => {
  let service: TrelloResponsavelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrelloResponsavelService],
    }).compile();

    service = module.get<TrelloResponsavelService>(TrelloResponsavelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
