import { useState, useEffect } from 'react';
import sale from "~/assets/img/more/sale.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCaretDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from '~/config/formatCurrency';

function CartComponent({ index, img, name, price, onCheckboxChange, sale }) {
    const [quantity, setQuantity] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [pricetotal, setPricetotal] = useState(price * quantity);

    useEffect(() => {
        setPricetotal(price * quantity);
    }, [quantity, price]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onCheckboxChange(index, !isChecked, quantity, (price) - (price * sale) / 100,);
    };

    const handleClickPrev = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleClickIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="gwap-content">
            <li key={index} className=" bg-[#fff] cart-item w-[100%] mb-5 ">
                <div className="cart-item border-b-[1px] border-[#00000017] border-solid">
                    <div className="cart-shop flex px-5 h-[60px] items-center">
                        {/* <div className="checkboxGwap pl-5 pr-3 mr-2">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div> */}
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
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className="product-gwap flex w-[29.03811%]">
                            <div className="product-img min-w-[80px] max-w-20 h-[80px]">
                                <img src={img} alt="" />
                            </div>
                            <div className="gwap-title ml-2">
                                <span className="product-title text-[14px] mb-1 line-clamp-2 leading-4">
                                    {name}
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
                                    {formatCurrency(price)}
                                </span>
                            </div>
                            <div className="price-item">
                                <span className="price-new text-[#000000de] text-[14px]">
                                    {formatCurrency((price) - (price * sale) / 100)}
                                </span>
                            </div>
                        </div>
                        <div className="gwap-number w-[ 15.4265%]">
                            <div className="quantity">
                                <div className="mr-[15px]">
                                    <button onClick={handleClickPrev} className="border-[1px] border-[#00000017] border-solid h-8 w-8 rounded-[2px]">
                                        <FontAwesomeIcon className="text-[14px]" icon={faMinus} />
                                    </button>
                                    <input className="h-8 w-[50px] border-[1px] border-[#00000017] border-solid text-center" value={quantity} type="text" readOnly />
                                    <button onClick={handleClickIncrease} className="border-[1px] border-[#00000017] border-solid h-8 w-8 rounded-[2px]">
                                        <FontAwesomeIcon className="text-[14px]" icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="into-money">
                            <span className="price-now text-[#ee4d2d] text-[14px]">{formatCurrency(pricetotal)}</span>
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
        </div>
    );
}

export default CartComponent;
