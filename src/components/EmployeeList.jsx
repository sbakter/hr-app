import { useState } from 'react';
import EmployeeCard from './EmployeeCard';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function EmployeeList({ employees, onPromote, onEdit }) {
  
  const departments = ['Engineering', 'Creative', 'Leadership', 'HR'];

  

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
          onPromote={onPromote}
          onEdit={onEdit}
          departments={departments}
        />
      ))}
    </div>
  );
}