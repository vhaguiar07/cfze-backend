import { IsString, IsBoolean, IsInt, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccidentControlDto {
  @ApiProperty({ description: 'Número do acidente (CAT)', example: 'CAT12345', required: false })
  @IsOptional()
  @IsString()
  accidentNumber?: string;

  @ApiProperty({ description: 'Data do acidente', example: '2024-02-07T12:00:00.000Z', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  accidentDate?: Date;

  @ApiProperty({ description: 'Tipo do acidente', example: 'Queda', required: false })
  @IsOptional()
  @IsString()
  accidentType?: string;

  @ApiProperty({ description: 'Descrição do acidente', example: 'Escorregou e caiu.', required: false })
  @IsOptional()
  @IsString()
  accidentDescription?: string;

  @ApiProperty({ description: 'Se houve afastamento por acidente', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  accidentsWithLeave?: boolean;

  @ApiProperty({ description: 'Parte do corpo afetada', example: 'Perna', required: false })
  @IsOptional()
  @IsString()
  bodyPartAffected?: string;

  @ApiProperty({ description: 'Gravidade da lesão', example: 'Moderada', required: false })
  @IsOptional()
  @IsString()
  injurySeverity?: string;

  @ApiProperty({ description: 'Se é um acidente ou incidente', example: 'Acidente', required: false })
  @IsOptional()
  @IsString()
  accidentOrIncident?: string;

  @ApiProperty({ description: 'Número de atestados médicos', example: 2, required: false })
  @IsOptional()
  @IsInt()
  medicalCertificates?: number;

  @ApiProperty({ description: 'Dias afastado', example: 5, required: false })
  @IsOptional()
  @IsInt()
  daysAway?: number;

  @ApiProperty({ description: 'Horas afastado', example: 10 })
  @IsInt()
  hoursAway: number;

  @ApiProperty({ description: 'Comentários adicionais', example: 'Uso de muletas recomendado', required: false })
  @IsOptional()
  @IsString()
  comments?: string;
}
