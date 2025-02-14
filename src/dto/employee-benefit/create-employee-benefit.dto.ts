import { IsNotEmpty, IsString, Matches, IsNumber, Min } from 'class-validator';

export class CreateEmployeeBenefitDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF inválido' })
  employeeCpf: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{14}$/, { message: 'CNPJ inválido' })
  companyCnpj: string;

  @IsNotEmpty()
  @IsString()
  benefit: string;

  @IsNotEmpty()
  @IsString()
  referencePeriod: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsString()
  area?: string;

  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  mealVoucherPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  workDays: number;

  @IsNumber()
  @Min(0)
  extraDays?: number;

  @IsNumber()
  @Min(0)
  justifiedAbsenceDays?: number;

  @IsNumber()
  @Min(0)
  paidDays?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @IsString()
  comments?: string;
}
