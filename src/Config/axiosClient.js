import axios from "axios";

const axiosClient = axios.create({
  // baseURL: 'http://localhost:8080/api/v1/',
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}`,
  timeout: 1000,
  headers: {
    'Content-Type' : 'application/json'
  }
});


export default axiosClient;