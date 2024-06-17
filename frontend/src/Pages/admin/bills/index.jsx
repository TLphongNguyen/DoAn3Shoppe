import React, { useState, useEffect } from 'react';
import { Button, Drawer, Space, Table, } from 'antd';
import { formatCurrency } from '~/config/formatCurrency';
import StatusSwitch from '~/components/StatusSwitch';
import axios from 'axios';
import { Card } from "@material-tailwind/react";
import { SERVICE_URL } from '~/config';
import moment from 'moment';
import NotificationSnackbar from '~/components/NotificationSnackbar';

function Bills() {
    const [data, setData] = useState([])
    const [openLayout, setOpenLayout] = useState(false);
    const [processedData, setProcessedData] = useState([])
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.post(`${SERVICE_URL}/updatestatus`, {
                orderId,
                status: newStatus
            });
            setOpenSuccess(true);
            console.log('Status updated successfully:', response.data);
        } catch (error) {
            setOpenError(true)
            console.error('Failed to update status:', error);
        }
    };
    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',

        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            align: 'center',
            render: (text) => moment(text).format('DD-MM-YYYY')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            align: 'center',
            render: (text) => <div>{text}</div>,

        },
        {
            title: 'địa chỉ giao hàng',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            align: 'center',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                < StatusSwitch initValue={text === true}
                    newvalue={(newValue) => updateStatus(record.orderId, newValue)}
                />

            )
        },
        {
            title: 'chi tiết hóa đơn',
            key: 'action',
            align: 'center',
            render: (data) => (
                <Space size="middle">
                    <Button onClick={() => showDrawer(data.orderId)}>chi tiết</Button>

                </Space>
            ),
        },
    ];
    const fetchDataDetails = async (id) => {
        console.log("idDetail :", id);
        try {
            const response = await axios.get(`${SERVICE_URL}/getdetailbill/${id}`);

            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const showDrawer = async (id) => {
        try {
            const dataDetail = await fetchDataDetails(id);
            const mergeProducts = (dataDetail) => {
                const products = dataDetail.map(detail => {
                    return {
                        phoneName: detail.phone.phoneName,
                        phoneImage: detail.phone.phoneImage,
                        price: detail.phone.price,
                        totalPrice: detail.unitPrice,
                        quantity: detail.quantity,
                    };
                });
                return products;
            };

            const databill = mergeProducts(dataDetail);
            setProcessedData(databill);
            setOpenLayout(true);
        } catch (error) {
            console.error('Failed to fetch and process data details:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getbilladmin`);
            setData(response.data);
            console.log("data bills", response.data);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const onClose = () => {
        setOpenLayout(false);

    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };

    return (
        <div className="table w-[100%] mx-auto">
            <NotificationSnackbar
                open={openSuccess}
                onClose={handleClose}
                severity="success"
                message="xác nhận đơn hàng thành công"
            />
            <NotificationSnackbar
                open={openError}
                onClose={handleClose}
                severity="error"
                message="xác nhận đơn hàng thất bại!, vui lòng kiểm tra lại thông tin"
            />


            <h1 className="mb-1">Thông sản phẩm</h1>
            <Card className="h-full w-full overflow-scroll">
                <Table dataSource={data} columns={columns} />;
            </Card>
            <Drawer
                title="chi tiết đơn hàng"
                closable={false}
                onClose={onClose}
                open={openLayout}
                placement={"bottom"}
                height={"600px"}
            >
                <ul className="listPurchase block">
                    {processedData.length > 0 ? (
                        processedData.map((item, index) => (

                            <li key={index} className=" bg-[#fff] cart-item w-[100%] mb-5 ">
                                <div className="cart-prodcut mt-[15px] pt-[15px] pb-5 w-[100%]">
                                    <div className="product-item flex items-center justify-between px-5 pb-6">
                                        <div className='flex flex-1'>
                                            <div className="product-gwap flex mr-[20px]">
                                                <div className="product-img min-w-[80px] max-w-20 h-[80px]">
                                                    <img src={item.phoneImage} alt="1" />
                                                </div>
                                            </div>
                                            <div className="product-category">
                                                <div className="gwap-title ml-2">
                                                    <span className="product-title text-[14px] mb-1 line-clamp-2 leading-4">
                                                        {item.phoneName}
                                                    </span>
                                                </div>
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
            </Drawer>
        </div>
    );
}

export default Bills;