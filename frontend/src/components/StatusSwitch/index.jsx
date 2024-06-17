import { Switch } from "antd";
import { useState } from "react";

function StatusSwitch({ initValue, newvalue }) {
    const [status, setStatus] = useState(initValue);

    const onSwitchChange = (checked) => {
        // Xử lý logic khi switch thay đổi
        setStatus(checked);
        // Gọi hàm newvalue (nếu cần)
        if (newvalue) {
            newvalue(checked);
        }
    };

    return (
        <Switch defaultChecked={status} onChange={onSwitchChange} />
    );
}

export default StatusSwitch;