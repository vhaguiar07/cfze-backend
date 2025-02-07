import { Test, TestingModule } from '@nestjs/testing';
import { AccidentControlService } from './accident-control.service';

describe('AccidentControlService', () => {
  let service: AccidentControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccidentControlService],
    }).compile();

    service = module.get<AccidentControlService>(AccidentControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
