import styles from './footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { footers } from '~/assets/img/importImages';
import qrcode from '~/assets/img/qr.png';
import appstore from '~/assets/img/appstore.png';
import chplay from '~/assets/img/ggplay.png';
import appge from '~/assets/img/appge.png';
const cx = classNames.bind(styles);
const footerArray = Object.keys(footers);
function Footer() {
	return (
		<aside className={cx('wrapper')}>
			<div className=" pt-12 container mt-5">
				<ul className="grid grid-cols-5 ">
					<li>
						<h3 className="text-[12px] text-[#000000de] font-[700] mt-5 mb-5">CHĂM SÓC KHÁCH HÀNG</h3>
						<ul className="flex-col">
							<li className="text-[12px] text-[#333] mb-2">Trung Tâm Trợ Giúp</li>
							<li className="text-[12px] text-[#333] mb-2">Shopee Blog</li>
							<li className="text-[12px] text-[#333] mb-2">Shopee Mall</li>
							<li className="text-[12px] text-[#333] mb-2">Hướng Dẫn Mua Hàng</li>
							<li className="text-[12px] text-[#333] mb-2">Hướng Dẫn Bán Hàng</li>
							<li className="text-[12px] text-[#333] mb-2">Thanh Toán</li>
							<li className="text-[12px] text-[#333] mb-2">Shopee Xu</li>
							<li className="text-[12px] text-[#333] mb-2">Vận Chuyển</li>
							<li className="text-[12px] text-[#333] mb-2">Trả Hàng & Hoàn Tiền</li>
							<li className="text-[12px] text-[#333] mb-2">Chăm Sóc Khách Hàng</li>
							<li className="text-[12px] text-[#333] mb-2">Chính Sách Bảo Hành</li>
						</ul>
					</li>
					<li>
						<h3 className="text-[12px] text-[#000000de] font-[700] mt-5 mb-5">VỀ SHOPEE</h3>
						<ul className="flex-col">
							<li className="text-[12px] text-[#333] mb-2">Giới Thiệu Về Shopee Việt Nam</li>
							<li className="text-[12px] text-[#333] mb-2">Tuyển Dụng</li>
							<li className="text-[12px] text-[#333] mb-2">Điều Khoản Shopee</li>
							<li className="text-[12px] text-[#333] mb-2">Chính Sách Bảo Mật</li>
							<li className="text-[12px] text-[#333] mb-2">Chính Hãng</li>
							<li className="text-[12px] text-[#333] mb-2">Kênh Người Bán</li>
							<li className="text-[12px] text-[#333] mb-2">Flash Sales</li>
							<li className="text-[12px] text-[#333] mb-2">Chương Trình Tiếp Thị Liên Kết Shopee</li>
							<li className="text-[12px] text-[#333] mb-2">Liên Hệ Với Truyền Thông</li>
						</ul>
					</li>
					<li>
						<h3 className="text-[12px] text-[#000000de] font-[700] mt-5 mb-5">THANH TOÁN</h3>
						<ul className="flex-col grid grid-cols-3 mr-8">
							{footerArray.map((key, index) => (
								<li key={index} className="w-[52px] h-[22px] mr-2 mb-2 p-1 bg-[#fff]">
									<img src={footers[key]} alt="anh footer" />
								</li>
							))}
						</ul>
					</li>
					<li>
						<h3 className="text-[12px] text-[#000000de] font-[700] mt-5 mb-5">THEO DÕI CHÚNG TÔI TRÊN</h3>
						<ul className="flex-col">
							<li>
								<FontAwesomeIcon className="mr-2 text-[16px] " icon={faFacebook} />
								<span className="text-[12px] text-[#000000A6]">Facebook</span>
							</li>
							<li>
								<FontAwesomeIcon className="mr-2 text-[16px] " icon={faInstagram} />
								<span className="text-[12px] text-[#000000A6]">Instagram</span>
							</li>
							<li>
								<FontAwesomeIcon className="mr-2 text-[16px] " icon={faLinkedin} />
								<span className="text-[12px] text-[#000000A6]">Linkedin</span>
							</li>
						</ul>
					</li>
					<li>
						<h3 className="text-[12px] text-[#000000de] font-[700] mt-5">TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h3>
						<ul className="flex items-center">
							<div className="mr-3 p-1">
								<img className="w-[88px]" src={qrcode} alt="anh qrcode" />
							</div>
							<div>
								<img
									className="w-[76px] h-[24px] object-contain mb-1"
									src={appstore}
									alt="anh appstore"
								/>
								<img className="w-[76px] h-[24px] object-contain mb-1" src={chplay} alt="amh ggplay" />
								<img className="w-[76px] h-[24px] object-contain mb-1" src={appge} alt="amh ggplay" />
							</div>
						</ul>
					</li>
				</ul>
			</div>
		</aside>
	);
}

export default Footer;
