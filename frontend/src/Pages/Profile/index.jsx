import Header from "~/Layout/components/Header";
import Info from "~/components/Info";
import Location from "~/components/Location";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';
import { faClipboardList, faHandHoldingDollar, faPen, faTicket } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import Purchase from "~/components/purchase";

function Profile() {
    const [selectedProfileContent, setSelectedProfileContent] = useState(<Info />);
    const handleMenuItemClick = (content) => {
        setSelectedProfileContent(content);
    };
    const customer = useRecoilValue(customerState);

    return (
        <div>
            <Header />
            <div className="mt-[120px] w-[100%] bg-[#f5f5f5] h-auto">
                <div className="flex container pt-[20px] pb-[50px] h-[100%] ">
                    <div className="w-[180px]">
                        <div className="flex py-[15px] border-[1px] border-solid border-[#efefef]">
                            <img className="w-[48px] h-[48px] rounded-[50%] object-cover cursor-pointer" src={customer.avt} alt="anh avarta" />
                            <div className="pl-[15px]">
                                <span className="text-[#333] text-[14px] mb-[5px] font-[600]">{customer.fullName}</span>
                                <div className="text-[#9b9b9b] text-[14px] cursor-pointer">
                                    <FontAwesomeIcon className=" mr-1" icon={faPen} />
                                    <span>Sửa Hồ Sơ</span>
                                </div>

                            </div>
                        </div>
                        <ul className="block">
                            <li className="mb-4 cursor-pointer text-[14px] text-[#000000de] ">
                                <FontAwesomeIcon className="text-[20px] text-[#1a58b6] mr-[10px]" icon={faUser} />
                                Tài khoản của tôi
                                <ul className="block pl-[34px] mt-3">
                                    <li className=" mb-[15px]" onClick={() => handleMenuItemClick(<Info />)}>
                                        <span className="">
                                            Hồ Sơ
                                        </span>
                                    </li>
                                    <li className=" mb-[15px]">
                                        <span className="">
                                            Ngân Hàng
                                        </span>
                                    </li>
                                    <li className=" mb-[15px]" onClick={() => handleMenuItemClick(<Location />)}>
                                        <span className="" >
                                            Địa Chỉ
                                        </span>
                                    </li>
                                    <li className=" mb-[15px]">
                                        <span className="">
                                            Đổi Mật Khẩu
                                        </span>
                                    </li>
                                    <li className=" mb-[15px]">
                                        <span className="">
                                            Cài Đặt Thông Báo
                                        </span>
                                    </li>
                                    <li className="">
                                        <span className="">
                                            Những Thiết Lập Riêng Tư
                                        </span>
                                    </li>
                                </ul>
                            </li>
                            <li className="mb-4 cursor-pointer text-[14px] text-[#000000de] " onClick={() => handleMenuItemClick(<Purchase />)}>
                                <FontAwesomeIcon className="text-[20px]  text-[#1a58b6] mr-[10px]" icon={faClipboardList} />
                                Đơn mua
                            </li>
                            <li className="mb-4 cursor-pointer text-[14px] text-[#000000de] ">
                                <FontAwesomeIcon className="text-[20px] text-[#fd5f32] mr-[10px]" icon={faBell} />
                                Thông báo
                            </li>
                            <li className="mb-4 cursor-pointer text-[14px] text-[#000000de] ">
                                <FontAwesomeIcon className="text-[20px] text-[#fd5f32] mr-[10px]" icon={faTicket} />
                                Voucher
                            </li>
                            <li className="mb-4 cursor-pointer text-[14px] text-[#000000de] ">
                                <FontAwesomeIcon className="text-[20px] text-[#ebeb7e] mr-[10px]" icon={faHandHoldingDollar} />
                                Shopee xu
                            </li>
                        </ul>
                    </div>
                    {selectedProfileContent}
                </div>
            </div >
        </div >
    );
}

export default Profile;