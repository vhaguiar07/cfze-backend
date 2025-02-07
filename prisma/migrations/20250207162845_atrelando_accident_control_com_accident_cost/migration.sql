/*
  Warnings:

  - You are about to drop the column `accidentDate` on the `AccidentCost` table. All the data in the column will be lost.
  - You are about to drop the column `accidentsWithLeave` on the `AccidentCost` table. All the data in the column will be lost.
  - You are about to drop the column `daysAway` on the `AccidentCost` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `AccidentCost` table. All the data in the column will be lost.
  - You are about to drop the column `hoursAway` on the `AccidentCost` table. All the data in the column will be lost.
  - You are about to drop the column `leaveStartDate` on the `AccidentCost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accidentId]` on the table `AccidentCost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accidentId` to the `AccidentCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccidentCost" DROP CONSTRAINT "AccidentCost_employeeId_fkey";

-- AlterTable
ALTER TABLE "AccidentControl" ADD COLUMN     "hoursAway" INTEGER,
ALTER COLUMN "daysAway" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AccidentCost" DROP COLUMN "accidentDate",
DROP COLUMN "accidentsWithLeave",
DROP COLUMN "daysAway",
DROP COLUMN "employeeId",
DROP COLUMN "hoursAway",
DROP COLUMN "leaveStartDate",
ADD COLUMN     "accidentId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccidentCost_accidentId_key" ON "AccidentCost"("accidentId");

-- AddForeignKey
ALTER TABLE "AccidentCost" ADD CONSTRAINT "AccidentCost_accidentId_fkey" FOREIGN KEY ("accidentId") REFERENCES "AccidentControl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
