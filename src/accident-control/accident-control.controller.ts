import { Controller, Post, Body, Get, Patch, Param, Query } from '@nestjs/common';
import { AccidentControlService } from './accident-control.service';
import { CreateAccidentControlDto } from '../dto/accident-control/create-accident-control.dto';
import { UpdateAccidentControlDto } from '../dto/accident-control/update-accident-control.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Acidente')
@Controller('accident-control')
export class AccidentControlController {
  constructor(private readonly accidentControlService: AccidentControlService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cadastra um novo acidente' })
  @ApiBody({
    description: 'Dados para cadastrar um acidente',
    schema: {
      example: {
        "employeeId": "e996b30f-5b02-4664-9c3c-ece22dc48a91",
        "accidentNumber": "CAT12345",
        "accidentDate": "2024-02-07T12:00:00.000Z",
        "accidentType": "Queda",
        "accidentDescription": "O funcionário escorregou e caiu.",
        "accidentsWithLeave": true,
        "bodyPartAffected": "Perna",
        "injurySeverity": "Moderada",
        "accidentOrIncident": "Acidente",
        "medicalCertificates": 2,
        "daysAway": 5,
        "comments": "Uso de muletas recomendado"
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Acidente cadastrado com sucesso',
    schema: {
      example: {
        "id": "3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a",
        "employeeId": "e996b30f-5b02-4664-9c3c-ece22dc48a91",
        "accidentNumber": "CAT12345",
        "accidentDate": "2024-02-07T12:00:00.000Z",
        "birthDate": "1990-05-10T00:00:00.000Z",
        "sex": "Masculino",
        "jobTitle": "Operador de Máquinas",
        "accidentType": "Queda",
        "accidentDescription": "O funcionário escorregou e caiu.",
        "accidentsWithLeave": true,
        "bodyPartAffected": "Perna",
        "injurySeverity": "Moderada",
        "accidentOrIncident": "Acidente",
        "medicalCertificates": 2,
        "daysAway": 5,
        "comments": "Uso de muletas recomendado",
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
        "message": ["employeeId must be a UUID", "year must be an integer"],
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
  async create(@Body() dto: CreateAccidentControlDto) {
    return this.accidentControlService.create(dto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza informações de um acidente' })
  @ApiParam({ name: 'id', description: 'ID do acidente a ser atualizado', example: '3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a' })
  @ApiBody({
    description: 'Dados para atualizar um acidente',
    schema: {
      example: {
        "accidentType": "Queda de altura",
        "accidentDescription": "O funcionário escorregou e caiu de uma escada.",
        "accidentsWithLeave": true,
        "bodyPartAffected": "Braço",
        "injurySeverity": "Grave",
        "accidentOrIncident": "Acidente",
        "medicalCertificates": 3,
        "daysAway": 10,
        "comments": "Afastado para recuperação."
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Acidente atualizado com sucesso',
    schema: {
      example: {
        "id": "3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a",
        "accidentNumber": "CAT12345",
        "accidentDate": "2024-02-07T12:00:00.000Z",
        "accidentType": "Queda de altura",
        "accidentDescription": "O funcionário escorregou e caiu de uma escada.",
        "accidentsWithLeave": true,
        "bodyPartAffected": "Braço",
        "injurySeverity": "Grave",
        "accidentOrIncident": "Acidente",
        "medicalCertificates": 3,
        "daysAway": 10,
        "comments": "Afastado para recuperação.",
        "updatedAt": "2024-02-07T14:00:00.000Z"
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Acidente não encontrado',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Acidente não encontrado",
        "error": "Not Found"
      }
    }
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAccidentControlDto) {
    return this.accidentControlService.update(id, dto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todos os acidentes com seus custos (se existirem), paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: accidentDate, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de acidentes recuperada com sucesso',
    schema: {
      example: {
        total: 1,
        page: 1,
        limit: 10,
        accidents: [
          {
            id: '3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a',
            employeeId: '550e8400-e29b-41d4-a716-446655440000',
            accidentNumber: 'CAT12345',
            accidentDate: '2024-02-07T12:00:00.000Z',
            birthDate: '1990-05-10T00:00:00.000Z',
            sex: 'Masculino',
            month: 'Fevereiro',
            year: 2024,
            jobTitle: 'Operador de Máquinas',
            accidentType: 'Queda',
            accidentDescription: 'O funcionário escorregou e caiu.',
            accidentsWithLeave: true,
            bodyPartAffected: 'Perna',
            injurySeverity: 'Moderada',
            accidentOrIncident: 'Acidente',
            medicalCertificates: 2,
            daysAway: 5,
            comments: 'Uso de muletas recomendado',
            createdAt: '2024-02-07T12:30:00.000Z',
            updatedAt: '2024-02-07T12:30:00.000Z',
            employee: {
              fullName: 'John Doe',
              department: 'Produção',
            },
            accidentCost: {
              id: '8a2b4d1e-6500-4a12-91e6-98cbf4e7f6c2',
              medicationCost: 200.00,
              foodCost: 150.00,
              materialCost: 300.00,
              legalCost: 500.00,
              totalCost: 1150.00,
              comments: 'Custos adicionais com medicamentos.',
              createdAt: '2024-02-08T10:15:00.000Z',
              updatedAt: '2024-02-08T10:15:00.000Z'
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

    const { total, accidents } = await this.accidentControlService.findAll(
      currentPage,
      currentLimit,
      currentSortBy,
      currentSortOrder
    );

    return {
      total,
      page: currentPage,
      limit: currentLimit,
      accidents,
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca acidentes pelo nome do funcionário', description: 'Retorna acidentes associados a um funcionário específico, com paginação' })
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
    description: 'Lista de acidentes encontrados',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        accidents: [
          {
            id: '3f2a6d4b-9a5e-47c9-bf1f-832e2e5e7f2a',
            accidentNumber: 'CAT12345',
            accidentDate: '2024-02-07T12:00:00.000Z',
            employee: {
              fullName: 'John Doe',
            },
            jobTitle: 'Operador de Máquinas',
            accidentType: 'Queda',
            accidentDescription: 'O funcionário escorregou e caiu.',
            accidentsWithLeave: true,
            bodyPartAffected: 'Perna',
            injurySeverity: 'Moderada',
            accidentOrIncident: 'Acidente',
            medicalCertificates: 2,
            daysAway: 5,
            comments: 'Uso de muletas recomendado',
            createdAt: '2024-02-07T12:30:00.000Z',
            updatedAt: '2024-02-07T12:30:00.000Z',
          }
        ]
      }
    }
  })
  async searchAccidents(
    @Query('fullName') fullName: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;

    return await this.accidentControlService.searchByEmployeeName(fullName, currentPage, currentLimit);
  }
}
