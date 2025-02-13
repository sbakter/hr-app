import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Button from './components/Button';
import './App.css';
import LoginPage from './pages/LoginPage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      department: 'Engineering',
      startDate: '2023-03-15',
      probationPeriod: 3,
      location: 'New York',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Designer',
      department: 'Creative',
      startDate: '2020-05-20',
      probationPeriod: 3,
      location: 'New York',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Manager',
      department: 'Leadership',
      startDate: '2024-01-10',
      probationPeriod: 3,
      location: 'New York',
    }
  ]);


  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };
  const handleEdit = (id, newData) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, ...newData } : emp
    ));
  };

  const handlePromote = (employeeId) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId ? {
        ...emp,
        role: emp.role.startsWith('Senior')
          ? emp.role.replace('Senior ', '')
          : `Senior ${emp.role}`
      } : emp
    ));
  };

  return (
    <BrowserRouter>
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
              employees={employees}
              onPromote={handlePromote}
              onEdit={handleEdit}
            />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/add" element={
          isLoggedIn ? (
            <AddEmployeePage onSubmit={handleAddEmployee} />
          ) : <Navigate to="/login" replace />
        } />
      </Routes>
    </BrowserRouter>
  );
}