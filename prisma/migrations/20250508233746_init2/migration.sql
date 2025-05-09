/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `name` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `planId` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lastName` to the `Veterinarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Veterinarian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `owner` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `planId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `veterinarian` ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
