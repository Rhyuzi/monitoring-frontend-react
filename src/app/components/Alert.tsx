import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  let bgColor = '';

  // Menentukan warna background berdasarkan jenis alert
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      break;
    default:
      bgColor = 'bg-gray-500';
      break;
  }

  return (
    <div className={`${bgColor} text-white p-4 rounded-md mb-4`}>
      <div className="flex justify-between">
        <div>{message}</div>
        <button onClick={onClose} className="ml-2 text-xl">&times;</button>
      </div>
    </div>
  );
};

export default Alert;
