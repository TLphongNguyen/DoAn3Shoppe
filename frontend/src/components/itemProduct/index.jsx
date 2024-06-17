import styles from './itemProduct.module.scss';
import classNames from 'classnames/bind';
import { formatCurrency } from '~/config/formatCurrency';
const cx = classNames.bind(styles);


function ItemProducts({ img, index, Name, price, quantitySelled, discount }) {
    return (
        <div className="">
            <li key={index} className={cx(`item-products`)}>
                <div className={cx('wrap-item')}>
                    <img src={img} alt="anh1" />
                    <span className={cx('name-product')}>{Name}</span>
                    <div className={cx('info-sell')}>
                        <div className={cx('price-product')}>
                            <span>{formatCurrency(price)}</span>
                        </div>
                        <div className={cx('selled')}>
                            Đã bán
                            <span>{quantitySelled}</span>
                        </div>
                    </div>
                    <div className={cx('seller')}>-{discount}%</div>
                </div>
            </li>
        </div>
    );
}

export default ItemProducts;