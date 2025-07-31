let currentMRN = 1;
const patients = [];

function nextStep() {
  document.getElementById("testSelection").classList.remove("hidden");
  renderTests();
}

function renderTests() {
  const container = document.getElementById("testList");
  container.innerHTML = "";

  labDepartments.forEach(dep => {
    const section = document.createElement("div");
    section.className = "border p-2 rounded";

    const heading = document.createElement("h4");
    heading.textContent = dep.name;
    heading.className = "font-semibold mb-1";

    section.appendChild(heading);

    dep.tests.forEach(test => {
      const label = document.createElement("label");
      label.className = "block text-sm";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = test.name;
      checkbox.className = "mr-2";

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(test.name));
      section.appendChild(label);
    });

    container.appendChild(section);
  });
}

function registerPatient() {
  const name = document.getElementById("patientName").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const cnic = document.getElementById("cnic").value;
  const sampleNumber = document.getElementById("sampleNumber").value;

  const tests = Array.from(document.querySelectorAll("#testList input:checked")).map(cb => cb.value);

  const mrn = `MRN-${String(currentMRN).padStart(4, '0')}`;
  currentMRN++;

  const patient = { mrn, name, age, gender, cnic, sampleNumber, tests };
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));

  // QR Code
  const qr = new QRious({
    element: document.getElementById("qrCode"),
    value: `MRN: ${mrn}\nName: ${name}\nTests: ${tests.join(', ')}`,
    size: 150
  });

  document.getElementById("qrText").innerText = `MRN: ${mrn}\nName: ${name}`;
  document.getElementById("qrSection").classList.remove("hidden");

  renderPatientTable();
}

function renderPatientTable() {
  const tbody = document.getElementById("patientTable");
  tbody.innerHTML = "";

  patients.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${p.mrn}</td>
      <td class="border p-2">${p.name}</td>
      <td class="border p-2">${p.sampleNumber}</td>
      <td class="border p-2">${p.tests.join(", ")}</td>
    `;
    tbody.appendChild(row);
  });
}

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("patients") || "[]");
  saved.forEach(p => patients.push(p));
  if (patients.length > 0) {
    currentMRN = patients.length + 1;
  }
  renderPatientTable();
};
