// storage.js

// Patients list localStorage me save/retrieve karne ke liye helper functions

function getPatients() {
  const patients = localStorage.getItem("patients");
  return patients ? JSON.parse(patients) : [];
}

function savePatients(patients) {
  localStorage.setItem("patients", JSON.stringify(patients));
}

// Patient ko save karna (CNIC duplication check ke sath)
function savePatient(patient) {
  let patients = getPatients();

  // CNIC duplicate check
  const exists = patients.some(p => p.cnic === patient.cnic);
  if (exists) {
    return false; // agar duplicate hai to save mat karo
  }

  // patient ko add karo
  patients.push(patient);
  savePatients(patients);
  return true;
}

// Patient ko MRN se find karna
function getPatientByMRN(mrn) {
  const patients = getPatients();
  return patients.find(p => p.mrn === mrn);
}

// Patient ko CNIC se find karna
function getPatientByCNIC(cnic) {
  const patients = getPatients();
  return patients.find(p => p.cnic === cnic);
}
