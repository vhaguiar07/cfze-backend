import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccidentCostDto } from '../dto/accident-cost/create-accident-cost.dto';
import { UpdateAccidentCostDto } from '../dto/accident-cost/update-accident-cost.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccidentCostService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAccidentCostDto) {
    try {
      const accident = await this.prisma.accidentControl.findUnique({
        where: { id: dto.accidentId },
        include: { accidentCost: true, employee: true },
      });

      if (!accident) {
        throw new NotFoundException('Acidente não encontrado.');
      }

      if (!accident.employee) {
        throw new NotFoundException('Funcionário vinculado ao acidente não encontrado.');
      }

      if (accident.accidentCost) {
        throw new ConflictException('Já existe um custo cadastrado para este acidente.');
      }

      const totalCost =
        (dto.medicationCost || 0) +
        (dto.foodCost || 0) +
        (dto.materialCost || 0) +
        (dto.legalCost || 0);

      return await this.prisma.accidentCost.create({
        data: {
          accident: { connect: { id: dto.accidentId } },
          medicationCost: dto.medicationCost || 0,
          foodCost: dto.foodCost || 0,
          materialCost: dto.materialCost || 0,
          legalCost: dto.legalCost || 0,
          totalCost: totalCost,
          comments: dto.comments,
        },
      });
    } catch (error) {
      console.error('Erro ao cadastrar custo do acidente:', error);

      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro ao cadastrar custo do acidente.');
    }
  }

  async update(id: string, dto: UpdateAccidentCostDto) {
    try {
      const accidentCost = await this.prisma.accidentCost.findUnique({
        where: { id },
      });

      if (!accidentCost) {
        throw new NotFoundException('Custo do acidente não encontrado.');
      }

      const totalCost = new Prisma.Decimal(dto.medicationCost ?? accidentCost.medicationCost)
        .plus(new Prisma.Decimal(dto.foodCost ?? accidentCost.foodCost))
        .plus(new Prisma.Decimal(dto.materialCost ?? accidentCost.materialCost))
        .plus(new Prisma.Decimal(dto.legalCost ?? accidentCost.legalCost));

      return await this.prisma.accidentCost.update({
        where: { id },
        data: {
          medicationCost: dto.medicationCost ?? accidentCost.medicationCost,
          foodCost: dto.foodCost ?? accidentCost.foodCost,
          materialCost: dto.materialCost ?? accidentCost.materialCost,
          legalCost: dto.legalCost ?? accidentCost.legalCost,
          totalCost: totalCost,
          comments: dto.comments ?? accidentCost.comments,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar custo do acidente:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro ao atualizar custo do acidente.');
    }
  }

  async findAll(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const accidentCosts = await this.prisma.accidentCost.findMany({
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
      include: {
        accident: {
          select: {
            accidentNumber: true,
            accidentDate: true,
            accidentType: true,
            employee: {
              select: {
                fullName: true,
                department: true,
              }
            }
          }
        }
      }
    });

    const totalAccidentCosts = await this.prisma.accidentCost.count();

    return {
      total: totalAccidentCosts,
      page,
      limit,
      accidentCosts,
    };
  }
}
