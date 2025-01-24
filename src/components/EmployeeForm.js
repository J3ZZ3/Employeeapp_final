import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  
  const [employeeData, setEmployeeData] = useState({
    name: '',
    surname: '',
    email: '',
    position: '',
    department: '', 
    phone: '',
    startDate: '',
    image: null,
  });

  
  useEffect(() => {
    if (employee) {
      setEmployeeData(employee);
    }
  }, [employee]);

  
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployeeData({ ...employeeData, image: reader.result });
    };
    reader.readAsDataURL(file); 
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSave(employeeData); 
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input type="text" name="name" value={employeeData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="surname" value={employeeData.surname} onChange={handleChange} placeholder="Surname" required />
      <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="position" value={employeeData.position} onChange={handleChange} placeholder="Position" required />
      <input type="text" name="department" value={employeeData.department} onChange={handleChange} placeholder="Department" required />
      <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="date" name="startDate" value={employeeData.startDate} onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
      <div className="form-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
