/*
  Warnings:

  - Added the required column `sex` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "sex" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "IncidentRecord" (
    "id" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "month" TEXT NOT NULL,
    "accidentsWithLeave" BOOLEAN NOT NULL,
    "accidentOrIncident" TEXT NOT NULL,
    "injurySeverity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncidentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccidentControl" (
    "id" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "accidentNumber" TEXT NOT NULL,
    "accidentDate" TIMESTAMP(3) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "accidentType" TEXT NOT NULL,
    "accidentDescription" TEXT NOT NULL,
    "accidentsWithLeave" BOOLEAN NOT NULL,
    "bodyPartAffected" TEXT NOT NULL,
    "injurySeverity" TEXT NOT NULL,
    "accidentOrIncident" TEXT NOT NULL,
    "accidentCount" INTEGER NOT NULL,
    "incidentCount" INTEGER NOT NULL,
    "medicalCertificates" INTEGER NOT NULL,
    "daysAway" INTEGER NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccidentControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccidentCost" (
    "id" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "accidentDate" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "accidentsWithLeave" BOOLEAN NOT NULL,
    "leaveStartDate" TIMESTAMP(3),
    "daysAway" INTEGER,
    "hoursAway" INTEGER,
    "medicationCost" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "foodCost" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "materialCost" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "legalCost" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "totalCost" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccidentCost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccidentControl_accidentNumber_key" ON "AccidentControl"("accidentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AccidentCost_registrationNumber_key" ON "AccidentCost"("registrationNumber");

-- AddForeignKey
ALTER TABLE "IncidentRecord" ADD CONSTRAINT "IncidentRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccidentControl" ADD CONSTRAINT "AccidentControl_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccidentCost" ADD CONSTRAINT "AccidentCost_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
