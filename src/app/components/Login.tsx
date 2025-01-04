'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../api/api';

const Login: React.FC = () => {
  const router = useRouter();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (!name || !password) {
      setError('Please fill out all fields');
      return;
    }

    try {
      // Proses login
      const result = await login(name, password);
      console.log('Logging in with', result);

      if (result.success) {
        // Simpan data pengguna ke localStorage
        localStorage.setItem('users', JSON.stringify(result.data.user));

        // Arahkan berdasarkan peran pengguna
        if (result.data.user.role === 1) {
          router.push('/dashboard');
        } else if (result.data.user.role === 0) {
          router.push('/report');
        }
      } else {
        // Tampilkan pesan error jika login gagal
        setError('Username atau Password salah');
      }
    } catch (error) {
      // Tangani error dari proses login
      console.error('Error during login:', error);

      // Tampilkan pesan error kepada pengguna
      setError('Username atau Password salah');
    }
  };


  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
