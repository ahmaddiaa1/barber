/*
  Warnings:

  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
