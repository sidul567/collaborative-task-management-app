import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { AuthContextProvider } from './context/AuthContext';

const theme = createTheme({
    typography: {
        fontFamily: "'Quicksand', sans-serif", 
    },
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </ThemeProvider>
);