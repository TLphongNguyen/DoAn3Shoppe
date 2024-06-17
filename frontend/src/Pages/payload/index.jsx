import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderCart from "~/Layout/components/HeaderCart/Headercart";
import images from "~/assets/img";
import sale from "~/assets/img/more/sale.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { SERVICE_URL } from "~/config";
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';
import LocationDialog from "~/components/locationDialog";
import { useFetchCustomer, useUpdateCustomer } from "~/hooks/service";
import { formatCurrency } from "~/config/formatCurrency";
import NotificationSnackbar from "~/components/NotificationSnackbar";

function PayLoad() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseNotifi = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    const customer = useRecoilValue(customerState);
    const updateCustomer = useUpdateCustomer();
    useFetchCustomer();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const formJson = Object.fromEntries(data.entries());
        const formData = {
            customerId: customer.customerId,
            fullName: formJson.userName,
            numberPhone: formJson.numberPhone,
            address: formJson.location
        };
        updateCustomer(formData);
        console.log(formData);
        handleClose();
    };
    // dataproduct.map((data) => {
    //     console.log(data);
    // })
    const totalCart = sessionStorage.getItem('Totalamount')
    const priceShip = 37500

    useEffect(() => {
        const dataproduct = sessionStorage.getItem('selectedPhone')
        if (dataproduct) {
            setData(JSON.parse(dataproduct))
        }

    }, [])
    const handleSubmid = async () => {
        try {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = now.getFullYear();
            const orderDate = `${year}-${month}-${day}`;
            const details = data.map(product => ({

                quantity: product.quantity,
                unitPrice: totalCart,
                phoneId: product.phoneId,
            }));
            console.log();
            const formData = {
                orderDate: orderDate,
                customerName: customer.fullName,
                shippingAddress: customer.address,
                numberPhone: customer.numberPhone,
                customerId: customer.customerId,
                details,
            };
            const response = await axios.post(`${SERVICE_URL}/createbills`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log('Hóa đơn đã được tạo:', response.data);
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="wrap-content mb-[70px]">
            <NotificationSnackbar
                open={openSuccess}
                onClose={handleCloseNotifi}
                severity="success"
                message="mua hàng thành công, vui lòng kiểm tra giỏ hàng!"
            />
            <NotificationSnackbar
                open={openError}
                onClose={handleCloseNotifi}
                severity="error"
                message="mua hàng thất bại!, vui lòng kiểm tra lại thông tin"
            />
            <HeaderCart />
            <div className="flex w-[1200px] justify-between margin-auto h-[84px] items-center">
                <div className="flex items-center">
                    <img className="w-[192px] h-[42px] border-h-[80%] border-r-[1px] border-solid  border-[#ee4d5c]" src={images.logologin} alt="anh logo" />
                    <span className=" pl-[20px] text-[24px] h-[28px] text-[#ee4d5c]">thanh toán</span>
                </div>
                <div className="">
                </div>
            </div>
            <div className="mt-[20px] bg-[#f5f5f5] pt-3 ">
                <div className="container ">
                    <div className="location ">
                        <div className="border-top__cart"></div>
                        <div className="pt-7 px-[30px] pb-6 bg-[#fff]">
                            <div className=" text-[18px] text-[#ee4d2d] capitalize mb-5">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                Địa chỉ nhận hàng
                            </div>
                            <div className="flex items-center">
                                <div className="text-[#222] text-[16px] font-[700]">{customer.fullName},   {customer.numberPhone}</div>

                                <div className="ml-5 text-[16px]">{customer.address}</div>
                                <div className="ml-4 h-[18px] flex items-center rounded-[1px] border-[.5px] border-[#ee4d2d] border-solid text-[10px] py-[2px] px-[5px]">Mặc định</div>
                                <div className="pl-10">
                                    <button onClick={handleClickOpen} className="text-[#4080ee] text-[14px] ">Thay Đổi</button>
                                </div>
                            </div>
                        </div>
                        <div className="product mt-3 ">
                            <div className="px-[30px] py-[24px] flex justify-between bg-[#fff] border-b-[1px] border-[solid] border-[#ccc]">
                                <div className="w-[40%]">
                                    Sản phẩm
                                </div>
                                <div className="w-[60%] flex">
                                    <span className="text-center flex-1">Đơn giá</span>
                                    <span className="text-center flex-1">Số lượng</span>
                                    <span className="text-center flex-2">Thành tiền</span>
                                </div>
                            </div>
                            <div className="cart-prodcut pb-5 w-[100%]">
                                {data.map((item) => (
                                    <div className="product-item flex items-center py-5 border-b-[1px] border-[solid] border-[#ccc] bg-[#fff] px-5">
                                        <div className="w-[40%] flex items-center">
                                            <div className="product-gwap flex">
                                                <div className="product-img min-w-[80px] max-w-20 h-[80px]">
                                                    <img src={item.phone.phoneImage} alt="" />
                                                </div>
                                                <div className="gwap-title">
                                                    <span className="product-title text-[14px] mb-1 line-clamp-2 leading-4">
                                                        {item.phone.phoneName}
                                                    </span>
                                                    <img src={sale} alt="" className="img-sale h-[18px]" />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[60%] flex">
                                            <div className="gwap-price text-center flex-1">
                                                <span className="price-new text-[#000000de] text-[14px]">
                                                    {formatCurrency(item.phone.price)}
                                                </span>
                                            </div>
                                            <div className="gwap-number flex-1">
                                                <div className="quantity">
                                                    <div className="mr-[15px]">
                                                        <div className="text-center">{item.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="into-money flex-2">
                                                <span className="price-now text-center text-[#ee4d2d] text-[14px]">{formatCurrency((item.price) * (item.quantity))}</span>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="payload bg-[#fff] mt-3 p-4 ">
                            <div className="flex justify-between">
                                <div></div>
                                <div className="">
                                    <div className="flex items-center">
                                        <span className="text-[14px] text-[#0000008a] h-10 block">Tổng tiền hàng</span>
                                        <span className="text-right min-w-[210px] block h-10 pr-[25px] pl-[10px] text-[14px] text-[#0000008a]">{formatCurrency(totalCart)}</span>
                                    </div>
                                    <div className=" flex items-center">
                                        <span className="text-[14px] text-[#0000008a] h-10 block">Phí vận chuyến</span>
                                        <span className="text-right min-w-[210px] block h-10 pr-[25px] pl-[10px] text-[14px] text-[#0000008a]">{formatCurrency(priceShip)}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-[14px] text-[#0000008a] h-10 block leading-[40px]">Tổng thanh toán</span>
                                        <span className="text-right text-[28px] text-[#ee4d2d] font-[500] pr-[25px] pl-[10px] min-w-[210px]">{formatCurrency(parseInt(totalCart) + parseInt(priceShip))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-[10px] bg-[#fffdf8] border-t-[1px] border-dashed border-[#00000017] ">
                            <div className=" px-[30px] flex justify-between items-center">
                                <span className="text-[#05a] text-[14px] pt-[40px] pb-[32px] pr-[25px]">
                                    <p className="inline pl-[15px] text-[#0000008a] text-[14px]">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo </p>
                                    Điều khoản Shopee
                                </span>
                                <button onClick={() => handleSubmid()} className="bg-[#ee4d2d] text-[#fff] py-[12px] px-[14px] w-[210px] h-[40px] shadow rounded-[4px]">
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LocationDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default PayLoad;