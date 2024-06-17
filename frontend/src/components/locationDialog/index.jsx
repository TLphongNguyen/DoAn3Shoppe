import React, { useState, useEffect } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { AUTH_URL } from "~/config";
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';

const LocationDialog = ({ open, handleClose, handleSubmit }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({ province: '', district: '', ward: '' });
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const customer = useRecoilValue(customerState);

    useEffect(() => {
        axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`)
            .then(response => {
                setProvinces(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const handleOpenClick = () => {
        setIsSelectOpen(true);
    }

    const handleProvinceClick = (provinceid, provinceName) => {
        setActiveIndex(1);
        setSelectedLocation({ province: provinceName, district: '', ward: '' });
        if (provinceid) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceid}.htm`)
                .then(response => {
                    setDistricts(response.data.data);
                    setWards([]);
                })
                .catch(error => {
                    console.error('Error fetching districts:', error);
                });
        }
    };

    const handleDistrictClick = (districtid, districtName) => {
        setActiveIndex(2);
        setSelectedLocation(prevState => ({ ...prevState, district: districtName, ward: '' }));
        if (districtid) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${districtid}.htm`)
                .then(response => {
                    setWards(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching wards:', error);
                });
        }
    };

    const handleWardClick = (wardName) => {
        setSelectedLocation(prevState => ({ ...prevState, ward: wardName }));
        setIsSelectOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}
        >
            <div className="w-[500px] h-[562px]">
                <DialogTitle>Địa chỉ mới</DialogTitle>
                <DialogContent>
                    <div className="flex pt-[15px]">
                        <div className="mr-4 flex-1">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="userName"
                                label="họ và tên"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                        <div className="flex-1">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="numberPhone"
                                label="Số điện thoại"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex items-end">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="location"
                            label="Tỉnh thành phố , Quận/Huyện, Phường/Xã"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={`${selectedLocation.province}${selectedLocation.province ? ', ' : ''}${selectedLocation.district}${selectedLocation.district ? ', ' : ''}${selectedLocation.ward}`}
                            onClick={handleOpenClick}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <FontAwesomeIcon className="mr-8 mb-3" icon={faSearch} />
                    </div>
                    {isSelectOpen && (
                        <div className="max-h-[280px] h-[280px]">
                            <div className="flex justify-center items-center border-[1px] border-solid border-[#00000024]">
                                <div
                                    className={`py-[15px] px-[2px] text-center w-[146px] cursor-pointer text-[14px] ${activeIndex === 0 ? 'active' : ''}`}
                                    onClick={() => handleItemClick(0)}
                                    style={{ color: activeIndex === 0 ? '#ee4d2d' : '#000000cc', borderBottom: activeIndex === 0 ? '2px solid #ee4d2d' : 'none' }}
                                >
                                    Tỉnh/Thành phố
                                </div>
                                <div
                                    className={`py-[15px] px-[2px] text-center w-[146px] cursor-pointer text-[14px] ${activeIndex === 1 ? 'active' : ''}`}
                                    onClick={() => handleItemClick(1)}
                                    style={{ color: activeIndex === 1 ? '#ee4d2d' : '#000000cc', borderBottom: activeIndex === 1 ? '2px solid #ee4d2d' : 'none' }}
                                >
                                    Quận/Huyện
                                </div>
                                <div
                                    className={`py-[15px] px-[2px] text-center w-[146px] cursor-pointer text-[14px] ${activeIndex === 2 ? 'active' : ''}`}
                                    onClick={() => handleItemClick(2)}
                                    style={{ color: activeIndex === 2 ? '#ee4d2d' : '#000000cc', borderBottom: activeIndex === 2 ? '2px solid #ee4d2d' : 'none' }}
                                >
                                    Phường/Xã
                                </div>
                            </div>
                            <div>
                                {activeIndex === 0 && (
                                    <ul className="block border-x-[1px] border-b-[1px] border-solid border-[#dbdbdb] overflow-auto max-h-[250px] ">
                                        {provinces.map(province => (
                                            <li className="cursor-pointer w-[100%] hover:bg-[#f5f5f5] p-3 text-[15px]" key={province.id} onClick={() => handleProvinceClick(province.id, province.name)}>
                                                {province.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {activeIndex === 1 && (
                                    <ul className="block border-x-[1px] border-b-[1px] border-solid border-[#dbdbdb] overflow-auto max-h-[250px] ">
                                        {districts.map(district => (
                                            <li className="cursor-pointer w-[100%] hover:bg-[#f5f5f5] p-3 text-[15px]" key={district.id} onClick={() => handleDistrictClick(district.id, district.name)}>
                                                {district.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {activeIndex === 2 && (
                                    <ul className="block border-x-[1px] border-b-[1px] border-solid border-[#dbdbdb] overflow-auto max-h-[250px] ">
                                        {wards.map(ward => (
                                            <li className="cursor-pointer w-[100%] hover:bg-[#f5f5f5] p-3 text-[15px]" key={ward.id} onClick={() => handleWardClick(ward.name)}>
                                                {ward.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <button className="text-[#555] min-w-[140px] text-[14px] p-[10px] cursor-pointer" onClick={handleClose}>Trở lại</button>
                    <button className="text-[#fff] bg-[#ee4d2d] min-w-[140px] text-[14px] p-[10px] cursor-pointer" type="submit">Hoàn thành</button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default LocationDialog;
