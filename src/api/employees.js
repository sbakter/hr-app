const BASE_URL = 'http://localhost:3001/employees';

export const fetchEmployees = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};
export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};
export const createEmployee = async (employee) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  });
  return response.json();
};

export const updateEmployee = async (id, updates) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
};

export const deleteEmployee = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};