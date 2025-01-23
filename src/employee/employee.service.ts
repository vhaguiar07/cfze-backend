import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  private employees = [];

  create(employeeDto: CreateEmployeeDto) {
    const newEmployee = {
      id: this.employees.length + 1,
      ...employeeDto,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  findAll() {
    return this.employees;
  }
}
