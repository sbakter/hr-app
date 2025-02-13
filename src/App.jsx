import { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import './App.css';
import Button from './components/Button';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <div className="header">
        <h1>Employee Directory</h1>
        <Button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          variant={isLoggedIn ? 'danger' : 'success'}
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
      </div>
      
      {isLoggedIn ? (
        <EmployeeList />
      ) : (
        <div className="login-message">
          <h2>Please log in to access the employee directory</h2>
          <p>Use any credentials (demo only)</p>
        </div>
      )}
    </div>
  );
}

export default App;