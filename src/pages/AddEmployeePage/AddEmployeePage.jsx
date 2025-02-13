import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { createEmployee } from '../../api/employees';
import styles from './AddEmployeePage.module.css';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer',
    department: 'Engineering',
    startDate: new Date().toISOString().split('T')[0],
    location: '',
    probationPeriod: 3
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee({
      ...formData,
      id: "" + Date.now()
    });
    navigate('/employees');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields similar to edit form but for new entries */}
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        {/* Other form fields */}
        <div className="button-group">
          <Button className="marginRight" type="submit" variant="success">Add Employee</Button>
          <Button type="button" onClick={() => navigate(-1)} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}