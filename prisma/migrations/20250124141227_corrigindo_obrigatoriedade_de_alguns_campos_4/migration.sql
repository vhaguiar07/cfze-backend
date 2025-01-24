-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "dayOff" DROP NOT NULL,
ALTER COLUMN "firstEntryWeekday" DROP NOT NULL,
ALTER COLUMN "firstExitWeekday" DROP NOT NULL,
ALTER COLUMN "secondEntryWeekday" DROP NOT NULL,
ALTER COLUMN "secondExitWeekday" DROP NOT NULL,
ALTER COLUMN "firstEntryWeekend" DROP NOT NULL,
ALTER COLUMN "firstExitWeekend" DROP NOT NULL,
ALTER COLUMN "secondEntryWeekend" DROP NOT NULL,
ALTER COLUMN "secondExitWeekend" DROP NOT NULL;
