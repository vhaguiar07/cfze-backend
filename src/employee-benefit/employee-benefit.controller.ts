import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiOkResponse, ApiQuery, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateEmployeeBenefitDto } from '../dto/employee-benefit/create-employee-benefit.dto';
import { UpdateEmployeeBenefitDto } from '../dto/employee-benefit/update-employee-benefit.dto';
import { EmployeeBenefitService } from './employee-benefit.service';

@ApiTags('Benefício')
@Controller('employee-benefit')
export class EmployeeBenefitController {
  constructor(private readonly employeeBenefitService: EmployeeBenefitService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cadastra um benefício para um funcionário' })
  @ApiBody({
    description: 'Dados para cadastrar um benefício',
    schema: {
      example: {
        "employeeCpf": "123.456.789-00",
        "companyCnpj": "12.345.678/0001-99",
        "benefit": "Vale Alimentação",
        "referencePeriod": "Fevereiro/2025",
        "type": "Alimentação",
        "area": "TI",
        "jobTitle": "Desenvolvedor",
        "mealVoucherPrice": 500,
        "workDays": 20,
        "extraDays": 2,
        "justifiedAbsenceDays": 1,
        "paidDays": 21,
        "totalPrice": 520,
        "comments": "Inclui dias extras"
      }
    }
  })
  @ApiOkResponse({
    description: 'Benefício cadastrado com sucesso',
    schema: {
      example: {
        "id": "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        "employeeCpf": "123.456.789-00",
        "companyCnpj": "12.345.678/0001-99",
        "benefit": "Vale Alimentação",
        "referencePeriod": "Fevereiro/2025",
        "type": "Alimentação",
        "area": "TI",
        "jobTitle": "Desenvolvedor",
        "mealVoucherPrice": 500,
        "workDays": 20,
        "extraDays": 2,
        "justifiedAbsenceDays": 1,
        "paidDays": 21,
        "totalPrice": 520,
        "comments": "Inclui dias extras",
        "createdAt": "2025-02-14T12:30:00.000Z",
        "updatedAt": "2025-02-14T12:30:00.000Z"
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário ou empresa não encontrada',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Funcionário ou empresa não encontrada",
        "error": "Not Found"
      }
    }
  })
  async create(@Body() createEmployeeBenefitDto: CreateEmployeeBenefitDto) {
    return this.employeeBenefitService.create(createEmployeeBenefitDto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todos os benefícios com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: referencePeriod, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de benefícios recuperada com sucesso',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        benefits: [
          {
            id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
            employeeCpf: "12345678900",
            companyCnpj: "12345678000199",
            benefit: "Vale Alimentação",
            referencePeriod: "Fevereiro/2025",
            type: "Alimentação",
            area: "TI",
            jobTitle: "Desenvolvedor",
            mealVoucherPrice: 500,
            workDays: 20,
            extraDays: 2,
            justifiedAbsenceDays: 1,
            paidDays: 21,
            totalPrice: 520,
            comments: "Inclui dias extras",
            createdAt: "2025-02-14T12:30:00.000Z",
            updatedAt: "2025-02-14T12:30:00.000Z"
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

    return await this.employeeBenefitService.findAll(
      currentPage,
      currentLimit,
      currentSortBy,
      currentSortOrder
    );
  }

  @Get('listOne/:id')
  @ApiOperation({ summary: 'Obtém um benefício pelo ID', description: 'Retorna os dados completos de um benefício específico pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do benefício', example: 'f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d' })
  @ApiOkResponse({
    description: 'Benefício encontrado com sucesso',
    schema: {
      example: {
        id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        employeeCpf: "12345678900",
        companyCnpj: "12345678000199",
        benefit: "Vale Alimentação",
        referencePeriod: "Fevereiro/2025",
        type: "Alimentação",
        area: "TI",
        jobTitle: "Desenvolvedor",
        mealVoucherPrice: 500,
        workDays: 20,
        extraDays: 2,
        justifiedAbsenceDays: 1,
        paidDays: 21,
        totalPrice: 520,
        comments: "Inclui dias extras",
        createdAt: "2025-02-14T12:30:00.000Z",
        updatedAt: "2025-02-14T12:30:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Benefício não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.employeeBenefitService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza informações de um benefício', description: 'Atualiza os dados de um benefício existente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do benefício', example: 'f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d' })
  @ApiBody({
    description: 'Dados para atualizar um benefício',
    schema: {
      example: {
        "benefit": "Vale Alimentação",
        "referencePeriod": "Março/2025",
        "type": "Alimentação",
        "area": "TI",
        "jobTitle": "Desenvolvedor Sênior",
        "mealVoucherPrice": 700,
        "workDays": 21,
        "extraDays": 2,
        "justifiedAbsenceDays": 0,
        "paidDays": 23,
        "totalPrice": 750,
        "comments": "Ajustado conforme nova política da empresa"
      }
    }
  })
  @ApiOkResponse({
    description: 'Benefício atualizado com sucesso',
    schema: {
      example: {
        "id": "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        "employeeCpf": "12345678900",
        "companyCnpj": "12345678000199",
        "benefit": "Vale Alimentação",
        "referencePeriod": "Março/2025",
        "type": "Alimentação",
        "area": "TI",
        "jobTitle": "Desenvolvedor Sênior",
        "mealVoucherPrice": 700,
        "workDays": 21,
        "extraDays": 2,
        "justifiedAbsenceDays": 0,
        "paidDays": 23,
        "totalPrice": 750,
        "comments": "Ajustado conforme nova política da empresa",
        "createdAt": "2025-02-14T12:30:00.000Z",
        "updatedAt": "2025-02-14T14:30:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Benefício não encontrado',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Benefício com ID f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d não encontrado",
        "error": "Not Found"
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    schema: {
      example: {
        "statusCode": 400,
        "message": ["mealVoucherPrice must be a positive number", "workDays must be an integer"],
        "error": "Bad Request"
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateEmployeeBenefitDto: UpdateEmployeeBenefitDto) {
    return await this.employeeBenefitService.update(id, updateEmployeeBenefitDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca benefícios pelo nome do funcionário', description: 'Retorna benefícios associados a um funcionário específico, com paginação' })
  @ApiQuery({
    name: 'fullName',
    required: true,
    description: 'Nome (ou parte) do funcionário a ser pesquisado',
    type: String,
    example: 'John Doe',
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
    description: 'Lista de benefícios encontrados',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        benefits: [
          {
            id: "675c002b-3f9d-4bd5-a2ac-7d74b886cf8c",
            employee: {
              fullName: "John Doe"
            },
            companyCnpj: "12345678000199",
            benefit: "Vale Alimentação",
            referencePeriod: "Fevereiro/2025",
            type: "Alimentação",
            area: "TI",
            jobTitle: "Desenvolvedor",
            mealVoucherPrice: 550,
            workDays: 22,
            extraDays: 0,
            justifiedAbsenceDays: 0,
            paidDays: 22,
            totalPrice: 600,
            comments: "",
            createdAt: "2025-02-14T12:30:00.000Z",
            updatedAt: "2025-02-14T12:30:00.000Z"
          }
        ]
      }
    }
  })
  async searchBenefits(
    @Query('fullName') fullName: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;

    return await this.employeeBenefitService.searchByEmployeeName(fullName, currentPage, currentLimit);
  }
}
