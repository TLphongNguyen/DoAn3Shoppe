import { useState } from "react";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



function Location() {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="wrap-content">
            <div className="w-[980px] bg-[#fff] ml-[27px] mb-[10px] h-[560px]">
                <div className="flex py-[22px] px-[30px] justify-between border-b-[1px] border-[#efefef] border-solid">
                    <div className="">
                        <h1 className="">Địa chỉ của tôi</h1>
                    </div>
                    <div className=" bg-[#ee4d2d] rounded-[2px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-[172px] h-10 px-[20px] flex items-center">
                        <FontAwesomeIcon className="text-[#fff] mr-[10px]" icon={faPlus} />
                        <button onClick={handleClickOpen} className="text-[#fff] text-[14px] leading-1 select-none text-center">Thêm địa chỉ</button>
                    </div>
                </div>
                <div className="pt-3 px-[30px]">
                    <h3 className="text-[18px] mb-2 leading-7">Địa chỉ</h3>
                    <div className="py-5">
                        <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                                <span className="text-[16px] text-[#000000de] mr-2">Nguyễn Tiến Linh Phong</span>
                                <span className="border-l-[0.5px] border-solid border-[#00000042] pl-2">(+84) 862889603</span>
                            </div>
                            <div className="">
                                <button className=" text-[#08f] p-1 text-[14px]">Cập nhật</button>
                                <button className=" text-[#08f] p-1 text-[14px]">Xóa</button>
                            </div>

                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-[14px] text-[#0000008a]">
                                <span className="block">Đình trương xá..</span>
                                <span className="">Xã Toàn Thắng, Huyện Kim Động, Hưng Yên</span>
                            </div>
                            <button className="border-[1px] border-solid border-[#00000042] text-[#000000de] h-7 leading-5 py-1 px-3 text-[14px] opacity-70">Thiết lập mặc định </button>
                        </div>
                        <span className="border-[.5px] border-solid rounded-[1px] border-[#ee4d2d] text-[#ee4d2d] py-[2px] px-1">Mặc định</span>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: function (event) {
                        event.preventDefault();
                        var formData = new FormData(event.currentTarget);
                        var formJson = Object.fromEntries(formData.entries());
                        var email = formJson.email;
                        console.log(email);
                        handleClose();
                    }
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
                                iconStyle=""

                            />
                            <FontAwesomeIcon className="mr-8 mb-3" icon={faSearch} />
                        </div>
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
                                    Phường/ Xã
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className="text-[#555] min-w-[140px] text-[14px] p-[10px] cursor-pointer" onClick={handleClose}>Trở lại</button>
                        <button className="text-[#fff] bg-[#ee4d2d] min-w-[140px] text-[14px] p-[10px] cursor-pointer" type="submit">Hoàn thành</button>
                    </DialogActions>

                </div>
            </Dialog>
        </div>

    )
}

export default Location;