import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCartPlus, faChevronDown, faMinus, faPlus, faShop, faStar, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import images from "~/assets/img";
import avt from '~/assets/img/obito.png';
import shoppemall from '~/assets/img/products/shopeemall.png';

import Header from '~/Layout/components/Header';
import { faFacebook, faFacebookMessenger, faPinterest, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

function Products() {
    const [quantity, setQuantity] = useState(1)
    const handleclickPrev = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const handleclickIncrease = () => {
        setQuantity(quantity + 1)
    }
    return (
        <div className="">
            <Header />
            <div className="mt-[116px] bg-[#f5f5f5] pb-[50px] ">
                <div className="container">
                    <ul className="pt-5 items-center">
                        <li className="text-[#05a] text-[14px]">shoppe</li>
                        <FontAwesomeIcon className="mx-[5px]" icon={faAngleRight} />
                        <li className="text-[#05a] text-[14px]">điện thoại</li>
                        <FontAwesomeIcon className="mx-[5px]" icon={faAngleRight} />
                        <li className="text-[#05a] text-[14px]">Apple</li>
                        <FontAwesomeIcon className="mx-[5px]" icon={faAngleRight} />
                        <span className="text-[14px] text-[#000000cc]">Điện thoại Apple iPhone 15 Pro Max 256GB</span>

                    </ul>
                    <div className="bg-[#fff] ">
                        <div className=" flex">
                            <div className="product-img w-[40%] p-[15px]">
                                <div className="img-main w-[450px] h-[450px]">
                                    <img src={images.iphone} alt="anh dien thoai" />
                                </div>
                                <ul className="list-img my-[5px] items-center ">
                                    <li className="p-[5px] hover:border-[1px] border-[solid] border-[#ee4d2d] cursor-pointer">
                                        <img src={images.iphone1} alt="" />
                                    </li>
                                    <li className="p-[5px] hover:border-[1px] border-[solid] border-[#ee4d2d] cursor-pointer">
                                        <img src={images.iphone1} alt="" />
                                    </li>
                                    <li className="p-[5px] hover:border-[1px] border-[solid] border-[#ee4d2d] cursor-pointer">
                                        <img src={images.iphone1} alt="" />
                                    </li>
                                    <li className="p-[5px] hover:border-[1px] border-[solid] border-[#ee4d2d] cursor-pointer">
                                        <img src={images.iphone1} alt="" />
                                    </li>
                                    <li className="p-[5px] hover:border-[1px] border-[solid] border-[#ee4d2d] cursor-pointer">
                                        <img src={images.iphone1} alt="" />
                                    </li>
                                </ul>
                            </div>
                            <div className="product-info pr-[35px] pt-5 pl-5 w-[60%]">
                                <div className="header">
                                    <h1>Điện thoại Apple iPhone 15 Pro Max 256GB</h1>
                                    <div className="flex justify-between mt-[10px]">
                                        <div className="flex">
                                            <div className="rating">
                                                <span className="border-b-[1px] border-b-[#ee4d2d] text-[#ee4d2d] mr-1">5.0</span>
                                                <FontAwesomeIcon className="text-[#ee4d2d]" icon={faStar} />
                                                <FontAwesomeIcon className="text-[#ee4d2d]" icon={faStar} />
                                                <FontAwesomeIcon className="text-[#ee4d2d]" icon={faStar} />
                                                <FontAwesomeIcon className="text-[#ee4d2d]" icon={faStar} />
                                                <FontAwesomeIcon className="text-[#ee4d2d]" icon={faStar} />
                                            </div>
                                            <div className="Evaluate mx-8">
                                                <span className="border-b-[1px] border-b-[#555] text-[#222] mr-1 ">4.8k</span>
                                                <span>Đánh giá</span>
                                            </div>
                                            <div className="seller">
                                                <span>22.8k</span>
                                                <span>đã bán</span>
                                            </div>
                                        </div>
                                        <span className="text-[#0000008a] text-[14px]">
                                            tố cáo
                                        </span>
                                    </div>
                                </div>
                                <div className="price mt-[10px] bg-[#fafafa] flex py-[15px] px-[20px] items-center">
                                    <div className="mr-[10px] text-[#929292] text-4 line-through">₫
                                        <span>
                                            34.999.000
                                        </span>
                                    </div>
                                    <div className="text-[#d0011b] text-[30px] ">₫
                                        <span className="">
                                            30.090.000
                                        </span>
                                    </div>
                                    <div className="ml-[15px] bg-[#d0011b] text-[#fff] text-[12px] px-[4px] py-[2px] leading-3">
                                        30% giảm
                                    </div>
                                </div>
                                <div className="tranf px-[20px]">
                                    <div className="ship flex mb-[25px]">
                                        <div className="body-title w-[110px] text-[14px] text-[#757575]">
                                            Vận Chuyển
                                        </div>
                                        <div className="flex">
                                            <div className="ship-to mx-[10px]">
                                                <FontAwesomeIcon className="mx-[5px]" icon={faTruckFast} />
                                                vận chuyển tới
                                            </div>
                                            <div className="address-ship px-[6px] cursor-pointer">
                                                dia chi
                                                <FontAwesomeIcon className="text-[12px]" icon={faChevronDown} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="color flex items-center mb-6">
                                        <div className="body-title w-[110px] text-[14px] text-[#757575]">
                                            Màu sắc
                                        </div>
                                        <ul className="">
                                            <li className="mt-2 mr-2">
                                                <button
                                                    className="p-2 min-w-[80px] min-h-10 border-[1px] border-solid rounded-[2px] border-[#00000017] text-[#000000cc] hover:text-[#d0011b] hover:border-[#d0011b]">
                                                    den trang do
                                                </button>
                                            </li>
                                            <li className="mt-2 mr-2">
                                                <button
                                                    className="p-2 min-w-[80px] min-h-10 border-[1px] border-solid rounded-[2px] border-[#00000017] text-[#000000cc] hover:text-[#d0011b] hover:border-[#d0011b]">
                                                    den trang do
                                                </button>
                                            </li>
                                            <li className="mt-2 mr-2">
                                                <button
                                                    className="p-2 min-w-[80px] min-h-10 border-[1px] border-solid rounded-[2px] border-[#00000017] text-[#000000cc] hover:text-[#d0011b] hover:border-[#d0011b]">
                                                    den trang do
                                                </button>
                                            </li>
                                            <li className="mt-2 mr-2">
                                                <button
                                                    className="p-2 min-w-[80px] min-h-10 border-[1px] border-solid rounded-[2px] border-[#00000017] text-[#000000cc] hover:text-[#d0011b] hover:border-[#d0011b]">
                                                    den trang do
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="quantity pt-4 pb-4 flex items-center">
                                        <div className="body-title w-[110px] text-[14px] text-[#757575]">
                                            Số Lượng
                                        </div>
                                        <div className="mr-[15px]">
                                            <button onClick={handleclickPrev} className="border-[1px] border-[#00000017] border-solid h-8 w-8 rounded-[2px]"><FontAwesomeIcon className="text-[14px]" icon={faMinus} /></button>
                                            <input className="h-8 w-[50px] border-[1px] border-[#00000017] border-solid text-center" value={quantity} type="text" />
                                            <button onClick={handleclickIncrease} className="border-[1px] border-[#00000017] border-solid h-8 w-8 rounded-[2px]"><FontAwesomeIcon className="text-[14px]" icon={faPlus} /></button>
                                        </div>
                                        <span className="">974 sản phẩm có sẵn</span>
                                    </div>
                                    <div className="gwap-btn mt-4">
                                        <button className="add-cart bg-[#d0011b14] text-[#d0011b] border-[1px] border-[#d0011b] border-solid h-[48px] px-5 mr-4 rounded-[4px]">
                                            <FontAwesomeIcon className="mr-2" icon={faCartPlus} />
                                            thêm vào giỏ hàng
                                        </button>
                                        <a href="# " className="link-cart">
                                            <button className="buy-now bg-[#d0011b] h-[48px] px-5 text-[#fff] w-[180px] rounded-[4px]">
                                                Mua ngay
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-contact flex items-center px-[60px]">
                            <div className="share flex items-center mr-4">
                                <span className="text-[#222] text-4">chia sẻ : </span>
                                <ul className="list-icon ">
                                    <FontAwesomeIcon className="text-[25px] mx-1 text-[#0384ff]" icon={faFacebookMessenger} />
                                    <FontAwesomeIcon className="text-[25px] mx-1 text-[#3b5999]" icon={faFacebook} />
                                    <FontAwesomeIcon className="text-[25px] mx-1 text-[#de0217]" icon={faPinterest} />
                                    <FontAwesomeIcon className="text-[25px] mx-1 text-[#10c2ff]" icon={faTwitterSquare} />
                                </ul>

                            </div>
                            <div className="favourite border-l-[1px] border-solid border-[#00000017] flex justify-center items-center w-[150px]">
                                <FontAwesomeIcon icon={faHeart} className="mr-[10px] text-[#de0217] text-[20px] cursor-pointer" />
                                <span>đã thích(20k)</span>
                            </div>
                        </div>
                    </div>
                    <div className="info-shop p-[25px] mt-[15px] bg-[#fff] rounded-[4px]">
                        <div className="flex">
                            <div className="w-[78px] h-[78px] relative mr-5">
                                <img className=" rounded-[50%] border-[1px] border-solid border-[#efefef]" src={avt} alt="" />
                                <img className="absolute bottom-[-2px] w-[64px] right-[7px]" src={shoppemall} alt="" />
                            </div>
                            <div className="pr-[25px] border-r-[1px] border-solid border-[#0000000d] w-[30%]">
                                <h3 className="text-[16px] text-[#000000de] font-[400]">Apple Flagship Store</h3>
                                <span className="text-[14px] text-[#757575] text-center">Online 58 Phút Trước</span>
                                <div className="flex mt-2">
                                    <button className="bg-[#d0011b14] text-[#d0011b] border-[1px] border-[#d0011b] border-solid px-[15px] h-[34px] mr-[10px]">
                                        <FontAwesomeIcon className="mr-1" icon={faMessage} />
                                        Chat ngay
                                    </button>
                                    <button className="bg-[#fff] text-[#555] border-[1px] border-[#00000017] border-solid px-[15px] h-[34px] mr-[10px]">
                                        <FontAwesomeIcon className="mr-1" icon={faShop} />
                                        Xem shop
                                    </button>
                                </div>
                            </div>
                            <div className="pl-[25px] grid grid-cols-3 gap-x-[50px] gap-y-[20px ] w-[70%]">
                                <div className="flex justify-between">
                                    <span className="text-[12px] text-[#00000066] capitalize">
                                        Đánh Giá
                                    </span>
                                    <span className="text-[14px] text-[#d0011b] text-right ">
                                        13,1k
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[12px] text-[#00000066] capitalize">
                                        Tỉ Lệ Phản Hồi
                                    </span>
                                    <span className="text-[14px] text-[#d0011b] text-right">
                                        94%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[12px] text-[#00000066] capitalize">
                                        Tham Gia
                                    </span>
                                    <span className="text-[14px] text-[#d0011b] text-right">
                                        4 năm trước
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[12px] text-[#00000066] capitalize">
                                        Sản Phẩm
                                    </span>
                                    <span className="text-[14px] text-[#d0011b] text-right">
                                        239
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[12px] text-[#00000066] capitalize">
                                        Thời Gian Phản Hồi
                                    </span>
                                    <span className="text-[14px] text-[#d0011b] text-right">
                                        trong vài giờ
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[12px] text-[#00000066] capitalize">
                                        Người Theo Dõi
                                    </span>
                                    <span className="text-[14px] text-[#d0011b] text-right">
                                        348,1k
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="info-products p-[10px] mt-[15px]  bg-[#fff] rounded-[4px]">
                        <div className="pt-[15px] px-[15px]">
                            <div className="p-[14px] bg-[#00000005] text-[18px] text-[#000000de]">
                                <h1 className="">CHI TIẾT SẢN PHẨM</h1>
                            </div>
                            <div className="mt-[30px] mx-[15px] mb-[15px]">
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Danh Mục</span>
                                    <ul className="items-center">
                                        <li className="text-[#05a] text-[14px]">shoppe</li>
                                        <FontAwesomeIcon className="mx-[5px]" icon={faAngleRight} />
                                        <li className="text-[#05a] text-[14px]">điện thoại</li>
                                        <FontAwesomeIcon className="mx-[5px]" icon={faAngleRight} />
                                        <li className="text-[#05a] text-[14px]">Apple</li>
                                    </ul>
                                </div>
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Thương hiệu</span>
                                    <span className="text-[#05a] text-[14px]">Apple</span>
                                </div>
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Dung lượng lưu trữ</span>
                                    <span className="text-[#000000cc] text-[14px]">256GB</span>
                                </div>
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Hạn bảo hành </span>
                                    <span className="text-[#000000cc] text-[14px]">12 tháng</span>
                                </div>
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Model điện thoại</span>
                                    <span className="text-[#000000cc] text-[14px]">iPhone 15 Pro Max 256GB</span>
                                </div>
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Kho hàng</span>
                                    <span className="text-[#000000cc] text-[14px]">1199</span>
                                </div>
                                <div className="flex mb-[18px]">
                                    <span className="w-[140px] pr-[12px] text-[14px] text-[#00000066]">Gửi từ</span>
                                    <span className="text-[#000000cc] text-[14px]">Hà Nội</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-[15px] px-[15px]">
                            <div className="p-[14px] bg-[#00000005] text-[18px] text-[#000000de]">
                                <h1 className="">MÔ TẢ SẢN PHẨM</h1>
                            </div>
                            <div className="mt-[30px] mx-[15px] mb-[15px]">
                                <div className="e8lZp3">
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Bảo hành 12 tháng</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Sản phẩm gồm: máy + cáp sạc</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Dung lượng bộ nhớ (ROM):&nbsp;Lưu trữ thoải mái 15.000 khung hình đỉnh cao, 15.000 bức ảnh Live, quay video 4K tới 18 giờ và 6.000 bài nhạc.</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Thiết kế: Khung viền mới chất liệu Titanium -&nbsp;đạt kỷ lục viền máy siêu mảnh kết hợp 4 cạnh bo cong.</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Màn hình: Độ sáng màn hình lên tới 2.000 nits&nbsp;đẳng cấp chưa từng thấy.</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Camera: Ống kính tiềm vọng zoom 5x độc quyền&nbsp;cho khả năng thu phóng “đạt đỉnh”.</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Chipset: Vi xử lý A17 Pro ở tiến trình sản xuất 3nm&nbsp;giúp tốc độ xử lý và tối ưu điện năng tăng đột biến tới tới 35%.</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Cổng sạc: “Khai tử” sạc Lightning, mở ra kỷ nguyên mới với USB type C&nbsp;cho khả năng truyền dữ liệu siêu tốc độ lên đến 10Gbps.</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Nút tác vụ:&nbsp;“Xóa sổ” nút bật/tắt tiếng, thay thế bằng nút tác vụ&nbsp;hỗ trợ 9 chức năng khác nhau cho trải nghiệm sử dụng thêm thuận tiện</p>
                                    <p className="text-[#000000cc] text-[14px] leading-[1.7]">Màu sắc:&nbsp;Bảng màu mới lấy cảm hứng từ Titanium ấn tượng, độc đáo mang đến diện mạo sang chảnh và bắt mắt cho iPhone 15 Pro Max</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;