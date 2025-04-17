/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `job_postings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `job_postings_slug_key` ON `job_postings`(`slug`);
