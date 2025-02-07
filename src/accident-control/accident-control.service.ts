import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAccidentControlDto } from '../dto/accident-control/create-accident-control.dto';
import { UpdateAccidentControlDto } from '../dto/accident-control/update-accident-control.dto';

@Injectable()
export class AccidentControlService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAccidentControlDto) {
    try {
      let employee;

      if (dto.employeeId) {
        employee = await this.prisma.employee.findUnique({
          where: { id: dto.employeeId },
        });
      } else if (dto.cpf) {
        employee = await this.prisma.employee.findUnique({
          where: { cpf: dto.cpf },
        });
      }

      if (!employee) {
        throw new NotFoundException('Funcionário não encontrado.');
      }

      return await this.prisma.accidentControl.create({
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
            connect: { id: employee.id },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe um acidente cadastrado com este número.');
        }
      }

      console.error('Erro ao cadastrar acidente:', error);
      throw new InternalServerErrorException('Erro ao cadastrar acidente.');
    }
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

  async searchByEmployeeName(fullName: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const accidents = await this.prisma.accidentControl.findMany({
      where: {
        employee: {
          fullName: {
            contains: fullName,
            mode: 'insensitive', // Ignora maiúsculas e minúsculas
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
        accidentDate: 'desc',
      },
    });

    const total = await this.prisma.accidentControl.count({
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
      accidents,
    };
  }
}
