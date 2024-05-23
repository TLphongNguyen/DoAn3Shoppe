const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();


const CreateProducts = async (req, res) => {
    const {
        phoneName, brandId, osId, pricePhone, discount, phoneImageUrl,
        phoneImageUrls, screenSize, resolution, processor, ROM, RAM, batteryCapacity,
        frontCameraResolution, mainCameraResolution
    } = req.body;

    try {
        const existingProduct = await prisma.phone.findFirst({ where: { phoneName: phoneName } });
        if (existingProduct) {
            return res.status(400).json({ error: "Product already exists" });
        }

        const newProduct = await prisma.phoneDetail.create({
            data: {
                screenSize: parseFloat(screenSize.replace(',', '.')),
                resolution,
                processor,
                RAM: parseInt(RAM),
                ROM: parseInt(ROM),
                batteryCapacity: parseInt(batteryCapacity),
                mainCameraResolution,
                frontCameraResolution,
                phone: {
                    create: {
                        brandId: parseInt(brandId),
                        phoneName,
                        price: parseInt(pricePhone),
                        discount: parseInt(discount),
                        quantity: 1,
                        phoneImage: phoneImageUrl,
                        phoneImages: phoneImageUrls, // Lưu trữ dưới dạng chuỗi JSON
                        status: true
                    }
                },
                operatingSystem: {
                    connect: {
                        osId: parseInt(osId) // Kết nối với osId đã có
                    }
                }
            },
            include: {
                phone: true,
                operatingSystem: true // Bao gồm operatingSystem trong phản hồi
            }
        });

        res.json(newProduct);
    } catch (err) {
        console.log(err);
    }
}
const getProduct = async (req, res) => {
    try {
        const dataProduct = await prisma.phone.findMany({
            include: {
                brand: {
                    select: {
                        brandName: true,
                    }
                },
                phoneDetails: true,

            }
        })

        res.json(dataProduct);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }

}
const GetOs = async (req, res) => {
    try {
        const dataOs = await prisma.operatingSystem.findMany()
        res.json(dataOs);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { CreateProducts, getProduct, GetOs }