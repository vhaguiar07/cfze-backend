import { Controller, Post, Body, Get, Patch, Delete, Param, Query, NotFoundException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { UpdateCompanyDto } from '../dto/company/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Empresa')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cadastra uma nova empresa (somente números, ou com formatação, serão armazenado somente os números)' })
  @ApiBody({
    description: 'Dados para cadastrar uma empresa',
    schema: {
      example: {
        "name": "Empresa XYZ",
        "cnpj": "12.345.678/0001-99"
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Empresa cadastrada com sucesso',
    schema: {
      example: {
        "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
        "name": "Empresa XYZ",
        "cnpj": "12.345.678/0001-99",
        "createdAt": "2024-02-14T12:30:00.000Z",
        "updatedAt": "2024-02-14T12:30:00.000Z"
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    schema: {
      example: {
        "statusCode": 400,
        "message": ["cnpj must be a valid format"],
        "error": "Bad Request"
      }
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Empresa com CNPJ já cadastrado',
    schema: {
      example: {
        "statusCode": 409,
        "message": "CNPJ já cadastrado",
        "error": "Conflict"
      }
    }
  })
  async create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todas as empresas com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: name, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de empresas recuperada com sucesso',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        companies: [
          {
            id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
            name: 'Empresa XYZ',
            cnpj: '12.345.678/0001-99',
            createdAt: '2024-02-14T12:30:00.000Z',
            updatedAt: '2024-02-14T12:30:00.000Z'
          },
          {
            id: 'b2c3d4e5-f6a1-7890-1234-56789abcdef1',
            name: 'Empresa ABC',
            cnpj: '98.765.432/0001-11',
            createdAt: '2024-01-10T10:00:00.000Z',
            updatedAt: '2024-01-10T10:00:00.000Z'
          }
        ]
      }
    }
  })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;
    const currentSortBy = sortBy || 'createdAt';
    const currentSortOrder = sortOrder || 'desc';
  
    const { total, companies } = await this.companyService.findAll(
      currentPage, 
      currentLimit, 
      currentSortBy, 
      currentSortOrder
    );
  
    return {
      total,
      page: currentPage,
      limit: currentLimit,
      companies,
    };
  }

  @Get('listOne/:cnpj')
  @ApiOperation({ summary: 'Obtém uma empresa pelo CNPJ (somente números)', description: 'Retorna os dados completos de uma empresa específica pelo CNPJ' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ da empresa', example: '12.345.678/0001-99' })
  @ApiOkResponse({
    description: 'Empresa encontrada com sucesso',
    schema: {
      example: {
        id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        name: 'Empresa XYZ',
        cnpj: '12.345.678/0001-99',
        createdAt: '2024-02-14T12:30:00.000Z',
        updatedAt: '2024-02-14T12:30:00.000Z'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  async findOne(@Param('cnpj') cnpj: string) {
    const company = await this.companyService.findOneByCnpj(cnpj);
    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada`);
    }
    return company;
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca empresas pelo nome com paginação', description: 'Retorna empresas cujo nome contém o valor pesquisado, com paginação' })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Nome (ou parte) da empresa a ser pesquisada',
    type: String,
    example: 'Empresa XYZ',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (padrão 1)',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de itens por página (padrão 10)',
    type: Number,
    example: 10,
  })
  @ApiOkResponse({
    description: 'Lista de empresas encontradas',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        companies: [
          {
            id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
            name: 'Empresa XYZ',
            cnpj: '12.345.678/0001-99',
            createdAt: '2024-02-14T12:30:00.000Z',
            updatedAt: '2024-02-14T12:30:00.000Z',
          },
          {
            id: 'b2c3d4e5-f6a1-7890-1234-56789abcdef1',
            name: 'Empresa ABC',
            cnpj: '98.765.432/0001-11',
            createdAt: '2024-01-10T10:00:00.000Z',
            updatedAt: '2024-01-10T10:00:00.000Z',
          }
        ],
      },
    },
  })
  async searchCompanies(
    @Query('name') name: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;

    return await this.companyService.searchByName(name, currentPage, currentLimit);
  }

  @Patch('update/:cnpj')
  @ApiOperation({ summary: 'Atualiza informações de uma empresa', description: 'Atualiza os dados de uma empresa existente pelo CNPJ' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ da empresa', example: '12.345.678/0001-99' })
  @ApiBody({
    description: 'Dados para atualizar uma empresa',
    schema: {
      example: {
        "name": "Empresa XYZ Atualizada",
        "cnpj": "98.765.432/0001-11"
      }
    }
  })
  @ApiOkResponse({
    description: 'Empresa atualizada com sucesso',
    schema: {
      example: {
        "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
        "name": "Empresa XYZ Atualizada",
        "cnpj": "98.765.432/0001-11",
        "createdAt": "2024-02-14T12:30:00.000Z",
        "updatedAt": "2024-02-14T13:45:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Empresa com CNPJ 12.345.678/0001-99 não encontrada",
        "error": "Not Found"
      }
    }
  })
  @ApiResponse({
    status: 409,
    description: 'CNPJ já cadastrado para outra empresa',
    schema: {
      example: {
        "statusCode": 409,
        "message": "CNPJ já cadastrado",
        "error": "Conflict"
      }
    }
  })
  async update(
    @Param('cnpj') cnpj: string, 
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companyService.updateByCnpj(cnpj, updateCompanyDto);
  }

  @Delete('delete/:cnpj')
  @ApiOperation({ summary: 'Deleta uma empresa (soft delete)', description: 'Marca a empresa como excluída sem removê-la do banco' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ da empresa a ser deletada', example: '12.345.678/0001-99' })
  @ApiOkResponse({
    description: 'Empresa marcada como deletada com sucesso',
    schema: {
      example: {
        message: 'Empresa deletada com sucesso',
      },
    },
  })
  async softDelete(@Param('cnpj') cnpj: string) {
    await this.companyService.softDelete(cnpj);
    return { message: 'Empresa deletada com sucesso' };
  }

  @Patch('restore/:cnpj')
  @ApiOperation({ summary: 'Restaura uma empresa deletada', description: 'Remove a marcação de exclusão da empresa' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ da empresa a ser restaurada', example: '12.345.678/0001-99' })
  @ApiOkResponse({
    description: 'Empresa restaurada com sucesso',
    schema: {
      example: {
        message: 'Empresa restaurada com sucesso',
      },
    },
  })
  async restore(@Param('cnpj') cnpj: string) {
    return this.companyService.restore(cnpj);
  }

  @Get('listAllDeleted')
  @ApiOperation({ summary: 'Lista todas as empresas deletadas com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: name, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de empresas recuperada com sucesso',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        companies: [
          {
            id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
            name: 'Empresa XYZ',
            cnpj: '12.345.678/0001-99',
            createdAt: '2024-02-14T12:30:00.000Z',
            updatedAt: '2024-02-14T12:30:00.000Z'
          },
          {
            id: 'b2c3d4e5-f6a1-7890-1234-56789abcdef1',
            name: 'Empresa ABC',
            cnpj: '98.765.432/0001-11',
            createdAt: '2024-01-10T10:00:00.000Z',
            updatedAt: '2024-01-10T10:00:00.000Z'
          }
        ]
      }
    }
  })
  async findAllDeleted(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;
    const currentSortBy = sortBy || 'createdAt';
    const currentSortOrder = sortOrder || 'desc';
  
    const { total, companies } = await this.companyService.findAllDeleted(
      currentPage, 
      currentLimit, 
      currentSortBy, 
      currentSortOrder
    );
  
    return {
      total,
      page: currentPage,
      limit: currentLimit,
      companies,
    };
  }

  @Get('listOneDeleted/:cnpj')
  @ApiOperation({ summary: 'Obtém uma empresa deletada pelo CNPJ (somente números)', description: 'Retorna os dados completos de uma empresa específica pelo CNPJ' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ da empresa', example: '12.345.678/0001-99' })
  @ApiOkResponse({
    description: 'Empresa encontrada com sucesso',
    schema: {
      example: {
        id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        name: 'Empresa XYZ',
        cnpj: '12.345.678/0001-99',
        createdAt: '2024-02-14T12:30:00.000Z',
        updatedAt: '2024-02-14T12:30:00.000Z'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  async findOneDeleted(@Param('cnpj') cnpj: string) {
    const company = await this.companyService.findOneByCnpjDeleted(cnpj);
    if (!company) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada`);
    }
    return company;
  }
}
