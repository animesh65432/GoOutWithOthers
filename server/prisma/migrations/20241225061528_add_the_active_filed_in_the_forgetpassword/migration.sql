/*
  Warnings:

  - Added the required column `active` to the `ForgerPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForgerPassword" ADD COLUMN     "active" BOOLEAN NOT NULL;
