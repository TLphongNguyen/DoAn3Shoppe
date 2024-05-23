import React, { useEffect, useState } from 'react';
import InputField from "~/components/input";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { SERVICE_URL } from '~/config/index';
import { storage } from '~/config/firebaseConfig';
import { Card, Typography } from "@material-tailwind/react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function Category() {
    const headers = ['Tên hãng điện thoại', 'logo hãng'];
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [previewSrc, setPreviewSrc] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewSrc(null);
        }
    };
    const onSubmit = async (data) => {
        try {

            const formData = new FormData();
            formData.append('brandName', data.brandName);
            formData.append('brandLogo', data.brandLogo[0].name);

            // Tải ảnh lên Firebase Storage

            const file = formData.get('brandLogo');
            const fileName = Date.now() + '-' + file;
            console.log(fileName);

            console.log(storage);
            const storageRef = ref(storage, fileName)
            console.log(file)
            await uploadBytes(storageRef, data.brandLogo[0])
            const publicUrl = await getDownloadURL(storageRef);

            // Lấy đường dẫn công khai tới ảnh đã tải lên

            console.log(publicUrl);
            try {
                // Gửi dữ liệu đến server
                const response = await axios.post(`${SERVICE_URL}/createproducts`, {
                    brandName: data.brandName,
                    brandLogo: publicUrl
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                handleClick()
                fetchData()
                console.log('Thêm thành công:', response.data);
                reset();
            } catch (error) {
                console.error('Lỗi khi Thêm:', error.response ? error.response.data : error.message);
            }
        } catch (error) {
            errorMessage()
            console.error('Lỗi khi Thêm:', error.response ? error.response.data : error.message);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/getcategory`);
            const categories = response.data;
            console.log(categories);

            // Lấy địa chỉ ảnh từ Firebase Storage cho mỗi category
            const categoriesWithImages = await Promise.all(categories.map(async (category) => {
                console.log(category);

                if (category.brandLogo) {
                    const imageRef = ref(storage, category.brandLogo);
                    const imageUrl = await getDownloadURL(imageRef);
                    console.log(imageUrl);
                    return { ...category, imageUrl };

                }
                return category;
            }));

            setDataCategory(categoriesWithImages);
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        }
    };
    useEffect(() => {
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
                    Thêm nhãn hàng thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={openEz} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert

                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}

                >
                    Thêm nhãn hàng thất bại!
                </Alert>
            </Snackbar>
            <div className="wrap-category flex">
                <div className="wrap-form w-[40%] mr-[50px] border-r-[1px] border-solid border-[#ccc]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            name="brandName"
                            control={control}
                            label="Tên hãng điện thoại"
                            placeholder="nhập tên hãng điện thoại"
                            rules={{ required: 'Tên hãng là bắt buộc' }}
                        />
                        <div className="mb-4">
                            <label htmlFor="brandLogo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ảnh loại điện thoại</label>
                            <Controller
                                name="brandLogo"
                                control={control}
                                rules={{ required: 'Ảnh là bắt buộc' }}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            handleFileChange(e);
                                            field.onChange(e.target.files);
                                        }}
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.brandLogo ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.brandLogo && <p className="text-red-500 text-sm">{errors.brandLogo.message}</p>}
                        </div>
                        <div id="preview" className="mt-3">
                            {previewSrc && (
                                <img
                                    src={previewSrc}
                                    alt="Xem trước ảnh"
                                    className="preview-image max-w-[100%] max-h-[200px] mt-[10px] block"
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="wrap-data w-[50%]">
                    <h3 className="mb-1">Thông tin hãng điện thoại</h3>
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
                                {dataCategory.map(({ brandName, imageUrl }, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {brandName}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                <img src={imageUrl} alt="" className='h-[50px] w-[50px]' />
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

    );
}

export default Category;