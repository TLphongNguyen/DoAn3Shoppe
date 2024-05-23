import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputField from '~/components/input';
import TableData from '~/components/tableData';
import { SERVICE_URL } from "~/config/index";
import axios from 'axios';
import { storage } from '~/config/firebaseConfig';
import { Card, Typography } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ProductAdmin() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [previewSrc, setPreviewSrc] = useState(null);
    const [dataProducts, setDataProducts] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataOs, setDataOs] = useState([]);

    const headers = ['Tên điện thoại', 'hãng điện thọai', 'giá', 'mã giảm', 'số lượng', 'ảnh điện thoại', 'status'];

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
            // formData.append('phoneImage', data.phoneImage[0]);
            // formData.append('phoneImages', data.phoneImages[0]);
            const phoneImageUrl = await uploadToFirebase(data.phoneImage[0], 'Products');
            formData.append('phoneImageUrl', phoneImageUrl);
            const phoneImageUrls = await uploadToFirebase(data.phoneImages[0], 'Products');
            formData.append('phoneImageUrls', phoneImageUrls);


            const response = await axios.post(`${SERVICE_URL}/createproducts`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Thêm thành công:', response.data);
            reset();
        } catch (error) {
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
            console.log(dataProducts);
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
            console.log(categories);

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
            console.log(categoriesWithImages);
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
                <div className="w-[100%]">
                    <div className="form w-[100%]">
                        <h1 className="mb-1 text-[20px]">Nhập thông sản phẩm</h1>
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
                                            rules={{ required: 'Hình ảnh là bắt buộc' }}
                                            render={({ field }) => (
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        handleFileChange(e);
                                                        field.onChange(e.target.files);
                                                    }}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            )}
                                        />
                                        {errors.phoneImage && <p className="text-red-500 text-sm">{errors.phoneImage.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phoneImages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh thêm</label>
                                        <Controller
                                            name="phoneImages"
                                            control={control}
                                            rules={{ required: 'Hình ảnh thêm là bắt buộc' }}
                                            render={({ field }) => (
                                                <input
                                                    type="file"
                                                    onChange={(e) => field.onChange(e.target.files)}
                                                    multiple
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
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
                    <div className="table w-[100%] mx-auto">
                        <h1 className="mb-1">Thông sản phẩm</h1>
                        <Card className="h-full w-full overflow-scroll">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {headers.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataProducts.map((item, index) => (
                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.phoneName}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.brand.brandName}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.price}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.quantity}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.discount}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    <img src={item.phoneImage} alt="" className='h-[50px] w-[50px]' />
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    Edit
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductAdmin;
