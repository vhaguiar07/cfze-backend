import { IsUUID, IsString, IsBoolean, IsInt, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccidentCostDto {
  @IsUUID()
  accidentId: string;

  @IsUUID()
  employeeId: string;

  @IsBoolean()
  accidentsWithLeave: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  leaveStartDate?: Date;

  @IsOptional()
  @IsNumber()
  medicationCost?: number;

  @IsOptional()
  @IsNumber()
  foodCost?: number;

  @IsOptional()
  @IsNumber()
  materialCost?: number;

  @IsOptional()
  @IsNumber()
  legalCost?: number;

  @IsOptional()
  @IsNumber()
  totalCost?: number;

  @IsOptional()
  @IsString()
  comments?: string;
}
