import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty({ example: 'John Doe Updated', required: false })
  fullName?: string;
}
