// =========================
// Test Data with Ranges
// =========================
const testData = {
  "Hematology": [
    { name: "Hemoglobin", range: "13-17 g/dL (M), 12-15 g/dL (F)", indicator: "Low = Anemia, High = Polycythemia" },
    { name: "WBC Count", range: "4,000-11,000 /µL", indicator: "High = Infection, Low = Leukopenia" },
    { name: "Platelet Count", range: "150,000-450,000 /µL", indicator: "Low = Thrombocytopenia" },
    { name: "RBC Count", range: "4.5-6.0 mill/µL", indicator: "Low = Anemia" },
    { name: "Hematocrit", range: "40-50%", indicator: "Dehydration/Anemia" },
    { name: "MCV", range: "80-100 fL", indicator: "Low = Microcytic, High = Macrocytic" },
    { name: "MCH", range: "27-32 pg", indicator: "Cell Hb content" },
    { name: "MCHC", range: "32-36 g/dL", indicator: "Hb concentration" },
    { name: "ESR", range: "<20 mm/hr", indicator: "High = Inflammation" },
    { name: "Reticulocyte Count", range: "0.5-2%", indicator: "Bone marrow activity" },
    { name: "Peripheral Smear", range: "Normal morphology", indicator: "Detect cell abnormality" },
    { name: "Coagulation Time", range: "5-10 min", indicator: "Clotting disorder" },
    { name: "Bleeding Time", range: "2-7 min", indicator: "Platelet disorder" },
    { name: "Prothrombin Time (PT)", range: "11-16 sec", indicator: "Clotting factor deficiency" },
    { name: "APTT", range: "25-35 sec", indicator: "Intrinsic pathway defect" },
    { name: "INR", range: "0.8-1.2", indicator: "Anticoagulant monitoring" },
    { name: "Blood Grouping", range: "A/B/AB/O", indicator: "Transfusion match" },
    { name: "Rh Typing", range: "+ or -", indicator: "Pregnancy risk" },
    { name: "Bone Marrow Study", range: "Normal", indicator: "Leukemia/Anemia" },
    { name: "LDH", range: "140-280 U/L", indicator: "Cell damage" }
  ],

  "Biochemistry": [
    { name: "Fasting Blood Sugar", range: "70-100 mg/dL", indicator: "High = Diabetes" },
    { name: "Random Blood Sugar", range: "<140 mg/dL", indicator: "Diabetes screen" },
    { name: "HbA1c", range: "<5.7%", indicator: "Diabetes monitoring" },
    { name: "Serum Urea", range: "15-45 mg/dL", indicator: "Kidney function" },
    { name: "Serum Creatinine", range: "0.6-1.3 mg/dL", indicator: "Renal impairment" },
    { name: "Uric Acid", range: "3.5-7.2 mg/dL", indicator: "Gout" },
    { name: "Cholesterol", range: "<200 mg/dL", indicator: "High = Hyperlipidemia" },
    { name: "Triglycerides", range: "<150 mg/dL", indicator: "Lipid disorder" },
    { name: "HDL", range: ">40 mg/dL", indicator: "Low = Risk" },
    { name: "LDL", range: "<100 mg/dL", indicator: "High = Risk" },
    { name: "VLDL", range: "2-30 mg/dL", indicator: "Lipid metabolism" },
    { name: "Bilirubin Total", range: "0.3-1.2 mg/dL", indicator: "Jaundice" },
    { name: "SGPT/ALT", range: "7-56 U/L", indicator: "Liver damage" },
    { name: "SGOT/AST", range: "10-40 U/L", indicator: "Liver/Heart damage" },
    { name: "ALP", range: "44-147 U/L", indicator: "Bone/Liver disorder" },
    { name: "Calcium", range: "8.5-10.5 mg/dL", indicator: "Bone/Parathyroid" },
    { name: "Phosphorus", range: "2.5-4.5 mg/dL", indicator: "Bone/Metabolism" },
    { name: "Magnesium", range: "1.7-2.2 mg/dL", indicator: "Electrolyte" },
    { name: "Total Protein", range: "6-8 g/dL", indicator: "Nutrition/Liver" },
    { name: "Albumin", range: "3.5-5 g/dL", indicator: "Liver/Kidney" }
  ],

  // ============
  // More departments here (Microbiology, Serology, Immunology, Hormonal, Pathology, Molecular, Virology, Clinical Chemistry, Endocrinology, Toxicology, Urinalysis, Histopathology, Coagulation, Genetics)
  // Each with 20 tests
  // ============
};

// =========================
// Load Tests By Department
// =========================
function loadTestsByDepartment() {
  const department = document.getElementById("department").value;
  const testsContainer = document.getElementById("tests");
  testsContainer.innerHTML = "";

  if (department && testData[department]) {
    testData[department].forEach(test => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.innerHTML = `
        <input type="checkbox" value="${test.name}"> 
        <b>${test.name}</b> 
        <small>(Range: ${test.range}, Note: ${test.indicator})</small>
      `;
      testsContainer.appendChild(label);
    });
  }
}

// =========================
// Register Patient
// =========================
function registerPatient() {
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const department = document.getElementById("department").value;

  const selectedTests = Array.from(document.querySelectorAll("#tests input[type='checkbox']:checked")).map(cb => cb.value);

  if (!name || !gender || !age || !phone || !department || selectedTests.length === 0) {
    alert("Please fill all fields and select at least one test.");
    return;
  }

  const patientId = "MRN-" + Date.now().toString().slice(-6);
  const date = new Date().toLocaleString();

  const patient = {
    id: patientId,
    name,
    gender,
    age,
    phone,
    address,
    department,
    tests: selectedTests,
    date
  };

  let patients = JSON.parse(localStorage.getItem("patients") || "[]");
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));

  sessionStorage.setItem("currentPatient", JSON.stringify(patient));

  alert("Patient registered successfully!");
  window.location.href = "registration-slip.html";
}

// =========================
// Load Patient List
// =========================
function loadPatientList() {
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  const tbody = document.getElementById("patientList");
  if (!tbody) return;

  tbody.innerHTML = "";
  patients.reverse().forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.gender}</td>
      <td>${p.age}</td>
      <td>${p.phone}</td>
      <td>${p.department}</td>
      <td>${p.tests.join(", ")}</td>
      <td>${p.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

// =========================
// Search Patients
// =========================
function filterPatients() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#patientTable tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

// =========================
// Auto Load
// =========================
document.addEventListener("DOMContentLoaded", () => {
  loadPatientList();
});
