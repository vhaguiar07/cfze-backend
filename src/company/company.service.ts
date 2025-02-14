import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { UpdateCompanyDto } from '../dto/company/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  
  async create(dto: CreateCompanyDto) {
    const normalizedCnpj = dto.cnpj.replace(/\D/g, '');

    const existingCompany = await this.prisma.company.findUnique({
      where: { cnpj: normalizedCnpj },
    });

    if (existingCompany) {
      throw new ConflictException('CNPJ já cadastrado');
    }

    return this.prisma.company.create({
      data: {
        name: dto.name,
        cnpj: normalizedCnpj,
      },
    });
  }

  async findAll(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const companies = await this.prisma.company.findMany({
      where: { deletedAt: null },
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
    });

    const totalCompanies = await this.prisma.company.count({
      where: { deletedAt: null },
    });

    return {
      total: totalCompanies,
      page,
      limit,
      companies,
    };
  }

  async findOneByCnpj(cnpj: string) {
    const normalizedCnpj = cnpj.replace(/\D/g, '');

    const company = await this.prisma.company.findUnique({
      where: { cnpj: normalizedCnpj, deletedAt: null },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada ou foi excluída.`);
    }

    return company;
  }

  async searchByName(name: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const companies = await this.prisma.company.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.company.count({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
    });

    return {
      total,
      page,
      limit,
      companies,
    };
  }

  async updateByCnpj(cnpj: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const normalizedCnpj = cnpj.replace(/\D/g, '');

      const existingCompany = await this.prisma.company.findUnique({
        where: { cnpj: normalizedCnpj },
      });

      if (!existingCompany) {
        throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada.`);
      }

      if (updateCompanyDto.cnpj) {
        updateCompanyDto.cnpj = updateCompanyDto.cnpj.replace(/\D/g, '');

        const existingCnpj = await this.prisma.company.findUnique({
          where: { cnpj: updateCompanyDto.cnpj },
        });

        if (existingCnpj && existingCnpj.id !== existingCompany.id) {
          throw new ConflictException('CNPJ já cadastrado para outra empresa.');
        }
      }

      return await this.prisma.company.update({
        where: { id: existingCompany.id },
        data: updateCompanyDto,
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

  async softDelete(cnpj: string): Promise<void> {
    const normalizedCnpj = cnpj.replace(/\D/g, '');

    const existingCompany = await this.prisma.company.findUnique({
      where: { cnpj: normalizedCnpj, deletedAt: null },
    });

    if (!existingCompany) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada ou já excluída.`);
    }

    await this.prisma.company.update({
      where: { id: existingCompany.id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(cnpj: string) {
    const normalizedCnpj = cnpj.replace(/\D/g, '');

    const company = await this.prisma.company.findUnique({
      where: { cnpj: normalizedCnpj },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada.`);
    }

    if (!company.deletedAt) {
      throw new ConflictException(`Empresa com CNPJ ${cnpj} já está ativa.`);
    }

    await this.prisma.company.update({
      where: { id: company.id },
      data: { deletedAt: null },
    });

    return { message: 'Empresa restaurada com sucesso' };
  }

  async findAllDeleted(page: number, limit: number, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    const skip = page > 0 && limit > 0 ? (page - 1) * limit : 0;
    const take = limit > 0 ? limit : undefined;

    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    const companies = await this.prisma.company.findMany({
      where: { deletedAt: { not: null } },
      skip: take ? skip : undefined,
      take: take,
      orderBy: orderBy,
    });

    const totalCompanies = await this.prisma.company.count({
      where: { deletedAt: { not: null } },
    });

    return {
      total: totalCompanies,
      page,
      limit,
      companies,
    };
  }

  async findOneByCnpjDeleted(cnpj: string) {
    const normalizedCnpj = cnpj.replace(/\D/g, '');

    const company = await this.prisma.company.findUnique({
      where: { cnpj: normalizedCnpj, deletedAt: { not: null } },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada ou não está deletada.`);
    }

    return company;
  }
}
