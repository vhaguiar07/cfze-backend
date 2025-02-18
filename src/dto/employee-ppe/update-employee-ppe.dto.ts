import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateEmployeePPEDto {
  @ApiProperty({ example: "Capacete de segurança", description: "Descrição do EPI", required: false })
  @IsString()
  @IsOptional()
  ppeDescription?: string;

  @ApiProperty({ example: "Construção", description: "Setor do funcionário", required: false })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ example: "Março", description: "Mês de referência", required: false })
  @IsString()
  @IsOptional()
  referenceMonth?: string;

  @ApiProperty({ example: "Troca do EPI", description: "Situação do EPI", required: false })
  @IsString()
  @IsOptional()
  situation?: string;

  @ApiProperty({ example: 2, description: "Quantidade de EPIs fornecidos", required: false })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ example: "Desgaste", description: "Motivo da troca", required: false })
  @IsString()
  @IsOptional()
  reasonForReplacement?: string;

  @ApiProperty({ example: "EPI substituído por novo modelo", description: "Comentários adicionais", required: false })
  @IsString()
  @IsOptional()
  comments?: string;
}
