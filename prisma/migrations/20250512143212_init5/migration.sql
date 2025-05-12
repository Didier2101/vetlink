/*
  Warnings:

  - You are about to drop the column `birthDate` on the `owner` table. All the data in the column will be lost.
  - You are about to drop the column `dni` on the `owner` table. All the data in the column will be lost.
  - Made the column `category` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `city` to the `Veterinarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Veterinarian` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Owner_dni_key` ON `owner`;

-- AlterTable
ALTER TABLE `owner` DROP COLUMN `birthDate`,
    DROP COLUMN `dni`;

-- AlterTable
ALTER TABLE `user` MODIFY `category` ENUM('owner', 'vet', 'clinic', 'store') NOT NULL;

-- AlterTable
ALTER TABLE `veterinarian` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL;
