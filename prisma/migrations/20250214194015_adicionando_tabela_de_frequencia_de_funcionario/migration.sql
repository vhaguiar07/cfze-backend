-- CreateTable
CREATE TABLE "EmployeeBenefitRecord" (
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
    "mealVoucherUnitPrice" DECIMAL(65,30) NOT NULL,
    "discountAmount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeBenefitRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeBenefitRecord" ADD CONSTRAINT "EmployeeBenefitRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeBenefitRecord" ADD CONSTRAINT "EmployeeBenefitRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
