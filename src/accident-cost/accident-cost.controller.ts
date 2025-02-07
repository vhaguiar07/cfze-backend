import { Controller, Post, Patch, Get, Param, Body, Query } from '@nestjs/common';
import { AccidentCostService } from './accident-cost.service';
import { CreateAccidentCostDto } from '../dto/accident-cost/create-accident-cost.dto';
import { UpdateAccidentCostDto } from '../dto/accident-cost/update-accident-cost.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Custo do Acidente')
@Controller('accident-cost')
export class AccidentCostController {
  constructor(private readonly accidentCostService: AccidentCostService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cadastra um novo controle de custo de acidente' })
  @ApiBody({
    description: 'Dados para cadastrar um controle de custo do acidente',
    schema: {
      example: {
        "accidentId": "1a1035da-6400-44d9-bcae-2ad0cd11ad9a",
        "employeeId": "e996b30f-5b02-4664-9c3c-ece22dc48a91",
        "accidentsWithLeave": true,
        "leaveStartDate": "2024-02-08T00:00:00.000Z",
        "medicationCost": 150.50,
        "foodCost": 80.00,
        "materialCost": 200.00,
        "legalCost": 500.00,
        "totalCost": 930.50,
        "comments": "Funcionário em recuperação."
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Controle de custo cadastrado com sucesso',
    schema: {
      example: {
        "id": "3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a",
        "employeeId": "e996b30f-5b02-4664-9c3c-ece22dc48a91",
        "accidentDate": "2024-02-07T12:00:00.000Z",
        "sex": "Masculino",
        "accidentsWithLeave": true,
        "leaveStartDate": "2024-02-08T00:00:00.000Z",
        "daysAway": 5,
        "hoursAway": 40,
        "medicationCost": 150.50,
        "foodCost": 80.00,
        "materialCost": 200.00,
        "legalCost": 500.00,
        "totalCost": 930.50,
        "comments": "Funcionário em recuperação.",
        "createdAt": "2024-02-07T12:30:00.000Z",
        "updatedAt": "2024-02-07T12:30:00.000Z"
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    schema: {
      example: {
        "statusCode": 400,
        "message": ["employeeId must be a UUID", "medicationCost must be a number"],
        "error": "Bad Request"
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Funcionário não encontrado",
        "error": "Not Found"
      }
    }
  })
  async create(@Body() dto: CreateAccidentCostDto) {
    return this.accidentCostService.create(dto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza informações do custo do acidente' })
  @ApiParam({ name: 'id', required: true, description: 'ID do custo do acidente', example: '3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a' })
  @ApiBody({
    description: 'Dados para atualizar um controle de custo do acidente',
    schema: {
      example: {
        "medicationCost": 180.00,
        "foodCost": 100.00,
        "comments": "Custo atualizado após novos exames."
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Custo do acidente atualizado com sucesso',
    schema: {
      example: {
        "id": "3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a",
        "medicationCost": 180.00,
        "foodCost": 100.00,
        "materialCost": 200.00,
        "legalCost": 500.00,
        "totalCost": 980.00,
        "comments": "Custo atualizado após novos exames.",
        "createdAt": "2024-02-07T12:30:00.000Z",
        "updatedAt": "2024-02-08T14:15:00.000Z"
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Custo do acidente não encontrado',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Custo do acidente não encontrado.",
        "error": "Not Found"
      }
    }
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAccidentCostDto) {
    return this.accidentCostService.update(id, dto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todos os custos de acidentes com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: createdAt, totalCost)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiResponse({
    status: 200,
    description: 'Lista de custos de acidentes recuperada com sucesso',
    schema: {
      example: {
        total: 1,
        page: 1,
        limit: 10,
        accidentCosts: [
          {
            id: '3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a',
            accidentId: '1a1035da-6400-44d9-bcae-2ad0cd11ad9a',
            medicationCost: 180.00,
            foodCost: 100.00,
            materialCost: 200.00,
            legalCost: 500.00,
            totalCost: 980.00,
            comments: "Custo atualizado após novos exames.",
            createdAt: '2024-02-07T12:30:00.000Z',
            updatedAt: '2024-02-08T14:15:00.000Z',
            accident: {
              accidentNumber: 'CAT12345',
              accidentDate: '2024-02-07T12:00:00.000Z',
              accidentType: 'Queda',
              employee: {
                fullName: 'John Doe',
                department: 'Produção'
              }
            }
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

    const { total, accidentCosts } = await this.accidentCostService.findAll(
      currentPage,
      currentLimit,
      currentSortBy,
      currentSortOrder
    );

    return {
      total,
      page: currentPage,
      limit: currentLimit,
      accidentCosts,
    };
  }
}
