// Users Data (Simulated Local Storage for Admin, Reception, Technician)
const defaultUsers = [
  {
    cnic: "34501-8971113-7",
    password: "Asad@2723",
    role: "admin",
  }
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Login System
function loginUser(role) {
  const cnic = document.getElementById("cnic").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.cnic === cnic && u.password === password && u.role === role
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (role === "reception") {
      window.location.href = "reception_dashboard.html";
    } else if (role === "technician") {
      window.location.href = "technician_dashboard.html";
    }
  } else {
    alert("Invalid CNIC, Password or Role!");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Password Change
function changePassword(role) {
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (user.password !== oldPass) {
    alert("Old password is incorrect");
    return;
  }
  if (newPass !== confirmPass) {
    alert("Passwords do not match");
    return;
  }

  const index = users.findIndex(u => u.cnic === user.cnic && u.role === role);
  users[index].password = newPass;

  localStorage.setItem("users", JSON.stringify(users));
  alert("Password changed successfully.");
  logout();
}

// User Management
function createUser() {
  const role = document.getElementById("newRole").value;
  const cnic = document.getElementById("newCnic").value;
  const password = document.getElementById("newPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((u) => u.cnic === cnic);
  if (exists) {
    alert("User with this CNIC already exists");
    return;
  }

  if (role === "admin") {
    alert("Admin account creation is not allowed");
    return;
  }

  users.push({ cnic, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert(`${role} account created successfully.`);
  document.getElementById("userForm").reset();
  displayUsers();
}

function displayUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    if (user.role === "admin") return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.cnic}</td>
      <td>${user.role}</td>
      <td><button onclick="deleteUser('${user.cnic}')">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteUser(cnic) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((u) => u.cnic !== cnic);
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

// MRN Generator
function generateMRN() {
  return "MRN-" + Math.floor(Math.random() * 900000 + 100000);
}

// Sample # Generator
function generateSampleNumber() {
  return "SMP-" + Date.now().toString().slice(-6);
}

// Barcode Generator
function generateBarcode(data, canvasId) {
  JsBarcode(`#${canvasId}`, data, {
    format: "CODE128",
    displayValue: true,
    width: 2,
    height: 40,
    fontSize: 14
  });
}

// Patient Registration
function registerPatient() {
  const name = document.getElementById("patientName").value;
  const age = document.getElementById("patientAge").value;
  const gender = document.getElementById("patientGender").value;
  const contact = document.getElementById("patientContact").value;
  const section = Array.from(document.querySelectorAll('input[name="section"]:checked')).map(el => el.value);

  const mrn = generateMRN();
  const sample = generateSampleNumber();

  const patient = {
    mrn,
    name,
    age,
    gender,
    contact,
    section,
    sample,
    timestamp: new Date().toISOString(),
    results: {}
  };

  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
  localStorage.setItem("lastRegistered", JSON.stringify(patient));

  window.location.href = "registration-slip.html";
}

// Load Patient Slip
function loadSlip() {
  const patient = JSON.parse(localStorage.getItem("lastRegistered"));
  if (!patient) return;

  document.getElementById("slipName").innerText = patient.name;
  document.getElementById("slipMRN").innerText = patient.mrn;
  document.getElementById("slipSample").innerText = patient.sample;
  document.getElementById("slipSection").innerText = patient.section.join(", ");
  generateBarcode(patient.mrn + "-" + patient.sample, "barcodeCanvas");
}

// Technician: Load Patients
function loadPatientListForTechnician() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const tbody = document.getElementById("patientList");
  tbody.innerHTML = "";

  patients.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.mrn}</td>
      <td>${p.name}</td>
      <td>${p.section.join(", ")}</td>
      <td><button onclick="enterResult('${p.mrn}')">Add Result</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function enterResult(mrn) {
  localStorage.setItem("selectedMRN", mrn);
  window.location.href = "add_test_result.html";
}

// Add Test Result
function loadAddResultPage() {
  const mrn = localStorage.getItem("selectedMRN");
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients.find(p => p.mrn === mrn);
  if (!patient) return;

  document.getElementById("patientName").innerText = patient.name;
  document.getElementById("patientMRN").innerText = patient.mrn;

  const container = document.getElementById("resultInputs");
  container.innerHTML = "";

  patient.section.forEach(section => {
    const tests = testData[section];
    if (!tests) return;

    const sectionTitle = document.createElement("h4");
    sectionTitle.innerText = section;
    container.appendChild(sectionTitle);

    tests.forEach(test => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label>${test.test} (${test.normal}): </label>
        <input type="text" id="${test.test.replace(/\s+/g, "_")}"><br>
      `;
      container.appendChild(div);
    });
  });
}

function saveTestResults() {
  const mrn = localStorage.getItem("selectedMRN");
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients.find(p => p.mrn === mrn);
  if (!patient) return;

  patient.results = {};

  patient.section.forEach(section => {
    const tests = testData[section];
    if (!tests) return;

    tests.forEach(test => {
      const val = document.getElementById(test.test.replace(/\s+/g, "_")).value;
      patient.results[test.test] = val;
    });
  });

  localStorage.setItem("patients", JSON.stringify(patients));
  alert("Results saved successfully!");
  window.location.href = "technician_dashboard.html";
}

// View Report Page
function loadReport() {
  const mrn = localStorage.getItem("selectedMRN");
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients.find(p => p.mrn === mrn);
  if (!patient) return;

  document.getElementById("reportName").innerText = patient.name;
  document.getElementById("reportMRN").innerText = patient.mrn;
  document.getElementById("reportAge").innerText = patient.age;
  document.getElementById("reportGender").innerText = patient.gender;
  document.getElementById("reportSample").innerText = patient.sample;

  const table = document.getElementById("reportTable");
  table.innerHTML = `
    <tr>
      <th>Test</th>
      <th>Normal Range</th>
      <th>Result</th>
    </tr>
  `;

  patient.section.forEach(section => {
    const tests = testData[section];
    if (!tests) return;

    tests.forEach(test => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${test.test}</td>
        <td>${test.normal}</td>
        <td>${patient.results[test.test] || "-"}</td>
      `;
      table.appendChild(row);
    });
  });
}
