// script.js

// ===== User Management =====
let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "admin", password: "admin123", role: "admin" }
];

// Register New User
function registerUser() {
  const uname = document.getElementById("reg-username").value.trim();
  const pass = document.getElementById("reg-password").value.trim();
  const role = document.getElementById("reg-role").value;

  if (uname === "" || pass === "") {
    alert("Please fill all fields");
    return;
  }

  if (users.find(u => u.username === uname)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username: uname, password: pass, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully!");
  document.getElementById("reg-username").value = "";
  document.getElementById("reg-password").value = "";
}

// Login
function loginUser() {
  const uname = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("login-error");

  let user = users.find(u => u.username === uname && u.password === pass);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "reception_dashboard.html";
    }
  } else {
    errorBox.textContent = "Invalid username or password!";
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ===== Patient Registration =====
let patients = JSON.parse(localStorage.getItem("patients")) || [];

function registerPatient() {
  const name = document.getElementById("p-name").value.trim();
  const age = document.getElementById("p-age").value.trim();
  const gender = document.getElementById("p-gender").value;
  const doctor = document.getElementById("p-doctor").value.trim();

  if (name === "" || age === "" || doctor === "") {
    alert("Please fill all fields!");
    return;
  }

  let id = "P" + (patients.length + 1).toString().padStart(3, "0");
  let newPatient = { id, name, age, gender, doctor, tests: [] };
  patients.push(newPatient);
  localStorage.setItem("patients", JSON.stringify(patients));

  localStorage.setItem("slipData", JSON.stringify(newPatient));
  window.location.href = "registration-slip.html";
}

// ===== Test Result Entry =====
function loadPatientsForResult() {
  const select = document.getElementById("patient-select");
  if (!select) return;
  select.innerHTML = "";
  patients.forEach(p => {
    let opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.id} - ${p.name}`;
    select.appendChild(opt);
  });
}

function addTestResult() {
  const patientId = document.getElementById("patient-select").value;
  const testName = document.getElementById("test-name").value.trim();
  const result = document.getElementById("test-result").value.trim();
  const range = document.getElementById("test-range").value.trim();

  if (!patientId || testName === "" || result === "" || range === "") {
    alert("Please fill all fields!");
    return;
  }

  let patient = patients.find(p => p.id === patientId);
  if (!patient) {
    alert("Patient not found!");
    return;
  }

  patient.tests.push({ name: testName, result, range });
  localStorage.setItem("patients", JSON.stringify(patients));

  // Save reportData for report.html
  let reportData = {
    id: patient.id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    doctor: patient.doctor,
    date: new Date().toLocaleDateString(),
    tests: patient.tests
  };
  localStorage.setItem("reportData", JSON.stringify(reportData));

  alert("Test result added successfully!");
  window.location.href = "report.html";
}

// ===== Load Slip Data =====
function loadSlip() {
  let slipData = JSON.parse(localStorage.getItem("slipData"));
  if (!slipData) return;
  document.getElementById("s-id").textContent = slipData.id;
  document.getElementById("s-name").textContent = slipData.name;
  document.getElementById("s-age").textContent = slipData.age;
  document.getElementById("s-gender").textContent = slipData.gender;
  document.getElementById("s-doctor").textContent = slipData.doctor;
}
