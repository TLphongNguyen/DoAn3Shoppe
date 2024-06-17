import { useForm, Controller } from 'react-hook-form'
import { useState, useRef, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';
import axios from 'axios';
import { AUTH_URL } from '~/config';
import { storage } from '~/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
function Info() {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const customer = useRecoilValue(customerState);
    const [birthDate, setBirthDate] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Function to activate file input
    const selectInput = () => {
        fileInputRef.current.click();
    };
    useEffect(() => {
        const defaultImage = customer.avt;
        setImage(defaultImage);
    }, []);
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            Name: '',
            Email: '',
            NumberPhone: '',
            birthday: '',
            avatar: '',
        }
    });
    const onSubmit = async (data) => {
        // console.log(data);
        const birthday = birthDate.format('YYYY-MM-DD')
        try {
            let imageUrl = '';

            if (data.avatar[0]) {
                const imageFile = data.avatar[0];
                const storageRef = ref(storage, `avatar/${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const formData = {
                customerId: customer.customerId,
                fullName: data.Name,
                email: data.Email,
                numberPhone: data.NumberPhone,
                birthDate: birthday,
                imageUrl: imageUrl
            };
            console.log(formData);
            const response = await axios.post(`${AUTH_URL}/updatecustomer`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error uploading the form!', error);
        }
    }
    return (
        <div className="wrapcontent">
            <div className="content-profile w-[980px] bg-[#fff] ml-[27px] px-[30px] mb-[10px] h-[560px]">
                <div className="py-[18px] border-b-[1px] border-solid border-[#efefef]">
                    <h2 className=" text-[18px] text-[#333] font-[500] leading-[24px] capitalize">Hồ Sơ Của Tôi</h2>
                    <span className="mt-1 text-[14px] text-[#555] leading-[16px]">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="" >

                    <div className="flex pt-[30px]">
                        <div className="flex-1 pr-[30px] ">
                            <div>
                                <ul className="block">
                                    <li className="flex pb-[30px] items-center">
                                        <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                            <span>
                                                Tên đăng nhập
                                            </span>
                                        </div>
                                        <div className="pl-[20px] text-[14px] text-[#333]">
                                            <span></span>
                                        </div>
                                    </li>
                                    <li className="flex pb-[30px] items-center">
                                        <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                            <span>
                                                Tên
                                            </span>
                                        </div>
                                        <div className="ml-[20px] shadow-[0px_2px_0px_0.02_rgba(0,0,0,1)] border-[#00000024] border-[1px] border-solid rounded-[2px] h-[40px] w-[418px]">
                                            <input className="p-3 h-[100%] w-[100%]"  {...register("Name", { required: true })} type="text" placeholder="nhập tên của bạn" />
                                        </div>
                                    </li>
                                    <li className="flex pb-[30px] items-center">
                                        <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                            <span>Email</span>
                                        </div>
                                        <div className="ml-[20px] shadow-[0px_2px_0px_0.02_rgba(0,0,0,1)] border-[#00000024] border-[1px] border-solid rounded-[2px] h-[40px] w-[418px]">
                                            <input className="p-3 h-[100%] w-[100%]" type="email" {...register("Email", { required: true })} placeholder="nhập email của bạn" />
                                        </div>
                                    </li>
                                    <li className="flex pb-[30px] items-center">
                                        <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                            <span>Số điện thoại</span>
                                        </div>
                                        <div className="ml-[20px] shadow-[0px_2px_0px_0.02_rgba(0,0,0,1)] border-[#00000024] border-[1px] border-solid rounded-[2px] h-[40px] w-[418px]">
                                            <input className="p-3 h-[100%] w-[100%]" type="text" {...register("NumberPhone", { required: true, minLength: 10, maxLength: 10 })} placeholder="nhập số điện thoại của bạn" />
                                        </div>
                                    </li>
                                    <li className="flex pb-[30px] items-center">
                                        <div className="w-[20%] text-right mr-5 text-[#555555cc] text-[14px]">
                                            Ngày sinh
                                        </div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="chọn ngày tháng năm sinh"
                                                    value={birthDate}
                                                    name='birthday'
                                                    onChange={(newValue) => setBirthDate(newValue)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className=" w-[280px] border-l-[1px] border-solid border-[#efefef] justify-center flex flex-col h-[232px] items-center ">
                            <Controller
                                name="avatar"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div onClick={selectInput} className="w-[100px] min-h-[100px] my-[20px] cursor-pointer border-[1px] rounded-[50%]">
                                            {image ? (
                                                <img className="w-[100%] h-[100%] rounded-[50%]" src={image} alt="avt" />
                                            ) : (
                                                <div className="text-[14px] flex items-center mt-7 ml-2">
                                                    <p>chọn ảnh đại diện của bạn</p>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            hidden
                                            onChange={(e) => {
                                                handleFileChange(e);
                                                field.onChange(e.target.files);
                                            }}
                                            accept=".jpeg, .png"
                                        />
                                        <button type="button" onClick={selectInput} className="bg-[#fff] border-[1px] border-solid border-[#00000017] btn--m">Chọn ảnh</button>
                                    </>
                                )}
                            />
                            <div className="mt-3 text-[14px] text-[#999] text-center">
                                <span className="block leading-5">
                                    Dụng lượng file tối đa 1 mb
                                </span>
                                <span className="text-left w-[100%] block leading-5">
                                    Định dạng:.JPEG, .PNG
                                </span>
                            </div>
                        </div>
                    </div>
                    <li className="flex pb-[30px] items-center">
                        <div className="w-[20%] text-right"></div>
                        <div className="ml-[20px] bg-[#ee4d2d] text-[#fff] h-[40px] w-[70px] leading-[40px] text-center rounded-[4px]">
                            <button onClick={handleSubmit} action="submit">Lưu</button>
                        </div>
                    </li>
                </form>

            </div>
        </div>
    );
}

export default Info;