import { useState } from 'react';
import EmployeeCard from './EmployeeCard';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', role: 'Manager' }
  ]);

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
        />
      ))}
    </div>
  );
}