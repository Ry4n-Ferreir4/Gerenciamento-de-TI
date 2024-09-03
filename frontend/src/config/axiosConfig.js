import axios from 'axios';


const BASE_URL = 'https://backendgerenciamento.ryan.tec.br'; 

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
