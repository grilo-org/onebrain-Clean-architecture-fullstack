-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_createdById_fkey";

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
