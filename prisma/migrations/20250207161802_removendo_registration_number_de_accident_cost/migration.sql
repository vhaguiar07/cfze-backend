/*
  Warnings:

  - You are about to drop the column `registrationNumber` on the `AccidentCost` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AccidentCost_registrationNumber_key";

-- AlterTable
ALTER TABLE "AccidentCost" DROP COLUMN "registrationNumber";
