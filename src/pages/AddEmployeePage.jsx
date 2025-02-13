import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function AddEmployeePage({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Developer',
    department: 'Engineering',
    startDate: new Date().toISOString().split('T')[0],
    location: '',
    probationPeriod: 3
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now()
    });
    navigate('/employees');
  };

  return (
    <div className="form-page">
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields similar to edit form but for new entries */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        {/* Other form fields */}
        <div className="button-group">
          <Button type="submit" variant="success">Add Employee</Button>
          <Button type="button" onClick={() => navigate(-1)} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}