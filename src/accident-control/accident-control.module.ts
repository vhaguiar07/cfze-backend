import { Module } from '@nestjs/common';
import { AccidentControlService } from './accident-control.service';
import { AccidentControlController } from './accident-control.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AccidentControlService, PrismaService],
  controllers: [AccidentControlController]
})
export class AccidentControlModule {}
