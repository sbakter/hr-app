import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Button from './components/Button/Button';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import EmployeeListPage from './pages/EmployeeListPage/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage/AddEmployeePage';
import EmployeeDetail from './pages/EmployeeDetail/EmployeeDetail';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);



  return (
    <BrowserRouter>
      <div className="app">
        <nav className="main-nav">
          <Link to="/employees" className="nav-logo">HR Portal</Link>
          {isLoggedIn && (
            <div className="nav-links">
              <Link to="/employees" className="nav-link">Employees</Link>
              <Link to="/add" className="nav-link">Add Employee</Link>
              <Button onClick={handleLogout} variant="danger">Logout</Button>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/employees" replace /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/employees" element={
            isLoggedIn ? (
              <EmployeeListPage
              />
            ) : <Navigate to="/login" replace />
          } />
          <Route path="/add" element={
            isLoggedIn ? (
              <AddEmployeePage />
            ) : <Navigate to="/login" replace />
          } />
          <Route path="/employee/:id" element={
            isLoggedIn ? (
              <EmployeeDetail />
            ) : <Navigate to="/login" replace />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}