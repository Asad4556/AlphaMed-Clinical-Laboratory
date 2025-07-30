const testList = {
  Hematology: [
    { name: "Hemoglobin", range: "13-17 g/dL" },
    { name: "WBC Count", range: "4,000–11,000/mm³" },
  ],
  Serology: [
    { name: "HCV Antibody", range: "Negative" },
    { name: "HBsAg", range: "Negative" },
  ],
  Biochemistry: [
    { name: "Glucose", range: "70–110 mg/dL" },
    { name: "Cholesterol", range: "125–200 mg/dL" },
  ],
  // Add all others similarly...
};

const form = document.getElementById("patientForm");
const deptSelect = document.getElementById("departmentSelect");
const testCheckboxes = document.getElementById("testCheckboxes");
const patientList = document.getElementById("patientList");

// Department change → load test checkboxes
deptSelect.onchange = () => {
  const dept = deptSelect.value;
  testCheckboxes.innerHTML = "";

  if (testList[dept]) {
    testList[dept].forEach(test => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label>
          <input type="checkbox" name="tests" value="${test.name}|${test.range}">
          ${test.name} (${test.range})
        </label>
      `;
      testCheckboxes.appendChild(div);
    });
  }
};

// Submit form
form.onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const patient = {
    name: data.get("name"),
    fatherName: data.get("fatherName"),
    cnic: data.get("cnic"),
    phone: data.get("phone"),
    dob: data.get("dob"),
    mrn: `MRN-${Date.now().toString().slice(-6)}`,
    sampleNo: `S-${Math.floor(Math.random() * 100000)}`,
  };

  addToStorage("patients", patient);

  // Save selected tests
  const selected = [...document.querySelectorAll("input[name='tests']:checked")];
  selected.forEach(test => {
    const [name, range] = test.value.split("|");
    addToStorage("reception_tests", {
      mrn: patient.mrn,
      name,
      normalRange: range,
    });
  });

  alert("Patient Registered!");
  form.reset();
  deptSelect.value = "";
  testCheckboxes.innerHTML = "";
  renderPatients();
};

// Show registered patients
function renderPatients() {
  const patients = getFromStorage("patients");
  patientList.innerHTML = "";

  patients.forEach(p => {
    const row = document.createElement("tr");
    row.classList.add("border-t");
    row.innerHTML = `
      <td class="p-2">${p.mrn}</td>
      <td class="p-2">${p.name}</td>
      <td class="p-2">${p.cnic}</td>
      <td class="p-2">${p.sampleNo}</td>
    `;
    patientList.appendChild(row);
  });
}

renderPatients();
