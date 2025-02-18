/*
  Warnings:

  - Added the required column `companyId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "companyId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeBenefit" (
    "id" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "benefit" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "area" TEXT,
    "jobTitle" TEXT NOT NULL,
    "mealVoucherPrice" DECIMAL(65,30) NOT NULL,
    "workDays" INTEGER NOT NULL,
    "extraDays" INTEGER NOT NULL,
    "justifiedAbsenceDays" INTEGER NOT NULL,
    "paidDays" INTEGER NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeBenefit" ADD CONSTRAINT "EmployeeBenefit_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeBenefit" ADD CONSTRAINT "EmployeeBenefit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
