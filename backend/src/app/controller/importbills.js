const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertImportBills = async (req, res) => {
    const { phoneId, quantity, unitPrice, orderDate, customerId, supplierId } = req.body;
    console.log(req.body);
    try {
        const dataIimportBills = await prisma.purchaseOrderDetail.create({
            data: {
                phone: {
                    connect: {
                        phoneId: parseInt(phoneId)
                    }
                },
                quantity: parseInt(quantity),
                unitPrice: parseInt(unitPrice),

                purchaseOrder: {
                    create: {
                        orderDate: new Date(orderDate),
                        supplier: {
                            connect: {
                                supplierId: parseInt(supplierId)
                            }
                        },
                        customer: {
                            connect: {
                                customerId: parseInt(customerId)
                            }
                        }

                    },


                }
            },
        })
        res.json(dataIimportBills)
    } catch (err) {
        console.log(err.message);
    }
}
const getImportBills = async (req, res) => {
    try {
        const dataimportbill = await prisma.purchaseOrder.findMany({
            include: {
                purchaseOrderDetails: {
                    include: {
                        phone: {
                            select: {
                                phoneName: true,
                                phoneImage: true,
                            }
                        }

                    }
                },
                supplier: {
                    select: { supplierName: true }
                },
                customer: {
                    select: { fullName: true }
                }
            }
        })
        res.json(dataimportbill)

    } catch (err) {
        console.log(err.message);
    }
}
module.exports = { insertImportBills, getImportBills }