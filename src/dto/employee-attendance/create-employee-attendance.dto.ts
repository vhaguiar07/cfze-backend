import { IsString, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

export class CreateEmployeeAttendanceDto {
  @IsString()
  employeeCpf: string;

  @IsString()
  companyCnpj: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsString()
  jobTitle: string;

  @IsString()
  referencePeriod: string; // Exemplo: "Janeiro/2025"

  @IsOptional()
  @IsString()
  absenceDescription?: string;

  @IsString()
  situation: string; // Exemplo: "Atestado Médico"

  @IsNumber()
  @Min(0)
  workDays: number;

  @IsNumber()
  @Min(0)
  absences: number;

  @IsNumber()
  @Min(0)
  medicalLeaveDays: number;

  @IsNumber()
  @Min(0)
  extraDays: number;

  @IsNumber()
  @Min(0)
  justifiedAbsenceDays: number;

  @IsNumber()
  @Min(0)
  workedDays: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
