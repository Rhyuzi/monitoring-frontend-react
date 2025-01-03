
'use client';
import DashboardLayout from '../components/DashboardLayout';
import React, { useEffect, useState } from 'react';

import { fetchData } from '../api/api';
const Dashboard: React.FC = () => {
  const [dataLength, setDataLength] = useState<number | null>(null);
  useEffect(() => {
    const loadReports = async () => {
      try {
        const result = await fetchData();
        console.log('Fetched data:', result); // Cetak data ke konsol
        setDataLength(result.length);
      } catch (err: any) {
        console.error('Error fetching data:', err.message || err); // Cetak error ke konsol
      }
    };

    loadReports();
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-600">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-6 text-gray-600">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Laporan</h2>
          <p className="text-3xl font-bold ">{dataLength !== null ? dataLength : 'Loading...'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Revenue</h2>
          <p className="text-3xl font-bold">$5,678</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Orders</h2>
          <p className="text-3xl font-bold">890</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
