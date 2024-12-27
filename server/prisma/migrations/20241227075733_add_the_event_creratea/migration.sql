/*
  Warnings:

  - Added the required column `madebyId` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "madebyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_madebyId_fkey" FOREIGN KEY ("madebyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
