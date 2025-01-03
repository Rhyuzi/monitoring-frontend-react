
import axios from 'axios';

// Base URL untuk API
const api = axios.create({
  baseURL: 'https://azi-monitoring.djoesnack.my.id', // Ganti dengan base URL API Anda
});

// Fungsi untuk mengambil data
export const fetchData = async (): Promise<any> => {
  try {
    const response = await api.get('/api/reports'); // Ganti dengan endpoint API yang sesuai
    return response.data; // Mengembalikan data yang diterima
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const addDataReport = async (data: any): Promise<any> => {
  try {
    const response = await api.post('/api/reports', data); // Ganti dengan endpoint API yang sesuai
    return response.data; // Mengembalikan data yang diterima
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

// Fungsi untuk login
export const login = async (username: string, password: string): Promise<any> => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data; // Mengembalikan data hasil login
  } catch (error) {
    throw new Error('Login failed');
  }
};
