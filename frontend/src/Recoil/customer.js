import { atom } from 'recoil';
const storedCustomer = JSON.parse(localStorage.getItem('customer'));
export const customerState = atom({
    key: 'customerState',
    default: storedCustomer || null,
});