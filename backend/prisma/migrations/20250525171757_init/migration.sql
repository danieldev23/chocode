/*
  Warnings:

  - A unique constraint covering the columns `[ref_no]` on the table `transaction_history` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `transaction_history_ref_no_key` ON `transaction_history`(`ref_no`);
