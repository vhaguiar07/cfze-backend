/*
  Warnings:

  - You are about to drop the column `sufferedAccident` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "sufferedAccident",
ALTER COLUMN "admissionInterview" DROP NOT NULL,
ALTER COLUMN "exitInterview" DROP NOT NULL,
ALTER COLUMN "admissionAsoDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[],
ALTER COLUMN "periodicAsoDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[],
ALTER COLUMN "dismissalAsoDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[],
ALTER COLUMN "paternityLeaveDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[],
ALTER COLUMN "maternityLeaveDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[],
ALTER COLUMN "electoralLeaveDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[],
ALTER COLUMN "leaveOfAbsenceDates" SET DEFAULT ARRAY[]::TIMESTAMP(3)[];
