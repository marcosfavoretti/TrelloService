import { Test, TestingModule } from '@nestjs/testing';
import { CronnService } from './cronn.service';

describe('CronnService', () => {
  let service: CronnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronnService],
    }).compile();

    service = module.get<CronnService>(CronnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
