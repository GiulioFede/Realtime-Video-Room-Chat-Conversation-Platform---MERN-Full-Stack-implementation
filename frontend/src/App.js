import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'
import LoginPage from './pages/authPages/LoginPage/LoginPage';
import RegisterPage from './pages/authPages/RegisterPage/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/login" exact element={<LoginPage />} />

        {/* REGISTER PAGE */}
        <Route path="/register" exact element={<RegisterPage />} />

        {/* DASHBOARD PAGE */}
        <Route path="/dashboard" exact element={<Dashboard />} />

        {/* defualt */}
        <Route path="*"  element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
