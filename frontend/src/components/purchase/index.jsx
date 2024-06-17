import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from '~/config/formatCurrency';
import { SERVICE_URL } from '~/config';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';

function Purchase() {
    const [data, setData] = useState([])
    const customer = useRecoilValue(customerState);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getbill/${customer.customerId}`)
            setData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const mergeProducts = (data) => {
        const products = data.flatMap(bill =>
            bill.billDetails.map(detail => {
                const { phone } = detail;
                return {
                    customerId: bill.customerId,
                    phoneName: phone.phoneName,
                    phoneImage: phone.phoneImage,
                    price: phone.price,
                    totalPrice: detail.unitPrice,
                    quantity: detail.quantity,
                    brandName: phone.brand.brandName,
                    status: bill.status
                };
            })
        );
        return products;
    };
    const processedData = mergeProducts(data);
    console.log("processedData: ", processedData);
    return (
        <div className="wrapcontent w-[100%]">
            <div className="menu sticky bg-[#fff] rounded-[2px] mb-[10px]">
                <ul className="list-menu justify-around">
                    <li className="item-menu text-[#000000cc] text-[16px] leading-5 py-4 text-center cursor-pointer select-none ">Tất cả</li>
                    <li className="item-menu text-[#000000cc] text-[16px] leading-5 py-4 text-center cursor-pointer select-none ">Chờ Thanh toán</li>
                    <li className="item-menu text-[#000000cc] text-[16px] leading-5 py-4 text-center cursor-pointer select-none ">Hoàn thành</li>
                    <li className="item-menu text-[#000000cc] text-[16px] leading-5 py-4 text-center cursor-pointer select-none ">Đã hủy</li>
                </ul>
            </div>
            <div className="search w-[100%] bg-[#eaeaea] my-3 py-3 px-3">
                <form action="" className="flex items-center">
                    <input className='w-[100%]' type="text" placeholder='Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm' />
                    <button type='submit' className='w-8 h-8'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                </form>
            </div>
            <ul className="listPurchase block">
                {processedData.length > 1 ? (
                    processedData.map((item) => (

                        <li className=" bg-[#fff] cart-item w-[100%] mb-5 ">
                            <div className="cart-item border-b-[1px] border-[#00000017] border-solid">
                                <div className="cart-shop flex px-5 h-[60px] items-center justify-between">
                                    <span className="name-shop text-[14px] text-[#000000de] ml-2">
                                        Viettel Store - AAR

                                    </span>
                                    <div className="cart-icon ml-2">
                                        {item.status ? (
                                            <span className='text-[#ee4d2d]'>Đang giao hàng</span>
                                        ) : (
                                            <span className='text-[#ee4d2d]'>Đã đặt</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="cart-prodcut mt-[15px] pt-[15px] pb-5 w-[100%]">
                                <div className="product-item flex items-center justify-between px-5 pb-6">
                                    <div className='flex flex-1'>
                                        <div className="product-gwap flex mr-[20px]">
                                            <div className="product-img min-w-[80px] max-w-20 h-[80px]">
                                                <img src={item.phoneImage} alt="" />
                                            </div>
                                        </div>
                                        <div className="product-category">
                                            <div className="gwap-title ml-2">
                                                <span className="product-title text-[14px] mb-1 line-clamp-2 leading-4">
                                                    {item.phoneName}
                                                </span>
                                            </div>
                                            <span className="category-new text-[#0000008a] text-[14px]">
                                                {item.brandName}
                                            </span>
                                            <div><span className="quantity">x{item.quantity}</span></div>
                                        </div>
                                    </div>
                                    <div className="gwap-price flex text-right" >
                                        <div className="price-item">
                                            <span className="price-old text-[#0000008a] text-[14px] line-through mr-[10px]">
                                                {formatCurrency(item.price)}
                                            </span>
                                        </div>
                                        <div className="price-item">
                                            <span className="price-new text-[#ee4d2d] text-[14px]">
                                                {formatCurrency(item.price)}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className='border-t-[1px] border-solid border-[#00000017] '>
                                    <div className="flex justify-between pt-6 px-6 pb-4 bg-[#fffefb] ">
                                        <div className=""></div>
                                        <div className='flex items-center'>
                                            <div className="">
                                                <span className='text-[14px] text-[#000000cc] leading-5 mr-3'>
                                                    Thành tiền
                                                </span>
                                            </div>
                                            <div className="into-money">
                                                <span className="price-now text-[#ee4d2d] text-[24px]">{formatCurrency((item.price) * (item.quantity))}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))

                ) : (
                    <span className="text-[20px] w-[100%] text-center block">Chưa có đơn hàng</span>
                )}
            </ul>
        </div>
    );
}

export default Purchase;