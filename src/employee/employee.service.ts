import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(employeeDto: CreateEmployeeDto) {
    return await this.prisma.employee.create({
      data: {
        fullName: employeeDto.fullName,
        address: employeeDto.address,
        city: employeeDto.city,
        postalCode: employeeDto.postalCode,
        phoneNumber: employeeDto.phoneNumber,
        nationality: employeeDto.nationality,
        cpf: employeeDto.cpf,
        rg: employeeDto.rg,
        rgIssueDate: employeeDto.rgIssueDate,
        rgIssuingAgency: employeeDto.rgIssuingAgency,
        rgState: employeeDto.rgState,
        ctps: employeeDto.ctps,
        pisPasep: employeeDto.pisPasep,
        educationLevel: employeeDto.educationLevel,
        voterRegistration: employeeDto.voterRegistration,
        reservist: employeeDto.reservist,
        fatherName: employeeDto.fatherName,
        motherName: employeeDto.motherName,
        maritalStatus: employeeDto.maritalStatus,
        birthDate: employeeDto.birthDate,
        birthPlace: employeeDto.birthPlace,
        admissionDate: employeeDto.admissionDate,
        salary: employeeDto.salary,
        jobTitle: employeeDto.jobTitle,
        monthlyWorkloadHours: employeeDto.monthlyWorkloadHours,
        weeklyWorkloadHours: employeeDto.weeklyWorkloadHours,
        dayOff: employeeDto.dayOff,
        transportDiscount: employeeDto.transportDiscount,
        firstEntryWeekday: employeeDto.firstEntryWeekday,
        firstExitWeekday: employeeDto.firstExitWeekday,
        secondEntryWeekday: employeeDto.secondEntryWeekday,
        secondExitWeekday: employeeDto.secondExitWeekday,
        firstEntryWeekend: employeeDto.firstEntryWeekend,
        firstExitWeekend: employeeDto.firstExitWeekend,
        secondEntryWeekend: employeeDto.secondEntryWeekend,
        secondExitWeekend: employeeDto.secondExitWeekend,
        receivedPPE: employeeDto.receivedPPE,
        pantsSize: employeeDto.pantsSize,
        shirtSize: employeeDto.shirtSize,
        bootSize: employeeDto.bootSize,
        jacketSize: employeeDto.jacketSize,
        balaclavaSize: employeeDto.balaclavaSize,
        gogglesSize: employeeDto.gogglesSize,
        glovesSize: employeeDto.glovesSize,
        ppeReceiptDate: employeeDto.ppeReceiptDate,
        tookVacation: employeeDto.tookVacation,
        vacationDate: employeeDto.vacationDate,
        terminationType: employeeDto.terminationType,
        terminationDate: employeeDto.terminationDate,
        receivedIndemnity: employeeDto.receivedIndemnity,
        indemnityDate: employeeDto.indemnityDate,
        indemnityValue: employeeDto.indemnityValue,
        admissionInterview: employeeDto.admissionInterview,
        exitInterview: employeeDto.exitInterview,
        admissionAsoDates: employeeDto.admissionAsoDates,
        periodicAsoDates: employeeDto.periodicAsoDates,
        dismissalAsoDates: employeeDto.dismissalAsoDates,
        paternityLeaveDates: employeeDto.paternityLeaveDates,
        maternityLeaveDates: employeeDto.maternityLeaveDates,
        electoralLeaveDates: employeeDto.electoralLeaveDates,
        sufferedAccident: employeeDto.sufferedAccident,
        leaveOfAbsenceDates: employeeDto.leaveOfAbsenceDates
      },
    });
  }

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.employee.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }
}
