-- CreateTable
CREATE TABLE "EmployeePPEControl" (
    "id" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "ppeDescription" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reasonForReplacement" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeePPEControl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeePPEControl" ADD CONSTRAINT "EmployeePPEControl_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
