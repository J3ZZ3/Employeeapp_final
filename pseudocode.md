// Main Application Component
function App() {
    // State variables
    employees = [] // Array to hold employee data
    selectedEmployee = null // Currently selected employee for editing
    searchQuery = "" // Search input for filtering employees
    view = "list" // Current view (list or form)

    // Effect to load employees from local storage
    useEffect(() => {
        storedEmployees = loadEmployeesFromLocalStorage()
        setEmployees(storedEmployees)
    }, [])

    // Function to save employee data
    function saveEmployee(employee) {
        if (selectedEmployee) {
            // Update existing employee
            updatedEmployees = updateEmployeeInList(employee)
        } else {
            // Add new employee
            employee.id = generateUniqueId()
            updatedEmployees = addEmployeeToList(employee)
        }
        saveEmployeesToLocalStorage(updatedEmployees)
        setView("list") // Switch to list view
    }

    // Function to handle search input change
    function handleSearch(event) {
        searchQuery = event.target.value
    }

    // Function to delete an employee
    function deleteEmployee(employeeId) {
        updatedEmployees = removeEmployeeFromList(employeeId)
        saveEmployeesToLocalStorage(updatedEmployees)
    }

    // Render the application
    return (
        <div className="app-container">
            <h1>Employee Management</h1>
            {view === "list" ? (
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
                        onEdit={setSelectedEmployeeAndSwitchToForm}
                        onDelete={deleteEmployee}
                    />
                    <button onClick={addNewEmployee}>Add New Employee</button>
                </>
            ) : (
                <EmployeeForm
                    employee={selectedEmployee}
                    onSave={saveEmployee}
                    onCancel={switchToListView}
                />
            )}
        </div>
    )
}

// Employee List Component
function EmployeeList({ employees, searchQuery, onEdit, onDelete }) {
    filteredEmployees = filterEmployees(employees, searchQuery)

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
                {filteredEmployees.map(emp => (
                    <EmployeeRow
                        key={emp.id}
                        employee={emp}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    )
}

// Employee Form Component
function EmployeeForm({ employee, onSave, onCancel }) {
    employeeData = initializeEmployeeData(employee)

    // Handle input changes
    function handleChange(event) {
        updateEmployeeData(event.target.name, event.target.value)
    }

    // Handle file input change
    function handleFileChange(event) {
        readFile(event.target.files[0])
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault()
        onSave(employeeData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={employeeData.name} onChange={handleChange} required />
            <input name="surname" value={employeeData.surname} onChange={handleChange} required />
            <input name="email" value={employeeData.email} onChange={handleChange} required />
            <input name="position" value={employeeData.position} onChange={handleChange} required />
            <input name="department" value={employeeData.department} onChange={handleChange} required />
            <input name="phone" value={employeeData.phone} onChange={handleChange} required />
            <input name="startDate" value={employeeData.startDate} onChange={handleChange} required />
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
}
