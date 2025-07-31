// ✅ Updated reception.js
import { labDepartments } from './test-data.js';

const departmentSelect = document.getElementById("departmentSelect");
const testSelect = document.getElementById("testSelect");
const selectedTestsList = document.getElementById("selectedTests");
const assignForm = document.getElementById("assignTestsForm");
const mrnInput = document.getElementById("mrnInput");

let selectedTests = [];

// Load Departments on Page Load
function loadDepartments() {
  departmentSelect.innerHTML = '<option value="">Select Department</option>';
  labDepartments.forEach((dept, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = dept.name;
    departmentSelect.appendChild(option);
  });
}

// Load Tests Based on Department
departmentSelect.addEventListener("change", function () {
  const deptIndex = departmentSelect.value;
  testSelect.innerHTML = '<option value="">Select Test</option>';

  if (deptIndex !== "") {
    labDepartments[deptIndex].tests.forEach(test => {
      const option = document.createElement("option");
      option.value = test.name;
      option.textContent = test.name;
      testSelect.appendChild(option);
    });
  }
});

// Add selected test to list
testSelect.addEventListener("change", function () {
  const testName = testSelect.value;
  if (testName && !selectedTests.includes(testName)) {
    selectedTests.push(testName);
    const li = document.createElement("li");
    li.textContent = testName;
    selectedTestsList.appendChild(li);
  }
});

// Assign Tests to Patient
assignForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mrn = mrnInput.value.trim();
  if (!mrn || selectedTests.length === 0) {
    alert("MRN aur kam az kam 1 test zaroori hai.");
    return;
  }

  const patients = getFromStorage("patients");
  const index = patients.findIndex(p => p.mrn === mrn);

  if (index !== -1) {
    patients[index].tests = selectedTests.map(name => ({ name }));
    patients[index].status = "pending";
    saveToStorage("patients", patients);
    alert("✅ Tests assign ho gaye!");
    selectedTests = [];
    selectedTestsList.innerHTML = "";
    assignForm.reset();
  } else {
    alert("Patient MRN nahi mila.");
  }
});

// Helper Functions
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Initialize
loadDepartments();
