// ---------- Utility Functions ----------
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------- Authentication ----------
function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("error-msg").innerText = "Please fill in all fields.";
    return;
  }

  // Check Admin Login
  if (username === "admin" && password === "admin123") {
    sessionStorage.setItem("role", "admin");
    window.location.href = "admin.html";
    return;
  }

  // Check Lab User Login
  let users = getData("users");
  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    sessionStorage.setItem("role", "user");
    sessionStorage.setItem("username", username);
    window.location.href = "reception_dashboard.html";
  } else {
    document.getElementById("error-msg").innerText = "Invalid credentials.";
  }
}

// ---------- Register New User (Admin Only) ----------
function registerUser() {
  const username = document.getElementById("new-username").value.trim();
  const password = document.getElementById("new-password").value.trim();

  if (!username || !password) {
    alert("All fields are required!");
    return;
  }

  let users = getData("users");
  if (users.find(u => u.username === username)) {
    alert("User already exists!");
    return;
  }

  users.push({ username, password });
  saveData("users", users);
  alert("User created successfully!");
  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";
  loadUsers();
}

// ---------- Load Users in Admin Dashboard ----------
function loadUsers() {
  if (!document.getElementById("users-list")) return;
  let users = getData("users");
  let table = document.getElementById("users-list");
  table.innerHTML = "";
  users.forEach((u, i) => {
    table.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${u.username}</td>
      <td>${u.password}</td>
    </tr>`;
  });
}

// ---------- Patient Registration ----------
function registerPatient() {
  const name = document.getElementById("p-name").value;
  const age = document.getElementById("p-age").value;
  const gender = document.getElementById("p-gender").value;

  if (!name || !age || !gender) {
    alert("All fields required!");
    return;
  }

  let patients = getData("patients");
  let mrn = "MRN" + (patients.length + 1).toString().padStart(4, "0");
  let patient = { id: mrn, name, age, gender, tests: [] };

  patients.push(patient);
  saveData("patients", patients);

  alert("Patient registered! MRN: " + mrn);
  window.location.href = "registration-slip.html?mrn=" + mrn;
}

// ---------- Load Patients ----------
function loadPatients() {
  if (!document.getElementById("patients-list")) return;
  let patients = getData("patients");
  let table = document.getElementById("patients-list");
  table.innerHTML = "";
  patients.forEach((p, i) => {
    table.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
    </tr>`;
  });
}

// ---------- Add Test Results ----------
function addTestResult() {
  const mrn = document.getElementById("r-mrn").value;
  const department = document.getElementById("r-dept").value;
  const testName = document.getElementById("r-test").value;
  const result = document.getElementById("r-result").value;

  let patients = getData("patients");
  let patient = patients.find(p => p.id === mrn);

  if (!patient) {
    alert("Patient not found!");
    return;
  }

  patient.tests.push({ department, testName, result, date: new Date().toLocaleString() });
  saveData("patients", patients);

  alert("Result Added!");
  loadReports();
}

// ---------- Load Reports ----------
function loadReports() {
  if (!document.getElementById("reports-list")) return;
  let patients = getData("patients");
  let table = document.getElementById("reports-list");
  table.innerHTML = "";

  patients.forEach(p => {
    p.tests.forEach((t, i) => {
      table.innerHTML += `<tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${t.department}</td>
        <td>${t.testName}</td>
        <td>${t.result}</td>
        <td>${t.date}</td>
      </tr>`;
    });
  });
}

// ---------- Print Slip or Report ----------
function printPage() {
  window.print();
}

// ---------- Auto Load ----------
window.onload = function() {
  loadUsers();
  loadPatients();
  loadReports();
};
