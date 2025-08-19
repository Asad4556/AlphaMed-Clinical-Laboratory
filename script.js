// ===================== LOGIN SYSTEM =====================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === "admin" && password === "admin123") {
        localStorage.setItem("role", "admin");
        window.location.href = "admin-dashboard.html";
      } else if (username === "user" && password === "user123") {
        localStorage.setItem("role", "user");
        window.location.href = "reception.html";
      } else {
        alert("Invalid login credentials!");
      }
    });
  }
});

// ===================== PATIENT REGISTRATION =====================
function registerPatient(e) {
  e.preventDefault();

  const name = document.getElementById("patientName").value;
  const age = document.getElementById("patientAge").value;
  const gender = document.getElementById("patientGender").value;
  const date = new Date().toLocaleDateString();
  const mrn = "MRN-" + Date.now();

  let patients = JSON.parse(localStorage.getItem("patients")) || [];

  const newPatient = { mrn, name, age, gender, date };
  patients.push(newPatient);

  localStorage.setItem("patients", JSON.stringify(patients));
  localStorage.setItem("lastPatient", JSON.stringify(newPatient));

  alert("Patient registered successfully!");
  window.location.href = "registration-slip.html";
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", registerPatient);
}

// ===================== SHOW REGISTRATION SLIP =====================
if (window.location.pathname.includes("registration-slip.html")) {
  const patient = JSON.parse(localStorage.getItem("lastPatient"));
  if (patient) {
    document.getElementById("slipMRN").textContent = patient.mrn;
    document.getElementById("slipName").textContent = patient.name;
    document.getElementById("slipAge").textContent = patient.age;
    document.getElementById("slipGender").textContent = patient.gender;
    document.getElementById("slipDate").textContent = patient.date;
  }
}

// ===================== ADD TEST RESULT =====================
function loadPatientsForTests() {
  const select = document.getElementById("patientSelect");
  if (select) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.forEach(p => {
      let option = document.createElement("option");
      option.value = p.mrn;
      option.textContent = `${p.name} (${p.mrn})`;
      select.appendChild(option);
    });
  }
}

function addTestResult(e) {
  e.preventDefault();

  const patientMRN = document.getElementById("patientSelect").value;
  const department = document.getElementById("departmentSelect").value;
  const test = document.getElementById("testSelect").value;
  const result = document.getElementById("testResult").value;
  const normal = document.getElementById("normalRange").value;
  const remarks = document.getElementById("remarks").value;

  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  const newReport = {
    id: "REP-" + Date.now(),
    patientMRN,
    department,
    test,
    result,
    normal,
    remarks,
    date: new Date().toLocaleDateString()
  };

  reports.push(newReport);
  localStorage.setItem("reports", JSON.stringify(reports));

  alert("Test result added successfully!");
}

const testForm = document.getElementById("testForm");
if (testForm) {
  loadPatientsForTests();
  testForm.addEventListener("submit", addTestResult);
}

// ===================== SHOW REPORT =====================
if (window.location.pathname.includes("report.html")) {
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  if (reports.length > 0) {
    const latest = reports[reports.length - 1];
    const patient = patients.find(p => p.mrn === latest.patientMRN);

    document.getElementById("reportMRN").textContent = patient.mrn;
    document.getElementById("reportName").textContent = patient.name;
    document.getElementById("reportAge").textContent = patient.age;
    document.getElementById("reportGender").textContent = patient.gender;
    document.getElementById("reportDate").textContent = latest.date;

    const tbody = document.querySelector("#reportTests tbody");
    let row = `<tr>
                <td>${latest.department}</td>
                <td>${latest.test}</td>
                <td>${latest.result}</td>
                <td>${latest.normal}</td>
                <td>${latest.remarks}</td>
              </tr>`;
    tbody.innerHTML = row;
  }
}

// ===================== RECEPTION DASHBOARD =====================
if (window.location.pathname.includes("reception_dashboard.html")) {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const reports = JSON.parse(localStorage.getItem("reports")) || [];

  const patTable = document.getElementById("recentPatients");
  const repTable = document.getElementById("recentReports");

  patients.slice(-5).forEach(p => {
    let row = `<tr>
                <td>${p.mrn}</td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.gender}</td>
                <td>${p.date}</td>
              </tr>`;
    patTable.innerHTML += row;
  });

  reports.slice(-5).forEach(r => {
    let row = `<tr>
                <td>${r.id}</td>
                <td>${r.patientMRN}</td>
                <td>${r.department}</td>
                <td>${r.date}</td>
              </tr>`;
    repTable.innerHTML += row;
  });
}
