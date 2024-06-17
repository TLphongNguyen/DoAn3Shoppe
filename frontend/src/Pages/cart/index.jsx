// import { useEffect, useState } from "react";
import HeaderCart from "~/Layout/components/HeaderCart/Headercart";
import Search from "~/components/Search";
import { Link } from "react-router-dom";
import images from "~/assets/img";
import ship from "~/assets/img/more/ship.png";
import CartComponent from "~/components/cart";
import { customerState } from '~/Recoil/customer';
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVICE_URL } from "~/config";
import { useRecoilValue } from 'recoil';
import { formatCurrency } from "~/config/formatCurrency";
function Cart() {

    const customer = useRecoilValue(customerState);
    const [dataCart, setDataCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    // console.log(dataCart);

    const handleCheckboxChange = (index, isChecked, quantity, price) => {
        if (isChecked) {
            setSelectedItems(prevItems => [...prevItems, { index, quantity, price, }]);
        } else {
            setSelectedItems(prevItems => prevItems.filter(item => item.index !== index));
        }
    };
    const getProductsFromSelectedItems = (dataCart, selectedItems) => {
        return selectedItems.map(item => {
            const product = dataCart.find(cartItem => cartItem.phoneId === item.index);
            return { ...product, quantity: item.quantity, price: item.price };
        });
    };
    const totalAmount = selectedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const handleSubmit = async () => {


        const selectedProducts = getProductsFromSelectedItems(dataCart, selectedItems);
        setSelectedProducts(selectedProducts);
        sessionStorage.setItem('selectedPhone', JSON.stringify(selectedProducts));
        sessionStorage.setItem('Totalamount', totalAmount);

        // Perform the form submission or any other logic with the selected items here
    };

    const fetchdata = async () => {
        try {
            const id = customer.customerId
            // console.log(id);
            const response = await axios.get(`${SERVICE_URL}/getcart/${id}`);
            setDataCart(response.data);
            // console.log(response.data);
            sessionStorage.setItem('storeCart', JSON.stringify(response.data));



        } catch (error) {
            console.error('Error fetching customer:', error);
            setDataCart(null);
        }
    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <div className="wrap-content">
            <HeaderCart />
            <div className="flex w-[1200px] justify-between margin-auto h-[84px] items-center">
                <div className="flex items-center">
                    <img className="w-[192px] h-[42px] border-h-[80%] border-r-[1px] border-solid  border-[#ee4d5c]" src={images.logologin} alt="anh logo" />
                    <span className=" pl-[20px] text-[24px] h-[28px] text-[#ee4d5c]">Giỏ Hàng</span>
                </div>
                <div className="">
                    <Search />
                </div>
            </div>
            <div className="bg-[#f5f5f5] pb-[30px]">
                <div className="container pt-5">
                    <div className="shipgwap flex py-3 px-4 bg-[#fffefb] border-[1px] border-[#e0a80066] border-solid mb-2">
                        <div className="ship-img w-[24px] h-5">
                            <img src={ship} alt="" />
                        </div>
                        <span className="ship-title text-[14px] ml-2">
                            Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                        </span>
                    </div>
                    <div className="cart-quanty flex justify-between bg-[#fff] h-14 px-5 items-center mb-3">
                        <div className="checkbox-product flex w-[46.27949%]">
                            <div className="checkboxGwap pl-5 pr-3 mr-2">
                                <input type="checkbox" name="" id="check-box" />
                            </div>
                            <h5 className="name-product text-[#000000cc] text-[14px]">
                                Sản phẩm
                            </h5>
                        </div>
                        <ul className="list-info w-[50%] justify-around">
                            <li className="item-info text-[14px] text-[#888888]">Đơn Giá</li>
                            <li className="item-info text-[14px] text-[#888888]">Số Lượng</li>
                            <li className="item-info text-[14px] text-[#888888]">Số Tiền</li>
                            <li className="item-info text-[14px] text-[#888888]">Thao Tác</li>
                        </ul>
                    </div>
                    <ul className="cart-list  block">
                        {dataCart.map((item, index) => (
                            <CartComponent
                                key={index}
                                index={item.phone.phoneId}
                                name={item.phone.phoneName}
                                img={item.phone.phoneImage}
                                price={item.phone.price}
                                sale={item.phone.discount}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}

                    </ul>
                    <div className="payload flex justify-between p-[20px] bg-[#fff] mt-5">
                        <div className="">
                            <input className="pl-5 pr-3 mr-2" type="checkbox" name="" id="" />
                            <button className="text-[16px] text-[#000000cc]">Chọn tất cả (3)</button>
                        </div>
                        <div className="">
                            <span className="text-[16px] leading-[19px] text-[#222]">Tổng sản phẩm(0 sản phẩm):</span>
                            <span className="text-[24px] ml-[6px] leading-7 text-[#ee4d2d]">{formatCurrency(totalAmount)}</span>
                            <Link to="/payload"><button onClick={handleSubmit} className="w-[210px] bg-[#ee4d2d] text-[#fff] py-[12px] px-[36px] rounded-[2px] ml-[22px]"> mua ngay</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;