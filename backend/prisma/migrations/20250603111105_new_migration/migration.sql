/*
  Warnings:

  - Added the required column `avatar` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
