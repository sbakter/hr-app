import { useParams } from 'react-router-dom';
import {  fetchEmployeeById } from '../api/employees';
import { useEffect, useState } from 'react';

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const loadEmployee = async () => {
      const data = await fetchEmployeeById(id);
      setEmployee(data);
    };
    loadEmployee();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-detail">
      <h1>{employee.name}</h1>
      <p>Role: {employee.role}</p>
      <p>Department: {employee.department}</p>
      <p>Start Date: {employee.startDate}</p>
      <p>Location: {employee.location}</p>
    </div>
  );
}