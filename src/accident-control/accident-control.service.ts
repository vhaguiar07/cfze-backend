import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccidentControlDto } from '../dto/accident-control/create-accident-control.dto';
import { UpdateAccidentControlDto } from '../dto/accident-control/update-accident-control.dto';

@Injectable()
export class AccidentControlService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAccidentControlDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.employeeId },
      select: {
        birthDate: true,
        sex: true,
        jobTitle: true,
        department: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return this.prisma.accidentControl.create({
      data: {
        accidentNumber: dto.accidentNumber,
        accidentDate: dto.accidentDate,
        birthDate: employee.birthDate,
        sex: employee.sex,
        jobTitle: employee.jobTitle,
        accidentType: dto.accidentType,
        accidentDescription: dto.accidentDescription,
        accidentsWithLeave: dto.accidentsWithLeave,
        bodyPartAffected: dto.bodyPartAffected,
        injurySeverity: dto.injurySeverity,
        accidentOrIncident: dto.accidentOrIncident,
        medicalCertificates: dto.medicalCertificates,
        daysAway: dto.daysAway,
        hoursAway: dto.hoursAway,
        comments: dto.comments,
        employee: {
          connect: { id: dto.employeeId },
        },
      },
    });
  }

  async update(accidentId: string, dto: UpdateAccidentControlDto) {
    const accident = await this.prisma.accidentControl.findUnique({
      where: { id: accidentId },
    });
  
    if (!accident) {
      throw new NotFoundException('Acidente não encontrado');
    }
  
    return this.prisma.accidentControl.update({
      where: { id: accidentId },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }
  
  async findAll(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const accidents = await this.prisma.accidentControl.findMany({
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
      include: {
        employee: {
          select: {
            fullName: true,
            department: true,
          }
        }
      }
    });

    const totalAccidents = await this.prisma.accidentControl.count();

    return {
      total: totalAccidents,
      page,
      limit,
      accidents,
    };
  }
}
