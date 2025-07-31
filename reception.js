document.addEventListener("DOMContentLoaded", () => {
  loadPatientTable();

  // Search handler
  document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll("#patientTable tbody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });
});

// Load patients from localStorage into table
function loadPatientTable() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const tbody = document.querySelector("#patientTable tbody");
  tbody.innerHTML = "";

  patients.forEach((patient, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${patient.mrn}</td>
      <td>${patient.patientName}</td>
      <td>${patient.cnic}</td>
      <td>${patient.phone}</td>
      <td>${patient.department}</td>
      <td>${patient.test}</td>
      <td>${patient.date}</td>
      <td>
        <button onclick="printSlip('${patient.mrn}')">🖨️</button>
        <button onclick="deletePatient(${index})">🗑️</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Delete patient by index
function deletePatient(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    loadPatientTable();
  }
}

// Print registration slip
function printSlip(mrn) {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients.find((p) => p.mrn === mrn);
  if (patient) {
    localStorage.setItem("lastPatient", JSON.stringify(patient));
    window.open("registration-slip.html", "_blank");
  }
}
