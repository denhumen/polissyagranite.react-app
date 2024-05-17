import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import global_en from "./translations/en/global.json"
import global_pl from "./translations/pl/global.json"
import global_ua from "./translations/ua/global.json"
import i18next from "i18next"
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';



i18next.init({
  interpolation: {escapeValue: false},
  lng: localStorage.getItem('language') || "en",
  resources: {
    en: {
      global: global_en
    },
    pl: {
      global: global_pl
    },
    ua: {
      global: global_ua
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
