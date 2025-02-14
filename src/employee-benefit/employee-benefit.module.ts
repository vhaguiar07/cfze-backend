import { Module } from '@nestjs/common';
import { EmployeeBenefitController } from './employee-benefit.controller';
import { EmployeeBenefitService } from './employee-benefit.service';

@Module({
  controllers: [EmployeeBenefitController],
  providers: [EmployeeBenefitService]
})
export class EmployeeBenefitModule {}
