
import { Test, TestingModule } from '@nestjs/testing';
import { BotTrelloController } from './bot-trello.controller';
import { BotTrelloService } from './bot-trello.service';

describe('BotTrelloController', () => {
  let controller: BotTrelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotTrelloController],
      providers: [BotTrelloService],
    }).compile();

    controller = module.get<BotTrelloController>(BotTrelloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
