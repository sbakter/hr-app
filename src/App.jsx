import { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <div className="header">
        <h1>Employee Directory</h1>
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="login-button"
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
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