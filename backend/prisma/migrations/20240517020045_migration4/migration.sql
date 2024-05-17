/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chitiethdn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chitiethoadon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hoadon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hoadonnhap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loaitaikhoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nguoidung` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nhacungcap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chitiethdn` DROP FOREIGN KEY `Chitiethdn_Idhoadonnhap_fkey`;

-- DropForeignKey
ALTER TABLE `chitiethdn` DROP FOREIGN KEY `Chitiethdn_Productid_fkey`;

-- DropForeignKey
ALTER TABLE `chitiethoadon` DROP FOREIGN KEY `Chitiethoadon_Hoadonid_fkey`;

-- DropForeignKey
ALTER TABLE `chitiethoadon` DROP FOREIGN KEY `Chitiethoadon_productId_fkey`;

-- DropForeignKey
ALTER TABLE `hoadonnhap` DROP FOREIGN KEY `Hoadonnhap_Idlogin_fkey`;

-- DropForeignKey
ALTER TABLE `hoadonnhap` DROP FOREIGN KEY `Hoadonnhap_Nhacungcapid_fkey`;

-- DropForeignKey
ALTER TABLE `login` DROP FOREIGN KEY `Login_IdLoaitaikhoan_fkey`;

-- DropForeignKey
ALTER TABLE `nguoidung` DROP FOREIGN KEY `Nguoidung_Idlogin_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_categoryid_fkey`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `chitiethdn`;

-- DropTable
DROP TABLE `chitiethoadon`;

-- DropTable
DROP TABLE `hoadon`;

-- DropTable
DROP TABLE `hoadonnhap`;

-- DropTable
DROP TABLE `loaitaikhoan`;

-- DropTable
DROP TABLE `login`;

-- DropTable
DROP TABLE `nguoidung`;

-- DropTable
DROP TABLE `nhacungcap`;

-- DropTable
DROP TABLE `products`;

-- CreateTable
CREATE TABLE `AccountType` (
    `accountTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `accountTypeName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`accountTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `accountTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `customerId` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`customerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `brandId` INTEGER NOT NULL AUTO_INCREMENT,
    `brandName` VARCHAR(191) NOT NULL,
    `brandLogo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`brandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phone` (
    `phoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `phoneName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `phoneImage` VARCHAR(191) NOT NULL,
    `phoneImages` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`phoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperatingSystem` (
    `osId` INTEGER NOT NULL AUTO_INCREMENT,
    `osName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`osId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bill` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderDate` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `shippingAddress` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillDetail` (
    `orderDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `phoneId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` INTEGER NOT NULL,

    PRIMARY KEY (`orderDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `supplierId` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierName` VARCHAR(191) NOT NULL,
    `supplierPhone` VARCHAR(191) NOT NULL,
    `supplierAddress` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`supplierId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrder` (
    `purchaseOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`purchaseOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrderDetail` (
    `purchaseOrderDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseOrderId` INTEGER NOT NULL,
    `phoneId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` INTEGER NOT NULL,

    PRIMARY KEY (`purchaseOrderDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShoppingCart` (
    `cartItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `phoneId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`cartItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhoneDetail` (
    `phoneId` INTEGER NOT NULL,
    `osId` INTEGER NOT NULL,
    `screenSize` DOUBLE NOT NULL,
    `resolution` VARCHAR(191) NOT NULL,
    `processor` VARCHAR(191) NOT NULL,
    `RAM` INTEGER NOT NULL,
    `ROM` INTEGER NOT NULL,
    `batteryCapacity` INTEGER NOT NULL,
    `mainCameraResolution` VARCHAR(191) NOT NULL,
    `frontCameraResolution` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`phoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `AccountType`(`accountTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`brandId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillDetail` ADD CONSTRAINT `BillDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Bill`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillDetail` ADD CONSTRAINT `BillDetail_phoneId_fkey` FOREIGN KEY (`phoneId`) REFERENCES `Phone`(`phoneId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`supplierId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderDetail` ADD CONSTRAINT `PurchaseOrderDetail_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`purchaseOrderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderDetail` ADD CONSTRAINT `PurchaseOrderDetail_phoneId_fkey` FOREIGN KEY (`phoneId`) REFERENCES `Phone`(`phoneId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_phoneId_fkey` FOREIGN KEY (`phoneId`) REFERENCES `Phone`(`phoneId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneDetail` ADD CONSTRAINT `PhoneDetail_phoneId_fkey` FOREIGN KEY (`phoneId`) REFERENCES `Phone`(`phoneId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneDetail` ADD CONSTRAINT `PhoneDetail_osId_fkey` FOREIGN KEY (`osId`) REFERENCES `OperatingSystem`(`osId`) ON DELETE RESTRICT ON UPDATE CASCADE;
