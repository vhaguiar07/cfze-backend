import { IsOptional, IsUUID, IsNumber, IsString } from 'class-validator';

export class UpdateAccidentCostDto {
  @IsOptional()
  @IsUUID()
  accidentId?: string;

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
