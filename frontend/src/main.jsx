import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import App from './App';
import GlobalProvider from './providers/context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </ThemeProvider>
    </React.StrictMode>
);
