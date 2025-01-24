/*
  Warnings:

  - Made the column `secondEntryWeekday` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondExitWeekday` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondEntryWeekend` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondExitWeekend` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "secondEntryWeekday" SET NOT NULL,
ALTER COLUMN "secondExitWeekday" SET NOT NULL,
ALTER COLUMN "secondEntryWeekend" SET NOT NULL,
ALTER COLUMN "secondExitWeekend" SET NOT NULL;
