/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Login` (
    `Idlogin` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `IdLoaitaikhoan` INTEGER NOT NULL,

    INDEX `Login_IdLoaitaikhoan_idx`(`IdLoaitaikhoan`),
    PRIMARY KEY (`Idlogin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loaitaikhoan` (
    `IdLoaitaikhoan` INTEGER NOT NULL AUTO_INCREMENT,
    `loaitaikhoan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IdLoaitaikhoan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nguoidung` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `Idlogin` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `gmail` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,

    INDEX `Nguoidung_Idlogin_idx`(`Idlogin`),
    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `categoryid` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryname` VARCHAR(191) NOT NULL,
    `categoryimg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`categoryid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryid` INTEGER NOT NULL,
    `productname` VARCHAR(191) NOT NULL,
    `productprice` INTEGER NOT NULL,
    `productsale` INTEGER NOT NULL,
    `productquantity` INTEGER NOT NULL,
    `productimg` VARCHAR(191) NOT NULL,
    `productimgMore` VARCHAR(191) NOT NULL,
    `infoproduct` VARCHAR(191) NOT NULL,

    INDEX `Products_categoryid_idx`(`categoryid`),
    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hoadon` (
    `hoadonid` INTEGER NOT NULL AUTO_INCREMENT,
    `hoadondate` DATETIME(3) NOT NULL,
    `tenkh` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `sodienthoai` VARCHAR(191) NOT NULL,
    `trangthai` BOOLEAN NOT NULL,

    PRIMARY KEY (`hoadonid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chitiethoadon` (
    `idchitiethoadon` INTEGER NOT NULL AUTO_INCREMENT,
    `Hoadonid` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `soLuong` INTEGER NOT NULL,
    `dongia` INTEGER NOT NULL,

    INDEX `Chitiethoadon_Hoadonid_idx`(`Hoadonid`),
    INDEX `Chitiethoadon_productId_idx`(`productId`),
    PRIMARY KEY (`idchitiethoadon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nhacungcap` (
    `Nhacungcapid` INTEGER NOT NULL AUTO_INCREMENT,
    `Tennhacungcap` VARCHAR(191) NOT NULL,
    `Sdtnhacungcap` VARCHAR(191) NOT NULL,
    `Diachinhacungcap` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Nhacungcapid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hoadonnhap` (
    `Idhoadonnhap` INTEGER NOT NULL AUTO_INCREMENT,
    `Idlogin` INTEGER NOT NULL,
    `Nhacungcapid` INTEGER NOT NULL,
    `Ngaynhap` DATETIME(3) NOT NULL,

    INDEX `Hoadonnhap_Idlogin_idx`(`Idlogin`),
    INDEX `Hoadonnhap_Nhacungcapid_idx`(`Nhacungcapid`),
    PRIMARY KEY (`Idhoadonnhap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chitiethdn` (
    `Idchitiet` INTEGER NOT NULL AUTO_INCREMENT,
    `Idhoadonnhap` INTEGER NOT NULL,
    `Productid` INTEGER NOT NULL,
    `Soluongnhap` INTEGER NOT NULL,
    `Gianhap` INTEGER NOT NULL,

    INDEX `Chitiethdn_Idhoadonnhap_idx`(`Idhoadonnhap`),
    INDEX `Chitiethdn_Productid_idx`(`Productid`),
    PRIMARY KEY (`Idchitiet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Login` ADD CONSTRAINT `Login_IdLoaitaikhoan_fkey` FOREIGN KEY (`IdLoaitaikhoan`) REFERENCES `Loaitaikhoan`(`IdLoaitaikhoan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nguoidung` ADD CONSTRAINT `Nguoidung_Idlogin_fkey` FOREIGN KEY (`Idlogin`) REFERENCES `Login`(`Idlogin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryid_fkey` FOREIGN KEY (`categoryid`) REFERENCES `Category`(`categoryid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chitiethoadon` ADD CONSTRAINT `Chitiethoadon_Hoadonid_fkey` FOREIGN KEY (`Hoadonid`) REFERENCES `Hoadon`(`hoadonid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chitiethoadon` ADD CONSTRAINT `Chitiethoadon_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hoadonnhap` ADD CONSTRAINT `Hoadonnhap_Idlogin_fkey` FOREIGN KEY (`Idlogin`) REFERENCES `Login`(`Idlogin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hoadonnhap` ADD CONSTRAINT `Hoadonnhap_Nhacungcapid_fkey` FOREIGN KEY (`Nhacungcapid`) REFERENCES `Nhacungcap`(`Nhacungcapid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chitiethdn` ADD CONSTRAINT `Chitiethdn_Idhoadonnhap_fkey` FOREIGN KEY (`Idhoadonnhap`) REFERENCES `Hoadonnhap`(`Idhoadonnhap`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chitiethdn` ADD CONSTRAINT `Chitiethdn_Productid_fkey` FOREIGN KEY (`Productid`) REFERENCES `Products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
