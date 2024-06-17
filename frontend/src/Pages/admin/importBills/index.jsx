import { useState, useEffect } from "react";
import axios from "axios";
import { SERVICE_URL } from "~/config";
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { Button, Drawer, Space, Table, Image, } from 'antd';
import { formatCurrency } from '~/config/formatCurrency';
import { Card } from "@material-tailwind/react";
import InputField from '~/components/input';
import { PlusOutlined } from '@ant-design/icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';


function ImportBills() {
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [databills, setDataBills] = useState([])
    const [dataSupplier, setDataSupplier] = useState([])
    const [openLayout, setOpenLayout] = useState(false)
    const [dataPhone, setDataPhone] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([]);
    const handleProductAdd = (product) => {
        setSelectedProducts(prevSelected => [...prevSelected, product]);
    };
    const customer = useRecoilValue(customerState);
    const columnsBills = [
        {
            title: 'Tên người nhập',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <div>{text}</div>,


        },
        {
            title: 'ảnh điện thoại',
            dataIndex: 'phoneImage',
            key: 'phoneImage',
            render: (text) => <Image style={{ minHeight: 60 }} src={text} alt="phone image" width={100} />,
        },
        {
            title: 'số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',

        },
        {
            title: 'nhà cung cấp',
            dataIndex: 'supplierName',
            key: 'supplierName',
            align: 'center',
            render: (text) => <div>{text}</div>,

        },
        {
            title: 'tên sản phẩm',
            dataIndex: 'phoneName',
            key: 'phoneName',
            align: 'center',
            render: (text) => <div>{text}</div>,

        },
        {
            title: 'Ngày nhập hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            align: 'center',
            render: (text) => moment(text).format('DD-MM-YYYY')
        },
    ]
    const columns = [
        {
            title: 'Tên điện thoại',
            dataIndex: 'phoneName',
            key: 'phoneName',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (text) => <div>{formatCurrency(text)}</div>,

        },

        {
            title: 'số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',

        },
        {
            title: 'ảnh điện thoại',
            dataIndex: 'phoneImage',
            key: 'phoneImage',
            render: (text) => <Image style={{ minHeight: 60 }} src={text} alt="phone image" width={100} />,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button onClick={() => showDrawer(record)}>edit</Button> */}
                    <Button onClick={() => handleProductAdd(record)}>Nhập sản phẩm này</Button>
                </Space>
            ),
        },
    ];
    const fetchDataBills = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getimportbills`)
            setDataBills(response.data)
            console.log(response.data);

        } catch (err) {
            console.log(err.message);
        }
    }
    const mergeProducts = (data) => {
        const products = data.flatMap(bill =>
            bill.purchaseOrderDetails.map(detail => {
                const { phone } = detail;
                return {

                    orderDate: bill.orderDate,
                    phoneName: phone.phoneName,
                    phoneImage: phone.phoneImage,
                    unitPrice: detail.unitPrice,
                    quantity: detail.quantity,
                    supplierName: bill.supplier.supplierName,
                    fullName: bill.customer.fullName
                };
            })
        );
        return products;
    };
    const processedData = mergeProducts(databills);
    const fetchDataSupplier = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getsupplieracyive`)
            setDataSupplier(response.data)
        } catch (err) {
            console.log(err.message);

        }
    }
    const fetchdataPhone = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getproductactive`);
            setDataPhone(response.data)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchDataBills()
    }, [])
    useEffect(() => {
        fetchDataSupplier()
        fetchdataPhone()
    }, [])
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = now.getFullYear();
            const orderDate = `${year}-${month}-${day}`;
            if (!Array.isArray(selectedProducts)) {
                throw new Error("selectedProducts không phải là mảng");
            }

            // Lấy danh sách phoneId từ selectedProducts
            const phoneIds = selectedProducts.map(product => product.phoneId);

            const formData = {
                orderDate: orderDate,
                customerId: customer.customerId,
                supplierId: data.phoneType,
                phoneId: phoneIds,
                quantity: data.discount,
                unitPrice: data.pricePhone


            };
            const response = await axios.post(`${SERVICE_URL}/importbills`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log('Hóa đơn nhập đã được tạo:', response.data);
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn:', error.response ? error.response.data : error.message);
        }
    }
    const onClose = () => {
        setOpenLayout(false);

    };
    const showDrawer = () => {
        setOpenLayout(true);

    }
    const handleDeleteProduct = (id) => {
        setSelectedProducts(prevProducts => prevProducts.filter(product => product.phoneId !== id));
    };

    return (
        <div className="wrap-content">
            <Button className='w-[160px] mb-[30px]' onClick={() => showDrawer()}>
                Thêm hóa đơn nhập
                <PlusOutlined />
            </Button>
            <h1 className="mb-1">Thông tin hóa đơn nhập</h1>
            <Card className="h-full w-full overflow-scroll">
                <Table dataSource={processedData} columns={columnsBills} />;
            </Card>
            <Drawer onClose={onClose} open={openLayout} title="thêm mới hóa đơn nhập" width={"80%"}>
                <div className="form w-[100%]">
                    <h1 className="mb-1 text-[20px]">Nhập thông tin của hóa đơn nhập</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-2">
                            <div className="p-3">
                                <div className="mb-3 min-h-[68px]">
                                    <label htmlFor="phoneType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">nhà cung cấp</label>
                                    <Controller
                                        name="phoneType"
                                        control={control}
                                        rules={{ required: 'nhà cung cấp là bắt buộc' }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                {dataSupplier.map(item => (
                                                    <option key={item.supplierId} value={item.supplierId}>{item.supplierName}</option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                    {errors.phoneType && <p className="text-red-500 text-sm">{errors.phoneType.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <InputField
                                        name="pricePhone"
                                        control={control}
                                        label="Giá nhập"
                                        placeholder="Nhập giá của điện thoại"
                                        rules={{ required: 'Giá là bắt buộc' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputField
                                        name="discount"
                                        control={control}
                                        label="Số lượng"
                                        placeholder="Nhập số lượng"
                                        rules={{ required: 'số lượng là bắt buộc' }}
                                    />
                                </div>
                                <ul className="list-product">
                                    {selectedProducts.length > 0 ? (
                                        selectedProducts.map((item, index) => (

                                            <li className="">
                                                <div className="cart-prodcut mt-[15px] pt-[15px] pb-5 w-[100%]">
                                                    <div className="product-item flex items-center justify-between px-5 pb-6">
                                                        <div className='flex flex-1 mr-5'>
                                                            <div className="product-gwap flex mr-[20px]">
                                                                <div className="product-img min-w-[80px] max-w-20 h-[80px]">
                                                                    <img src={item.phoneImage} alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="product-category items-center flex">
                                                                <div className="gwap-title ml-2">
                                                                    <span className="product-title text-[14px] mb-1 line-clamp-2 leading-4 mr-4">
                                                                        {item.phoneName}
                                                                    </span>
                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div className="gwap-price flex text-right" >

                                                            <div className="price-item">
                                                                <span className="price-new text-[#ee4d2d] text-[14px]">
                                                                    {formatCurrency(item.price)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <button onClick={() => handleDeleteProduct(item.phoneId)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <span className="text-[18px] w-[100%] text-center block">Chọn sản phẩm muốn nhập</span>
                                    )}
                                </ul>
                            </div>
                            <div className="p-3">
                                <Card className="h-full w-full overflow-scroll">
                                    <Table dataSource={dataPhone} columns={columns} />;
                                </Card>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </Drawer>
        </div>
    );
}

export default ImportBills;