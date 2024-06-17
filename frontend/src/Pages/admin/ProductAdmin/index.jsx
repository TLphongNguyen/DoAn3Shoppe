import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputField from '~/components/input';
import StatusSwitch from '~/components/StatusSwitch';
import { SERVICE_URL } from "~/config/index";
import axios from 'axios';
import { storage } from '~/config/firebaseConfig';
import { Card } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { PlusOutlined } from '@ant-design/icons'
import { formatCurrency } from '~/config/formatCurrency';
import { Button, Drawer, Upload, message, Image, Space, Table, } from 'antd';
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

function ProductAdmin() {
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [openLayout, setOpenLayout] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [additionalFileList, setAdditionalFileList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleSwitchChange = async (id, newStatus) => {
        try {
            const response = await axios.post(`${SERVICE_URL}/updatestatusphone`, {
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
            title: 'Tên điện thoại',
            dataIndex: 'phoneName',
            key: 'phoneName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'hãng điện thọai',
            dataIndex: 'brand',
            key: 'brandId',
            align: 'center',
            render: (text) => <div>{text.brandName}</div>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (text) => <div>{formatCurrency(text)}</div>,

        },
        {
            title: 'mã giảm',
            dataIndex: 'discount',
            key: 'discount',
            align: 'center',
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
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                < StatusSwitch
                    initValue={text === true}
                    newvalue={(newValue) => handleSwitchChange(record.phoneId, newValue)}
                />

            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showDrawer(record)}>edit</Button>
                    <Button danger>delete</Button>
                </Space>
            ),
        },
    ];


    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.preview);
        setPreviewOpen(true);
    };


    const beforeUpload = (file) => {
        const isImage = file.type.indexOf('image/') === 0;
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return false;
    };

    const uploadButton = (
        <Button
            icon={<PlusOutlined />}
            style={{
                border: 0,
                background: 'none',
            }}
        >
            Upload
        </Button>
    );

    const showDrawer = (record = null) => {
        if (record) {
            setCurrentRecord(record);
            setIsEditMode(true);
        } else {
            setCurrentRecord(null);
            setIsEditMode(false);
        }
        setOpenLayout(true);
    };
    const onClose = () => {
        setOpenLayout(false);
        setCurrentRecord(null);
    };
    const [dataProducts, setDataProducts] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataOs, setDataOs] = useState([]);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const formData = new FormData();
            formData.append('phoneName', data.phoneName);
            formData.append('brandId', data.phoneType);
            formData.append('pricePhone', data.pricePhone);
            formData.append('discount', data.discount);
            formData.append('osId', data.operatingSystem);
            formData.append('screenSize', data.screenSize);
            formData.append('resolution', data.resolution);
            formData.append('processor', data.processor);
            formData.append('RAM', data.RAM);
            formData.append('ROM', data.ROM);
            formData.append('batteryCapacity', data.batteryCapacity);
            formData.append('mainCameraResolution', data.mainCameraResolution);
            formData.append('frontCameraResolution', data.frontCameraResolution);
            console.log(data.phoneImage);
            let phoneImageUrl = currentRecord.phoneImageUrl;
            if (data.phoneImage && data.phoneImage[0].originFileObj) {
                phoneImageUrl = await uploadToFirebase(data.phoneImage[0].originFileObj, 'Products');
            }
            formData.append('phoneImageUrl', phoneImageUrl);

            let phoneImageUrls = currentRecord.phoneImageUrls;
            if (data.phoneImages && data.phoneImages.length > 0) {
                phoneImageUrls = await Promise.all(
                    data.phoneImages.map((file) => {
                        if (file.originFileObj) {
                            return uploadToFirebase(file.originFileObj, 'Products');
                        } else {
                            return Promise.resolve(file.url);
                        }
                    })
                );
            }
            formData.append('phoneImageUrls', JSON.stringify(phoneImageUrls));


            let response;
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            if (isEditMode && currentRecord) {
                console.log("currentRecord", currentRecord);
                const phoneId = parseInt(currentRecord.phoneId, 10);
                response = await axios.post(`${SERVICE_URL}/updateproduct/${phoneId}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post(`${SERVICE_URL}/createproducts`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            console.log(isEditMode ? 'Cập nhật thành công:' : 'Thêm thành công:', response.data);
            onClose();
            fetchData()
            console.log('Thêm thành công:', response.data);
            handleClick();
            reset();
        } catch (error) {
            errorMessage()
            console.error('Lỗi khi Thêm:', error.response ? error.response.data : error.message);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getproduct`);
            const products = response.data;
            console.log(products);
            // Lấy địa chỉ ảnh từ Firebase Storage cho mỗi category
            const productsWithImages = await Promise.all(products.map(async (product) => {
                // Tạo một hàm hỗ trợ để tải lên ảnh lên Firebase Storage và lấy URL
                const uploadImageToFirebase = async (imageField) => {
                    if (product[imageField]) {
                        const imageRef = ref(storage, `products/${product[imageField]}`);
                        const imageUrl = await getDownloadURL(imageRef);
                        return imageUrl;
                    }
                    return null;
                };

                // Lấy URL của phoneImage
                const phoneImageUrl = await uploadImageToFirebase('phoneImg');
                const phoneImageUrls = await uploadImageToFirebase('phoneImgs');

                // Lấy URL của phoneImages


                // Trả về sản phẩm với thêm thông tin ảnh
                return {
                    ...product,
                    phoneImageUrl,
                    phoneImageUrls
                };
            }));
            setDataProducts(productsWithImages);
            // console.log(dataProducts);
        } catch (error) {
            errorMessage()
            console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        }
    };
    const uploadToFirebase = async (file, folderPath) => {
        try {
            const fileName = Date.now() + '-' + file.name;
            const filePath = `${folderPath}/${fileName}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const publicUrl = await getDownloadURL(storageRef);
            return publicUrl;
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên Firebase:', error);
            throw new Error('Lỗi khi tải ảnh lên Firebase');
        }
    };
    const fetchDataBrand = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getcategory`);
            const categories = response.data;
            // console.log(categories);

            // Lấy địa chỉ ảnh từ Firebase Storage cho mỗi category
            const categoriesWithImages = await Promise.all(categories.map(async (category) => {
                if (category.brandLogo) {
                    const imageRef = ref(storage, category.brandLogo);
                    const imageUrl = await getDownloadURL(imageRef);
                    console.log(imageUrl);
                    return { ...category, imageUrl };

                }
                return category;
            }));
            // console.log(categoriesWithImages);
            setDataBrand(categoriesWithImages);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        }
    };
    const fetchDataOs = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getos`);
            console.log(response.data);
            setDataOs(response.data);

        } catch (error) {
            console.log("os null");
        }
    }
    useEffect(() => {
        fetchDataBrand();
        fetchDataOs()
        fetchData();
    }, []);
    const [open, setOpen] = useState(false);
    const [openEz, setOpenEZ] = useState(false);
    const handleClick = () => {
        setOpen(true);
    }
    const errorMessage = () => {
        setOpenEZ(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenEZ(false);
    };
    useEffect(() => {
        if (currentRecord && isEditMode) {
            // console.log("data reconr", currentRecord.phoneImages);
            const dataDetail = currentRecord.phoneDetails
            // console.log("dataDetail : ", dataDetail[0]);
            setValue('phoneName', currentRecord.phoneName);
            setValue('phoneType', currentRecord.brandId);
            setValue('pricePhone', currentRecord.price);
            setValue('discount', currentRecord.discount);
            setValue('quantity', currentRecord.quantity);
            setValue('screenSize', dataDetail[0].screenSize);
            setValue('resolution', dataDetail[0].resolution);
            setValue('processor', dataDetail[0].processor);
            setValue('RAM', dataDetail[0].RAM);
            setValue('ROM', dataDetail[0].ROM);
            setValue('batteryCapacity', dataDetail[0].batteryCapacity);
            setValue('mainCameraResolution', dataDetail[0].mainCameraResolution);
            setValue('frontCameraResolution', dataDetail[0].frontCameraResolution);
            if (currentRecord.phoneImage) {
                const mainImage = [{
                    uid: '-1',
                    name: 'image',
                    status: 'done',
                    url: currentRecord.phoneImage, // Đường dẫn tới ảnh
                }];
                setFileList(mainImage);
                setValue('phoneImage', mainImage);
            }

            // Thiết lập danh sách ảnh th

            if (currentRecord.phoneImages) {
                let additionalImages = []
                let phoneImagesArray = currentRecord.phoneImages



                phoneImagesArray = JSON.parse(currentRecord.phoneImages);
                additionalImages = phoneImagesArray.map((img, index) => ({
                    uid: index,
                    name: `image-${index}`,
                    status: 'done',
                    url: img, // Đường dẫn tới ảnh
                }));

                // console.log(phoneImagesArray);
                setAdditionalFileList(additionalImages);
                setValue('phoneImages', additionalImages);
            }
            // Đặt thêm các giá trị khác nếu cần
        }

    }, [currentRecord, isEditMode, setValue]);
    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert

                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}

                >
                    Thêm sản phẩm thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={openEz} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert

                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}

                >
                    Thêm sản phẩm thất bại!
                </Alert>
            </Snackbar>
            <div className="wrap-body w-[100%]">
                <Button className='w-[160px] mb-[30px]' onClick={() => showDrawer()}>
                    Thêm sản phẩm
                    <PlusOutlined />
                </Button>
                <div className="w-[100%]">
                    <Drawer onClose={onClose} open={openLayout} title={isEditMode ? "Edit Record" : "Add New Record"} width={"60%"}>
                        <div className="form w-[100%]">
                            <h1 className="mb-1 text-[20px]">Nhập thông tin sản phẩm</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid md:grid-cols-2">
                                    <div className="p-3">
                                        <div className="mb-3">
                                            <InputField
                                                name="phoneName"
                                                control={control}
                                                label="Tên điện thoại"
                                                placeholder="Nhập tên của điện thoại"
                                                rules={{ required: 'Tên điện thoại là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="mb-3 min-h-[68px]">
                                            <label htmlFor="phoneType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại điện thoại</label>
                                            <Controller
                                                name="phoneType"
                                                control={control}
                                                rules={{ required: 'Loại điện thoại là bắt buộc' }}
                                                render={({ field }) => (
                                                    <select
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        {dataBrand.map(item => (
                                                            <option key={item.brandId} value={item.brandId}>{item.brandName}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {errors.phoneType && <p className="text-red-500 text-sm">{errors.phoneType.message}</p>}
                                        </div>
                                        <div className="mb-3 min-h-[68px]">
                                            <label htmlFor="operatingSystem" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hệ điều hành</label>
                                            <Controller
                                                name="operatingSystem"
                                                control={control}
                                                rules={{ required: 'Hệ điều hành là bắt buộc' }}
                                                render={({ field }) => (
                                                    <select
                                                        {...field}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        {dataOs.map(item => (
                                                            <option key={item.osId} value={item.osId}>{item.osName}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {errors.operatingSystem && <p className="text-red-500 text-sm">{errors.operatingSystem.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <InputField
                                                name="pricePhone"
                                                control={control}
                                                label="Giá"
                                                placeholder="Nhập giá của điện thoại"
                                                rules={{ required: 'Giá là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputField
                                                name="discount"
                                                control={control}
                                                label="Giảm giá"
                                                placeholder="Nhập mã giảm giá"
                                                rules={{ required: 'Giảm giá là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phoneImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh</label>
                                            <Controller
                                                name="phoneImage"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Upload
                                                            {...field}
                                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onPreview={handlePreview}
                                                            onChange={({ fileList }) => {
                                                                setFileList(fileList);
                                                                field.onChange(fileList);
                                                            }}
                                                            beforeUpload={beforeUpload}
                                                        >
                                                            {fileList.length >= 8 ? null : uploadButton}
                                                        </Upload>
                                                        {previewImage && (
                                                            <Image.PreviewGroup preview={{ visible: previewOpen, onVisibleChange: setPreviewOpen }}>
                                                                <Image src={previewImage} />
                                                            </Image.PreviewGroup>
                                                        )}
                                                    </>
                                                )}
                                            />
                                            {errors.phoneImage && <p className="text-red-500 text-sm">{errors.phoneImage.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phoneImages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh thêm</label>
                                            <Controller
                                                name="phoneImages"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Upload
                                                            {...field}
                                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                            listType="picture-card"
                                                            fileList={additionalFileList}
                                                            onPreview={handlePreview}
                                                            onChange={({ fileList }) => {
                                                                setAdditionalFileList(fileList);
                                                                field.onChange(fileList);
                                                            }}
                                                            beforeUpload={beforeUpload}
                                                            multiple
                                                        >
                                                            {additionalFileList.length >= 8 ? null : uploadButton}
                                                        </Upload>
                                                        {previewImage && (
                                                            <Image.PreviewGroup preview={{ visible: previewOpen, onVisibleChange: setPreviewOpen }}>
                                                                <Image src={previewImage} />
                                                            </Image.PreviewGroup>
                                                        )}
                                                    </>
                                                )}
                                            />
                                            {errors.phoneImages && <p className="text-red-500 text-sm">{errors.phoneImages.message}</p>}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <div className="mb-3">
                                            <InputField
                                                name="screenSize"
                                                control={control}
                                                label="Kích thước màn hình"
                                                placeholder="Kích thước màn hình"
                                                rules={{ required: 'Kích thước màn hình là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputField
                                                name="resolution"
                                                control={control}
                                                label="Độ phân giải"
                                                placeholder="Độ phân giải"
                                                rules={{ required: 'Độ phân giải là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputField
                                                name="processor"
                                                control={control}
                                                label="Chip xử lý"
                                                placeholder="Chip xử lý"
                                                rules={{ required: 'Chip xử lý là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <InputField
                                                name="ROM"
                                                control={control}
                                                label="Bộ nhớ"
                                                placeholder="Bộ nhớ"
                                                rules={{ required: 'Bộ nhớ là bắt buộc' }}
                                            />
                                            <InputField
                                                name="RAM"
                                                control={control}
                                                label="RAM"
                                                placeholder="RAM"
                                                rules={{ required: 'RAM là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <InputField
                                                name="batteryCapacity"
                                                control={control}
                                                label="Dung lượng pin"
                                                placeholder="Dung lượng pin"
                                                rules={{ required: 'Dung lượng pin là bắt buộc' }}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <InputField
                                                name="frontCameraResolution"
                                                control={control}
                                                label="Độ phân giải camera trước"
                                                placeholder="Độ phân giải camera trước"
                                                rules={{ required: 'Độ phân giải camera trước là bắt buộc' }}
                                            />
                                            <InputField
                                                name="mainCameraResolution"
                                                control={control}
                                                label="Độ phân giải camera sau"
                                                placeholder="Độ phân giải camera sau"
                                                rules={{ required: 'Độ phân giải camera sau là bắt buộc' }}
                                            />
                                        </div>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Drawer>
                    <div className="table w-[100%] mx-auto">
                        <h1 className="mb-1">Thông sản phẩm</h1>
                        <Card className="h-full w-full overflow-scroll">
                            <Table dataSource={dataProducts} columns={columns} />;
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductAdmin;
