import { Module } from '@nestjs/common';
import { EmployeePPEController } from './employee-ppe.controller';
import { EmployeePPEService } from './employee-ppe.service';

@Module({
  controllers: [EmployeePPEController],
  providers: [EmployeePPEService]
})
export class EmployeePpeModule {}
