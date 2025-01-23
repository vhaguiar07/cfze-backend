-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "rgIssueDate" TIMESTAMP(3) NOT NULL,
    "rgIssuingAgency" TEXT NOT NULL,
    "rgState" TEXT NOT NULL,
    "ctps" TEXT NOT NULL,
    "pisPasep" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "voterRegistration" TEXT,
    "reservist" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "maritalStatus" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "monthlyWorkloadHours" INTEGER NOT NULL,
    "weeklyWorkloadHours" INTEGER NOT NULL,
    "dayOff" TEXT NOT NULL,
    "transportDiscount" BOOLEAN NOT NULL,
    "firstEntryWeekday" TEXT NOT NULL,
    "firstExitWeekday" TEXT NOT NULL,
    "secondEntryWeekday" TEXT,
    "secondExitWeekday" TEXT,
    "firstEntryWeekend" TEXT NOT NULL,
    "firstExitWeekend" TEXT NOT NULL,
    "secondEntryWeekend" TEXT,
    "secondExitWeekend" TEXT,
    "receivedPPE" BOOLEAN NOT NULL,
    "pantsSize" TEXT,
    "shirtSize" TEXT,
    "bootSize" TEXT,
    "jacketSize" TEXT,
    "balaclavaSize" TEXT,
    "gogglesSize" TEXT,
    "glovesSize" TEXT,
    "ppeReceiptDate" TIMESTAMP(3),
    "tookVacation" BOOLEAN NOT NULL,
    "vacationDate" TIMESTAMP(3),
    "terminationType" TEXT,
    "terminationDate" TIMESTAMP(3),
    "receivedIndemnity" BOOLEAN,
    "indemnityDate" TIMESTAMP(3),
    "indemnityValue" DECIMAL(65,30),
    "admissionInterview" BOOLEAN NOT NULL,
    "exitInterview" BOOLEAN NOT NULL,
    "admissionAsoDates" TIMESTAMP(3)[],
    "periodicAsoDates" TIMESTAMP(3)[],
    "dismissalAsoDates" TIMESTAMP(3)[],
    "paternityLeaveDates" TIMESTAMP(3)[],
    "maternityLeaveDates" TIMESTAMP(3)[],
    "electoralLeaveDates" TIMESTAMP(3)[],
    "sufferedAccident" BOOLEAN NOT NULL,
    "leaveOfAbsenceDates" TIMESTAMP(3)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cpf_key" ON "Employee"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_rg_key" ON "Employee"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_ctps_key" ON "Employee"("ctps");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_pisPasep_key" ON "Employee"("pisPasep");
