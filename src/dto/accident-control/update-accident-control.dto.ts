import { IsUUID, IsString, IsBoolean, IsInt, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAccidentControlDto {
  @IsOptional()
  @IsString()
  accidentNumber?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  accidentDate?: Date;

  @IsOptional()
  @IsString()
  accidentType?: string;

  @IsOptional()
  @IsString()
  accidentDescription?: string;

  @IsOptional()
  @IsBoolean()
  accidentsWithLeave?: boolean;

  @IsOptional()
  @IsString()
  bodyPartAffected?: string;

  @IsOptional()
  @IsString()
  injurySeverity?: string;

  @IsOptional()
  @IsString()
  accidentOrIncident?: string;

  @IsOptional()
  @IsInt()
  medicalCertificates?: number;

  @IsOptional()
  @IsInt()
  daysAway?: number;

  @IsInt()
  hoursAway: number;

  @IsOptional()
  @IsString()
  comments?: string;
}
