import EmployeeList from '../../components/EmployeeList/EmployeeList';
import styles from './EmployeeListPage.module.css';

export default function EmployeeListPage({ employees, onPromote, onEdit }) {
  return (
    <div className={`${styles.list} list-page`}>
      <h1>Employee Directory</h1>
      <EmployeeList 
        employees={employees}
        onPromote={onPromote}
        onEdit={onEdit}
      />
    </div>
  );
}