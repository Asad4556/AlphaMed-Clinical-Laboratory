// reception.js

// DOM elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const patientInfo = document.getElementById("patientInfo");
const assignSection = document.getElementById("assignSection");
const pName = document.getElementById("pName");
const pMRN = document.getElementById("pMRN");
const pSample = document.getElementById("pSample");

const departmentSelect = document.getElementById("departmentSelect");
const testSelect = document.getElementById("testSelect");
const addTestBtn = document.getElementById("addTestBtn");
const selectedTestsDiv = document.getElementById("selectedTests");
const saveTestsBtn = document.getElementById("saveTestsBtn");

let currentPatient = null;
let selectedTests = [];

// ✅ Load departments in dropdown
function populateDepartments() {
  departmentSelect.innerHTML = "<option value=''>-- Select Department --</option>";
  labDepartments.forEach(dep => {
    const opt = document.createElement("option");
    opt.value = dep.name;
    opt.textContent = dep.name;
    departmentSelect.appendChild(opt);
  });
}

// ✅ Load tests based on selected department
departmentSelect.addEventListener("change", function () {
  const selectedDept = this.value;
  const dept = labDepartments.find(d => d.name === selectedDept);

  testSelect.innerHTML = "<option value=''>-- Select Test --</option>";
  if (dept) {
    dept.tests.forEach(test => {
      const opt = document.createElement("option");
      opt.value = test.name;
      opt.textContent = test.name;
      testSelect.appendChild(opt);
    });
  }
});

// ✅ Search patient
searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim();
  const patients = getFromStorage("patients");

  const found = patients.find(p => p.cnic === query || p.mrn === query);

  if (found) {
    currentPatient = found;
    showPatientInfo(found);
    assignSection.classList.remove("hidden");
    selectedTests = found.tests || [];
    renderSelectedTests();
  } else {
    alert("مریض نہیں ملا!");
  }
});

// ✅ Show patient info
function showPatientInfo(patient) {
  pName.textContent = patient.name;
  pMRN.textContent = patient.mrn;
  pSample.textContent = patient.sampleNo;
  patientInfo.classList.remove("hidden");
}

// ✅ Add selected test
addTestBtn.addEventListener("click", function () {
  const testName = testSelect.value;
  const department = departmentSelect.value;

  if (!testName || !department) {
    alert("براہ کرم ڈیپارٹمنٹ اور ٹیسٹ منتخب کریں!");
    return;
  }

  // Avoid duplicate
  if (selectedTests.some(t => t.name === testName)) {
    alert("یہ ٹیسٹ پہلے ہی شامل کیا جا چکا ہے۔");
    return;
  }

  selectedTests.push({ name: testName, department });
  renderSelectedTests();
});

// ✅ Render selected tests
function renderSelectedTests() {
  selectedTestsDiv.innerHTML = "";
  selectedTests.forEach((t, index) => {
    const div = document.createElement("div");
    div.className = "border-b py-1 flex justify-between";
    div.innerHTML = `
      <span>${t.department} - <strong>${t.name}</strong></span>
      <button onclick="removeTest(${index})" class="text-red-500">❌</button>
    `;
    selectedTestsDiv.appendChild(div);
  });
}

// ✅ Remove test
function removeTest(index) {
  selectedTests.splice(index, 1);
  renderSelectedTests();
}

// ✅ Save tests to patient
saveTestsBtn.addEventListener("click", function () {
  if (!currentPatient) return;

  updateStorage("patients", p => p.mrn === currentPatient.mrn, old => ({
    ...old,
    tests: selectedTests,
    status: "tests-assigned"
  }));

  alert("✅ ٹیسٹس محفوظ ہو گئے!");
  resetForm();
});

// ✅ Reset form
function resetForm() {
  currentPatient = null;
  selectedTests = [];
  searchInput.value = "";
  patientInfo.classList.add("hidden");
  assignSection.classList.add("hidden");
  selectedTestsDiv.innerHTML = "";
}

// ✅ Initialize
populateDepartments();
