import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, MaxLength } from 'class-validator';

export class UpdateEmployeeAttendanceDto {
  @ApiProperty({ example: "Fevereiro/2025", description: "Período de referência", required: false })
  @IsOptional()
  @IsString()
  referencePeriod?: string;

  @ApiProperty({ example: "TI", description: "Área do funcionário", required: false })
  @IsOptional()
  @IsString()
  area?: string;

  @ApiProperty({ example: "Desenvolvedor Sênior", description: "Cargo do funcionário", required: false })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiProperty({ example: "Falta Injustificada", description: "Descrição da ausência", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  absenceDescription?: string;

  @ApiProperty({ example: "Sem justificativa", description: "Situação da ausência", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  situation?: string;

  @ApiProperty({ example: 22, description: "Quantidade de dias úteis no período", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  workDays?: number;

  @ApiProperty({ example: 3, description: "Quantidade de faltas", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  absences?: number;

  @ApiProperty({ example: 1, description: "Quantidade de dias de atestado", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  medicalLeaveDays?: number;

  @ApiProperty({ example: 2, description: "Quantidade de dias extras", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  extraDays?: number;

  @ApiProperty({ example: 1, description: "Quantidade de dias abonados", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  justifiedAbsenceDays?: number;

  @ApiProperty({ example: 20, description: "Quantidade de dias trabalhados", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  workedDays?: number;

  @ApiProperty({ example: "Atualização da situação de faltas", description: "Comentários adicionais", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comments?: string;
}
