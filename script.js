// ====== GLOBAL VARIABLES ======
let users = JSON.parse(localStorage.getItem("users")) || [
  { cnic: "34501-8971113-7", password: "Asad@2723", role: "admin" }
];
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let reports = JSON.parse(localStorage.getItem("reports")) || [];

// ====== LOGIN FUNCTION ======
function login(role) {
  const cnic = document.getElementById("cnic").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.cnic === cnic && u.password === password && u.role === role);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    switch (role) {
      case "admin": window.location.href = "admin_dashboard.html"; break;
      case "reception": window.location.href = "reception_dashboard.html"; break;
      case "technician": window.location.href = "technician_dashboard.html"; break;
    }
  } else {
    alert("Invalid CNIC, password or role!");
  }
}

// ====== LOGOUT FUNCTION ======
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ====== USER MANAGEMENT ======
function createUser() {
  const cnic = document.getElementById("new_cnic").value;
  const password = document.getElementById("new_password").value;
  const role = document.getElementById("new_role").value;

  if (!cnic || !password || !role) {
    alert("All fields are required!");
    return;
  }

  const exists = users.some(u => u.cnic === cnic);
  if (exists) {
    alert("User already exists.");
    return;
  }

  users.push({ cnic, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User created!");
}

// ====== PATIENT REGISTRATION ======
function registerPatient() {
  const name = document.getElementById("name").value;
  const cnic = document.getElementById("patient_cnic").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const section = document.getElementById("section").value;
  const test = document.getElementById("test").value;

  const mrn = "MRN-" + Date.now();
  const sampleNo = "SMP-" + Math.floor(100000 + Math.random() * 900000);
  const barcodeId = "BC-" + btoa(cnic + test + mrn).slice(0, 10); // simple non-duplicate barcode

  const patient = { mrn, sampleNo, barcodeId, name, cnic, age, gender, section, test, report: null };
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
  localStorage.setItem("lastRegistered", JSON.stringify(patient));
  window.location.href = "registration-slip.html";
}

// ====== DISPLAY REGISTRATION SLIP ======
function showSlip() {
  const data = JSON.parse(localStorage.getItem("lastRegistered"));
  if (!data) return;

  document.getElementById("slip_name").textContent = data.name;
  document.getElementById("slip_mrn").textContent = data.mrn;
  document.getElementById("slip_sample").textContent = data.sampleNo;
  document.getElementById("slip_test").textContent = data.test;

  generateBarcode("barcodeCanvas", data.barcodeId);
}

// ====== TECHNICIAN PANEL LOAD ======
function loadPatientListForTech() {
  const list = document.getElementById("tech_patient_list");
  list.innerHTML = "";
  patients.forEach(p => {
    if (!p.report) {
      const row = `<tr>
        <td>${p.name}</td>
        <td>${p.mrn}</td>
        <td>${p.test}</td>
        <td><button onclick="loadResultForm('${p.mrn}')">Add Result</button></td>
      </tr>`;
      list.innerHTML += row;
    }
  });
}

function loadResultForm(mrn) {
  localStorage.setItem("resultMRN", mrn);
  window.location.href = "add_test_result.html";
}

// ====== ADD TEST RESULT ======
function saveTestResult() {
  const result = document.getElementById("result").value;
  const normal = document.getElementById("normal").value;
  const mrn = localStorage.getItem("resultMRN");

  const patient = patients.find(p => p.mrn === mrn);
  if (patient) {
    patient.report = { result, normal };
    reports.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("reports", JSON.stringify(reports));
    alert("Result saved!");
    window.location.href = "technician_dashboard.html";
  }
}

// ====== SEARCH & DISPLAY REPORT ======
function searchReport() {
  const mrn = document.getElementById("search_mrn").value;
  const report = reports.find(r => r.mrn === mrn);

  if (report) {
    localStorage.setItem("viewReport", JSON.stringify(report));
    window.location.href = "report.html";
  } else {
    alert("Report not found.");
  }
}

// ====== SHOW REPORT PAGE ======
function displayReport() {
  const r = JSON.parse(localStorage.getItem("viewReport"));
  if (!r) return;

  document.getElementById("report_name").textContent = r.name;
  document.getElementById("report_mrn").textContent = r.mrn;
  document.getElementById("report_test").textContent = r.test;
  document.getElementById("report_result").textContent = r.report.result;
  document.getElementById("report_normal").textContent = r.report.normal;

  generateBarcode("reportBarcode", r.barcodeId);
}

// ====== BARCODE GENERATOR ======
function generateBarcode(canvasId, text) {
  const canvas = document.getElementById(canvasId);
  if (canvas && JsBarcode) {
    JsBarcode(canvas, text, {
      format: "CODE128",
      width: 2,
      height: 60,
      displayValue: true
    });
  }
}

// ====== PASSWORD CHANGE ======
function changePassword(role) {
  const cnic = JSON.parse(localStorage.getItem("loggedInUser")).cnic;
  const oldPassword = document.getElementById("old_password").value;
  const newPassword = document.getElementById("new_password").value;

  const user = users.find(u => u.cnic === cnic && u.password === oldPassword && u.role === role);
  if (!user) {
    alert("Incorrect old password!");
    return;
  }

  user.password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Password changed successfully!");
}
