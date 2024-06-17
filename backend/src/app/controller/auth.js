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
                numberPhone: "null",
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
            expiresIn: '8h',
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

const UpdateCustomer = async (req, res) => {
    const { fullName, imageUrl, birthDate, email, numberPhone, customerId } = req.body
    console.log(req.body);
    try {
        const update = await prisma.customer.update({
            where: { customerId: customerId },
            data: {
                fullName: fullName,
                avt: imageUrl,
                birthday: new Date(birthDate),
                email: email,
                numberPhone: numberPhone
            }
        })
        res.json(update)
    } catch (error) {
        console.log(error.message);
    }
}
const UpdateAddress = async (req, res) => {
    const { userName, numberPhone, location, customerId } = req.body;
    console.log(customerId);
    try {
        const updateaddress = await prisma.customer.update({
            where: { customerId: customerId },
            data: {
                fullName: userName,
                numberPhone: numberPhone,
                address: location
            }
        })
        res.json(updateaddress);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { signup, login, customer, UpdateCustomer, UpdateAddress };
