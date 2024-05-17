/*
  Warnings:

  - Added the required column `Salt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `Salt` VARCHAR(191) NOT NULL;
