import { useState } from 'react'
import EmployeeList from './components/EmployeeList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Employee Directory</h1>
      <EmployeeList />
    </div>
  )
}

export default App
