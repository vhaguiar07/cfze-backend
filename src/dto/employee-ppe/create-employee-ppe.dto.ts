import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateEmployeePPEDto {
  @ApiProperty({ example: "123.456.789-00", description: "CPF do funcionário" })
  @IsString()
  @IsNotEmpty()
  employeeCpf: string;

  @ApiProperty({ example: "EPI 01", description: "Descrição do EPI" })
  @IsString()
  @IsNotEmpty()
  ppeDescription: string;

  @ApiProperty({ example: "Setor 01", description: "Setor do funcionário" })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: "Janeiro", description: "Mês de referência" })
  @IsString()
  @IsNotEmpty()
  referenceMonth: string;

  @ApiProperty({ example: "Troca do EPI", description: "Situação do EPI" })
  @IsString()
  @IsNotEmpty()
  situation: string;

  @ApiProperty({ example: 1, description: "Quantidade de EPIs fornecidos" })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: "Desgaste natural", description: "Motivo da troca", required: false })
  @IsString()
  @IsOptional()
  reasonForReplacement?: string;

  @ApiProperty({ example: "EPI entregue conforme necessidade", description: "Comentários adicionais", required: false })
  @IsString()
  @IsOptional()
  comments?: string;
}
