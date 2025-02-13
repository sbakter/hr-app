import { useState } from 'react';
import EmployeeCard from './EmployeeCard';

export default function EmployeeList() {
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

  const departments = ['Engineering', 'Creative', 'Leadership', 'HR'];

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
    <div className="employee-list">
      {employees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onPromote={() => handlePromote(employee.id)}
          onEdit={handleEdit}
          departments={departments}
        />
      ))}
    </div>
  );
}