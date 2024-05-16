import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import GalleryPage from './pages/GalleryPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsConditions/>} />
          <Route path="/gallery/:parentSliderId/:sliderId" element={<GalleryPage />} />
          <Route path="/order" element={<ShoppingCartPage/> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
