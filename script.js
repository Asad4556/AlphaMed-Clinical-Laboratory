// ======= COMMON GLOBAL =======
const loggedInUser = localStorage.getItem("loggedIn") || null;

// ======= LOGIN LOGIC =======
function login(role) {
  const cnic = document.getElementById("cnic").value.trim();
  const password = document.getElementById("password").value.trim();

  if (role === "admin" && cnic === "34501-8971113-7" && password === "Asad@2723") {
    localStorage.setItem("loggedIn", "admin");
    window.location.href = "admin_dashboard.html";
  } else if (role === "reception") {
    // Add your reception login logic
    localStorage.setItem("loggedIn", "reception");
    window.location.href = "reception_dashboard.html";
  } else if (role === "technician") {
    // Add your technician login logic
    localStorage.setItem("loggedIn", "technician");
    window.location.href = "technician_dashboard.html";
  } else {
    alert("Invalid CNIC or Password");
  }
}

// ======= SHOW/HIDE PASSWORD =======
function togglePassword() {
  const pwField = document.getElementById("password");
  pwField.type = pwField.type === "password" ? "text" : "password";
}

// ======= CHANGE PASSWORD =======
function changePassword() {
  const oldPass = prompt("Enter old password:");
  if (oldPass !== "Asad@2723") {
    alert("Wrong old password!");
    return;
  }
  const newPass = prompt("Enter new password:");
  if (newPass && newPass.length >= 5) {
    alert("Password changed! (Hardcoded only, not real DB)");
    // In real system, save securely!
  } else {
    alert("Invalid new password");
  }
}

// ======= LOGOUT =======
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// ======= Generate Unique MRN =======
function generateMRN(counter) {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const day = String(date.getDate()).padStart(2, '0');
  return `MRN-${day}-${year}-${String(counter).padStart(5, '0')}`;
}

// ======= Generate Sample Number =======
function generateSample(counter) {
  const year = new Date().getFullYear().toString().slice(-2);
  return `AMCL-${year}-${String(counter).padStart(5, '0')}`;
}

// ======= Save Patient & Tests =======
function registerPatient(patient) {
  let patients = JSON.parse(localStorage.getItem("patientList") || "[]");
  patients.push(patient);
  localStorage.setItem("patientList", JSON.stringify(patients));
}

// ======= Barcode Generator =======
function createBarcode(selector, text) {
  JsBarcode(selector, text, {
    format: "CODE128",
    width: 2,
    height: 40,
    displayValue: false
  });
}

// ======= Report View =======
// Same logic, open report.html?mrn=xyz

