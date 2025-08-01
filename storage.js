// Store registered patient data
function savePatientData(patient) {
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
  localStorage.setItem("latestPatient", JSON.stringify(patient)); // For slip printing
}

// Get all registered patients
function getAllPatients() {
  return JSON.parse(localStorage.getItem("patients") || "[]");
}

// Store test result for a patient
function saveTestResult(cnic, testResult) {
  const results = JSON.parse(localStorage.getItem("testResults") || "{}");
  results[cnic] = testResult;
  localStorage.setItem("testResults", JSON.stringify(results));
}

// Get test result by CNIC
function getTestResult(cnic) {
  const results = JSON.parse(localStorage.getItem("testResults") || "{}");
  return results[cnic] || null;
}

// Store receptionist info
function saveReceptionist(name) {
  localStorage.setItem("receptionist", name);
}

// Get receptionist info
function getReceptionist() {
  return localStorage.getItem("receptionist") || "Unknown";
}

// Store user account data
function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Validate login
function validateLogin(cnic, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(u => u.cnic === cnic && u.password === password);
}

// Store technician test input
function storeTechnicianData(cnic, testData) {
  const technicianRecords = JSON.parse(localStorage.getItem("technicianData") || "{}");
  technicianRecords[cnic] = testData;
  localStorage.setItem("technicianData", JSON.stringify(technicianRecords));
}

// Get all technician test inputs
function getAllTechnicianData() {
  return JSON.parse(localStorage.getItem("technicianData") || "{}");
}

// Filter technician test data based on registered CNICs
function getTechnicianDataForRegisteredPatients() {
  const registered = getAllPatients().map(p => p.cnic);
  const allTechData = getAllTechnicianData();
  const filtered = {};

  for (let cnic of registered) {
    if (allTechData[cnic]) {
      filtered[cnic] = allTechData[cnic];
    }
  }

  return filtered;
}
