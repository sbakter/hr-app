import EmployeeCard from '../EmployeeCard/EmployeeCard';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useEmployees } from '../../hooks/useEmployees';

export default function EmployeeList() {
  const { employees, loading, addEmployee, editEmployee, removeEmployee } = useEmployees();

  const departments = ['Engineering', 'Creative', 'Leadership', 'HR'];

  const handleDelete = async (id) => {
    await removeEmployee(id);
    setEmployees(employees.filter(emp => emp.id !== id));
  };
  const handleUpdate = async (id, updates) => {
    await editEmployee(id, updates);
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
  }
  const handlePromote = async (id, emp) => {
    let role = emp.role.startsWith('Senior')
      ? emp.role.replace('Senior ', '')
      : `Senior ${emp.role}`;

    await editEmployee(id, { ...emp, role: role });
    setEmployees(employees.map(emp =>
      emp.id === id ? {
        ...emp,
        role: role
      } : emp
    ));
  };
  const handleAddEmployee = async (newEmployee) => {
    await addEmployee(newEmployee);
    setEmployees([...employees, newEmployee]);
  };



  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>All Employees ({employees.length})</h2>
        <Link className="marginBottom" to="/add">
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