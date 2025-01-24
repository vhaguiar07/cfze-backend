import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsDate, IsOptional, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'O campo Nome Completo é obrigatório' })
  fullName: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty({ message: 'O campo Endereço é obrigatório' })
  address: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty({ message: 'O campo Cidade é obrigatório' })
  city: string;

  @ApiProperty({ example: '12345-678' })
  @IsString()
  @IsNotEmpty({ message: 'O campo CEP é obrigatório' })
  postalCode: string;

  @ApiProperty({ example: '+5511987654321' })
  @IsString()
  @IsNotEmpty({ message: 'O campo Celular é obrigatório' })
  phoneNumber: string;

  @ApiProperty({ example: 'Brazilian' })
  @IsString()
  @IsNotEmpty({ message: 'O campo Nacionalidade é obrigatório' })
  nationality: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  cpf: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty({ message: 'O campo RG é obrigatório' })
  rg: string;

  @ApiProperty({ example: '2022-01-01' })
  @IsDate({ message: 'O campo Data de Emissão do RG deve ser uma data válida' })
  rgIssueDate: Date;

  @ApiProperty({ example: 'SSP' })
  @IsString()
  rgIssuingAgency: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  rgState: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'O campo CTPS deve ser uma string' })
  @IsNotEmpty({ message: 'O campo CTPS é obrigatório' })
  ctps: string;

  @ApiProperty({ example: '1234567890' })
  @IsString({ message: 'O campo Pis/Pasep deve ser uma string' })
  @IsNotEmpty({ message: 'O campo pisPasep é obrigatório' })
  pisPasep: string;

  @ApiProperty({ example: 'Higher Education' })
  @IsString({ message: 'O campo Nível de Escolaridade deve ser uma string' })
  educationLevel: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: 'O campo Título de Eleitor deve ser uma string' })
  @IsOptional()
  voterRegistration?: string;

  @ApiProperty({ example: 'Reservist Number' })
  @IsString({ message: 'O campo Certificado de Reservista deve ser uma string' })
  @IsOptional()
  reservist?: string;

  @ApiProperty({ example: 'John Doe Sr.' })
  @IsString({ message: 'O campo Nome do Pai deve ser uma string' })
  @IsOptional()
  fatherName?: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsString({ message: 'O campo Nome da Mãe deve ser uma string' })
  @IsOptional()
  motherName?: string;

  @ApiProperty({ example: 'Single' })
  @IsString({ message: 'O campo Estado Civil deve ser uma string' })
  maritalStatus: string;

  @ApiProperty({ example: '1990-05-15T00:00:00.000Z' })
  @IsDate({ message: 'O campo Data de Nascimento deve ser uma data válida' })
  @IsNotEmpty({ message: 'O campo Data de Nascimento é obrigatório' })
  birthDate: Date;

  @ApiProperty({ example: 'New York' })
  @IsString({ message: 'O campo Local de Nascimento deve ser uma string' })
  birthPlace: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsDate({ message: 'O campo Data de Admissão deve ser uma data válida' })
  @IsNotEmpty({ message: 'O campo Data de Admissão é obrigatório' })
  admissionDate: Date;

  @ApiProperty({ example: 3500.00 })
  @IsNumber()
  @IsNotEmpty({ message: 'O campo Salário é obrigatório' })
  salary: number;

  @ApiProperty({ example: 'Software Developer' })
  @IsString({ message: 'O campo Cargo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo Cargo é obrigatório' })
  jobTitle: string;

  @ApiProperty({ example: 160 })
  @IsInt({ message: 'O campo Carga Horária Mensal deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O campo Carga Horária Mensal é obrigatório' })
  monthlyWorkloadHours: number;

  @ApiProperty({ example: 44 })
  @IsInt({ message: 'O campo Carga Horária Semanal deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O campo Carga Horária Semanal é obrigatório' })
  weeklyWorkloadHours: number;

  @ApiProperty({ example: 'Sunday' })
  @IsString({ message: 'O campo Dia de Folga deve ser uma string' })
  @IsOptional()
  dayOff: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty({ message: 'O campo transportDiscount é obrigatório' })
  transportDiscount: boolean;

  @ApiProperty({ example: '08:00' })
  @IsString({ message: 'O campo Primeiro Horário de Entrada Dia de Semana deve ser uma string' })
  @IsOptional()
  firstEntryWeekday: string;

  @ApiProperty({ example: '12:00' })
  @IsString({ message: 'O campo Primeiro Horário de Saída Dia de Semana deve ser uma string' })
  @IsOptional()
  firstExitWeekday: string;

  @ApiProperty({ example: '13:00' })
  @IsString({ message: 'O campo Segundo Horário de Entrada Dia de Semana deve ser uma string' })
  @IsOptional()
  secondEntryWeekday?: string;

  @ApiProperty({ example: '17:00' })
  @IsString({ message: 'O campo Segundo Horário de Saída Dia de Semana deve ser uma string' })
  @IsOptional()
  secondExitWeekday?: string;

  @ApiProperty({ example: '08:00' })
  @IsString({ message: 'O campo Primeiro Horário de Entrada Final de Semana deve ser uma string' })
  @IsOptional()
  firstEntryWeekend: string;

  @ApiProperty({ example: '12:00' })
  @IsString({ message: 'O campo Primeiro Horário de Saída Final de Semana deve ser uma string' })
  @IsOptional()
  firstExitWeekend: string;

  @ApiProperty({ example: '13:00' })
  @IsString({ message: 'O campo Segundo Horário de Entrada Final de Semana deve ser uma string' })
  @IsOptional()
  secondEntryWeekend?: string;

  @ApiProperty({ example: '17:00' })
  @IsString({ message: 'O campo Segundo Horário de Saída Final de Semana deve ser uma string' })
  @IsOptional()
  secondExitWeekend?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  receivedPPE: boolean;

  @ApiProperty({ example: 'M' })
  @IsOptional()
  @IsString({ message: 'O campo Tamanho da Calça deve ser uma string' })
  pantsSize?: string;

  @ApiProperty({ example: 'L' })
  @IsString({ message: 'O campo Tamanho da Camisa deve ser uma string' })
  @IsOptional()
  shirtSize?: string;

  @ApiProperty({ example: '42' })
  @IsOptional()
  @IsString({ message: 'O campo Tamanho da Bota deve ser uma string' })
  bootSize?: string;

  @ApiProperty({ example: 'L' })
  @IsOptional()
  @IsString({ message: 'O campo Tamanho da Japona deve ser uma string' })
  jacketSize?: string;

  @ApiProperty({ example: 'M' })
  @IsOptional()
  @IsString({ message: 'O campo Tamanho da Balaclava deve ser uma string' })
  balaclavaSize?: string;

  @ApiProperty({ example: 'M' })
  @IsOptional()
  @IsString({ message: 'O campo Tamanho dos Óculos de Proteção deve ser uma string' })
  gogglesSize?: string;

  @ApiProperty({ example: 'M' })
  @IsOptional()
  @IsString({ message: 'O campo Tamanho da Luva de Proteção deve ser uma string' })
  glovesSize?: string;

  @ApiProperty({ example: '2024-01-15T00:00:00.000Z' })
  @IsOptional()
  @IsDate({ message: 'O campo ppeReceiptDate deve ser uma data válida' })
  ppeReceiptDate?: Date;

  @ApiProperty({ example: 'Yes' })
  @IsOptional()
  @IsBoolean()
  tookVacation: boolean;

  @ApiProperty({ example: '2023-12-01T00:00:00.000Z' })
  @IsOptional()
  @IsDate({ message: 'O campo vacationDate deve ser uma data válida' })
  vacationDate?: Date;

  @ApiProperty({ example: 'Fired' })
  @IsOptional()
  @IsString()
  terminationType?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDate({ message: 'O campo terminationDate deve ser uma data válida' })
  terminationDate?: Date;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  receivedIndemnity?: boolean;

  @ApiProperty({ example: '2024-02-01T00:00:00.000Z' })
  @IsOptional()
  @IsDate({ message: 'O campo indemnityDate deve ser uma data válida' })
  indemnityDate?: Date;

  @ApiProperty({ example: 5000.00 })
  @IsOptional()
  @IsNumber()
  indemnityValue?: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  admissionInterview: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  exitInterview: boolean;

  @ApiProperty({ example: ["2024-01-01T00:00:00.000Z"] })
  @IsOptional()
  @IsArray({ message: 'O campo de Data de ASO Admissional deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item deve ser uma data válida' })
  admissionAsoDates: Date[];

  @ApiProperty({ example: ['2024-01-01T00:00:00.000Z', '2025-01-01T00:00:00.000Z'] })
  @IsOptional()
  @IsArray({ message: 'O campo de ASO Admissional deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item em Data de ASO Periódica deve ser uma data válida' })
  periodicAsoDates: Date[];

  @ApiProperty({ example: ['2024-06-01T00:00:00.000Z'] })
  @IsOptional()
  @IsArray({ message: 'O campo de Data de ASO Demissional deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item em Data de ASO Demissional deve ser uma data válida' })
  dismissalAsoDates: Date[];

  @ApiProperty({ example: ['2024-05-01T00:00:00.000Z'] })
  @IsOptional()
  @IsArray({ message: 'O campo Data de Licença Paternidade deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item em Data de Licença Paternidade deve ser uma data válida' })
  paternityLeaveDates: Date[];

  @ApiProperty({ example: ['2024-08-01T00:00:00.000Z'] })
  @IsOptional()
  @IsArray({ message: 'O campo Data de Licença Maternidade deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item em Data de Licença Maternidade deve ser uma data válida' })
  maternityLeaveDates: Date[];

  @ApiProperty({ example: ['2024-11-01T00:00:00.000Z'] })
  @IsOptional()
  @IsArray({ message: 'O campo Data de Licença Eleitoral deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item em Data de Licença Eleitoral deve ser uma data válida' })
  electoralLeaveDates: Date[];

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  sufferedAccident: boolean;

  @ApiProperty({ example: ['2024-07-01T00:00:00.000Z'] })
  @IsOptional()
  @IsArray({ message: 'O campo Data de Ausência por Acidente deve ser uma lista de datas' })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  @IsDate({ each: true, message: 'Cada item em Data de Ausência por Acidente deve ser uma data válida' })
  leaveOfAbsenceDates: Date[];

}
