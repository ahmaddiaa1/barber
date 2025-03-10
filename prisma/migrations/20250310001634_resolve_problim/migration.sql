/*
  Warnings:

  - You are about to drop the column `slotId` on the `Barber` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Barber_slotId_key";

-- AlterTable
ALTER TABLE "Barber" DROP COLUMN "slotId";
