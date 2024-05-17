/*
  Warnings:

  - Added the required column `avt` to the `Nguoidung` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nguoidung` ADD COLUMN `avt` VARCHAR(191) NOT NULL;
