import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useRecoilValue } from 'recoil';
import { customerState } from '~/Recoil/customer';

function HeaderAdmin() {
    const customer = useRecoilValue(customerState);

    const items = [
        {
            key: 'profile',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="/profile">
                    Xem Profile
                </a>
            ),
        },
        {
            key: 'logout',
            danger: true,
            label: 'Logout',
        },
    ];
    return (
        <div className="h-10 z-10 w-[100%]">
            <div className="container flex justify-around py-2 ">
                <h3></h3>
                <Dropdown
                    menu={{

                        items,
                    }}
                >
                    <a>
                        <Space>
                            <div className="flex items-center">
                                <div className="w-[30px] mr-2 ">
                                    <img src={customer.avt} alt="" className="rounded-[50%] " />
                                </div>
                                <div className="">
                                    <span>{customer.fullName}</span>
                                </div>
                            </div>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderAdmin;