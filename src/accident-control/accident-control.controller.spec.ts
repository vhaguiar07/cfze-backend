import { Test, TestingModule } from '@nestjs/testing';
import { AccidentControlController } from './accident-control.controller';

describe('AccidentControlController', () => {
  let controller: AccidentControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccidentControlController],
    }).compile();

    controller = module.get<AccidentControlController>(AccidentControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
