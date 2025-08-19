// Departments & Tests Storage
let labDepartments = JSON.parse(localStorage.getItem("labDepartments")) || {};

// Add Department
function addDepartment() {
  const deptName = document.getElementById("dept-name").value.trim();
  if (deptName === "") {
    alert("Please enter department name");
    return;
  }
  if (!labDepartments[deptName]) {
    labDepartments[deptName] = [];
    localStorage.setItem("labDepartments", JSON.stringify(labDepartments));
    document.getElementById("dept-name").value = "";
    loadDepartments();
  } else {
    alert("Department already exists!");
  }
}

// Add Test to Department
function addTest() {
  const dept = document.getElementById("dept-select").value;
  const testName = document.getElementById("test-name").value.trim();

  if (!dept || testName === "") {
    alert("Please select department and enter test name");
    return;
  }

  if (!labDepartments[dept].includes(testName)) {
    labDepartments[dept].push(testName);
    localStorage.setItem("labDepartments", JSON.stringify(labDepartments));
    document.getElementById("test-name").value = "";
    loadDepartments();
  } else {
    alert("Test already exists in this department!");
  }
}

// Load Departments in Dropdown & List
function loadDepartments() {
  const deptSelect = document.getElementById("dept-select");
  const deptList = document.getElementById("dept-list");

  if (!deptSelect || !deptList) return;

  deptSelect.innerHTML = "";
  deptList.innerHTML = "";

  for (let dept in labDepartments) {
    let option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    deptSelect.appendChild(option);

    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<b>${dept}</b><br>Tests: ${labDepartments[dept].join(", ") || "No tests yet"}`;
    deptList.appendChild(div);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", loadDepartments);
