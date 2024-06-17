/*
  Warnings:

  - You are about to drop the column `accountId` on the `purchaseorder` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchaseorder` DROP FOREIGN KEY `PurchaseOrder_accountId_fkey`;

-- AlterTable
ALTER TABLE `purchaseorder` DROP COLUMN `accountId`,
    ADD COLUMN `customerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
