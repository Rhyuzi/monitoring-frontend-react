import React, { createContext, useState, useContext, ReactNode } from 'react';
import Alert from './Alert';

interface AlertContextType {
  showAlert: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideAlert: () => void;
  alertMessage: string;
  alertType: 'success' | 'error' | 'info' | 'warning' | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning' | null>(null);

  const showAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(hideAlert, 3000); // Otomatis menutup alert setelah 3 detik
  };

  const hideAlert = () => {
    setAlertMessage('');
    setAlertType(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alertMessage, alertType }}>
      {children}
      {alertMessage && alertType && (
        <Alert message={alertMessage} type={alertType} onClose={hideAlert} />
      )}
    </AlertContext.Provider>
  );
};
