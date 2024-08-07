import axios from 'axios';


const BASE_URL = 'http://192.168.18.199:5000'; 

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
