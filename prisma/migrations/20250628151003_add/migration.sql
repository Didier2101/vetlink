/*
  Warnings:

  - You are about to alter the column `codeVetlink` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE `pets` MODIFY `codeVetlink` VARCHAR(15) NOT NULL DEFAULT 'VL-0000000-0';

-- CreateTable
CREATE TABLE `PendingRegistrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `planId` INTEGER NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `terms` BOOLEAN NOT NULL,
    `confirmationToken` VARCHAR(255) NOT NULL,
    `tokenExpiresAt` DATETIME(0) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `PendingRegistrations_email_key`(`email`),
    INDEX `confirmationToken_index`(`confirmationToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
