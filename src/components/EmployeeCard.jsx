export default function EmployeeCard({ employee, onPromote }) {
    return (
      <div className="employee-card">
        <h3>{employee.name}</h3>
        <p>Role: {employee.role}</p>
        <button onClick={onPromote}>
          {employee.role.startsWith('Senior') ? 'Demote' : 'Promote'}
        </button>
      </div>
    );
  }