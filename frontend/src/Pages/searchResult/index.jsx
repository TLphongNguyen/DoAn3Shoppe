import { useEffect, useState } from "react";
import Header from "~/Layout/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ItemProducts from "~/components/itemProduct";
import { useLocation, Link } from 'react-router-dom';
import { SERVICE_URL } from "~/config";
import axios from "axios";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
function SearchResult() {
    const [data, setData] = useState([])
    const query = useQuery();
    const name = query.get('name');
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVICE_URL}/search/${name}`);
            setData(response.data);
            // console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchData()
    })
    return (
        <div className="gwap-content ">
            <Header />
            <div className="body-search mt-[116px] bg-[#f5f5f5] ">
                <div className="container ">
                    <div className="flex pt-[50px]">
                        <FontAwesomeIcon icon={faLightbulb} />
                        <h1 className="">Kết quả tìm kiếm theo
                            <span className="">"{name}"</span>
                        </h1>
                    </div>
                    <div className="arrange flex h-[60px] bg-[#00000008] py-[13px] px-[20px] items-center">
                        <span className="text-[14px] text-[#555] mr-[5px]">Sắp xếp theo</span>
                        <div className="ml-[10px]">
                            <button className="h-[34px] px-[15px] bg-[#ee4d2d] text-[#fff] rounded-[2px] mx-[6px]">Liên quan</button>
                            <button className="h-[34px] px-[15px] bg-[#fff] rounded-[2px] mx-[6px]">mới nhất</button>
                            <button className="h-[34px] px-[15px] bg-[#fff] rounded-[2px] mx-[6px]">bán chạy</button>
                        </div>
                        <div className="relative">
                            <div className="h-[34px] w-[200px] flex justify-between pl-[12px] pr-[6px] items-center bg-[#fff] ">
                                <span className="">giá</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <div className="absolute hidden">
                                <button className="block">giá: từ thấp đến cao</button>
                                <button className="">giá: từ cao đến thấp</button>
                            </div>
                        </div>
                    </div>
                    <div className="products">
                        <ul className="list-products">
                            {data != null ? (
                                data.map((item, index) => (
                                    <Link to={`/products/?id=${item.phoneId}`} className="item-product">
                                        <ItemProducts Name={item.phoneName} index={index} img={item.phoneImage} price={item.price} quantitySelled={item.quantity} discount={item.discount} />

                                    </Link>
                                ))

                            ) : (
                                <h3>Không có sản phẩm tìm kiếm</h3>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;