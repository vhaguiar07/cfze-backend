import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { EmployeeModule } from './employee/employee.module';
import { AccidentControlModule } from './accident-control/accident-control.module';

@Module({
  imports: [AuthModule, EmployeeModule, AccidentControlModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
