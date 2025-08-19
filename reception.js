// ===============================
// Reception.js (Final Full Code)
// ===============================

// All Departments with Tests + Normal Range + Indicator
const testData = {
  "Hematology": [
    { name: "Hemoglobin", range: "13-17 g/dL", indicator: "Low = Anemia, High = Polycythemia" },
    { name: "WBC Count", range: "4,000-11,000 /µL", indicator: "High = Infection, Low = Leukopenia" },
    { name: "Platelet Count", range: "150,000-450,000 /µL", indicator: "Low = Bleeding risk, High = Clot risk" },
    { name: "RBC Count", range: "4.5-5.9 million/µL", indicator: "Low = Anemia" },
    { name: "MCV", range: "80-100 fL", indicator: "Helps classify anemia" },
    { name: "MCH", range: "27-32 pg", indicator: "Hemoglobin per RBC" },
    { name: "MCHC", range: "32-36 g/dL", indicator: "Hb concentration" },
    { name: "Hematocrit", range: "40-50%", indicator: "Blood volume" },
    { name: "ESR", range: "0-20 mm/hr", indicator: "Inflammation marker" },
    { name: "Reticulocyte Count", range: "0.5-2%", indicator: "Bone marrow activity" },
    { name: "Prothrombin Time", range: "11-15 sec", indicator: "Clotting function" },
    { name: "APTT", range: "25-35 sec", indicator: "Clotting disorder check" },
    { name: "Bleeding Time", range: "2-7 min", indicator: "Platelet function" },
    { name: "Clotting Time", range: "5-15 min", indicator: "Clotting factor status" },
    { name: "Differential Count", range: "Neutro 40-70%", indicator: "Infection type" },
    { name: "Basophils", range: "0-1%", indicator: "Allergy marker" },
    { name: "Eosinophils", range: "1-6%", indicator: "Allergy/Parasites" },
    { name: "Monocytes", range: "2-10%", indicator: "Chronic infection" },
    { name: "Lymphocytes", range: "20-40%", indicator: "Viral infection" },
    { name: "Peripheral Smear", range: "Normal morphology", indicator: "Cell shape & size" }
  ],

  "Biochemistry": [
    { name: "Glucose (Fasting)", range: "70-110 mg/dL", indicator: "High = Diabetes" },
    { name: "Glucose (Random)", range: "< 200 mg/dL", indicator: "High = Diabetes" },
    { name: "Urea", range: "15-45 mg/dL", indicator: "Kidney function" },
    { name: "Creatinine", range: "0.6-1.3 mg/dL", indicator: "Kidney function" },
    { name: "Uric Acid", range: "3.5-7.2 mg/dL", indicator: "High = Gout" },
    { name: "Cholesterol", range: "< 200 mg/dL", indicator: "Heart risk" },
    { name: "Triglycerides", range: "< 150 mg/dL", indicator: "Heart risk" },
    { name: "HDL", range: "> 40 mg/dL", indicator: "Good cholesterol" },
    { name: "LDL", range: "< 100 mg/dL", indicator: "Bad cholesterol" },
    { name: "VLDL", range: "5-40 mg/dL", indicator: "Lipid transport" },
    { name: "Calcium", range: "8.5-10.5 mg/dL", indicator: "Bone health" },
    { name: "Phosphorus", range: "2.5-4.5 mg/dL", indicator: "Bone/Kidney" },
    { name: "Magnesium", range: "1.5-2.5 mg/dL", indicator: "Nerve/Muscle" },
    { name: "Sodium", range: "135-145 mmol/L", indicator: "Electrolyte" },
    { name: "Potassium", range: "3.5-5.0 mmol/L", indicator: "Electrolyte" },
    { name: "Chloride", range: "98-106 mmol/L", indicator: "Electrolyte" },
    { name: "Bicarbonate", range: "22-29 mmol/L", indicator: "Acid-base balance" },
    { name: "Bilirubin", range: "< 1.2 mg/dL", indicator: "Liver function" },
    { name: "SGPT (ALT)", range: "< 45 U/L", indicator: "Liver enzyme" },
    { name: "SGOT (AST)", range: "< 40 U/L", indicator: "Liver enzyme" }
  ],

  // Similarly add other departments (Serology, Microbiology, Urine, Stool, Immunology, Endocrinology, Virology, Pathology, Hormonal, Tumor Markers, Coagulation, Toxicology, Drug Testing, Molecular Biology)
};

// Load tests by department
function loadTestsByDepartment() {
  const department = document.getElementById("department").value;
  const testsContainer = document.getElementById("tests");
  testsContainer.innerHTML = "";

  if (department && testData[department]) {
    testData[department].forEach(test => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${test.name}"> <b>${test.name}</b> (Range: ${test.range}, Note: ${test.indicator})`;
      testsContainer.appendChild(label);
    });
  }
}

// Register Patient
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

  const patient = { id: patientId, name, gender, age, phone, address, department, tests: selectedTests, date };

  let patients = JSON.parse(localStorage.getItem("patients") || "[]");
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));

  sessionStorage.setItem("currentPatient", JSON.stringify(patient));

  alert("Patient registered successfully!");
  window.location.href = "registration-slip.html";
}

// Load patient list
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

// Filter patients
function filterPatients() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#patientTable tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPatientList();
});
