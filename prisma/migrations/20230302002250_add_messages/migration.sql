-- CreateTable
CREATE TABLE `message` (
    `uuid` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `marketUuid` VARCHAR(191) NOT NULL,

    INDEX `message_created_by_idx`(`created_by`),
    INDEX `message_marketUuid_idx`(`marketUuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
