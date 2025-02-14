import { Module } from '@nestjs/common';
import { AccidentCostService } from './accident-cost.service';
import { AccidentCostController } from './accident-cost.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AccidentCostService, PrismaService],
  controllers: [AccidentCostController]
})
export class AccidentCostModule {}
