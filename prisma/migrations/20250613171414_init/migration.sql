-- CreateTable
CREATE TABLE `features` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `planId` INTEGER NOT NULL,

    INDEX `planId`(`planId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` FLOAT NOT NULL,
    `period` ENUM('MONTHLY', 'YEARLY', 'INDEFINITE') NOT NULL,
    `trialPeriodDays` INTEGER NULL DEFAULT 0,
    `isFree` BOOLEAN NOT NULL DEFAULT false,
    `maxPets` INTEGER NOT NULL DEFAULT 1,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `role` ENUM('clinic', 'owner', 'store', 'veterinarian', 'walker') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `planId` INTEGER NOT NULL,
    `terms` BOOLEAN NOT NULL DEFAULT false,
    `isProfileComplete` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isTrial` BOOLEAN NULL DEFAULT true,
    `trialStartedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `trialEndsAt` DATETIME(0) NULL,
    `planStartedAt` DATETIME(0) NULL,
    `planExpiresAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `planId`(`planId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `secondaryPhone` VARCHAR(50) NULL,
    `city` VARCHAR(255) NOT NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profilePicture` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `consultationFee` DECIMAL(10, 2) NULL,
    `emergencyService` BOOLEAN NOT NULL DEFAULT false,
    `homeVisit` BOOLEAN NOT NULL DEFAULT false,
    `licenseNumber` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `specialty` VARCHAR(100) NOT NULL,
    `clinicName` VARCHAR(255) NOT NULL,
    `clinicAddress` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `latitude` DECIMAL(9, 6) NULL,
    `longitude` DECIMAL(9, 6) NULL,
    `rating` DOUBLE NULL,
    `reviewCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `vets_licenseNumber_key`(`licenseNumber`),
    UNIQUE INDEX `userId`(`userId`),
    INDEX `idx_license`(`licenseNumber`),
    INDEX `idx_city`(`city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `species` VARCHAR(100) NOT NULL,
    `breed` VARCHAR(100) NOT NULL,
    `sex` VARCHAR(20) NOT NULL,
    `birthDate` DATETIME(0) NOT NULL,
    `color` VARCHAR(100) NOT NULL,
    `photo` TEXT NULL,
    `microchipNumber` VARCHAR(100) NULL,
    `tattooCode` VARCHAR(100) NULL,
    `passportNumber` VARCHAR(100) NULL,
    `codeVetlink` VARCHAR(100) NOT NULL,
    `sterilized` BOOLEAN NOT NULL DEFAULT false,
    `allergies` TEXT NULL,
    `chronicDiseases` TEXT NULL,
    `disabilities` TEXT NULL,
    `bloodType` VARCHAR(20) NULL,
    `favoriteFood` VARCHAR(100) NOT NULL,
    `behaviorNotes` TEXT NULL,
    `feedingSchedule` TEXT NULL,
    `diet` VARCHAR(100) NULL,
    `activityLevel` VARCHAR(50) NOT NULL,
    `aggressive` VARCHAR(20) NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `pets_codeVetlink_key`(`codeVetlink`),
    INDEX `ownerId`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dewormings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `petId` INTEGER NOT NULL,
    `product` VARCHAR(255) NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `nextDate` DATETIME(0) NULL,
    `notes` TEXT NULL,

    INDEX `petId`(`petId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `petId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `dosage` VARCHAR(100) NOT NULL,
    `frequency` VARCHAR(100) NOT NULL,
    `startDate` DATETIME(0) NOT NULL,
    `endDate` DATETIME(0) NULL,
    `prescribedBy` VARCHAR(255) NULL,
    `notes` TEXT NULL,

    INDEX `petId`(`petId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pet_vets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `petId` INTEGER NOT NULL,
    `vetId` INTEGER NOT NULL,
    `clinicId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reason` VARCHAR(255) NOT NULL,
    `notes` TEXT NULL,

    INDEX `idx_pet_vet`(`petId`, `vetId`),
    INDEX `pet_vets_clinicId_fkey`(`clinicId`),
    INDEX `pet_vets_vetId_fkey`(`vetId`),
    UNIQUE INDEX `pet_vets_petId_vetId_date_key`(`petId`, `vetId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clinics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vaccines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `petId` INTEGER NOT NULL,
    `vetId` INTEGER NULL,
    `type` VARCHAR(100) NOT NULL,
    `category` ENUM('LEGAL', 'RECOMMENDED') NOT NULL DEFAULT 'LEGAL',
    `batchNumber` VARCHAR(50) NOT NULL,
    `laboratory` VARCHAR(100) NOT NULL,
    `applicationDate` DATETIME(0) NOT NULL,
    `nextDate` DATETIME(0) NULL,
    `documentId` INTEGER NULL,

    INDEX `idx_pet`(`petId`),
    INDEX `idx_batch`(`batchNumber`),
    INDEX `idx_date`(`applicationDate`),
    INDEX `vaccines_documentId_fkey`(`documentId`),
    INDEX `vaccines_vetId_fkey`(`vetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `petId` INTEGER NOT NULL,
    `vetId` INTEGER NULL,
    `type` ENUM('VACCINE_CERTIFICATE', 'OWNERSHIP_PROOF', 'DIAGNOSTIC_IMAGE', 'PRESCRIPTION') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `fileUrl` TEXT NOT NULL,
    `issueDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expirationDate` DATETIME(0) NULL,

    INDEX `idx_doc_pet`(`petId`),
    INDEX `idx_doc_type`(`type`),
    INDEX `documents_vetId_fkey`(`vetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` TINYINT NOT NULL,
    `comment` TEXT NULL,
    `reviewerName` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vetId` INTEGER NULL,

    INDEX `Review_vetId_fkey`(`vetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dayOfWeek` INTEGER NOT NULL,
    `startTime` TIME(0) NOT NULL,
    `endTime` TIME(0) NOT NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vetId` INTEGER NULL,

    INDEX `Schedule_vetId_fkey`(`vetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `features` ADD CONSTRAINT `features_ibfk_1` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vets` ADD CONSTRAINT `vets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `owners`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dewormings` ADD CONSTRAINT `dewormings_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medications` ADD CONSTRAINT `medications_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pet_vets` ADD CONSTRAINT `pet_vets_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `clinics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pet_vets` ADD CONSTRAINT `pet_vets_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pet_vets` ADD CONSTRAINT `pet_vets_vetId_fkey` FOREIGN KEY (`vetId`) REFERENCES `vets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vaccines` ADD CONSTRAINT `vaccines_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vaccines` ADD CONSTRAINT `vaccines_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vaccines` ADD CONSTRAINT `vaccines_vetId_fkey` FOREIGN KEY (`vetId`) REFERENCES `vets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_vetId_fkey` FOREIGN KEY (`vetId`) REFERENCES `vets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_vetId_fkey` FOREIGN KEY (`vetId`) REFERENCES `vets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `Schedule_vetId_fkey` FOREIGN KEY (`vetId`) REFERENCES `vets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
