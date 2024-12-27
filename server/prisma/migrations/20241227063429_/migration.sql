/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `EventsOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ForgotPassword` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "EventsOnUsers" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "ForgotPassword" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
