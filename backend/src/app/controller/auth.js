const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateRandomString = require('./../../utils');


const prisma = new PrismaClient();
const randomSuffix = generateRandomString(3); // Độ dài của phần ngẫu nhiên
const fullName = `User${randomSuffix}`;
const signup = async (req, res, next) => {
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
                avt: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
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
        const Token = jwt.sign({ customerId: existingUser.accountId }, "abcxyz", {
            expiresIn: '1h',
        });
        // res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        // res.status(200).json({ message: "Login successful" });
        res.json(Token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const customer = async (req, res) => {
    res.json(req.customer)
};

module.exports = { signup, login, customer };
