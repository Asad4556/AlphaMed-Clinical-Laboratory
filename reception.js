const testList = {
  Hematology: [
    { name: "Hemoglobin", range: "13-17 g/dL" },
    { name: "WBC Count", range: "4,000–11,000/mm³" },
    { name: "Platelet Count", range: "150,000–450,000/mm³" },
    { name: "RBC Count", range: "4.7-6.1 million/mm³" },
    { name: "ESR", range: "0-20 mm/hr" }
  ],
  Serology: [
    { name: "HCV Antibody", range: "Negative" },
    { name: "HBsAg", range: "Negative" },
    { name: "VDRL", range: "Negative" },
    { name: "HIV", range: "Negative" }
  ],
  Histopathology: [
    { name: "Biopsy", range: "As per report" },
    { name: "Cytology", range: "As per report" }
  ],
  Microbiology: [
    { name: "Gram Stain", range: "Negative" },
    { name: "Culture Sensitivity", range: "As per report" },
    { name: "AFB Smear", range: "Negative" }
  ],
  Biochemistry: [
    { name: "Glucose", range: "70–110 mg/dL" },
    { name: "Cholesterol", range: "125–200 mg/dL" },
    { name: "Triglycerides", range: "0-150 mg/dL" },
    { name: "Urea", range: "7-20 mg/dL" },
    { name: "Creatinine", range: "0.6-1.3 mg/dL" },
    { name: "SGPT", range: "7-56 U/L" },
    { name: "SGOT", range: "5-40 U/L" },
    { name: "ALP", range: "44-147 IU/L" }
  ],
  Culture: [
    { name: "Blood Culture", range: "As per report" },
    { name: "Urine Culture", range: "As per report" },
    { name: "Sputum Culture", range: "As per report" }
  ],
  "Special Chemistry": [
    { name: "TSH", range: "0.4-4.0 mIU/L" },
    { name: "Vitamin D", range: "30-100 ng/mL" },
    { name: "CRP", range: "< 10 mg/L" }
  ],
  "Molecular Biology": [
    { name: "PCR for TB", range: "Negative" },
    { name: "PCR for COVID-19", range: "Negative" }
  ],
  "Blood Banking": [
    { name: "Blood Group", range: "A, B, AB, O" },
    { name: "Cross Match", range: "Compatible/Incompatible" },
    { name: "Coombs Test", range: "Negative" }
  ]
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
  const patients = getFromStorage("patients") || [];
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
