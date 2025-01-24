import { Injectable, NotFoundException, ConflictException  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(employeeDto: CreateEmployeeDto) {
    try {
      return await this.prisma.employee.create({
        data: {
          fullName: employeeDto.fullName,
          address: employeeDto.address,
          city: employeeDto.city,
          postalCode: employeeDto.postalCode,
          phoneNumber: employeeDto.phoneNumber,
          nationality: employeeDto.nationality,
          cpf: employeeDto.cpf,
          rg: employeeDto.rg,
          rgIssueDate: employeeDto.rgIssueDate,
          rgIssuingAgency: employeeDto.rgIssuingAgency,
          rgState: employeeDto.rgState,
          ctps: employeeDto.ctps,
          pisPasep: employeeDto.pisPasep,
          educationLevel: employeeDto.educationLevel,
          voterRegistration: employeeDto.voterRegistration,
          reservist: employeeDto.reservist,
          fatherName: employeeDto.fatherName,
          motherName: employeeDto.motherName,
          maritalStatus: employeeDto.maritalStatus,
          birthDate: employeeDto.birthDate,
          birthPlace: employeeDto.birthPlace,
          admissionDate: employeeDto.admissionDate,
          salary: employeeDto.salary,
          jobTitle: employeeDto.jobTitle,
          monthlyWorkloadHours: employeeDto.monthlyWorkloadHours,
          weeklyWorkloadHours: employeeDto.weeklyWorkloadHours,
          dayOff: employeeDto.dayOff,
          transportDiscount: employeeDto.transportDiscount,
          firstEntryWeekday: employeeDto.firstEntryWeekday,
          firstExitWeekday: employeeDto.firstExitWeekday,
          secondEntryWeekday: employeeDto.secondEntryWeekday,
          secondExitWeekday: employeeDto.secondExitWeekday,
          firstEntryWeekend: employeeDto.firstEntryWeekend,
          firstExitWeekend: employeeDto.firstExitWeekend,
          secondEntryWeekend: employeeDto.secondEntryWeekend,
          secondExitWeekend: employeeDto.secondExitWeekend,
          receivedPPE: employeeDto.receivedPPE,
          pantsSize: employeeDto.pantsSize,
          shirtSize: employeeDto.shirtSize,
          bootSize: employeeDto.bootSize,
          jacketSize: employeeDto.jacketSize,
          balaclavaSize: employeeDto.balaclavaSize,
          gogglesSize: employeeDto.gogglesSize,
          glovesSize: employeeDto.glovesSize,
          ppeReceiptDate: employeeDto.ppeReceiptDate,
          tookVacation: employeeDto.tookVacation,
          vacationDate: employeeDto.vacationDate,
          terminationType: employeeDto.terminationType,
          terminationDate: employeeDto.terminationDate,
          receivedIndemnity: employeeDto.receivedIndemnity,
          indemnityDate: employeeDto.indemnityDate,
          indemnityValue: employeeDto.indemnityValue,
          admissionInterview: employeeDto.admissionInterview,
          exitInterview: employeeDto.exitInterview,
          admissionAsoDates: employeeDto.admissionAsoDates,
          periodicAsoDates: employeeDto.periodicAsoDates,
          dismissalAsoDates: employeeDto.dismissalAsoDates,
          paternityLeaveDates: employeeDto.paternityLeaveDates,
          maternityLeaveDates: employeeDto.maternityLeaveDates,
          electoralLeaveDates: employeeDto.electoralLeaveDates,
          sufferedAccident: employeeDto.sufferedAccident,
          leaveOfAbsenceDates: employeeDto.leaveOfAbsenceDates
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`O campo '${error.meta.target}' já está em uso.`);
        }
      }
      throw error;
    }
  }

  async findAll(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const employees = await this.prisma.employee.findMany({
      where: {
        deletedAt: null,
      },
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
    });

    const totalEmployees = await this.prisma.employee.count({
      where: {
        deletedAt: null,
      },
    });

    return {
      total: totalEmployees,
      page,
      limit,
      employees,
    };
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }

    return employee;
  }

  async searchByFullName(fullName: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const employees = await this.prisma.employee.findMany({
      where: {
        fullName: {
          contains: fullName,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      orderBy: {
        fullName: 'asc',
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.employee.count({
      where: {
        fullName: {
          contains: fullName,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
    });

    return {
      total,
      page,
      limit,
      employees,
    };
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const existingEmployee = await this.prisma.employee.findUnique({
        where: { id },
        select: {
          admissionAsoDates: true,
          periodicAsoDates: true,
          dismissalAsoDates: true,
          paternityLeaveDates: true,
          maternityLeaveDates: true,
          electoralLeaveDates: true,
          leaveOfAbsenceDates: true,
        },
      });

      if (!existingEmployee) {
        throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
      }

      const mergedData = {
        admissionAsoDates: [...new Set([...(existingEmployee?.admissionAsoDates || []), ...(updateEmployeeDto.admissionAsoDates || [])])],
        periodicAsoDates: [...new Set([...(existingEmployee?.periodicAsoDates || []), ...(updateEmployeeDto.periodicAsoDates || [])])],
        dismissalAsoDates: [...new Set([...(existingEmployee?.dismissalAsoDates || []), ...(updateEmployeeDto.dismissalAsoDates || [])])],
        paternityLeaveDates: [...new Set([...(existingEmployee?.paternityLeaveDates || []), ...(updateEmployeeDto.paternityLeaveDates || [])])],
        maternityLeaveDates: [...new Set([...(existingEmployee?.maternityLeaveDates || []), ...(updateEmployeeDto.maternityLeaveDates || [])])],
        electoralLeaveDates: [...new Set([...(existingEmployee?.electoralLeaveDates || []), ...(updateEmployeeDto.electoralLeaveDates || [])])],
        leaveOfAbsenceDates: [...new Set([...(existingEmployee?.leaveOfAbsenceDates || []), ...(updateEmployeeDto.leaveOfAbsenceDates || [])])],
      };

      return await this.prisma.employee.update({
        where: { id },
        data: { ...updateEmployeeDto, ...mergedData },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`O campo '${error.meta.target}' já está em uso.`);
        }
      }
      throw error;
    }
  }

  async softDelete(id: string): Promise<boolean> {
    const existingEmployee = await this.prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingEmployee) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado ou já excluído.`);
    }

    await this.prisma.employee.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return true;
  }

  async restore(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }

    if (!employee.deletedAt) {
      throw new ConflictException(`Funcionário com ID ${id} já está ativo.`);
    }

    await this.prisma.employee.update({
      where: { id },
      data: { deletedAt: null },
    });

    return { message: 'Funcionário restaurado com sucesso' };
  }

  async findAllDeleted(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const employees = await this.prisma.employee.findMany({
      where: {
        deletedAt: { not: null }, 
      },
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
    });

    const totalEmployees = await this.prisma.employee.count({
      where: {
        deletedAt: { not: null }, 
      },
    });

    return {
      total: totalEmployees,
      page,
      limit,
      employees,
    };
  }

  async findOneDeleted(id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        id,
        deletedAt: { not: null }, 
      },
    });

    if (!employee) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }

    return employee;
  }
}
