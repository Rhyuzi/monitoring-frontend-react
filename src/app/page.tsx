import React from 'react';
import DashboardLayout from './components/DashboardLayout';
import Login from './components/Login';

const Dashboard: React.FC = () => {
  return (
    // <DashboardLayout>
    //   <h1 className="text-2xl font-bold text-black">Selamat Datang di Web Monitoring</h1>
    //   <div className="grid grid-cols-3 gap-4 mt-6">
    //     <div className="bg-white p-4 rounded-lg shadow-lg">
    //       <h2 className="text-xl font-medium">Total Users</h2>
    //       <p className="text-3xl font-bold">1,234</p>
    //     </div>
    //     <div className="bg-white p-4 rounded-lg shadow-lg">
    //       <h2 className="text-xl font-medium">Total Revenue</h2>
    //       <p className="text-3xl font-bold">$5,678</p>
    //     </div>
    //     <div className="bg-white p-4 rounded-lg shadow-lg">
    //       <h2 className="text-xl font-medium">Total Orders</h2>
    //       <p className="text-3xl font-bold">890</p>
    //     </div>
    //   </div>
    // </DashboardLayout>
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <Login />
    </div>
  );
};

export default Dashboard;
