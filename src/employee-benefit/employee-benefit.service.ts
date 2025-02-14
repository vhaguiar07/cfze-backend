import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateEmployeeBenefitDto } from '../dto/employee-benefit/create-employee-benefit.dto';
import { UpdateEmployeeBenefitDto } from '../dto/employee-benefit/update-employee-benefit.dto';

@Injectable()
export class EmployeeBenefitService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeBenefitDto) {
    const normalizedCpf = dto.employeeCpf.replace(/\D/g, '');
    const normalizedCnpj = dto.companyCnpj.replace(/\D/g, '');

    const employee = await this.prisma.employee.findUnique({
      where: { cpf: normalizedCpf, deletedAt: null },
    });

    if (!employee) {
      throw new NotFoundException(`Funcionário com CPF ${dto.employeeCpf} não encontrado ou excluído.`);
    }

    const company = await this.prisma.company.findUnique({
      where: { cnpj: normalizedCnpj, deletedAt: null },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${dto.companyCnpj} não encontrada ou excluída.`);
    }

    return this.prisma.employeeBenefit.create({
      data: {
        employeeId: employee.id,
        companyId: company.id,
        benefit: dto.benefit,
        referencePeriod: dto.referencePeriod,
        type: dto.type,
        area: dto.area,
        jobTitle: dto.jobTitle,
        mealVoucherPrice: dto.mealVoucherPrice,
        workDays: dto.workDays,
        extraDays: dto.extraDays,
        justifiedAbsenceDays: dto.justifiedAbsenceDays,
        paidDays: dto.paidDays,
        totalPrice: dto.totalPrice,
        comments: dto.comments,
      },
    });
  }

  async findAll(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const benefits = await this.prisma.employeeBenefit.findMany({
      include: {
        employee: { select: { cpf: true } },
        company: { select: { cnpj: true } }
      },
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
    });

    const totalBenefits = await this.prisma.employeeBenefit.count();

    return {
      total: totalBenefits,
      page,
      limit,
      benefits: benefits.map((benefit) => ({
        id: benefit.id,
        employeeCpf: benefit.employee.cpf,
        companyCnpj: benefit.company.cnpj,
        benefit: benefit.benefit,
        referencePeriod: benefit.referencePeriod,
        type: benefit.type,
        area: benefit.area,
        jobTitle: benefit.jobTitle,
        mealVoucherPrice: benefit.mealVoucherPrice,
        workDays: benefit.workDays,
        extraDays: benefit.extraDays,
        justifiedAbsenceDays: benefit.justifiedAbsenceDays,
        paidDays: benefit.paidDays,
        totalPrice: benefit.totalPrice,
        comments: benefit.comments,
        createdAt: benefit.createdAt,
        updatedAt: benefit.updatedAt,
      })),
    };
  }

  async findOne(id: string) {
    const benefit = await this.prisma.employeeBenefit.findUnique({
      where: { id },
      include: {
        employee: { select: { cpf: true } },
        company: { select: { cnpj: true } }
      }
    });
  
    if (!benefit) {
      throw new NotFoundException(`Benefício com ID ${id} não encontrado.`);
    }
  
    return {
      id: benefit.id,
      employeeCpf: benefit.employee.cpf,
      companyCnpj: benefit.company.cnpj,
      benefit: benefit.benefit,
      referencePeriod: benefit.referencePeriod,
      type: benefit.type,
      area: benefit.area,
      jobTitle: benefit.jobTitle,
      mealVoucherPrice: benefit.mealVoucherPrice,
      workDays: benefit.workDays,
      extraDays: benefit.extraDays,
      justifiedAbsenceDays: benefit.justifiedAbsenceDays,
      paidDays: benefit.paidDays,
      totalPrice: benefit.totalPrice,
      comments: benefit.comments,
      createdAt: benefit.createdAt,
      updatedAt: benefit.updatedAt,
    };
  }

  async update(id: string, updateDto: UpdateEmployeeBenefitDto) {
    const existingBenefit = await this.prisma.employeeBenefit.findUnique({
      where: { id },
      include: {
        employee: { select: { cpf: true } },
        company: { select: { cnpj: true } }
      }
    });
  
    if (!existingBenefit) {
      throw new NotFoundException(`Benefício com ID ${id} não encontrado.`);
    }
  
    try {
      const updatedBenefit = await this.prisma.employeeBenefit.update({
        where: { id },
        data: {
          benefit: updateDto.benefit ?? existingBenefit.benefit,
          referencePeriod: updateDto.referencePeriod ?? existingBenefit.referencePeriod,
          type: updateDto.type ?? existingBenefit.type,
          area: updateDto.area ?? existingBenefit.area,
          jobTitle: updateDto.jobTitle ?? existingBenefit.jobTitle,
          mealVoucherPrice: updateDto.mealVoucherPrice ?? existingBenefit.mealVoucherPrice,
          workDays: updateDto.workDays ?? existingBenefit.workDays,
          extraDays: updateDto.extraDays ?? existingBenefit.extraDays,
          justifiedAbsenceDays: updateDto.justifiedAbsenceDays ?? existingBenefit.justifiedAbsenceDays,
          paidDays: updateDto.paidDays ?? existingBenefit.paidDays,
          totalPrice: updateDto.totalPrice ?? existingBenefit.totalPrice,
          comments: updateDto.comments ?? existingBenefit.comments,
        },
      });
  
      return {
        id: updatedBenefit.id,
        employeeCpf: existingBenefit.employee.cpf,
        companyCnpj: existingBenefit.company.cnpj,
        benefit: updatedBenefit.benefit,
        referencePeriod: updatedBenefit.referencePeriod,
        type: updatedBenefit.type,
        area: updatedBenefit.area,
        jobTitle: updatedBenefit.jobTitle,
        mealVoucherPrice: updatedBenefit.mealVoucherPrice,
        workDays: updatedBenefit.workDays,
        extraDays: updatedBenefit.extraDays,
        justifiedAbsenceDays: updatedBenefit.justifiedAbsenceDays,
        paidDays: updatedBenefit.paidDays,
        totalPrice: updatedBenefit.totalPrice,
        comments: updatedBenefit.comments,
        createdAt: updatedBenefit.createdAt,
        updatedAt: updatedBenefit.updatedAt,
      };
    } catch (error) {
      throw new Error(`Erro ao atualizar benefício: ${error.message}`);
    }
  }
}
