import { Body, Controller, Get, Patch, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiParam, ApiOkResponse, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateEmployeePPEDto } from '../dto/employee-ppe/create-employee-ppe.dto';
import { UpdateEmployeePPEDto } from '../dto/employee-ppe/update-employee-ppe.dto';
import { EmployeePPEService } from './employee-ppe.service';

@ApiTags('Controle de EPI')
@Controller('employee-ppe')
export class EmployeePPEController {
  constructor(private readonly employeePPEService: EmployeePPEService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cadastra um controle de EPI para um funcionário' })
  @ApiBody({
    description: 'Dados para cadastrar um controle de EPI',
    type: CreateEmployeePPEDto,
  })
  @ApiOkResponse({
    description: 'EPI cadastrado com sucesso',
    schema: {
      example: {
        id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        employeeId: "123e4567-e89b-12d3-a456-426614174000",
        ppeDescription: "Capacete de segurança",
        department: "Construção",
        referenceMonth: "Fevereiro",
        situation: "Aquisição",
        quantity: 1,
        reasonForReplacement: "Primeiro uso",
        comments: "Entregue em perfeitas condições",
        createdAt: "2025-02-14T12:30:00.000Z",
        updatedAt: "2025-02-14T12:30:00.000Z",
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: "Funcionário com CPF 123.456.789-00 não encontrado",
        error: "Not Found"
      }
    }
  })
  async create(@Body() createEmployeePPEDto: CreateEmployeePPEDto) {
    return this.employeePPEService.create(createEmployeePPEDto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todos os registros de EPI com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: referenceMonth, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de registros de EPI recuperada com sucesso',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        records: [
          {
            id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
            employeeCpf: "12345678900",
            ppeDescription: "Capacete de segurança",
            department: "Construção",
            referenceMonth: "Fevereiro",
            situation: "Aquisição",
            quantity: 1,
            reasonForReplacement: "Primeiro uso",
            comments: "Entregue em perfeitas condições",
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

    return await this.employeePPEService.findAll(
      currentPage,
      currentLimit,
      currentSortBy,
      currentSortOrder
    );
  }

  @Get('listOne/:id')
  @ApiOperation({ summary: 'Obtém um registro de EPI pelo ID', description: 'Retorna os dados completos de um registro de controle de EPI específico pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do registro de EPI', example: 'f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d' })
  @ApiOkResponse({
    description: 'Registro de EPI encontrado com sucesso',
    schema: {
      example: {
        id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        employeeCpf: "12345678900",
        ppeDescription: "Capacete de segurança",
        department: "Construção",
        referenceMonth: "Fevereiro",
        situation: "Aquisição",
        quantity: 1,
        reasonForReplacement: "Primeiro uso",
        comments: "Entregue em perfeitas condições",
        createdAt: "2025-02-14T12:30:00.000Z",
        updatedAt: "2025-02-14T12:30:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Registro de EPI não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.employeePPEService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza informações de um registro de EPI', description: 'Atualiza os dados de um registro existente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do registro de EPI', example: 'f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d' })
  @ApiBody({
    description: 'Dados para atualizar um registro de EPI',
    type: UpdateEmployeePPEDto,
  })
  @ApiOkResponse({
    description: 'Registro de EPI atualizado com sucesso',
    schema: {
      example: {
        id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        employeeCpf: "12345678900",
        ppeDescription: "Capacete de segurança",
        department: "Construção",
        referenceMonth: "Março",
        situation: "Troca do EPI",
        quantity: 2,
        reasonForReplacement: "Desgaste",
        comments: "EPI substituído por novo modelo",
        createdAt: "2025-02-14T12:30:00.000Z",
        updatedAt: "2025-02-14T14:30:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Registro de EPI não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  async update(@Param('id') id: string, @Body() updateDto: UpdateEmployeePPEDto) {
    return await this.employeePPEService.update(id, updateDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca registros de EPI pelo nome do funcionário', description: 'Retorna registros de EPI associados a um funcionário específico, com paginação' })
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
    description: 'Lista de registros de EPI encontrados',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        records: [
          {
            id: "675c002b-3f9d-4bd5-a2ac-7d74b886cf8c",
            employee: {
              fullName: "John Doe"
            },
            ppeDescription: "Capacete de segurança",
            department: "Construção",
            referenceMonth: "Fevereiro",
            situation: "Aquisição",
            quantity: 1,
            reasonForReplacement: "Primeiro uso",
            comments: "Entregue em perfeitas condições",
            createdAt: "2025-02-14T12:30:00.000Z",
            updatedAt: "2025-02-14T12:30:00.000Z"
          }
        ]
      }
    }
  })
  async searchPPERecords(
    @Query('fullName') fullName: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;

    return await this.employeePPEService.searchByEmployeeName(fullName, currentPage, currentLimit);
  }
}
