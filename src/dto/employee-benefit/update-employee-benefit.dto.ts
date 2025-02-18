import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateEmployeeBenefitDto {
  @IsOptional()
  @IsString()
  benefit?: string;

  @IsOptional()
  @IsString()
  referencePeriod?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  mealVoucherPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  workDays?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  extraDays?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  justifiedAbsenceDays?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  paidDays?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;

  @IsOptional()
  @IsString()
  comments?: string;
}
