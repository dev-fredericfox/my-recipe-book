/*
  Warnings:

  - You are about to drop the column `profleimg` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "profleimg",
ADD COLUMN     "image" TEXT;
