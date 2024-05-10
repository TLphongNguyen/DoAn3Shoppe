import { useState } from "react";
import HeaderCart from "~/Layout/components/HeaderCart/Headercart";
import Search from "~/components/Search";
import images from "~/assets/img";
import ship from "~/assets/img/more/ship.png";
import sale from "~/assets/img/more/sale.png";
import iphone from "~/assets/img/products/iphone15.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCaretDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
function Cart() {
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
        <div className="wrap-content">
            <HeaderCart />
            <div className="flex w-[1200px] justify-between margin-auto h-[84px] items-center">
                <div className="flex items-center">
                    <img className="w-[192px] h-[42px] border-h-[80%] border-r-[1px] border-solid  border-[#ee4d5c]" src={images.logologin} alt="anh logo" />
                    <span className=" pl-[20px] text-[24px] h-[28px] text-[#ee4d5c]">Giỏ Hàng</span>
                </div>
                <div className="">
                    <Search />
                </div>
            </div>
            <div className="bg-[#f5f5f5] pb-[30px]">
                <div className="container pt-5">
                    <div className="shipgwap flex py-3 px-4 bg-[#fffefb] border-[1px] border-[#e0a80066] border-solid mb-2">
                        <div className="ship-img w-[24px] h-5">
                            <img src={ship} alt="" />
                        </div>
                        <span className="ship-title text-[14px] ml-2">
                            Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                        </span>
                    </div>
                    <div className="cart-quanty flex justify-between bg-[#fff] h-14 px-5 items-center mb-3">
                        <div className="checkbox-product flex w-[46.27949%]">
                            <div className="checkboxGwap pl-5 pr-3 mr-2">
                                <input type="checkbox" name="" id="check-box" />
                            </div>
                            <h5 className="name-product text-[#000000cc] text-[14px]">
                                Sản phẩm
                            </h5>
                        </div>
                        <ul className="list-info w-[50%] justify-around">
                            <li className="item-info text-[14px] text-[#888888]">Đơn Giá</li>
                            <li className="item-info text-[14px] text-[#888888]">Số Lượng</li>
                            <li className="item-info text-[14px] text-[#888888]">Số Tiền</li>
                            <li className="item-info text-[14px] text-[#888888]">Thao Tác</li>
                        </ul>
                    </div>
                    <ul className="cart-list  block">
                        <li className=" bg-[#fff] cart-item w-[100%] ">
                            <div className="cart-item border-b-[1px] border-[#00000017] border-solid">
                                <div className="cart-shop flex px-5 h-[60px] items-center">
                                    <div className="checkboxGwap pl-5 pr-3 mr-2">
                                        <input type="checkbox" name="" id="check-box" />
                                    </div>
                                    <span className="name-shop text-[14px] text-[#000000de] ml-2">
                                        Viettel Store - AAR
                                    </span>
                                    <div className="cart-icon ml-2">
                                        <FontAwesomeIcon className="text-[#ee4d2d]" icon={faBagShopping} />

                                    </div>
                                </div>
                            </div>
                            <div className="cart-prodcut mt-[15px] pt-[15px] px-5 pb-5 w-[100%]">
                                <div className="product-item flex items-center">
                                    <div className="checkboxGwap  pl-5 pr-3 mr-2">
                                        <input type="checkbox" name="" id="check-box check-tf" />
                                    </div>
                                    <div className="product-gwap flex w-[29.03811%]">
                                        <div className="product-img min-w-[80px] max-w-20 h-[80px]">
                                            <img src={iphone} alt="" />
                                        </div>
                                        <div className="gwap-title">
                                            <span className="product-title text-[14px] mb-1 line-clamp-2 leading-4">
                                                Apple iPhone 15 Pro Max 256GB Chính hãng VN/A
                                            </span>
                                            <img src={sale} alt="" className="img-sale h-[18px]" />

                                        </div>
                                    </div>
                                    <div className="product-category  w-[17.24138%]">
                                        <span className="category block text-[#0000008a] text-[14px]">
                                            Phân loại hàng
                                            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
                                        </span>
                                        <span className="category-new text-[#0000008a] text-[14px]">
                                            iphone
                                        </span>
                                    </div>
                                    <div className="gwap-price w-[15.88022%] flex">
                                        <div className="price-item">
                                            <span className="price-old text-[#0000008a] text-[14px] line-through mr-[10px]">
                                                37.790.000
                                            </span>
                                            {/* <span className="price-sale">
                                                Giảm Giá 7%

                                            </span> */}
                                        </div>
                                        <div className="price-item">
                                            <span className="price-new text-[#000000de] text-[14px]">
                                                ₫30.590.000
                                            </span>
                                            {/* <div className="price-update">
                                                Đã Cập Nhật
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="gwap-number w-[ 15.4265%]">
                                        <div className="quantity">
                                            <div className="mr-[15px]">
                                                <button onClick={handleclickPrev} className="border-[1px] border-[#00000017] border-solid h-8 w-8 rounded-[2px]"><FontAwesomeIcon className="text-[14px]" icon={faMinus} /></button>
                                                <input className="h-8 w-[50px] border-[1px] border-[#00000017] border-solid text-center" value={quantity} type="text" />
                                                <button onClick={handleclickIncrease} className="border-[1px] border-[#00000017] border-solid h-8 w-8 rounded-[2px]"><FontAwesomeIcon className="text-[14px]" icon={faPlus} /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="into-money">
                                        <span className="price-now text-[#ee4d2d] text-[14px]">₫30.590.000</span>
                                    </div>
                                    <div className="delete-search w-[12.70417%]">
                                        <span className="delete-cart block text-center text-[14px] cursor-pointer hover:text-[#ee4d2d]">
                                            Xóa
                                        </span>
                                        <a href=" #" className="link-pay flex justify-center">
                                            <button className="buy-now text-[14px] text-center text-[#ee4d2d]">
                                                Tìm sản phẩm tương tự
                                            </button>

                                        </a>
                                    </div>
                                </div>
                            </div>

                        </li>

                    </ul>
                    <div className="payload flex justify-between p-[20px] bg-[#fff] mt-5">
                        <div className="">
                            <input className="pl-5 pr-3 mr-2" type="checkbox" name="" id="" />
                            <button className="text-[16px] text-[#000000cc]">Chọn tất cả (3)</button>
                        </div>
                        <div className="">
                            <span className="text-[16px] leading-[19px] text-[#222]">Tổng sản phẩm(0 sản phẩm):</span>
                            <span className="text-[24px] ml-[6px] leading-7 text-[#ee4d2d]">₫0</span>
                            <button className="w-[210px] bg-[#ee4d2d] text-[#fff] py-[12px] px-[36px] rounded-[2px] ml-[22px]"> mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;