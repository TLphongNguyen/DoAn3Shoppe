import { atom } from 'recoil';
const storedCustomer = JSON.parse(sessionStorage.getItem('customer'));
export const customerState = atom({
    key: 'customerState',
    default: storedCustomer || null,
});