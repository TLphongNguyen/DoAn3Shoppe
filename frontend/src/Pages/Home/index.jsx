import styles from './home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sliner from '~/components/Sliner';
import Header from '~/Layout/components/Header';
import offersArray from '~/data/offers';
import flashSaleArray from '~/data/flashSale';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import categoryArray from '~/data/categories';
import img from '~/assets/img';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { storage } from '~/config/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { SERVICE_URL } from '~/config';
import ItemProducts from '~/components/itemProduct';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);


function Home() {
	const [endTime] = useState(moment().add(2, 'days').add(12, 'hours').add(0, 'minutes'));
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [transformValue, setTransformValue] = useState("translate(0px, 0px)");
	const [dataProducts, setDataProducts] = useState([]);


	function calculateTimeLeft() {
		const now = moment();
		const difference = moment.duration(endTime.diff(now));
		const days = difference.days();
		const hours = difference.hours();
		const minutes = difference.minutes();
		const seconds = difference.seconds();
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;


		return {
			days,
			hours,
			minutes: formattedMinutes,
			seconds: formattedSeconds,
		};

	}
	const rightClick = () => {
		setTransformValue("translate(-480px, 0px)");
	}
	const prevClick = () => {
		setTransformValue("translate(0px, 0px)");
	}

	const fetchData = async () => {
		try {
			const response = await axios.get(`${SERVICE_URL}/getproductactive`);
			const products = response.data;
			// Lấy địa chỉ ảnh từ Firebase Storage cho mỗi category
			const productsWithImages = await Promise.all(products.map(async (product) => {
				// Tạo một hàm hỗ trợ để tải lên ảnh lên Firebase Storage và lấy URL
				const uploadImageToFirebase = async (imageField) => {
					if (product[imageField]) {
						const imageRef = ref(storage, `products/${product[imageField]}`);
						const imageUrl = await getDownloadURL(imageRef);
						return imageUrl;
					}
					return null;
				};

				// Lấy URL của phoneImage
				const phoneImageUrl = await uploadImageToFirebase('phoneImg');
				const phoneImageUrls = await uploadImageToFirebase('phoneImgs');

				// Lấy URL của phoneImages


				// Trả về sản phẩm với thêm thông tin ảnh
				return {
					...product,
					phoneImageUrl,
					phoneImageUrls
				};
			}));
			setDataProducts(productsWithImages);
		} catch (error) {
			console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
		}
	};
	useEffect(() => {
		fetchData()
	}, [])
	return (
		<div className={cx('wrap-content')}>
			<Header />
			<div className={cx('container')}>
				<Sliner />
				<ul className={cx('list-offers')}>
					{offersArray.map((offer, index) => (
						<li key={index} className={cx('item-offers')}>
							<img src={offer.img} alt="anhvoucher" />
							<span>{offer.name}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={cx('body')}>
				<div className={cx('container')}>
					<div className={cx('wrap-category')}>
						<div className={cx('title-category')}>
							<h1>Danh mục</h1>
						</div>
						<div onClick={prevClick} className={cx('panigation-left')}>
							<FontAwesomeIcon className={cx('icon-panigation')} icon={faChevronLeft} />
						</div>
						<div className={cx('wrap-listCategory')}>
							<ul className={cx('list-category')} style={{ transform: transformValue, transition: "all 500ms ease 0s" }}>
								{categoryArray.map((category, i) => (
									<li key={i} className={cx('item-category')}>
										<a href="# ">
											<img src={category.img} alt="anh danh muc" />
											<p className={cx('des-category')}>{category.name}</p>
										</a>
									</li>
								))}
							</ul>
						</div>
						<div onClick={rightClick} className={cx('panigation-right')}>
							<FontAwesomeIcon className={cx('icon-panigation')} icon={faChevronRight} />
						</div>
					</div>
					<div className={cx('flash-sale')}>
						<div className={cx('header-sale')}>
							<div>
								<img src={img.flash_sale} alt="flash-sale" />
								<div>
									<span className={cx('hours')}>{timeLeft.hours}</span>
									<span className={cx('minutes')}>{timeLeft.minutes}</span>
									<span className={cx('seconds')}>{timeLeft.seconds}</span>
								</div>
							</div>
							<div className={cx('view-more')}>
								<h2>Xem tất cả</h2>
								<FontAwesomeIcon icon={faChevronRight} />
							</div>
						</div>
						<div>
							<ul className={cx('list-sale')}>
								{flashSaleArray.map((sale, index) => (
									<li key={index} className={cx('item-sale')}>
										<img src={sale.img} alt="anhsale" />
										<div className={cx('price-sale')}>
											Đ<span>{sale.price}</span>
										</div>
										<div className={cx('selled')}>{sale.selled}</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className={cx('wrap-banner')}>
						<div className={cx('banner-top')}>
							<img src={img.banner} alt="anh banner" />
						</div>
					</div>
					<div className={cx('wrap-products')}>
						<div className={cx('producst-header')}>
							<h1>Gợi ý hôm nay</h1>
						</div>
						<ul className={cx('list-products')}>
							{dataProducts.map((item, index) => (
								<Link to={`/products/?id=${item.phoneId}`} className="item-product">
									<ItemProducts Name={item.phoneName} index={index} img={item.phoneImage} price={item.price} quantitySelled={item.quantity} discount={item.discount} />

								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
