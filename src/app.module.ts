import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { EmployeeModule } from './employee/employee.module';
import { AccidentControlModule } from './accident-control/accident-control.module';
import { AccidentCostModule } from './accident-cost/accident-cost.module';
import { CompanyModule } from './company/company.module';
import { EmployeeBenefitModule } from './employee-benefit/employee-benefit.module';
import { EmployeeAttendanceModule } from './employee-attendance/employee-attendance.module';

@Module({
  imports: [AuthModule, EmployeeModule, AccidentControlModule, AccidentCostModule, CompanyModule, EmployeeBenefitModule, EmployeeAttendanceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
