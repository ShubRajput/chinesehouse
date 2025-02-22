import axios from "axios";
import { API_CONFIG } from "../../config/constants";

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    ...API_CONFIG.HEADERS,
    'Content-Type': 'application/json'
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Log the request data
    console.log('Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Log the response
    console.log('Response:', {
      status: response.status,
      data: response.data,
      config: {
        url: response.config.url,
        method: response.config.method,
        data: response.config.data
      }
    });
    
    // Return the full response data
    return response.data;
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    return Promise.reject(error);
  }
);

export default instance;