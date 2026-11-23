import axios from 'axios';

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
export const axiosInstance = axios.create({ baseURL: apiBaseUrl, timeout: 30_000 });
