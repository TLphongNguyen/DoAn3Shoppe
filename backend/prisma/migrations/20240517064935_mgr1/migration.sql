/*
  Warnings:

  - Added the required column `avt` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `avt` VARCHAR(191) NOT NULL;
