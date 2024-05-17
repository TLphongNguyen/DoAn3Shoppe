/*
  Warnings:

  - Added the required column `Salt` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `login` ADD COLUMN `Salt` VARCHAR(191) NOT NULL;
