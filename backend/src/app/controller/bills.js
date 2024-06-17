const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createBill = async (req, res) => {
    const { orderDate, customerName, shippingAddress, customerId, details, numberPhone } = req.body;
    console.log(req.body);
    try {
        const dataBills = await prisma.bill.create({
            data: {
                orderDate: new Date(orderDate),
                customerName: customerName,
                shippingAddress: shippingAddress,
                phoneNumber: numberPhone,
                status: false,
                customer: {
                    connect: {
                        customerId: parseInt(customerId),
                    },
                },
                billDetails: {
                    create: details.map(detail => ({
                        quantity: detail.quantity,
                        unitPrice: parseInt(detail.unitPrice),
                        phone: {
                            connect: {
                                phoneId: parseInt(detail.phoneId),
                            },
                        },
                    })),
                },
            },

        })
        const phoneIds = details.map(detail => parseInt(detail.phoneId));

        // Xoá các sản phẩm trong giỏ hàng của khách hàng này có trong danh sách phoneIds
        await prisma.shoppingCart.deleteMany({
            where: {
                customerId: parseInt(customerId),
                phoneId: {
                    in: phoneIds,
                },
            },
        });
        res.json(dataBills)
    } catch (err) {
        console.log(err.message);
    }
}
const getBillbyCustomer = async (req, res) => {
    const customerId = req.params.id;
    console.log(customerId);
    try {
        const dataBill = await prisma.bill.findMany({
            where: { customerId: parseInt(customerId) },
            include: {
                billDetails: {
                    include: {
                        phone: {
                            select: {
                                phoneName: true,
                                phoneImage: true,
                                price: true,
                                brand: {
                                    select: {
                                        brandName: true,
                                    }
                                }
                            }
                        }
                    }
                },
            },
        });

        res.json(dataBill);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}
const getBillAdmin = async (req, res) => {

    try {
        const databillAdmin = await prisma.bill.findMany({
            include: {
                billDetails: {
                    include: {
                        phone: {
                            select: {
                                phoneName: true,
                                phoneImage: true,
                                price: true,
                                brand: {
                                    select: {
                                        brandName: true,
                                    }
                                }
                            }
                        }

                    }
                }
            },
        })
        res.json(databillAdmin)
    } catch (err) {
        console.log(err.message)
    }

}
const getDetails = async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    try {
        const dataDetail = await prisma.billDetail.findMany({
            where: { orderId: id },
            include: {
                phone: {
                    select: {
                        phoneName: true,
                        phoneImage: true,
                        price: true,

                    }
                }
            }
        })
        res.json(dataDetail)
    } catch (err) {
        console.log(err.message);
    }
}
const updateStatus = async (req, res) => {
    const { orderId, status } = req.body
    try {
        const dataUpdate = await prisma.bill.update({
            where: { orderId: orderId },
            data: {
                status: status
            }
        })
        res.json(dataUpdate)
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = { createBill, getBillbyCustomer, getBillAdmin, getDetails, updateStatus }