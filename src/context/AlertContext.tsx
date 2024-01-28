import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface AlertContextType {
  showAlert: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => void;
  closeAlert: () => void;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({ open: false, message: '', severity: 'info' });

  const showAlert = (message: string, severity: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setAlert({ open: true, message, severity });
  };

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={closeAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={closeAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
