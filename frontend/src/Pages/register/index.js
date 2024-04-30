import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/img';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Email: '',
            PassWord: '',
            passwordAgain: '',
        }
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(true);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswordsMatch(e.target.value);
    };

    const checkPasswordsMatch = (confirmValue) => {
        if (password === confirmValue) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    };
    const onSubmit = (data) => {
        console.log(data);
    };




    return (
        <div>
            <div className="flex w-[1200px] justify-between margin-auto h-[84px] items-center">
                <div className="flex items-center">
                    <img className="w-[192px] h-[42px]" src={images.logologin} alt="anh logo" />
                    <span className="text-[24px] h-[28px] text-[#222]">Đăng Ký</span>
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
                            <h2 className="text-[20px] text-[#222222]">Đăng ký</h2>

                        </div>
                        <div className="px-[30px] pb-[30px]">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="border-[1px] border-solid border-[#00000024] rounded-[4px] focus:border-[#0000008a] overflow-hidden " >
                                    <input

                                        className="block p-3 bg-[#fff] w-[338px] h-[40px]"
                                        {...register("Email", {
                                            required: true,
                                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                        })}
                                        placeholder="Email, Số điện thoại, Tên đăng ký"
                                    />
                                </div>
                                {errors.Email && <span className="text-red-500 text-[12px]">Email không hợp lệ</span>}
                                <div className="flex items-center border-[1px] border-solid border-[#00000024] rounded-[4px] focus:border-[#0000008a] overflow-hidden mt-[22px]">
                                    <input
                                        type='password'
                                        value={password}
                                        className="block p-3 bg-[#fff] w-[338px] h-[40px]"
                                        {...register("PassWord", {
                                            minLength: 6, required: true, onChange: handlePasswordChange

                                        })}
                                        placeholder="Mật khẩu"
                                    />

                                </div>
                                {errors.PassWord && <span className="text-red-500 text-[12px]">Password không hợp lệ</span>}
                                <div className="flex items-center border-[1px] border-solid border-[#00000024] rounded-[4px] focus:border-[#0000008a] overflow-hidden mt-[22px]">
                                    <input
                                        value={confirmPassword}
                                        type='password'
                                        className="block p-3 bg-[#fff] w-[338px] h-[40px]"
                                        {...register("passwordAgain", {
                                            minLength: 6, required: true, onChange: handleConfirmPasswordChange
                                        })}
                                        placeholder="Nhập lại mật khẩu"
                                    />

                                </div>
                                {checked ? (
                                    <span></span>
                                ) : (
                                    <span className="text-red-500 text-[12px]">Password không trùng khớp</span>
                                )}

                                <button
                                    type="submit"
                                    className={'bg-[#ee4d2d] text-[#fff] w-[100%] h-[40px] mt-[32px] rounded '}
                                >
                                    Đăng ký
                                </button>
                            </form>
                            <div className='flex items-center pb-[14px] mt-[10px]'>
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
                            Bạn đã có tài khoản ?
                            <Link to='/login' className='ml-1 text-[#ee4d2d] text-[14px]' >Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
