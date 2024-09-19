import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList'; 
import EmployeeForm from './components/EmployeeForm'; 
import './App.css'; 

const App = () => {
  
  const [employees, setEmployees] = useState([]);
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [view, setView] = useState('list');

  
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  
  const saveEmployee = (employee) => {
    let updatedEmployees = [];
    if (selectedEmployee) {
      
      updatedEmployees = employees.map((emp) => (emp.id === employee.id ? employee : emp));
    } else {
      
      employee.id = Date.now(); 
      updatedEmployees = [...employees, employee];
    }

    setEmployees(updatedEmployees);
    
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setView('list'); 
  };

  
  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees)); 
  };

  
  const handleSearch = (a) => {
    setSearchQuery(a.target.value);
  };

  return (
    <div className="app-container">
      <h1>Employee Management</h1>
      {view === 'list' ? (
        <>
          <input
            className="search-input"
            placeholder="Search Employees..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <EmployeeList
            employees={employees}
            searchQuery={searchQuery}
            onEdit={(emp) => {
              setSelectedEmployee(emp); 
              setView('form'); 
            }}
            onDelete={deleteEmployee} 
          />
          <button className="add-button" onClick={() => { setSelectedEmployee(null); setView('form'); }}>
            Add New Employee
          </button>
        </>
      ) : (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={saveEmployee} 
          onCancel={() => setView('list')} 
        />
      )}
    </div>
  );
};

export default App;
