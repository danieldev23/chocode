/*
  Warnings:

  - You are about to drop the column `creat_at` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `creat_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
