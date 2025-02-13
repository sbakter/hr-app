import { useState, useEffect } from 'react';
import { 
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../api/employees';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const addEmployee = async (employee) => {
    const newEmployee = await createEmployee(employee);
    setEmployees(prev => [...prev, newEmployee]);
  };

  const editEmployee = async (id, updates) => {
    await updateEmployee(id, updates);
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
    );
  };

  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return {
    employees,
    loading,
    addEmployee,
    editEmployee,
    removeEmployee
  };
};