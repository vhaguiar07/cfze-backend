import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePpeController } from './employee-ppe.controller';

describe('EmployeePpeController', () => {
  let controller: EmployeePpeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePpeController],
    }).compile();

    controller = module.get<EmployeePpeController>(EmployeePpeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
