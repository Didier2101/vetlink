/*
  Warnings:

  - You are about to drop the column `confirmationToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tokenExpiresAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `confirmationToken`,
    DROP COLUMN `tokenExpiresAt`;
