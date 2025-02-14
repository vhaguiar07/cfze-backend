import { Body, Controller, Get, Post, Patch, Query, Param } from '@nestjs/common';
import { ApiQuery, ApiOkResponse, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { EmployeeAttendanceService } from './employee-attendance.service';
import { CreateEmployeeAttendanceDto } from '../dto/employee-attendance/create-employee-attendance.dto';
import { UpdateEmployeeAttendanceDto } from '../dto/employee-attendance/update-employee-attendance.dto';

@ApiTags('Controle de Falta')
@Controller('employee-attendance')
export class EmployeeAttendanceController {
  constructor(private readonly employeeAttendanceService: EmployeeAttendanceService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cadastra o controle de faltas e dias trabalhados do funcionário' })
  @ApiBody({
    description: 'Dados para cadastrar o controle de faltas',
    schema: {
      example: {
        "employeeCpf": "12345678900",
        "companyCnpj": "12345678000199",
        "area": "TI",
        "jobTitle": "Desenvolvedor",
        "referencePeriod": "Janeiro/2025",
        "absenceDescription": "Falta Justificada",
        "situation": "Atestado Médico",
        "workDays": 26,
        "absences": 1,
        "medicalLeaveDays": 2,
        "extraDays": 3,
        "justifiedAbsenceDays": 1,
        "workedDays": 22,
        "date": "2025-01-31T00:00:00.000Z",
        "comments": "Faltou por motivos de saúde"
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Registro de faltas criado com sucesso',
    schema: {
      example: {
        "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
        "employeeCpf": "12345678900",
        "companyCnpj": "12345678000199",
        "area": "TI",
        "jobTitle": "Desenvolvedor",
        "referencePeriod": "Janeiro/2025",
        "absenceDescription": "Falta Justificada",
        "situation": "Atestado Médico",
        "workDays": 26,
        "absences": 1,
        "medicalLeaveDays": 2,
        "extraDays": 3,
        "justifiedAbsenceDays": 1,
        "workedDays": 22,
        "date": "2025-01-31T00:00:00.000Z",
        "comments": "Faltou por motivos de saúde",
        "createdAt": "2025-02-14T12:30:00.000Z",
        "updatedAt": "2025-02-14T12:30:00.000Z"
      }
    }
  })
  async create(@Body() createEmployeeAttendanceDto: CreateEmployeeAttendanceDto) {
    return this.employeeAttendanceService.create(createEmployeeAttendanceDto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todos os registros de faltas com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: referencePeriod, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de registros de faltas recuperada com sucesso',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        attendanceRecords: [
          {
            id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
            employeeCpf: "12345678900",
            companyCnpj: "12345678000199",
            area: "TI",
            jobTitle: "Desenvolvedor",
            referencePeriod: "Janeiro/2025",
            absenceDescription: "Falta Justificada",
            situation: "Atestado Médico",
            workDays: 26,
            absences: 1,
            medicalLeaveDays: 2,
            extraDays: 3,
            justifiedAbsenceDays: 1,
            workedDays: 22,
            date: "2025-01-31T00:00:00.000Z",
            comments: "Faltou por motivos de saúde",
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

    return await this.employeeAttendanceService.findAll(
      currentPage,
      currentLimit,
      currentSortBy,
      currentSortOrder
    );
  }

  @Get('listOne/:id')
  @ApiOperation({ summary: 'Obtém um registro de faltas pelo ID', description: 'Retorna os dados completos de um registro de faltas específico pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do registro de faltas', example: 'f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d' })
  @ApiOkResponse({
    description: 'Registro de faltas encontrado com sucesso',
    schema: {
      example: {
        id: "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        employeeCpf: "12345678900",
        companyCnpj: "12345678000199",
        area: "TI",
        jobTitle: "Desenvolvedor",
        referencePeriod: "Janeiro/2025",
        absenceDescription: "Falta Justificada",
        situation: "Atestado Médico",
        workDays: 26,
        absences: 1,
        medicalLeaveDays: 2,
        extraDays: 3,
        justifiedAbsenceDays: 1,
        workedDays: 22,
        date: "2025-01-31T00:00:00.000Z",
        comments: "Faltou por motivos de saúde",
        createdAt: "2025-02-14T12:30:00.000Z",
        updatedAt: "2025-02-14T12:30:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Registro de faltas não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.employeeAttendanceService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza informações de um registro de faltas', description: 'Atualiza os dados de um registro de faltas existente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do registro de faltas', example: 'f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d' })
  @ApiBody({
    description: 'Dados para atualizar um registro de faltas',
    schema: {
      example: {
        "referencePeriod": "Fevereiro/2025",
        "area": "TI",
        "jobTitle": "Desenvolvedor Sênior",
        "absenceDescription": "Falta Injustificada",
        "situation": "Sem justificativa",
        "workDays": 22,
        "absences": 3,
        "medicalLeaveDays": 1,
        "extraDays": 2,
        "justifiedAbsenceDays": 1,
        "workedDays": 20,
        "comments": "Atualização da situação de faltas"
      }
    }
  })
  @ApiOkResponse({
    description: 'Registro de faltas atualizado com sucesso',
    schema: {
      example: {
        "id": "f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d",
        "employeeCpf": "12345678900",
        "companyCnpj": "12345678000199",
        "referencePeriod": "Fevereiro/2025",
        "area": "TI",
        "jobTitle": "Desenvolvedor Sênior",
        "absenceDescription": "Falta Injustificada",
        "situation": "Sem justificativa",
        "workDays": 22,
        "absences": 3,
        "medicalLeaveDays": 1,
        "extraDays": 2,
        "justifiedAbsenceDays": 1,
        "workedDays": 20,
        "comments": "Atualização da situação de faltas",
        "createdAt": "2025-02-14T12:30:00.000Z",
        "updatedAt": "2025-02-14T14:30:00.000Z"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Registro de faltas não encontrado',
    schema: {
      example: {
        "statusCode": 404,
        "message": "Registro de faltas com ID f9c21c3e-8b4f-4569-98a9-63a0b0c5a93d não encontrado",
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
        "message": ["workDays must be an integer", "absences must be a positive number"],
        "error": "Bad Request"
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateEmployeeAttendanceDto: UpdateEmployeeAttendanceDto) {
    return await this.employeeAttendanceService.update(id, updateEmployeeAttendanceDto);
  }
}
