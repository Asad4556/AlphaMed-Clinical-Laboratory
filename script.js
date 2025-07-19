let patientList = JSON.parse(localStorage.getItem("patients") || "[]");
let counter = patientList.length + 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("patientForm");
  if (form) {
    form.addEventListener("submit", registerPatient);
  }

  loadPatients();
});

// Register new patient
function registerPatient(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const cnic = document.getElementById("cnic").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const sections = Array.from(document.querySelectorAll("input[name='section']:checked")).map(s => s.value);
  const date = new Date().toISOString().split('T')[0];

  const year = new Date().getFullYear().toString().slice(-2);
  const mrn = `ACL-${year}-${String(counter).padStart(5, '0')}`;
  counter++;

  const sampleNumber = Date.now(); // Or generate another unique pattern

  const patient = {
    mrn,
    fullName,
    cnic,
    phone,
    sections,
    date,
    sampleNumber
  };

  patientList.push(patient);
  localStorage.setItem("patients", JSON.stringify(patientList));
  renderPatient(patient);
  printSlip(patient);
  document.getElementById("patientForm").reset();
}

// Load patients on page load
function loadPatients() {
  if (!document.getElementById("patientTable")) return;
  patientList.forEach(renderPatient);
}

// Render a single patient row
function renderPatient(patient) {
  const table = document.getElementById("patientTable");
  if (!table) return;

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${patient.mrn}</td>
    <td>${patient.fullName}</td>
    <td>${patient.sections.join(", ")}</td>
    <td><svg id="barcode-${patient.mrn}"></svg></td>
    <td><a href="report.html?mrn=${patient.mrn}" target="_blank">View Report</a></td>
  `;

  table.appendChild(tr);

  JsBarcode(`#barcode-${patient.mrn}`, patient.mrn, {
    format: "CODE128",
    width: 2,
    height: 40,
    displayValue: false
  });
}

// Print registration slip
function printSlip(patient) {
  const win = window.open("", "_blank");
  win.document.write(`
    <html>
    <head>
      <title>Patient Slip</title>
      <style>
        body {
          font-family: Arial;
          padding: 20px;
          text-align: center;
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 60px;
          color: rgba(0, 0, 0, 0.1);
          transform: translate(-50%, -50%);
        }
        .logo {
          width: 100px;
        }
        h2 {
          margin: 10px 0;
        }
        .info {
          margin: 20px 0;
          text-align: left;
        }
        .barcode {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="watermark">AlphaMed Clinical Lab</div>
      <img src="logo.png" class="logo" />
      <h2>AlphaMed Clinical Laboratory</h2>
      <div class="info">
        <p><strong>MRN:</strong> ${patient.mrn}</p>
        <p><strong>Name:</strong> ${patient.fullName}</p>
        <p><strong>CNIC:</strong> ${patient.cnic}</p>
        <p><strong>Phone:</strong> ${patient.phone}</p>
        <p><strong>Sections:</strong> ${patient.sections.join(", ")}</p>
        <p><strong>Sample #:</strong> ${patient.sampleNumber}</p>
        <svg id="barcode"></svg>
      </div>
      <script src="https://cdn.jsdelivr.net/jsbarcode/3.11.5/JsBarcode.all.min.js"></script>
      <script>
        JsBarcode("#barcode", "${patient.mrn}", {
          format: "CODE128",
          width: 2,
          height: 50
        });
        window.print();
      </script>
    </body>
    </html>
  `);
}
