export default function EmployeeCard({ employee, onPromote }) {
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
      <div className={`employee-card ${isOnProbation() ? 'probation' : ''}`}>
        <h3>{employee.name}</h3>
        <p>Role: {employee.role}</p>
        <p>Department: {employee.department}</p>
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
  
        <button onClick={onPromote}>
          {employee.role.startsWith('Senior') ? 'Demote' : 'Promote'}
        </button>
      </div>
    );
  }