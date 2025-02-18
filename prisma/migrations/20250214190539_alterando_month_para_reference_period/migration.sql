/*
  Warnings:

  - You are about to drop the column `month` on the `EmployeeBenefit` table. All the data in the column will be lost.
  - Added the required column `referencePeriod` to the `EmployeeBenefit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeBenefit" DROP COLUMN "month",
ADD COLUMN     "referencePeriod" TEXT NOT NULL;
