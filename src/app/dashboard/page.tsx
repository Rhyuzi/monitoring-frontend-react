'use client';
import DashboardLayout from '../components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [dataLength, setDataLength] = useState<number | null>(null);
  const [reportsData, setReportsData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  // Group reportsData by program_name and sum beneficiaries
  const groupedByProgram = reportsData.reduce((acc, { program_name, beneficiaries }) => {
    const existingProgram = acc.find((item: { program_name: string }) => item.program_name === program_name);
    if (existingProgram) {
      existingProgram.beneficiaries += beneficiaries;
    } else {
      acc.push({ program_name, beneficiaries });
    }
    return acc;
  }, [] as { program_name: string, beneficiaries: number }[]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const result = await fetchData();
        console.log('Fetched data:', result); // Log the fetched data
        setDataLength(result.length); // Set the total data length
        setReportsData(result); // Store the data for further processing

        // Call the chart data processing function after data is fetched
        processChartData(result);
      } catch (err: any) {
        console.error('Error fetching data:', err.message || err); // Log the error if fetching fails
      }
    };

    loadReports();
  }, []);

  const processChartData = (data: any[]) => {
    const groupedByProvince = data.reduce((acc, { province, beneficiaries }) => {
      if (acc[province]) {
        acc[province] += beneficiaries;
      } else {
        acc[province] = beneficiaries;
      }
      return acc;
    }, {});

    // Menyiapkan data untuk grafik
    const labels = Object.keys(groupedByProvince); // Daftar provinsi
    const values = Object.values(groupedByProvince); // Jumlah penerima bantuan per provinsi

    setChartData({
      labels,
      datasets: [
        {
          label: 'Total Penyaluran Bantuan',
          data: values,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-600">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-6 text-gray-600">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Laporan</h2>
          <p className="text-3xl font-bold ">{dataLength !== null ? dataLength : 'Loading...'}</p>
        </div>

        {groupedByProgram.length > 0 ? groupedByProgram.map((item: any) => (
          <div key={item.program_name} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-medium">{item.program_name}</h2>
            <p className="text-3xl font-bold">{item.beneficiaries}</p>
          </div>
        )) : 'Loading...'}
      </div>

      <div
        style={{ minWidth: '550px', width: '600px' }}
        className="mt-6">
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
