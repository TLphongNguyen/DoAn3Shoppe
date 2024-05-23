import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3003', // Thay thế bằng đường dẫn thực tế của server
});

export default axiosInstance;