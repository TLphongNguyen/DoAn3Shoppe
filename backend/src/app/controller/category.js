const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();

const CreateCategory = async (req, res) => {
    const { brandName, brandLogo } = req.body;

    try {
        // Kiểm tra xem thương hiệu đã tồn tại hay chưa
        const existingBrand = await prisma.brand.findFirst({ where: { brandName: brandName } });
        if (existingBrand) {
            return res.status(400).json({ error: "Brand already exists" });
        }

        // Tạo mới thương hiệu
        const newBrand = await prisma.brand.create({
            data: {
                brandName: brandName,
                brandLogo: brandLogo // Đảm bảo rằng brandLogo đã được xử lý thành đường dẫn hoặc đối tượng tải lên trước khi lưu vào cơ sở dữ liệu
            }
        });

        res.json(newBrand);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect(); // Đảm bảo rằng kết nối với Prisma được đóng sau khi sử dụng
    }
};

const GetCategory = async (req, res) => {
    try {
        const CategoryData = await prisma.brand.findMany()
        res.json(CategoryData)

    } catch (err) {
        throw new Error("loi he thong")
    }
}


module.exports = { CreateCategory, GetCategory };
