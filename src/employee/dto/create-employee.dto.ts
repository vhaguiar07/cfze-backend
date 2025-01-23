import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsDate, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  city: string;

  @ApiProperty({ example: '12345-678' })
  @IsString()
  postalCode: string;

  @ApiProperty({ example: '+5511987654321' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Brazilian' })
  @IsString()
  nationality: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  rg: string;

  @ApiProperty({ example: '2022-01-01' })
  @IsDate()
  rgIssueDate: Date;

  @ApiProperty({ example: 'SSP' })
  @IsString()
  rgIssuingAgency: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  rgState: string;

  @ApiProperty({ example: 3500.00 })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 'Software Developer' })
  @IsString()
  jobTitle: string;

  @ApiProperty({ example: 44 })
  @IsInt()
  weeklyWorkloadHours: number;

  @ApiProperty({ example: ['2024-01-01', '2025-01-01'] })
  @IsArray()
  @IsDate({ each: true })
  periodicAsoDates: Date[];

  @ApiProperty({ example: true })
  @IsBoolean()
  receivedPPE: boolean;

  @ApiProperty({ example: 'L' })
  @IsString()
  @IsOptional()
  shirtSize?: string;
}
