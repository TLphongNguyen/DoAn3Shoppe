import styles from './sliner.module.scss'
import classNames from "classnames/bind";

import { Swiper, SwiperSlide } from 'swiper/react';
import {images} from '~/assets/img/importImages';
import img from '~/assets/img';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { Navigation, Pagination, Mousewheel, Keyboard ,Autoplay} from 'swiper/modules';
const cx = classNames.bind(styles)
const imageKeys = Object.keys(images);
function Sliner() {
    return ( 
      <div className = {cx('wrap-sliner')}>
        <div className = {cx('sliner')}>
          <Swiper
            cssMode={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            loop = {true}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 3000,"disableOnInteraction": false}}
            modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
            className="mySwiper"
          >
            {imageKeys.map((key, index) => (
              <SwiperSlide key={index}>
                <img src={images[key]} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
          ))}
          </Swiper>
        </div>
        <div className={cx('slider-extra')}>
              <img src = {img.extra1} alt="anh1"/>
              <img src = {img.extra2} alt="anh2"/>
        </div>

      </div>
      
     );
}

export default Sliner;
