import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1f1f1f',
            lighter: '#121212'
        },
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme} >
            <CssBaseline enableColorScheme />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);