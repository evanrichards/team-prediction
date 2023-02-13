-- AlterTable
ALTER TABLE `market` ADD COLUMN `closed_at` DATETIME(3) NULL,
    ADD COLUMN `resolution_alignment` VARCHAR(191) NULL;
