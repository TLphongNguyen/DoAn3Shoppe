import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from "react";
import imgAvt from "~/assets/img/obito.png";
function Info() {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    // Function to handle when a file is selected
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
        const defaultImage = imgAvt;
        setImage(defaultImage);
    }, []);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            Name: '',
            Email: '',
            NumberPhone: '',
            gender: '',
            birthday: ''
        }
    });
    return (
        <div className="wrapcontent">
            <div className="content-profile w-[980px] bg-[#fff] ml-[27px] px-[30px] mb-[10px] h-[560px]">
                <div className="py-[18px] border-b-[1px] border-solid border-[#efefef]">
                    <h2 className=" text-[18px] text-[#333] font-[500] leading-[24px] capitalize">Hồ Sơ Của Tôi</h2>
                    <span className="mt-1 text-[14px] text-[#555] leading-[16px]">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                </div>
                <div className="flex pt-[30px]">
                    <div className="flex-1 pr-[30px] ">
                        <form action="" className="">
                            <ul className="block">
                                <li className="flex pb-[30px] items-center">
                                    <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                        <span>
                                            Tên đăng nhập
                                        </span>
                                    </div>
                                    <div className="pl-[20px] text-[14px] text-[#333]">
                                        <span>mrphong2806</span>
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
                                    <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                        <span>Giới tính</span>
                                    </div>
                                    <div className="pl-[20px] flex" >
                                        <div className="flex mr-3">
                                            <input className="mr-2" {...register("gender")} type="radio" id="radio_gender" />
                                            <p>Nam</p>
                                        </div>
                                        <div className="flex mr-3">
                                            <input className="mr-2" {...register("gender")} type="radio" id="radio_gender" />
                                            <p>Nữ</p>
                                        </div>
                                        <div className="flex mr-3">
                                            <input className="mr-2" {...register("gender")} type="radio" id="radio_gender" />
                                            <p>Khác</p>
                                        </div>

                                    </div>
                                </li>
                                <li className="flex pb-[30px] items-center">
                                    <div className="w-[20%] text-right text-[#555555cc] text-[14px]">
                                        Ngày sinh
                                    </div>
                                    <div className="pl-[20px]">
                                        <select name="" id="">
                                            <option value="28">28</option>
                                        </select>
                                        <select name="" id="">
                                            <option value="06">06</option>
                                        </select>
                                        <select name="" id="">
                                            <option value="2003">2003</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="flex pb-[30px] items-center">
                                    <div className="w-[20%] text-right"></div>
                                    <div className="ml-[20px] bg-[#ee4d2d] text-[#fff] h-[40px] w-[70px] leading-[40px] text-center rounded-[4px]">
                                        <button onClick={handleSubmit} action="submit">Lưu</button>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div className=" w-[280px] border-l-[1px] border-solid border-[#efefef] justify-center flex flex-col h-[232px] items-center ">
                        <div onClick={selectInput} className="w-[100px] min-h-[100px] my-[20px] cursor-pointer border-[1px] rounded-[50%]">
                            {image ? (
                                <img className="w-[100%] h-[100%] rounded-[50%]" src={image} alt="avt" />
                            ) : (
                                <div className="text-[14px] flex items-center mt-7 ml-2">
                                    <p>chọn ảnh đại diện của bạn</p>
                                </div>
                            )}
                        </div>
                        <input type="file"
                            ref={fileInputRef}
                            hidden
                            onChange={handleFileChange}
                            accept=".jpeg, .png"
                        />
                        <button onClick={selectInput} className="bg-[#fff] border-[1px] border-solid border-[#00000017] btn--m">Chọn ảnh</button>
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

            </div>
        </div>
    );
}

export default Info;