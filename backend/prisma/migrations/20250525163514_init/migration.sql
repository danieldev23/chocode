-- CreateTable
CREATE TABLE `transaction_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `posting_date` VARCHAR(191) NOT NULL,
    `transaction_date` VARCHAR(191) NOT NULL,
    `credit_amount` VARCHAR(191) NOT NULL,
    `debit_amount` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `ref_no` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
