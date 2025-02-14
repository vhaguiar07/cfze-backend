import { Test, TestingModule } from '@nestjs/testing';
import { AccidentCostService } from './accident-cost.service';

describe('AccidentCostService', () => {
  let service: AccidentCostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccidentCostService],
    }).compile();

    service = module.get<AccidentCostService>(AccidentCostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
