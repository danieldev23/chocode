/*
  Warnings:

  - You are about to drop the column `createdAt` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
