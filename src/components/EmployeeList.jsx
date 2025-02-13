import { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import { Link } from 'react-router-dom';
import Button from './Button';
import { createEmployee, deleteEmployee, fetchEmployees, updateEmployee } from '../api/employees';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
      setLoading(false);
    };
    loadEmployees();
  }, []);


  const departments = ['Engineering', 'Creative', 'Leadership', 'HR'];

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees(employees.filter(emp => emp.id !== id));
  };
  const handleUpdate = async (id, updates) => {
    await updateEmployee(id, updates);
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
  }
  const handlePromote = async (id, emp) => {
    let role = emp.role.startsWith('Senior')
      ? emp.role.replace('Senior ', '')
      : `Senior ${emp.role}`;

    await updateEmployee(id, { ...emp, role: role });
    setEmployees(employees.map(emp =>
      emp.id === id ? {
        ...emp,
        role: role
      } : emp
    ));
  };
  const handleAddEmployee = async (newEmployee) => {
    await createEmployee(newEmployee);
    setEmployees([...employees, newEmployee]);
  };



  if (loading) return <div>Loading...</div>;

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>All Employees ({employees.length})</h2>
        <Link to="/add">
          <Button variant="success">+ New Employee</Button>
        </Link>
      </div>
      {employees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onPromote={handlePromote}
          onEdit={handleUpdate}
          onDelete={handleDelete}
          departments={departments}
          onAdd={handleAddEmployee}
        />
      ))}
    </div>
  );
}