import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import AdminLoginPage from './pages/AdminLoginPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/gallery/:parentSliderId/:sliderId" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
