import { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { customerState } from '~/Recoil/customer';
import { AUTH_URL } from '~/config'


const useFetchCustomer = () => {
    const setCustomerState = useSetRecoilState(customerState);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`${AUTH_URL}/customer`, {
                    headers: {
                        authorization: token,
                    },
                });
                setCustomerState(response.data);
                sessionStorage.setItem('customer', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching customer:', error);
                setCustomerState(null);
            }
        };
        fetchCustomer();
    }, [setCustomerState]);
};
const useUpdateCustomer = () => {
    const setCustomerState = useSetRecoilState(customerState);

    const updateCustomer = async (formData) => {
        try {
            const response = await axios.post(`${AUTH_URL}/updateaddress`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log('Response:', response.data);

            // Cập nhật trạng thái customer
            const updatedCustomer = {
                ...formData,
            };

            setCustomerState(updatedCustomer);
            sessionStorage.setItem('customer', JSON.stringify(updatedCustomer));
        } catch (error) {
            console.error('There was an error updating customer:', error);
        }
    };

    return updateCustomer;
};
export { useFetchCustomer, useUpdateCustomer }