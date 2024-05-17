import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import GalleryPage from './pages/GalleryPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CommunicationPage from './pages/CommunicationPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage/>} />
          <Route path="/gallery/:parentSliderId/:sliderId/" element={<GalleryPage />} />
          <Route path="/order" element={<ShoppingCartPage/> }/>
          <Route path="/communication" element={<CommunicationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
