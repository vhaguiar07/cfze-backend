/*
  Warnings:

  - You are about to drop the column `month` on the `AccidentControl` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `AccidentControl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccidentControl" DROP COLUMN "month",
DROP COLUMN "year";
