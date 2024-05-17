const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateRandomString = require('./../../utils');

const prisma = new PrismaClient();
const randomSuffix = generateRandomString(3); // Độ dài của phần ngẫu nhiên
const fullName = `User${randomSuffix}`;
const signup = async (req, res) => {
    const { email, PassWord } = req.body;
    try {
        const existingUser = await prisma.account.findFirst({ where: { username: email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const Salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(PassWord, Salt);

        const newCustomer = await prisma.customer.create({
            data: {
                fullName: fullName,
                birthday: new Date("1990-01-01"),
                email: email, // Cập nhật email cho customer
                address: "null",
                account: {
                    create: {
                        username: email,
                        password: hashPassword,
                        Salt: Salt,
                        accountTypeId: 2, // ID hợp lệ của loại tài khoản
                    }
                }
            }
        });

        res.json({ newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const login = async (req, res) => {
    const { email, PassWord } = req.body;
    try {
        const existingUser = await prisma.account.findFirst({ where: { username: email } });
        if (!existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const decryptPass = await bcrypt.hash(PassWord, existingUser.Salt)
        console.log(decryptPass)
        if (decryptPass !== existingUser.password) {
            throw new Error
        }
        const Token = jwt.sign({ username: existingUser.username }, "toton1", {
            expiresIn: '1h',
        });
        res.json(Token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { signup, login };
