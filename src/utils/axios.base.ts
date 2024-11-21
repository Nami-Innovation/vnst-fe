import Axios from 'axios';

const isServer = typeof window === 'undefined';

const axios = Axios.create({
  baseURL: isServer
    ? process.env.NEXT_PUBLIC_API_SERVER_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;
    if (message) {
      error.message = Array.isArray(message)
        ? message.join(', ')
        : error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export default axios;
