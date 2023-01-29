/*
  Warnings:

  - You are about to drop the `market_share` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `market_share`;

-- CreateTable
CREATE TABLE `market_ledger` (
    `uuid` VARCHAR(191) NOT NULL,
    `market_uuid` VARCHAR(191) NOT NULL,
    `market_alignment` VARCHAR(191) NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `user_uuid` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `market_ledger_user_uuid_idx`(`user_uuid`),
    INDEX `market_ledger_market_uuid_idx`(`market_uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
