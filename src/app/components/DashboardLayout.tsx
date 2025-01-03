'use client';
import React from 'react';
import { DashboardLayoutProps } from '../interfaces/types';
// import { useRouter } from 'next/router';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // const router = useRouter();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 p-5">
        <h2 className="text-white text-xl font-semibold">Dashboard</h2>
        <ul className="mt-4 text-white">
          <li className="mb-4">
            <a href="/dashboard" >Home</a>
          </li>
          <li className="mb-4">
            <a href="/report" >Reports</a>
          </li>
          <li className="mb-4">
            <a href="#">Settings</a>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default DashboardLayout;
