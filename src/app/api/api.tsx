
import axios from 'axios';

// Base URL untuk API
const api = axios.create({
  // baseURL: 'https://azi-monitoring.djoesnack.my.id', 
  baseURL: 'http://127.0.0.1:8000',
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

export const updateDataReport = async (data: any): Promise<any> => {
  try {
    const response = await api.post('/api/update-report', data); // Ganti dengan endpoint API yang sesuai
    return response.data; // Mengembalikan data yang diterima
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};


// Fungsi untuk login
export const login = async (username: string, password: string): Promise<any> => {
  try {
    const payload = {
      name: username,
      password
    }
    const response = await api.post('/api/login', payload);
    return response.data; // Mengembalikan data hasil login
  } catch (error) {
    throw new Error('Login failed');
  }
};
