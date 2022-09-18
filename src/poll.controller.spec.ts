import { Test, TestingModule } from '@nestjs/testing';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

describe('PollController', () => {
  let pollController: PollController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PollController],
      providers: [PollService],
    }).compile();

    pollController = app.get<PollController>(PollController);
  });

  describe('root', () => {
    it('findAll should return []', () => {
      expect(pollController.findAll()).toStrictEqual([]);
    });
  });
});
