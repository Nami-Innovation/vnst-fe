import Axios from 'axios';

const isServer = typeof window === 'undefined';

const axios = Axios.create({
  baseURL: isServer
    ? process.env.NEXT_PUBLIC_API_SERVER_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default axios;
