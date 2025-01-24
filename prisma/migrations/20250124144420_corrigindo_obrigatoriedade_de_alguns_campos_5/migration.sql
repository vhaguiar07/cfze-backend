/*
  Warnings:

  - A unique constraint covering the columns `[voterRegistration]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reservist]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_voterRegistration_key" ON "Employee"("voterRegistration");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_reservist_key" ON "Employee"("reservist");
