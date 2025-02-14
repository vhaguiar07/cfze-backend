import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeAttendanceDto } from '../dto/employee-attendance/create-employee-attendance.dto';
import { UpdateEmployeeAttendanceDto } from '../dto/employee-attendance/update-employee-attendance.dto';

@Injectable()
export class EmployeeAttendanceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeAttendanceDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { cpf: dto.employeeCpf, deletedAt: null },
      select: { id: true },
    });

    if (!employee) {
      throw new NotFoundException(`Funcionário com CPF ${dto.employeeCpf} não encontrado.`);
    }

    const company = await this.prisma.company.findUnique({
      where: { cnpj: dto.companyCnpj, deletedAt: null },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${dto.companyCnpj} não encontrada.`);
    }

    return this.prisma.employeeAttendance.create({
      data: {
        employeeId: employee.id,
        companyId: company.id,
        area: dto.area,
        jobTitle: dto.jobTitle,
        referencePeriod: dto.referencePeriod,
        absenceDescription: dto.absenceDescription,
        situation: dto.situation,
        workDays: dto.workDays,
        absences: dto.absences,
        medicalLeaveDays: dto.medicalLeaveDays,
        extraDays: dto.extraDays,
        justifiedAbsenceDays: dto.justifiedAbsenceDays,
        workedDays: dto.workedDays,
        date: new Date(dto.date),
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

    const attendanceRecords = await this.prisma.employeeAttendance.findMany({
      include: {
        employee: { select: { cpf: true } },
        company: { select: { cnpj: true } }
      },
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
    });

    const totalRecords = await this.prisma.employeeAttendance.count();

    return {
      total: totalRecords,
      page,
      limit,
      attendanceRecords: attendanceRecords.map((record) => ({
        id: record.id,
        employeeCpf: record.employee.cpf,
        companyCnpj: record.company.cnpj,
        area: record.area,
        jobTitle: record.jobTitle,
        referencePeriod: record.referencePeriod,
        absenceDescription: record.absenceDescription,
        situation: record.situation,
        workDays: record.workDays,
        absences: record.absences,
        medicalLeaveDays: record.medicalLeaveDays,
        extraDays: record.extraDays,
        justifiedAbsenceDays: record.justifiedAbsenceDays,
        workedDays: record.workedDays,
        date: record.date,
        comments: record.comments,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      })),
    };
  }

  async findOne(id: string) {
    const attendanceRecord = await this.prisma.employeeAttendance.findUnique({
      where: { id },
      include: {
        employee: { select: { cpf: true } },
        company: { select: { cnpj: true } }
      }
    });

    if (!attendanceRecord) {
      throw new NotFoundException(`Registro de faltas com ID ${id} não encontrado.`);
    }

    return {
      id: attendanceRecord.id,
      employeeCpf: attendanceRecord.employee.cpf,
      companyCnpj: attendanceRecord.company.cnpj,
      area: attendanceRecord.area,
      jobTitle: attendanceRecord.jobTitle,
      referencePeriod: attendanceRecord.referencePeriod,
      absenceDescription: attendanceRecord.absenceDescription,
      situation: attendanceRecord.situation,
      workDays: attendanceRecord.workDays,
      absences: attendanceRecord.absences,
      medicalLeaveDays: attendanceRecord.medicalLeaveDays,
      extraDays: attendanceRecord.extraDays,
      justifiedAbsenceDays: attendanceRecord.justifiedAbsenceDays,
      workedDays: attendanceRecord.workedDays,
      date: attendanceRecord.date,
      comments: attendanceRecord.comments,
      createdAt: attendanceRecord.createdAt,
      updatedAt: attendanceRecord.updatedAt,
    };
  }

  async update(id: string, updateDto: UpdateEmployeeAttendanceDto) {
    const existingAttendance = await this.prisma.employeeAttendance.findUnique({
      where: { id },
      include: {
        employee: { select: { cpf: true } },
        company: { select: { cnpj: true } }
      }
    });

    if (!existingAttendance) {
      throw new NotFoundException(`Registro de faltas com ID ${id} não encontrado.`);
    }

    try {
      const updatedAttendance = await this.prisma.employeeAttendance.update({
        where: { id },
        data: {
          referencePeriod: updateDto.referencePeriod ?? existingAttendance.referencePeriod,
          area: updateDto.area ?? existingAttendance.area,
          jobTitle: updateDto.jobTitle ?? existingAttendance.jobTitle,
          absenceDescription: updateDto.absenceDescription ?? existingAttendance.absenceDescription,
          situation: updateDto.situation ?? existingAttendance.situation,
          workDays: updateDto.workDays ?? existingAttendance.workDays,
          absences: updateDto.absences ?? existingAttendance.absences,
          medicalLeaveDays: updateDto.medicalLeaveDays ?? existingAttendance.medicalLeaveDays,
          extraDays: updateDto.extraDays ?? existingAttendance.extraDays,
          justifiedAbsenceDays: updateDto.justifiedAbsenceDays ?? existingAttendance.justifiedAbsenceDays,
          workedDays: updateDto.workedDays ?? existingAttendance.workedDays,
          comments: updateDto.comments ?? existingAttendance.comments,
        },
      });

      return {
        id: updatedAttendance.id,
        employeeCpf: existingAttendance.employee.cpf,
        companyCnpj: existingAttendance.company.cnpj,
        referencePeriod: updatedAttendance.referencePeriod,
        area: updatedAttendance.area,
        jobTitle: updatedAttendance.jobTitle,
        absenceDescription: updatedAttendance.absenceDescription,
        situation: updatedAttendance.situation,
        workDays: updatedAttendance.workDays,
        absences: updatedAttendance.absences,
        medicalLeaveDays: updatedAttendance.medicalLeaveDays,
        extraDays: updatedAttendance.extraDays,
        justifiedAbsenceDays: updatedAttendance.justifiedAbsenceDays,
        workedDays: updatedAttendance.workedDays,
        comments: updatedAttendance.comments,
        createdAt: updatedAttendance.createdAt,
        updatedAt: updatedAttendance.updatedAt,
      };
    } catch (error) {
      throw new Error(`Erro ao atualizar registro de faltas: ${error.message}`);
    }
  }
}
