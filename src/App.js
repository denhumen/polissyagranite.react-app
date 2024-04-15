import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
