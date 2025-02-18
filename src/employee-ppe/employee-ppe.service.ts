import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeePPEDto } from '../dto/employee-ppe/create-employee-ppe.dto';
import { UpdateEmployeePPEDto } from '../dto/employee-ppe/update-employee-ppe.dto';

@Injectable()
export class EmployeePPEService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeePPEDto) {
    const normalizedCpf = dto.employeeCpf.replace(/\D/g, '');

    const employee = await this.prisma.employee.findUnique({
      where: { cpf: normalizedCpf, deletedAt: null },
    });

    if (!employee) {
      throw new NotFoundException(`Funcionário com CPF ${dto.employeeCpf} não encontrado ou excluído.`);
    }

    return this.prisma.employeePPEControl.create({
      data: {
        employeeId: employee.id,
        ppeDescription: dto.ppeDescription,
        department: dto.department,
        referenceMonth: dto.referenceMonth,
        situation: dto.situation,
        quantity: dto.quantity,
        reasonForReplacement: dto.reasonForReplacement,
        comments: dto.comments,
      },
    });
  }

  async findAll(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = (page - 1) * limit;

    const records = await this.prisma.employeePPEControl.findMany({
      include: {
        employee: {
          select: {
            fullName: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await this.prisma.employeePPEControl.count();

    return {
      total,
      page,
      limit,
      records: records.map(record => ({
        id: record.id,
        employeeName: record.employee.fullName,
        ppeDescription: record.ppeDescription,
        department: record.department,
        referenceMonth: record.referenceMonth,
        situation: record.situation,
        quantity: record.quantity,
        reasonForReplacement: record.reasonForReplacement,
        comments: record.comments,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      })),
    };
  }

  async findOne(id: string) {
    const record = await this.prisma.employeePPEControl.findUnique({
      where: { id },
      include: {
        employee: { select: { cpf: true } },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro de EPI com ID ${id} não encontrado.`);
    }

    return {
      id: record.id,
      employeeCpf: record.employee.cpf,
      ppeDescription: record.ppeDescription,
      department: record.department,
      referenceMonth: record.referenceMonth,
      situation: record.situation,
      quantity: record.quantity,
      reasonForReplacement: record.reasonForReplacement,
      comments: record.comments,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }

  async update(id: string, updateDto: UpdateEmployeePPEDto) {
    const existingRecord = await this.prisma.employeePPEControl.findUnique({
      where: { id },
      include: {
        employee: { select: { cpf: true } },
      },
    });

    if (!existingRecord) {
      throw new NotFoundException(`Registro de EPI com ID ${id} não encontrado.`);
    }

    try {
      const updatedRecord = await this.prisma.employeePPEControl.update({
        where: { id },
        data: {
          ppeDescription: updateDto.ppeDescription ?? existingRecord.ppeDescription,
          department: updateDto.department ?? existingRecord.department,
          referenceMonth: updateDto.referenceMonth ?? existingRecord.referenceMonth,
          situation: updateDto.situation ?? existingRecord.situation,
          quantity: updateDto.quantity ?? existingRecord.quantity,
          reasonForReplacement: updateDto.reasonForReplacement ?? existingRecord.reasonForReplacement,
          comments: updateDto.comments ?? existingRecord.comments,
        },
      });

      return {
        id: updatedRecord.id,
        employeeCpf: existingRecord.employee.cpf,
        ppeDescription: updatedRecord.ppeDescription,
        department: updatedRecord.department,
        referenceMonth: updatedRecord.referenceMonth,
        situation: updatedRecord.situation,
        quantity: updatedRecord.quantity,
        reasonForReplacement: updatedRecord.reasonForReplacement,
        comments: updatedRecord.comments,
        createdAt: updatedRecord.createdAt,
        updatedAt: updatedRecord.updatedAt,
      };
    } catch (error) {
      throw new BadRequestException(`Erro ao atualizar registro de EPI: ${error.message}`);
    }
  }

  async searchByEmployeeName(fullName: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const records = await this.prisma.employeePPEControl.findMany({
      where: {
        employee: {
          fullName: {
            contains: fullName,
            mode: 'insensitive',
          },
        },
      },
      include: {
        employee: {
          select: {
            fullName: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.employeePPEControl.count({
      where: {
        employee: {
          fullName: {
            contains: fullName,
            mode: 'insensitive',
          },
        },
      },
    });

    return {
      total,
      page,
      limit,
      records: records.map(record => ({
        id: record.id,
        employeeName: record.employee.fullName,
        ppeDescription: record.ppeDescription,
        department: record.department,
        referenceMonth: record.referenceMonth,
        situation: record.situation,
        quantity: record.quantity,
        reasonForReplacement: record.reasonForReplacement,
        comments: record.comments,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      })),
    };    
  }
}
