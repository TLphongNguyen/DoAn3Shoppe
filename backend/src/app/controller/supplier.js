const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();

const createSupplier = async (req, res) => {
    const { supplierName, supplierPhone, supplierAddress } = req.body
    try {
        const dataSupplier = await prisma.supplier.create({
            data: {
                supplierName: supplierName,
                supplierPhone: supplierPhone,
                supplierAddress: supplierAddress,
                status: true
            }
        })
        res.json(dataSupplier)
    } catch (err) {
        console.log(err.message);
    }
}
const getdataSupplier = async (req, res) => {
    try {
        const dataSupplier = await prisma.supplier.findMany()
        res.json(dataSupplier)
    } catch (err) {
        console.log(err.message);
    }
}
const getdataSupplierActive = async (req, res) => {
    try {
        const dataSupplier = await prisma.supplier.findMany({
            where: { status: true }
        })
        res.json(dataSupplier)
    } catch (err) {
        console.log(err.message);
    }
}
const updateSupplier = async (req, res) => {
    const { id, status } = req.body
    try {
        const dataUpdate = await prisma.supplier.update({
            where: { supplierId: id },
            data: {
                status: status
            }
        })
        res.json(dataUpdate)
    } catch (err) {
        console.log(err);
    }
}
module.exports = { createSupplier, getdataSupplier, updateSupplier, getdataSupplierActive }