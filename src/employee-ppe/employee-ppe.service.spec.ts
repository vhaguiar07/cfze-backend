import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePpeService } from './employee-ppe.service';

describe('EmployeePpeService', () => {
  let service: EmployeePpeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePpeService],
    }).compile();

    service = module.get<EmployeePpeService>(EmployeePpeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
