import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import InputField from '~/components/input';
import { PlusOutlined } from '@ant-design/icons'
import StatusSwitch from '~/components/StatusSwitch';
import { Card } from "@material-tailwind/react";
import { Button, Drawer, Space, Table, } from 'antd';
import { SERVICE_URL } from "~/config";
import axios from "axios";
function Supplier() {
    const { control, handleSubmit, formState: reset } = useForm();
    const [openLayout, setOpenLayout] = useState(false);
    const [dataSupplier, setdataSupplier] = useState([]);
    const handleSwitchChange = async (id, newStatus) => {
        try {
            const response = await axios.post(`${SERVICE_URL}/updatesupplier`, {
                id: id,
                status: newStatus
            });
            // setOpenSuccess(true);
            console.log('Status updated successfully:', response.data);
        } catch (error) {
            // setOpenError(true)
            console.error('Failed to update status:', error);
        }
    }

    const columns = [
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'supplierName',
            key: 'supplierName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Số điện thọai',
            dataIndex: 'supplierPhone',
            key: 'supplierPhone',
            align: 'center',
            render: (text) => <div>{text}</div>,
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'supplierAddress',
            key: 'supplierAddress',
            align: 'center',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                < StatusSwitch
                    initValue={text === true}
                    newvalue={(newValue) => handleSwitchChange(record.supplierId, newValue)}
                />

            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button>edit</Button>
                    <Button danger>delete</Button>
                </Space>
            ),
        },
    ];
    const showDrawer = () => {
        setOpenLayout(true);
    }
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${SERVICE_URL}/createsupplier`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            reset()
            console.log("them du lieu thanh cong : ", response.data);
        } catch (err) {
            console.log(err.message);
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getsupplier`)
            setdataSupplier(response.data)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, [dataSupplier])
    const onClose = () => {
        setOpenLayout(false);
    };

    return (
        <div className="wrap-content">
            <Button className='w-[160px] mb-[30px]' onClick={() => showDrawer()}>
                Thêm nhà cung cấp
                <PlusOutlined />
            </Button>
            <div className="w-[100%]">
                <Drawer onClose={onClose} open={openLayout} title="Thêm nhà cung cấp" width={"40%"}>
                    <div className="form w-[100%]">
                        <h1 className="mb-1 text-[20px]">Nhập thông tin nhà cung cấp</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-3">
                                <div className="mb-3">
                                    <InputField
                                        name="supplierName"
                                        control={control}
                                        label="Tên nhà cung cấp"
                                        placeholder="Nhập tên của nhà cung cấp"
                                        rules={{ required: 'Tên nhà cung cấp là bắt buộc' }}
                                    />
                                </div>


                                <div className="mb-3">
                                    <InputField
                                        name="supplierPhone"
                                        control={control}
                                        label="Số điện thoại"
                                        placeholder="Nhập số điện thoại nhà cung cấp"
                                        rules={{ required: 'số điện thoại là bắt buộc là bắt buộc' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputField
                                        name="supplierAddress"
                                        control={control}
                                        label="Địa chỉ "
                                        placeholder="Nhập địa chỉ"
                                        rules={{ required: 'địa chỉ là bắt buộc' }}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                        </form>
                    </div>
                </Drawer>
                <div className="table w-[100%] mx-auto">
                    <h1 className="mb-1">Thông sản phẩm</h1>
                    <Card className="h-full w-full overflow-scroll">
                        <Table dataSource={dataSupplier} columns={columns} />;
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Supplier;