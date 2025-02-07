import { IsUUID, IsString, IsBoolean, IsInt, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccidentControlDto {
  @IsUUID()
  employeeId: string;

  @IsString()
  accidentNumber: string;

  @IsDate()
  @Type(() => Date)
  accidentDate: Date;

  @IsString()
  accidentType: string;

  @IsString()
  accidentDescription: string;

  @IsBoolean()
  accidentsWithLeave: boolean;

  @IsString()
  bodyPartAffected: string;

  @IsString()
  injurySeverity: string;

  @IsString()
  accidentOrIncident: string;

  @IsInt()
  medicalCertificates: number;

  @IsInt()
  daysAway: number;

  @IsInt()
  hoursAway: number;

  @IsOptional()
  @IsString()
  comments?: string;
}
