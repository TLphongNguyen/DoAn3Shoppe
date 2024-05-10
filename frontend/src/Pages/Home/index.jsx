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
import { products } from '~/assets/img/importImages';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const imageKeys = Object.keys(products);

function Home() {
	const [endTime] = useState(moment().add(2, 'days').add(12, 'hours').add(0, 'minutes'));
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [transformValue, setTransformValue] = useState("translate(0px, 0px)");

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
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

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
							{imageKeys.map((key, index) => (
								<li key={index} className={cx(`item-products`)}>
									<div className={cx('wrap-item')}>
										<img src={products[key]} alt="anh1" />
										<span className={cx('name-product')}>ao khoac1</span>
										<div className={cx('info-sell')}>
											<div className={cx('price-product')}>
												₫<span>29.000</span>
											</div>
											<div className={cx('selled')}>
												Đã bán
												<span>1.5k</span>
											</div>
										</div>
										<div className={cx('seller')}>-50%</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
