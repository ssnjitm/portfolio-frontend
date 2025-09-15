import axios from 'axios';
import conf from '../conf/conf.js';

const api = axios.create({
  baseURL: conf.apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


