/*
  Warnings:

  - You are about to drop the `EmployeeBenefitRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployeeBenefitRecord" DROP CONSTRAINT "EmployeeBenefitRecord_companyId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeBenefitRecord" DROP CONSTRAINT "EmployeeBenefitRecord_employeeId_fkey";

-- DropTable
DROP TABLE "EmployeeBenefitRecord";

-- CreateTable
CREATE TABLE "EmployeeAttendance" (
    "id" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "area" TEXT,
    "jobTitle" TEXT NOT NULL,
    "referencePeriod" TEXT NOT NULL,
    "absenceDescription" TEXT,
    "situation" TEXT NOT NULL,
    "workDays" INTEGER NOT NULL,
    "absences" INTEGER NOT NULL,
    "medicalLeaveDays" INTEGER NOT NULL,
    "extraDays" INTEGER NOT NULL,
    "justifiedAbsenceDays" INTEGER NOT NULL,
    "workedDays" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeAttendance" ADD CONSTRAINT "EmployeeAttendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAttendance" ADD CONSTRAINT "EmployeeAttendance_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
