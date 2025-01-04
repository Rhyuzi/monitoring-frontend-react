'use client';
import React, { useEffect, useState } from 'react';
import { DashboardLayoutProps } from '../interfaces/types';
import { useRouter, usePathname } from 'next/navigation';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const dataUser = JSON.parse(localStorage.users);
  useEffect(() => {
    // Cek jika localStorage.users tidak ada, arahkan ke halaman login
    const user = localStorage.getItem('users');
    if (!user) {
      router.push('/login');
    } else {
      setIsLoaded(true); // Set isLoaded menjadi true setelah pengecekan selesai
    }
    if (dataUser.role === 0 && pathname === '/dashboard') {
      router.push('/report');
      
    }
  }, [router]);


  const logout = () => {
    localStorage.clear(); // Menghapus data dari localStorage
    router.push('/login'); // Mengarahkan pengguna ke halaman login
  };
  if (!isLoaded) {
    return <div>Loading...</div>; // Tampilkan loading atau spinner
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 p-5">
        <h2 className="text-white text-xl font-semibold">Dashboard</h2>
        <ul className="mt-4 text-white">
          {dataUser?.role === 1 && (
            <li className="mb-4">
              <a href="/dashboard" >Dashboard</a>
            </li>
          )}

          <li className="mb-4">
            <a href="/report" >Reports</a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={logout}>Logout</a> {/* Menambahkan fungsi logout */}
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default DashboardLayout;
