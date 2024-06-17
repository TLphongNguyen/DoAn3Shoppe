import style from './header.module.scss';
import classNames from 'classnames/bind';
import qrcode from '~/assets/img/qr.png';
import appstore from '~/assets/img/appstore.png';
import chplay from '~/assets/img/ggplay.png';
import { useState } from 'react';
import images from '~/assets/img';
import { Link } from 'react-router-dom';
import Search from '~/components/Search';
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';
import cartAtom from "~/Recoil/cart"
import { formatCurrency } from '~/config/formatCurrency';
import { SERVICE_URL } from '~/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faChevronDown, faCircleQuestion, faGlobe } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Header() {
    const [customer, setCustomer] = useRecoilState(customerState);
    const [quantityCart, setQuantityCart] = useState()
    const cart = useRecoilValue(cartAtom);
    const [dataCart, setDataCart] = useState([]);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get("http://localhost:3003/api/auth/customer", {
                    headers: {
                        authorization: token
                    }
                });
                setCustomer(response.data);
                sessionStorage.setItem('customer', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching customer:', error);
                setCustomer(null);
            }
        };
        fetchCustomer();

    }, [setCustomer]);
    const fetchdata = async () => {
        try {
            const id = customer.customerId
            // console.log(id);
            const response = await axios.get(`${SERVICE_URL}/getcart/${id}`);
            setDataCart(response.data);
            // console.log(response.data);
            sessionStorage.setItem('storeCart', JSON.stringify(response.data));



        } catch (error) {
            console.error('Error fetching customer:', error);
            setDataCart(null);
        }
    }
    useEffect(() => {
        fetchdata();
    }, [])
    useEffect(() => {
        if (dataCart !== null) {
            setQuantityCart(dataCart.length);

        }
        else {
            setQuantityCart(0);
        }
    }, [dataCart]);
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('customer');
        sessionStorage.removeItem('storeCart');
        setCustomer(null);

    };
    return (
        <div className={cx('header')}>
            <div className={cx('container')}>
                <div className={cx('header-top')}>
                    <div className={cx('header-top__contacts')}>
                        <div className={cx('contacts-item')}>
                            <span className={cx('header-top__text')}>Kênh người bán</span>
                        </div>
                        <div className={cx('contacts-item')}>
                            <span className={cx('header-top__text')}>Tải ứng dụng</span>
                            <div className={cx('header-download')}>
                                <img src={qrcode} alt='qrcode' />
                                <div className={cx('mobile-download')}>
                                    <img src={appstore} alt='appstore' />
                                    <img src={chplay} alt='ggplay' />
                                </div>
                            </div>
                        </div>
                        <div className={cx('contacts-item')}>
                            <span className={cx('header-top__text')}>Kết nối</span>
                        </div>
                        <div className={cx('iconheader')}>
                            <FontAwesomeIcon className={cx('icon_contacts')} icon={faFacebook} />
                            <FontAwesomeIcon className={cx('icon_contacts')} icon={faInstagram} />
                        </div>
                    </div>
                    <div className={cx("header-notification")}>
                        <div className={cx('contacts-item')}>
                            <FontAwesomeIcon className={cx("icon_contacts")} icon={faBell} />
                            <span className={cx('header-top__text')}>Thông báo</span>
                        </div>
                        <div className={cx('contacts-item')}>
                            <FontAwesomeIcon className={cx("icon_contacts")} icon={faCircleQuestion} />
                            <span className={cx('header-top__text')}>Hỗ trợ</span>
                        </div>
                        <div className={cx('contacts-item')}>
                            <FontAwesomeIcon className={cx("icon_contacts")} icon={faGlobe} />
                            <span className={cx('header-top__text')}>Ngôn ngữ</span>
                            <FontAwesomeIcon className={cx("icon_contacts")} icon={faChevronDown} />
                            <div className={cx("arrow-top")}></div>
                            <div className={cx("change-language")}>
                                <button className={cx('language-text')}>
                                    Tiếng Việt
                                </button>
                                <button className={cx('language-text')}>
                                    English
                                </button>
                            </div>
                        </div>

                        <div className={cx("wraper-profile")}>
                            {customer ? (
                                <>
                                    <div className={cx("wrap-img")}>
                                        <img src={customer.avt} alt='avatar' />
                                    </div>
                                    <div className={cx("user-name")}>
                                        {customer.fullName}
                                    </div>
                                    <div className={cx("wrap-profile__more")}>
                                        <ul>
                                            <Link to="/profile" >
                                                <li>
                                                    Tài Khoản của tôi
                                                </li>
                                            </Link>
                                            <Link to="/cart">
                                                <li>
                                                    Đơn mua
                                                </li>
                                            </Link>
                                            <Link to="/login">
                                                <li onClick={handleLogout}>
                                                    Đăng xuất
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className={cx("guest-options")}>
                                    <Link to="/login">
                                        <button className='text-[#fff] mr-2'>Đăng nhập</button>
                                    </Link>
                                    <Link to="/register">
                                        <button className='text-[#fff] mr-2'>Đăng ký</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('header-bottom')}>
                    <Link to="/" className={cx('logo')}>
                        <img src={images.logo} alt='logo' />
                    </Link>
                    <div className={cx('header-search')}>
                        <Search />
                        <ul className={cx('history-search')}>
                            <li>
                                <a href=' #'>
                                    san pham 1
                                </a>
                            </li>
                            <li>
                                <a href=' #'>
                                    san pham 2
                                </a>
                            </li>
                            <li>
                                <a href=' #'>
                                    san pham 3
                                </a>
                            </li>
                            <li>
                                <a href=' #'>
                                    san pham 4
                                </a>
                            </li>
                            <li>
                                <a href=' #'>
                                    san pham 5
                                </a>
                            </li>
                            <li>
                                <a href=' #'>
                                    san pham 6
                                </a>
                            </li>
                            <li>
                                <a href=' #'>
                                    san pham 7
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('header-cart')}>
                        <div className="cart-icon relative">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <div className="cart-quantity absolute bg-[#fff] text-[#ee4d2d] w-[20px] top-[-12px] right-[-12px] text-center rounded-[50%] text-[14px] leading-5">{quantityCart}</div>

                        </div>
                        <div className={cx("wrap-cart")}>
                            <h4 className={cx("cart-title")}>Sản phẩm mới thêm</h4>
                            <ul className={cx("list-cart")}>
                                {!dataCart || dataCart.length === 0 ? (
                                    <div>Chưa có sản phẩm trong giỏ hàng</div>
                                ) : (
                                    dataCart.map((item) => (
                                        <Link to={`/products/?id=${item.phoneId}`} className={cx("item-cart")} key={item.phoneId}>
                                            <img src={item.phone.phoneImage} alt="anh gio hang" />
                                            <div className={cx("cart-info")}>
                                                <span className={cx("cart-name")}>{item.phone.phoneName}</span>
                                                <span className={cx("cart-price")}>{formatCurrency(item.phone.price)}</span>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </ul>
                            <div className={cx("btn-cart")}>
                                <div className="flex-1"></div>
                                <button>
                                    <Link to="/cart">
                                        xem giỏ hàng

                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
