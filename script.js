// ==============================
// GLOBAL: Lab Settings Helper
// ==============================
function getLabSettings() {
  return JSON.parse(localStorage.getItem("labSettings") || "{}");
}

// ==============================
// LOGIN
// ==============================
function login() {
  const cnic = document.getElementById("cnic").value.trim();
  const password = document.getElementById("password").value.trim();

  if (cnic === "34501-8971113-7" && password === "Asad@2723") {
    localStorage.setItem("loggedInRole", "admin");
    window.location.href = "admin_dashboard.html";
  } else {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.cnic === cnic && u.password === password);

    if (user) {
      localStorage.setItem("loggedInRole", user.role);
      if (user.role === "technician") {
        window.location.href = "technician_dashboard.html";
      } else if (user.role === "reception") {
        window.location.href = "reception_dashboard.html";
      } else {
        alert("نامعلوم رول!");
      }
    } else {
      alert("غلط CNIC یا پاسورڈ");
    }
  }
}

function togglePassword() {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}

// ==============================
// LOGOUT
// ==============================
function logout() {
  localStorage.removeItem("loggedInRole");
  window.location.href = "login.html";
}

// ==============================
// CHANGE PASSWORD
// ==============================
function changePassword() {
  const oldPass = document.getElementById("oldPass").value.trim();
  const newPass = document.getElementById("newPass").value.trim();

  if (localStorage.getItem("loggedInRole") === "admin") {
    if (oldPass === "Asad@2723") {
      alert("Admin پاسورڈ تبدیل نہیں کیا جا سکتا! (Demo)");
    } else {
      alert("پرانا پاسورڈ غلط ہے");
    }
  } else {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const role = localStorage.getItem("loggedInRole");
    const index = users.findIndex(u => u.role === role && u.password === oldPass);

    if (index >= 0) {
      users[index].password = newPass;
      localStorage.setItem("users", JSON.stringify(users));
      alert("پاسورڈ تبدیل ہو گیا ✅");
    } else {
      alert("پرانا پاسورڈ غلط ہے");
    }
  }
}

// ==============================
// MANAGE USERS (Admin)
// ==============================
function addUser() {
  const cnic = document.getElementById("newCnic").value.trim();
  const pass = document.getElementById("newPass").value.trim();
  const role = document.getElementById("newRole").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ cnic: cnic, password: pass, role: role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("یوزر شامل ہو گیا ✅");
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  let html = "<table><tr><th>CNIC</th><th>Role</th><th>Action</th></tr>";
  users.forEach((u, i) => {
    html += `<tr>
      <td>${u.cnic}</td>
      <td>${u.role}</td>
      <td><button onclick="deleteUser(${i})">حذف کریں</button></td>
    </tr>`;
  });
  html += "</table>";
  document.getElementById("userList").innerHTML = html;
}

function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

// ==============================
// REGISTER PATIENT
// ==============================
let counter = 1;

function registerPatient() {
  const fullName = document.getElementById("fullName").value;
  const cnic = document.getElementById("cnic").value;
  const father = document.getElementById("fatherName").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const selectedTests = getSelectedTests();

  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const mrn = `MRN-${now.getDate()}-${year}-${String(counter).padStart(5, '0')}`;
  const sample = `AMCL-${year}-${String(counter).padStart(5, '0')}`;
  counter++;

  const newPatient = {
    mrn, sample, fullName, cnic, father, phone, address, selectedTests
  };

  const patients = JSON.parse(localStorage.getItem("patientList") || "[]");
  patients.push(newPatient);
  localStorage.setItem("patientList", JSON.stringify(patients));

  window.location.href = `registration-slip.html?mrn=${encodeURIComponent(mrn)}`;
}

function getSelectedTests() {
  // Update according to your HTML test selection
  return []; // TODO
}

// ==============================
// ADD TEST RESULT (Technician)
// ==============================
function loadPatientTests(mrn) {
  const patients = JSON.parse(localStorage.getItem("patientList") || "[]");
  return patients.find(p => p.mrn === mrn);
}

function saveTestResults(mrn, results) {
  const reports = JSON.parse(localStorage.getItem("labReports") || "[]");
  reports.push({ mrn: mrn, results: results, date: new Date().toISOString() });
  localStorage.setItem("labReports", JSON.stringify(reports));
}

// ==============================
// EXPORT (Already in export.html)
// ==============================

// ==============================
// SETTINGS (Already in settings.html)
// ==============================
