import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SettingsProvider from './Context/Settings';
import ModeProvider from './Context/Mode';
import { MantineProvider } from '@mantine/core';
import AuthProvider from './Context/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* this is how we provide Context, 
    notice the wrapper */}
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <ModeProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </ModeProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
