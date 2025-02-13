import EmployeeList from '../components/EmployeeList';

export default function EmployeeListPage({ employees, onPromote, onEdit }) {
  return (
    <div className="list-page">
      <h1>Employee Directory</h1>
      <EmployeeList 
        employees={employees}
        onPromote={onPromote}
        onEdit={onEdit}
      />
    </div>
  );
}