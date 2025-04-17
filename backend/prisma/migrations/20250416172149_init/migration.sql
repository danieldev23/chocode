/*
  Warnings:

  - Added the required column `category_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tags_on_posts` DROP FOREIGN KEY `tags_on_posts_post_id_fkey`;

-- AlterTable
ALTER TABLE `posts` ADD COLUMN `category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
