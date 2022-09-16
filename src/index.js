import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#182f61',
            lighter: '#121212'
        },
        secondary: {
            main: '#EEEEEE'
        },
        rarity: {
            epic: '#ff16f7',
            legendary: '#f7a22d'
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={theme} >
        <CssBaseline enableColorScheme />
        <App />
    </ThemeProvider>
);