import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsString, IsDateString, IsBoolean, IsNumber } from 'class-validator';

export class CreateAccidentControlDto {
  @ApiPropertyOptional({ description: 'ID do funcionário (opcional, pode ser substituído por CPF)' })
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @ApiPropertyOptional({ description: 'CPF do funcionário (opcional, pode substituir o employeeId)' })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({ description: 'Número do acidente' })
  @IsString()
  accidentNumber: string;

  @ApiProperty({ description: 'Data do acidente' })
  @IsDateString()
  accidentDate: string;

  @ApiProperty({ description: 'Tipo de acidente' })
  @IsString()
  accidentType: string;

  @ApiProperty({ description: 'Descrição do acidente' })
  @IsString()
  accidentDescription: string;

  @ApiProperty({ description: 'O acidente gerou afastamento?', example: true })
  @IsBoolean()
  accidentsWithLeave: boolean;

  @ApiProperty({ description: 'Parte do corpo atingida' })
  @IsString()
  bodyPartAffected: string;

  @ApiProperty({ description: 'Gravidade da lesão' })
  @IsString()
  injurySeverity: string;

  @ApiProperty({ description: 'Tipo (Acidente ou Incidente)' })
  @IsString()
  accidentOrIncident: string;

  @ApiProperty({ description: 'Número de atestados médicos' })
  @IsNumber()
  medicalCertificates: number;

  @ApiPropertyOptional({ description: 'Dias de afastamento', example: 5 })
  @IsOptional()
  @IsNumber()
  daysAway?: number;

  @ApiPropertyOptional({ description: 'Horas de afastamento', example: 40 })
  @IsOptional()
  @IsNumber()
  hoursAway?: number;

  @ApiPropertyOptional({ description: 'Comentários adicionais' })
  @IsOptional()
  @IsString()
  comments?: string;
}
