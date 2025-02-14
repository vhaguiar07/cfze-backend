/*
  Warnings:

  - You are about to drop the column `department` on the `AccidentControl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccidentControl" DROP COLUMN "department";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "department" TEXT;
