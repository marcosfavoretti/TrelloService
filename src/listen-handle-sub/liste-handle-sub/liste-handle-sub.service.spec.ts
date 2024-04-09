import { Test, TestingModule } from '@nestjs/testing';
import { ListeHandleSubService } from './liste-handle-sub.service';

describe('ListeHandleSubService', () => {
  let service: ListeHandleSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListeHandleSubService],
    }).compile();

    service = module.get<ListeHandleSubService>(ListeHandleSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
