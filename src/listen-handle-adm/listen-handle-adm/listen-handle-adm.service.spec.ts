import { Test, TestingModule } from '@nestjs/testing';
import { ListenHandleAdmService } from './listen-handle-adm.service';

describe('ListenHandleAdmService', () => {
  let service: ListenHandleAdmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenHandleAdmService],
    }).compile();

    service = module.get<ListenHandleAdmService>(ListenHandleAdmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
