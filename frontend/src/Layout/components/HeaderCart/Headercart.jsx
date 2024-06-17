import style from './Headercart.module.scss';
import classNames from 'classnames/bind';
import qrcode from '~/assets/img/qr.png';
import appstore from '~/assets/img/appstore.png';
import chplay from '~/assets/img/ggplay.png';
import { Link, Navigate } from 'react-router-dom'; // Import useHistory
import { customerState } from '~/Recoil/customer';
import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faCircleQuestion, faGlobe } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function HeaderCart() {
    const customer = useRecoilValue(customerState);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('customer');
        localStorage.removeItem('storeCart');
    };


    return (
        <div className={cx("wrap-content")}>
            <div className='container'>
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
                                            <Link to="/register">
                                                <li onClick={handleLogout}>
                                                    Đăng xuất
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Navigate to="/login" className={cx("guest-options")}>

                                </Navigate>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderCart;
