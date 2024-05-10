import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/img';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Email: '',
            PassWord: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = (data) => {
        console.log(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "Email") {
            setEmail(value);
        } else if (name === "PassWord") {
            setPassword(value);
        }
    };



    const isButtonDisabled = !email.trim() || !password.trim();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="flex w-[1200px] justify-between margin-auto h-[84px] items-center">
                <div className="flex items-center">
                    <img className="w-[192px] h-[42px]" src={images.logologin} alt="anh logo" />
                    <span className="text-[24px] h-[28px] text-[#222]">Đăng nhập</span>
                </div>
                <div>
                    <a className="text-[14px] text-[#ee4d2d]" href="# ">Bạn cần giúp đỡ?</a>
                </div>
            </div>
            <div className="bg-[#ee4d2d]">
                <div className="containerv2 relative">
                    <img src={images.backgrornd} alt="" />
                    <div className="absolute h-[484px] w-[400px] bg-[#fff] right-0 top-[60px] rounded-[4px]">
                        <div className="flex py-[22px] px-[22px] justify-between items-center">
                            <h2 className="text-[20px] text-[#222222]">Đăng nhập</h2>
                            <div className="relative border-[2px] border-[#ffbf00] text-[#ffbf00] text-[14px] py-[11px] px-[14px] bg-[#fefaec] mr-4 font-[700] w-[165px]">
                                Đăng nhập với mã QR
                                <div className="absolute top-1/2 right-0 transform translate-x-1/2">
                                    <div className="w-0 h-0 border-r-2 border-t-2 border-yellow-400 transform rotate-45"></div>
                                </div>
                            </div>
                            <img src={images.qrLogin} alt="anh1" />
                        </div>
                        <div className="px-[30px] pb-[30px]">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="border-[1px] border-solid border-[#00000024] rounded-[4px] focus:border-[#0000008a] overflow-hidden " >
                                    <input

                                        className="block p-3 bg-[#fff] w-[338px] h-[40px]"
                                        {...register("Email", {
                                            required: true,
                                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            onChange: handleInputChange
                                        })}
                                        placeholder="Email, Số điện thoại, Tên đăng nhập"
                                    />
                                </div>
                                {errors.Email && <span className="text-red-500 text-[12px]">Email không hợp lệ</span>}
                                <div className="flex items-center border-[1px] border-solid border-[#00000024] rounded-[4px] focus:border-[#0000008a] overflow-hidden mt-[32px]">
                                    <input

                                        type={showPassword ? 'text' : 'password'}
                                        className="block p-3 bg-[#fff] w-[338px] h-[40px]"
                                        {...register("PassWord", { minLength: 6, required: true, onChange: handleInputChange })}
                                        placeholder="Mật khẩu"
                                    />
                                    <FontAwesomeIcon
                                        className={`text-[16px] mr-[10px] cursor-pointer ${showPassword ? 'text-gray-500' : 'text-gray-400'
                                            }`}
                                        icon={showPassword ? faEye : faEyeSlash}
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                                {errors.PassWord && <span className="text-red-500 text-[12px]">Password không hợp lệ</span>}

                                <button
                                    type="submit"
                                    disabled={isButtonDisabled}
                                    className={`bg-[#ee4d2d] text-[#fff] w-[100%] h-[40px] mt-[32px] rounded ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    Đăng nhập
                                </button>
                            </form>
                            <div className="flex my-[10px] items-center justify-between">
                                <span className="text-[12px] text-[#0055aa]">Quên mật khẩu</span>
                                <span className="text-[12px] text-[#0055aa]">Đăng nhập với SMS</span>
                            </div>
                            <div className='flex items-center pb-[14px]'>
                                <div className='flex-1 bg-[#dbdbdb] h-[1px] w-[100%]'></div>
                                <span className='px-[16px] block text-[12px] text-[#ccc] uppercase'>Hoặc</span>
                                <div className='flex-1 bg-[#dbdbdb] h-[1px] w-[100%]'></div>
                            </div>
                            <div className='flex'>
                                <button className="bg-[#fff] text-[#000000de] text-[14px] rounded-[2px] border-[1px] border-solid border-[#00000042] h-[40px] w-[100%] mr-[5px] flex-1 pr-[10px] pl[2l]" >
                                    <FontAwesomeIcon className='text-blue-500 mr-2 text-[22px]' icon={faFacebook} />
                                    Facebook
                                </button>
                                <button className="bg-[#fff] text-[#000000de] text-[14px] rounded-[2px] border-[1px] border-solid border-[#00000042] h-[40px] w-[100%] ml-[5px] flex-1 pr-[10px] pl[2px]">
                                    <FontAwesomeIcon className=' mr-2 text-[22px]' icon={faGoogle} />
                                    Google
                                </button>
                            </div>

                        </div>
                        <div className='flex justify-center items-center text-[#00000042] text-[14px]'>
                            Bạn mới biết đến Shopee?
                            <Link to='/register' className='ml-1 text-[#ee4d2d] text-[14px]' >Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
