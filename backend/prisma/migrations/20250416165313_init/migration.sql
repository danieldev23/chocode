/*
  Warnings:

  - Added the required column `level` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `topic` VARCHAR(191) NOT NULL;
