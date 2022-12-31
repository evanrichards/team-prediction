/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- Rename table for 'User'
ALTER TABLE `User` RENAME TO `user`;
-- rename case sensitive columns
ALTER TABLE `user` RENAME COLUMN `createdAt` TO `created_at`;
ALTER TABLE `user` RENAME COLUMN `updatedAt` TO `updated_at`;
ALTER TABLE `user` RENAME COLUMN `lastLogin` TO `last_login`;

-- CreateTable
CREATE TABLE `market_share` (
    `uuid` VARCHAR(191) NOT NULL,
    `user_uuid` VARCHAR(191) NOT NULL,
    `market_uuid` VARCHAR(191) NOT NULL,
    `market_alignment` VARCHAR(191) NOT NULL,
    `shares` DOUBLE NOT NULL,
    `purchase_value` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `market_share_user_uuid_idx`(`user_uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
