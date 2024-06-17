const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();


const CreateProducts = async (req, res) => {
    const {
        phoneName, brandId, osId, pricePhone, discount, phoneImageUrl,
        phoneImageUrls, screenSize, resolution, processor, ROM, RAM, batteryCapacity,
        frontCameraResolution, mainCameraResolution
    } = req.body;

    console.log(req.body);
    try {


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
const getProductActive = async (req, res) => {
    try {
        const dataProduct = await prisma.phone.findMany({
            where: { status: true },
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
const getProductbyId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const dataItem = await prisma.phone.findUnique({
            where: { phoneId: id },
            include: {
                brand: {
                    select: {
                        brandName: true,
                    }
                },
                phoneDetails: true,

            }
        })
        res.json(dataItem)
    } catch (err) {
        // res.status(500).json({ error: "ma san pham khong ton tai" });
        console.log(err);

    }
}
const UpdateProducts = async (req, res) => {
    const {
        phoneName, brandId, osId, pricePhone, discount, phoneImageUrl,
        phoneImageUrls, screenSize, resolution, processor, ROM, RAM, batteryCapacity,
        frontCameraResolution, mainCameraResolution
    } = req.body;
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    try {
        const updateData = await prisma.$transaction([
            prisma.phone.update({
                where: { phoneId: parseInt(id) },
                data: {
                    phoneName,
                    brandId: parseInt(brandId),
                    price: parseInt(pricePhone),
                    discount: parseInt(discount),
                    quantity: 1,
                    phoneImage: phoneImageUrl,
                    phoneImages: phoneImageUrls, // Lưu trữ dưới dạng chuỗi JSON
                    status: true
                },
            }),
            prisma.phoneDetail.update({
                where: { phoneId: parseInt(id) },
                data: {
                    osId: parseInt(osId),
                    screenSize: parseFloat(screenSize.replace(',', '.')),
                    resolution,
                    processor,
                    RAM: parseInt(RAM),
                    ROM: parseInt(ROM),
                    batteryCapacity: parseInt(batteryCapacity),
                    mainCameraResolution,
                    frontCameraResolution,
                },
            }),
        ])
        res.json(updateData)
    } catch (err) {
        console.log(err.message);
    }
}

const searchProducts = async (req, res) => {
    const name = req.params.name
    try {
        const dataSearch = await prisma.phone.findMany({
            where: {
                phoneName: {
                    contains: name
                }
            }

        })
        res.json(dataSearch)
    } catch (err) {
        console.log(err.message);
    }
}
const updateStatusProduct = async (req, res) => {
    const { id, status } = req.body
    console.log(req.body);
    try {
        const dataUpdate = await prisma.phone.update({
            where: { phoneId: id },
            data: {
                status: status
            }
        })
        res.json(dataUpdate)
    } catch (err) {
        console.log(err);
    }
}
module.exports = { CreateProducts, getProduct, GetOs, getProductbyId, UpdateProducts, searchProducts, updateStatusProduct, getProductActive }