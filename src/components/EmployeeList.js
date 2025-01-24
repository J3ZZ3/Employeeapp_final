import React from 'react';

const EmployeeList = ({ employees, searchQuery, onEdit, onDelete }) => {
  
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.surname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Start Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name} {emp.surname}</td>
            <td>{emp.position}</td>
            <td>{emp.department}</td> 
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.startDate}</td>
            <td>
              <button className="action-button" onClick={() => onEdit(emp)}>Edit</button>
              <button className="action-button" onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
