/*
  Warnings:

  - Added the required column `loacation` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photourl` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "loacation" TEXT NOT NULL,
ADD COLUMN     "photourl" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photourl" TEXT DEFAULT 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg';
