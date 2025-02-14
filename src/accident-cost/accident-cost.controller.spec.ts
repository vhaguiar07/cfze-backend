import { Test, TestingModule } from '@nestjs/testing';
import { AccidentCostController } from './accident-cost.controller';

describe('AccidentCostController', () => {
  let controller: AccidentCostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccidentCostController],
    }).compile();

    controller = module.get<AccidentCostController>(AccidentCostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
