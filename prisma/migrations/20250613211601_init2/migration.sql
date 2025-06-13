-- AlterTable
ALTER TABLE `users` ADD COLUMN `confirmationToken` VARCHAR(255) NULL,
    ADD COLUMN `emailConfirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tokenExpiresAt` DATETIME(0) NULL;
