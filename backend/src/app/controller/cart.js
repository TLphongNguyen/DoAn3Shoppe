const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();

const CreateCart = async (req, res, next) => {
    const { idUser, idProduct, quantity } = req.body;
    // console.log(idProduct);

    try {
        // Tìm kiếm sản phẩm trong giỏ hàng của người dùng
        const cartItem = await prisma.shoppingCart.findFirst({
            where: {
                phoneId: parseInt(idProduct),
                customerId: parseInt(idUser)
            }
        });
        if (cartItem) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            const updatedCart = await prisma.shoppingCart.update({
                where: {
                    cartItemId: cartItem.cartItemId
                },
                data: {
                    quantity: cartItem.quantity + parseInt(quantity) // Tăng số lượng sản phẩm
                }
            });
            res.json(updatedCart);
        } else {
            // Nếu sản phẩm chưa tồn tại, tạo mới mục giỏ hàng
            const newCart = await prisma.shoppingCart.create({
                data: {
                    quantity: parseInt(quantity),
                    phone: {
                        connect: {
                            phoneId: parseInt(idProduct)
                        }
                    },
                    customer: {
                        connect: {
                            customerId: parseInt(idUser)
                        }
                    }
                }
            });
            res.json(newCart);
        }
    } catch (err) {
        // Xử lý lỗi và trả về phản hồi thích hợp
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getCartByCustomer = async (req, res) => {
    const idUser = req.params.id;
    try {
        const dataCart = await prisma.shoppingCart.findMany({
            where: { customerId: parseInt(idUser) },
            include: {
                phone: true,
            }
        })
        res.json(dataCart);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { CreateCart, getCartByCustomer };
