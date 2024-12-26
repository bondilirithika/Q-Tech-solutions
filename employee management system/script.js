const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");
const filterRole = document.getElementById("filterRole");
const filterAttendance = document.getElementById("filterAttendance");
const toggleFilters = document.getElementById("toggleFilters");
const filters = document.getElementById("filters");
const addEmployeeTab = document.getElementById("addEmployeeTab");
const employeeDetailsTab = document.getElementById("employeeDetailsTab");
const addEmployeeSection = document.getElementById("addEmployeeSection");
const employeeDetailsSection = document.getElementById("employeeDetailsSection");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editingIndex = null; // To keep track of the index of the employee being edited

// Add or Edit Employee
employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const employee = {
    name: document.getElementById("name").value,
    id: document.getElementById("id").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
    salary: document.getElementById("salary").value,
    attendance: document.getElementById("attendanceStatus").value,
    attendanceDate: document.getElementById("attendanceDate").value,
  };

  if (editingIndex !== null) {
    // Edit existing employee
    employees[editingIndex] = employee;
    editingIndex = null; // Reset the index after editing
  } else {
    // Add new employee
    employees.push(employee);
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees();
  employeeForm.reset();
  toggleEditMode(false); // Reset the form to Add mode
});

// Render Employees
function renderEmployees() {
  employeeTableBody.innerHTML = "";
  employees.forEach((employee, index) => {
    const row = document.createElement("tr");

    Object.values(employee).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    // Actions (Edit and Delete)
    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `
      <button onclick="editEmployee(${index})">Edit</button>
      <button onclick="deleteEmployee(${index})">Delete</button>
    `;
    row.appendChild(actionsCell);

    employeeTableBody.appendChild(row);
  });
}

// Delete Employee
function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    renderEmployees();
  }
}

// Edit Employee
function editEmployee(index) {
  const employee = employees[index];

  // Populate the form with the employee data
  document.getElementById("name").value = employee.name;
  document.getElementById("id").value = employee.id;
  document.getElementById("department").value = employee.department;
  document.getElementById("role").value = employee.role;
  document.getElementById("salary").value = employee.salary;
  document.getElementById("attendanceStatus").value = employee.attendance;
  document.getElementById("attendanceDate").value = employee.attendanceDate;

  editingIndex = index; // Set the editing index
  toggleEditMode(true); // Switch to Edit mode
}

// Toggle Filters
toggleFilters.addEventListener("click", () => {
  filters.classList.toggle("hidden");
});

// Filter Employees
[filterRole, filterAttendance].forEach((filter) =>
  filter.addEventListener("change", () => {
    const role = filterRole.value;
    const attendance = filterAttendance.value;

    const filteredEmployees = employees.filter(
      (emp) =>
        (role === "" || emp.role === role) &&
        (attendance === "" || emp.attendance === attendance)
    );

    employeeTableBody.innerHTML = "";
    filteredEmployees.forEach((employee) => {
      const row = document.createElement("tr");

      Object.values(employee).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      employeeTableBody.appendChild(row);
    });
  })
);

// Tab Navigation
addEmployeeTab.addEventListener("click", () => {
  addEmployeeTab.classList.add("active-tab");
  employeeDetailsTab.classList.remove("active-tab");
  addEmployeeSection.classList.add("active");
  employeeDetailsSection.classList.remove("active");
});

employeeDetailsTab.addEventListener("click", () => {
  addEmployeeTab.classList.remove("active-tab");
  employeeDetailsTab.classList.add("active-tab");
  addEmployeeSection.classList.remove("active");
  employeeDetailsSection.classList.add("active");
});

// Toggle Edit Mode
function toggleEditMode(isEditing) {
  if (isEditing) {
    addEmployeeTab.textContent = "Edit Employee";
  } else {
    addEmployeeTab.textContent = "Add Employee";
  }
}

// Initial Render
renderEmployees();
