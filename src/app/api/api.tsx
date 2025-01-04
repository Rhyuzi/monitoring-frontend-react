
import axios from 'axios';

// Base URL untuk API
const api = axios.create({
  baseURL: 'https://azi-monitoring.djoesnack.my.id', 
  // baseURL: 'http://127.0.0.1:8000',
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

export const deleteDataReport = async (data: any): Promise<any> => {
  try {
    console.log('data', data);
    const response = await api.post('/api/delete-report', data); // Ganti dengan endpoint API yang sesuai
    return response.data; // Mengembalikan data yang diterima
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const eksportPDF = async (): Promise<any> => {
  await api.get('/api/export-reports'); // Ganti dengan endpoint API yang sesuai
};

export const eksportEXCEL = async (): Promise<void> => {
  try {
    const response = await api.get('/api/export-reports-excel', {
      responseType: 'blob', // Pastikan respons adalah Blob untuk file
    });

    // Buat URL dari respons blob
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const downloadUrl = window.URL.createObjectURL(blob);

    // Buat link untuk mendownload file
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'laporan_reports.xlsx'; // Nama file saat diunduh
    document.body.appendChild(link);
    link.click();

    // Hapus link setelah digunakan
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error saat eksport Excel:', error);
  }
}

export const updateDataReport = async (data: any): Promise<any> => {
  try {
    const response = await api.post('/api/update-report', data); // Ganti dengan endpoint API yang sesuai
    return response.data; // Mengembalikan data yang diterima
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const updateStatusReport = async (data: any): Promise<any> => {
  try {
    const response = await api.post('/api/report/update-status-report', data); // Ganti dengan endpoint API yang sesuai
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
