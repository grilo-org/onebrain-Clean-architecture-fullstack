/*
  Warnings:

  - You are about to drop the column `createdBy` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `customers` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "createdBy",
DROP COLUMN "neighborhood",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
