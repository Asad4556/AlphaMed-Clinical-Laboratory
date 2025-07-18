let patientList = [];
let counter = 1;

document.getElementById("patientForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const cnic = document.getElementById("cnic").value;
  const phone = document.getElementById("phone").value;
  const testType = document.getElementById("testType").value;

  const year = new Date().getFullYear().toString().slice(-2);
  const mrn = `ACL-${year}-${String(counter).padStart(5, '0')}`;
  counter++;

  const newPatient = {
    mrn,
    fullName,
    cnic,
    phone,
    testType
  };

  patientList.push(newPatient);
  addToTable(newPatient);
  localStorage.setItem('patientList', JSON.stringify(patientList));
  document.getElementById("patientForm").reset();
});

function addToTable(patient) {
  const table = document.getElementById("patientTable");
  const row = document.createElement("tr");

  const mrnCell = document.createElement("td");
  mrnCell.textContent = patient.mrn;

  const nameCell = document.createElement("td");
  nameCell.textContent = patient.fullName;

  const testCell = document.createElement("td");
  testCell.textContent = patient.testType;

  const barcodeCell = document.createElement("td");
  const barcodeSvg = document.createElement("svg");
  JsBarcode(barcodeSvg, patient.mrn, {
    format: "CODE128",
    width: 2,
    height: 40,
    displayValue: false
  });
  barcodeCell.appendChild(barcodeSvg);

  const reportCell = document.createElement("td");
  const viewLink = document.createElement("a");
  viewLink.href = `report.html?mrn=${encodeURIComponent(patient.mrn)}`;
  viewLink.textContent = "رپورٹ دیکھیں";
  viewLink.target = "_blank";
  reportCell.appendChild(viewLink);

  row.appendChild(mrnCell);
  row.appendChild(nameCell);
  row.appendChild(testCell);
  row.appendChild(barcodeCell);
  row.appendChild(reportCell);

  table.appendChild(row);
}

// Reload saved patients on refresh
window.addEventListener("load", () => {
  const saved = localStorage.getItem('patientList');
  if (saved) {
    patientList = JSON.parse(saved);
    patientList.forEach(addToTable);
    counter = patientList.length + 1;
  }
});
