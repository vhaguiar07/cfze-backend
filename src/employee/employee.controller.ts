import { Body, Controller, Get, Param, Patch, Post, Delete, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiQuery, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria um novo funcionário', description: 'Cria um novo funcionário com todas as informações necessárias' })
  @ApiCreatedResponse({
    description: 'Funcionário criado com sucesso',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        fullName: 'John Doe',
        address: 'Rua dos Estudantes, 87',
        city: 'São Paulo',
        postalCode: '12345-678',
        phoneNumber: '(11) 98765-4321',
        nationality: 'Brasileiro',
        cpf: '123.456.789-00',
        rg: '12345678',
        rgIssueDate: '2022-01-01T00:00:00.000Z',
        rgIssuingAgency: 'SSP',
        rgState: 'SP',
        ctps: '999.999.999-9',
        pisPasep: '999.999.999',
        educationLevel: 'Superior Completo',
        voterRegistration: '999999999999',
        reservist: '9999999999-99999999-99',
        fatherName: 'John Father',
        motherName: 'John Mother',
        maritalStatus: 'Casado',
        birthDate: '1993-01-01T00:00:00.000Z',
        birthPlace: 'São Paulo',
        admissionDate: '2024-07-28T13:35:09.011Z',
        salary: 3500.00,
        jobTitle: 'Software Developer',
        monthlyWorkloadHours: 190,
        weeklyWorkloadHours: 44,
        dayOff: 'Domingo',
        transportDiscount: true,
        firstEntryWeekday: '08:00',
        firstExitWeekday: '12:00',
        secondEntryWeekday: '13:00',
        secondExitWeekday: '17:00',
        firstEntryWeekend: '10:00',
        firstExitWeekend: '12:00',
        secondEntryWeekend: '13:00',
        secondExitWeekend: '15:00',
        receivedPPE: true,
        pantsSize: '42',
        shirtSize: 'G',
        bootSize: '42',
        jacketSize: 'G',
        balaclavaSize: 'M',
        gogglesSize: 'M',
        glovesSize: 'M',
        ppeReceiptDate: '2024-01-15T00:00:00.000Z',
        tookVacation: true,
        vacationDate: '2023-12-01T00:00:00.000Z',
        terminationType: 'Fired',
        terminationDate: '2024-01-01T00:00:00.000Z',
        receivedIndemnity: true,
        indemnityDate: '2024-02-01T00:00:00.000Z',
        indemnityValue: 5000.00,
        admissionInterview: true,
        exitInterview: true,
        admissionAsoDates: ['2024-01-01T00:00:00.000Z'],
        periodicAsoDates: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'],
        dismissalAsoDates: ['2024-06-01T00:00:00.000Z'],
        paternityLeaveDates: ['2024-05-01T00:00:00.000Z'],
        maternityLeaveDates: ['2024-08-01T00:00:00.000Z'],
        electoralLeaveDates: ['2024-11-01T00:00:00.000Z'],
        sufferedAccident: true,
        leaveOfAbsenceDates: ['2024-07-01T00:00:00.000Z'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      },
    },
  })
  @ApiBody({
    description: 'Dados necessários para criar um funcionário',
    type: CreateEmployeeDto,
    examples: {
      example1: {
        summary: 'Exemplo de funcionário',
        value: {
          fullName: 'John Doe',
          address: 'Rua dos Estudantes, 87',
          city: 'São Paulo',
          postalCode: '12345-678',
          phoneNumber: '(11) 98765-4321',
          nationality: 'Brasileiro',
          cpf: '123.456.789-00',
          rg: '12345678',
          rgIssueDate: '2022-01-01T00:00:00.000Z',
          rgIssuingAgency: 'SSP',
          rgState: 'SP',
          ctps: '999.999.999-9',
          pisPasep: '999.999.999',
          educationLevel: 'Superior Completo',
          voterRegistration: '999999999999',
          reservist: '9999999999-99999999-99',
          fatherName: 'John Father',
          motherName: 'John Mother',
          maritalStatus: 'Casado',
          birthDate: '1993-01-01T00:00:00.000Z',
          birthPlace: 'São Paulo',
          admissionDate: '2024-07-28T13:35:09.011Z',
          salary: 3500.00,
          jobTitle: 'Software Developer',
          monthlyWorkloadHours: 190,
          weeklyWorkloadHours: 44,
          dayOff: 'Domingo',
          transportDiscount: true,
          firstEntryWeekday: '08:00',
          firstExitWeekday: '12:00',
          secondEntryWeekday: '13:00',
          secondExitWeekday: '17:00',
          firstEntryWeekend: '10:00',
          firstExitWeekend: '12:00',
          secondEntryWeekend: '13:00',
          secondExitWeekend: '15:00',
          receivedPPE: true,
          pantsSize: '42',
          shirtSize: 'G',
          bootSize: '42',
          jacketSize: 'G',
          balaclavaSize: 'M',
          gogglesSize: 'M',
          glovesSize: 'M',
          ppeReceiptDate: '2024-01-15T00:00:00.000Z',
          tookVacation: true,
          vacationDate: '2023-12-01T00:00:00.000Z',
          terminationType: 'Fired',
          terminationDate: '2024-01-01T00:00:00.000Z',
          receivedIndemnity: true,
          indemnityDate: '2024-02-01T00:00:00.000Z',
          indemnityValue: 5000.00,
          admissionInterview: true,
          exitInterview: true,
          admissionAsoDates: ['2024-01-01T00:00:00.000Z'],
          periodicAsoDates: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'],
          dismissalAsoDates: ['2024-06-01T00:00:00.000Z'],
          paternityLeaveDates: ['2024-05-01T00:00:00.000Z'],
          maternityLeaveDates: ['2024-08-01T00:00:00.000Z'],
          electoralLeaveDates: ['2024-11-01T00:00:00.000Z'],
          sufferedAccident: true,
          leaveOfAbsenceDates: ['2024-07-01T00:00:00.000Z']
        },
      },
    },
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Lista todos os funcionários com paginação e ordenação opcionais' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (padrão 1)', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página (padrão 10)', type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação (ex: fullName, createdAt)', type: String, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordem da ordenação (asc ou desc)', type: String, example: 'desc' })
  @ApiOkResponse({
    description: 'Lista de funcionários recuperada com sucesso',
    schema: {
      example: {
        total: 1,
        page: 1,
        limit: 10,
        employees: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            fullName: 'John Doe',
            address: 'Rua dos Estudantes, 87',
            city: 'São Paulo',
            postalCode: '12345-678',
            phoneNumber: '(11) 98765-4321',
            nationality: 'Brasileiro',
            cpf: '123.456.789-00',
            rg: '12345678',
            rgIssueDate: '2022-01-01T00:00:00.000Z',
            rgIssuingAgency: 'SSP',
            rgState: 'SP',
            ctps: '999.999.999-9',
            pisPasep: '999.999.999',
            educationLevel: 'Superior Completo',
            voterRegistration: '999999999999',
            reservist: '9999999999-99999999-99',
            fatherName: 'John Father',
            motherName: 'John Mother',
            maritalStatus: 'Casado',
            birthDate: '1993-01-01T00:00:00.000Z',
            birthPlace: 'São Paulo',
            admissionDate: '2024-07-28T13:35:09.011Z',
            salary: 3500.00,
            jobTitle: 'Software Developer',
            monthlyWorkloadHours: 190,
            weeklyWorkloadHours: 44,
            dayOff: 'Domingo',
            transportDiscount: true,
            firstEntryWeekday: '08:00',
            firstExitWeekday: '12:00',
            secondEntryWeekday: '13:00',
            secondExitWeekday: '17:00',
            firstEntryWeekend: '10:00',
            firstExitWeekend: '12:00',
            secondEntryWeekend: '13:00',
            secondExitWeekend: '15:00',
            receivedPPE: true,
            pantsSize: '42',
            shirtSize: 'G',
            bootSize: '42',
            jacketSize: 'G',
            balaclavaSize: 'M',
            gogglesSize: 'M',
            glovesSize: 'M',
            ppeReceiptDate: '2024-01-15T00:00:00.000Z',
            tookVacation: true,
            vacationDate: '2023-12-01T00:00:00.000Z',
            terminationType: 'Fired',
            terminationDate: '2024-01-01T00:00:00.000Z',
            receivedIndemnity: true,
            indemnityDate: '2024-02-01T00:00:00.000Z',
            indemnityValue: 5000.00,
            admissionInterview: true,
            exitInterview: true,
            admissionAsoDates: ['2024-01-01T00:00:00.000Z'],
            periodicAsoDates: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'],
            dismissalAsoDates: ['2024-06-01T00:00:00.000Z'],
            paternityLeaveDates: ['2024-05-01T00:00:00.000Z'],
            maternityLeaveDates: ['2024-08-01T00:00:00.000Z'],
            electoralLeaveDates: ['2024-11-01T00:00:00.000Z'],
            sufferedAccident: true,
            leaveOfAbsenceDates: ['2024-07-01T00:00:00.000Z'],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
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

    const { total, employees } = await this.employeeService.findAll(
      currentPage, 
      currentLimit, 
      currentSortBy, 
      currentSortOrder
    );

    return {
      total,
      page: currentPage,
      limit: currentLimit,
      employees,
    };
  }  

  @Get('listOne/:id')
  @ApiOperation({ summary: 'Obtém um funcionário pelo ID', description: 'Retorna os dados completos de um funcionário específico pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({
    description: 'Funcionário encontrado com sucesso',
    schema: {
      example:           {
        id: '550e8400-e29b-41d4-a716-446655440000',
        fullName: 'John Doe',
        address: 'Rua dos Estudantes, 87',
        city: 'São Paulo',
        postalCode: '12345-678',
        phoneNumber: '(11) 98765-4321',
        nationality: 'Brasileiro',
        cpf: '123.456.789-00',
        rg: '12345678',
        rgIssueDate: '2022-01-01T00:00:00.000Z',
        rgIssuingAgency: 'SSP',
        rgState: 'SP',
        ctps: '999.999.999-9',
        pisPasep: '999.999.999',
        educationLevel: 'Superior Completo',
        voterRegistration: '999999999999',
        reservist: '9999999999-99999999-99',
        fatherName: 'John Father',
        motherName: 'John Mother',
        maritalStatus: 'Casado',
        birthDate: '1993-01-01T00:00:00.000Z',
        birthPlace: 'São Paulo',
        admissionDate: '2024-07-28T13:35:09.011Z',
        salary: 3500.00,
        jobTitle: 'Software Developer',
        monthlyWorkloadHours: 190,
        weeklyWorkloadHours: 44,
        dayOff: 'Domingo',
        transportDiscount: true,
        firstEntryWeekday: '08:00',
        firstExitWeekday: '12:00',
        secondEntryWeekday: '13:00',
        secondExitWeekday: '17:00',
        firstEntryWeekend: '10:00',
        firstExitWeekend: '12:00',
        secondEntryWeekend: '13:00',
        secondExitWeekend: '15:00',
        receivedPPE: true,
        pantsSize: '42',
        shirtSize: 'G',
        bootSize: '42',
        jacketSize: 'G',
        balaclavaSize: 'M',
        gogglesSize: 'M',
        glovesSize: 'M',
        ppeReceiptDate: '2024-01-15T00:00:00.000Z',
        tookVacation: true,
        vacationDate: '2023-12-01T00:00:00.000Z',
        terminationType: 'Fired',
        terminationDate: '2024-01-01T00:00:00.000Z',
        receivedIndemnity: true,
        indemnityDate: '2024-02-01T00:00:00.000Z',
        indemnityValue: 5000.00,
        admissionInterview: true,
        exitInterview: true,
        admissionAsoDates: ['2024-01-01T00:00:00.000Z'],
        periodicAsoDates: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'],
        dismissalAsoDates: ['2024-06-01T00:00:00.000Z'],
        paternityLeaveDates: ['2024-05-01T00:00:00.000Z'],
        maternityLeaveDates: ['2024-08-01T00:00:00.000Z'],
        electoralLeaveDates: ['2024-11-01T00:00:00.000Z'],
        sufferedAccident: true,
        leaveOfAbsenceDates: ['2024-07-01T00:00:00.000Z'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Funcionário não encontrado' })
  async findOne(@Param('id') id: string) {
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return employee;
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca funcionários pelo nome com paginação', description: 'Retorna funcionários cujo nome contém o valor pesquisado, com paginação' })
  @ApiQuery({
    name: 'fullName',
    required: true,
    description: 'Nome (ou parte) do funcionário a ser pesquisado',
    type: String,
    example: 'John',
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
    description: 'Lista de funcionários encontrados',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        employees: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            fullName: 'John Doe',
            address: 'Rua dos Estudantes, 87',
            city: 'São Paulo',
            postalCode: '12345-678',
            phoneNumber: '(11) 98765-4321',
            nationality: 'Brasileiro',
            cpf: '123.456.789-00',
            rg: '12345678',
            rgIssueDate: '2022-01-01T00:00:00.000Z',
            rgIssuingAgency: 'SSP',
            rgState: 'SP',
            ctps: '999.999.999-9',
            pisPasep: '999.999.999',
            educationLevel: 'Superior Completo',
            voterRegistration: '999999999999',
            reservist: '9999999999-99999999-99',
            fatherName: 'John Father',
            motherName: 'John Mother',
            maritalStatus: 'Casado',
            birthDate: '1993-01-01T00:00:00.000Z',
            birthPlace: 'São Paulo',
            admissionDate: '2024-07-28T13:35:09.011Z',
            salary: 3500.00,
            jobTitle: 'Software Developer',
            monthlyWorkloadHours: 190,
            weeklyWorkloadHours: 44,
            dayOff: 'Domingo',
            transportDiscount: true,
            firstEntryWeekday: '08:00',
            firstExitWeekday: '12:00',
            secondEntryWeekday: '13:00',
            secondExitWeekday: '17:00',
            firstEntryWeekend: '10:00',
            firstExitWeekend: '12:00',
            secondEntryWeekend: '13:00',
            secondExitWeekend: '15:00',
            receivedPPE: true,
            pantsSize: '42',
            shirtSize: 'G',
            bootSize: '42',
            jacketSize: 'G',
            balaclavaSize: 'M',
            gogglesSize: 'M',
            glovesSize: 'M',
            ppeReceiptDate: '2024-01-15T00:00:00.000Z',
            tookVacation: true,
            vacationDate: '2023-12-01T00:00:00.000Z',
            terminationType: 'Fired',
            terminationDate: '2024-01-01T00:00:00.000Z',
            receivedIndemnity: true,
            indemnityDate: '2024-02-01T00:00:00.000Z',
            indemnityValue: 5000.00,
            admissionInterview: true,
            exitInterview: true,
            admissionAsoDates: ['2024-01-01T00:00:00.000Z'],
            periodicAsoDates: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'],
            dismissalAsoDates: ['2024-06-01T00:00:00.000Z'],
            paternityLeaveDates: ['2024-05-01T00:00:00.000Z'],
            maternityLeaveDates: ['2024-08-01T00:00:00.000Z'],
            electoralLeaveDates: ['2024-11-01T00:00:00.000Z'],
            sufferedAccident: true,
            leaveOfAbsenceDates: ['2024-07-01T00:00:00.000Z'],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  async searchEmployees(
    @Query('fullName') fullName: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const currentPage = page || 1;
    const currentLimit = limit ?? 10;

    return await this.employeeService.searchByFullName(fullName, currentPage, currentLimit);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza informações de um funcionário', description: 'Atualiza os dados de um funcionário existente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({
    description: 'Funcionário atualizado com sucesso',
    schema: {
      example: {
        fullName: 'John Doe',
        address: 'Rua dos Estudantes, 87',
        city: 'São Paulo',
        postalCode: '12345-678',
        phoneNumber: '(11) 98765-4321',
        nationality: 'Brasileiro',
        cpf: '123.456.789-00',
        rg: '12345678',
        rgIssueDate: '2022-01-01T00:00:00.000Z',
        rgIssuingAgency: 'SSP',
        rgState: 'SP',
        ctps: '999.999.999-9',
        pisPasep: '999.999.999',
        educationLevel: 'Superior Completo',
        voterRegistration: '999999999999',
        reservist: '9999999999-99999999-99',
        fatherName: 'John Father',
        motherName: 'John Mother',
        maritalStatus: 'Casado',
        birthDate: '1993-01-01T00:00:00.000Z',
        birthPlace: 'São Paulo',
        admissionDate: '2024-07-28T13:35:09.011Z',
        salary: 3500.00,
        jobTitle: 'Software Developer',
        monthlyWorkloadHours: 190,
        weeklyWorkloadHours: 44,
        dayOff: 'Domingo',
        transportDiscount: true,
        firstEntryWeekday: '08:00',
        firstExitWeekday: '12:00',
        secondEntryWeekday: '13:00',
        secondExitWeekday: '17:00',
        firstEntryWeekend: '10:00',
        firstExitWeekend: '12:00',
        secondEntryWeekend: '13:00',
        secondExitWeekend: '15:00',
        receivedPPE: true,
        pantsSize: '42',
        shirtSize: 'G',
        bootSize: '42',
        jacketSize: 'G',
        balaclavaSize: 'M',
        gogglesSize: 'M',
        glovesSize: 'M',
        ppeReceiptDate: '2024-01-15T00:00:00.000Z',
        tookVacation: true,
        vacationDate: '2023-12-01T00:00:00.000Z',
        terminationType: 'Fired',
        terminationDate: '2024-01-01T00:00:00.000Z',
        receivedIndemnity: true,
        indemnityDate: '2024-02-01T00:00:00.000Z',
        indemnityValue: 5000.00,
        admissionInterview: true,
        exitInterview: true,
        admissionAsoDates: ['2024-01-01T00:00:00.000Z'],
        periodicAsoDates: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'],
        dismissalAsoDates: ['2024-06-01T00:00:00.000Z'],
        paternityLeaveDates: ['2024-05-01T00:00:00.000Z'],
        maternityLeaveDates: ['2024-08-01T00:00:00.000Z'],
        electoralLeaveDates: ['2024-11-01T00:00:00.000Z'],
        sufferedAccident: true,
        leaveOfAbsenceDates: ['2024-07-01T00:00:00.000Z']
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deleta um funcionário (soft delete)', description: 'Marca o funcionário como excluído sem removê-lo do banco' })
  @ApiParam({ name: 'id', description: 'ID do funcionário a ser deletado', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({
    description: 'Funcionário marcado como deletado com sucesso',
    schema: {
      example: {
        message: 'Funcionário deletado com sucesso',
      },
    },
  })
  async softDelete(@Param('id') id: string) {
    const deleted = await this.employeeService.softDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }
    return { message: 'Funcionário deletado com sucesso' };
  }

  @Patch('restore/:id')
  @ApiOperation({ summary: 'Restaura um funcionário deletado', description: 'Remove a marcação de exclusão do funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiOkResponse({
    description: 'Funcionário restaurado com sucesso',
    schema: {
      example: {
        message: 'Funcionário restaurado com sucesso',
      },
    },
  })
  async restore(@Param('id') id: string) {
    return this.employeeService.restore(id);
  }
}
