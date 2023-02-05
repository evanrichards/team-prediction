-- CreateTable
CREATE TABLE `market` (
    `uuid` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `resolved_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `market_created_by_idx`(`created_by`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
