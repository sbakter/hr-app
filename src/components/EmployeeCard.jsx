import PropTypes from "prop-types";
import { useState } from "react";
import Button from "./Button";

export default function EmployeeCard({  
  employee, 
  onPromote, 
  onEdit,
  departments  }) {
  const departmentColors = {
    Engineering: 'border-blue-500',
    Creative: 'border-green-500',
    Leadership: 'border-purple-500'
  };
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...employee });

  const handleEditSubmit = () => {
    onEdit(employee.id, editedData);
    setEditing(false);
  };

  const calculateYearsWorked = () => {
    const start = new Date(employee.startDate);
    const today = new Date();
    return today.getFullYear() - start.getFullYear();
  };

  const isOnProbation = () => {
    const start = new Date(employee.startDate);
    const today = new Date();
    const monthsDiff = (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());
    return monthsDiff < employee.probationPeriod;
  };

  const isAnniversary = () => {
    const start = new Date(employee.startDate);
    const today = new Date();
    return start.getMonth() === today.getMonth() &&
      start.getDate() === today.getDate();
  };

  return (
    <div className={`employee-card ${departmentColors[employee.department]} ${isOnProbation() ? 'probation' : ''
      }`}>
      {!editing ? (
        <>
          <h3>{employee.name}</h3>
          <p>Role: {employee.role}</p>
          <p>Department: {employee.department}</p>
          <p>Location: {employee.location}</p>
          <p>Start Date: {new Date(employee.startDate).toLocaleDateString()}</p>
          <p>Years Worked: {calculateYearsWorked()}</p>

          {isOnProbation() && (
            <div className="reminder probation-reminder">
              ⚠️ Probation Review Needed
            </div>
          )}

          {isAnniversary() && (
            <div className="reminder anniversary-reminder">
              🎉 {calculateYearsWorked()} Year Anniversary!
            </div>
          )}
          <div className="button-group">
            <Button variant="secondary" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button
              onClick={onPromote}
              variant={employee.role.startsWith('Senior') ? 'danger' : 'success'}
            >
              {employee.role.startsWith('Senior') ? 'Demote' : 'Promote'}
            </Button>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <select
            value={editedData.role}
            onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
          >
            <option>Developer</option>
            <option>Senior Developer</option>
            <option>Designer</option>
            <option>Senior Designer</option>
            <option>Manager</option>
          </select>

          <select
            value={editedData.department}
            onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <input
            type="text"
            value={editedData.location}
            onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
            placeholder="Location"
          />

          <div className="button-group">
            <Button variant="success" onClick={handleEditSubmit}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Existing reminders */}
    </div>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  onPromote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string).isRequired
};