// technician.js

// Get HTML elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const patientInfo = document.getElementById("patientInfo");
const resultForm = document.getElementById("resultForm");
const testFields = document.getElementById("testFields");
const resultTableBody = document.getElementById("resultTableBody");

let selectedPatient = null;

// Load results on page load
document.addEventListener("DOMContentLoaded", () => {
  renderResultStatusTable();
});

// Search patient
searchBtn.onclick = () => {
  const query = searchInput.value.trim().toLowerCase();
  const patients = getFromStorage("patients");

  selectedPatient = patients.find(p =>
    p.cnic.toLowerCase() === query || p.mrn.toLowerCase() === query
  );

  if (selectedPatient) {
    document.getElementById("pName").innerText = selectedPatient.name;
    document.getElementById("pMRN").innerText = selectedPatient.mrn;
    document.getElementById("pSample").innerText = selectedPatient.sampleNo;

    renderTestFields(selectedPatient);
    patientInfo.classList.remove("hidden");
    resultForm.classList.remove("hidden");
  } else {
    alert("Patient not found.");
    patientInfo.classList.add("hidden");
    resultForm.classList.add("hidden");
  }
};

// Render test fields for result entry
function renderTestFields(patient) {
  testFields.innerHTML = "";

  const tests = patient.tests || [];

  if (tests.length === 0) {
    testFields.innerHTML = "<p class='text-red-500'>No tests assigned for this patient.</p>";
    return;
  }

  tests.forEach(testName => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label class="block font-medium mb-1">${testName}</label>
      <input type="text" name="${testName}" class="w-full border px-2 py-1 rounded mb-3" placeholder="Enter result" required>
    `;
    testFields.appendChild(div);
  });
}

// Submit result and save to localStorage
resultForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(resultForm);
  const results = [];

  for (const [testName, value] of formData.entries()) {
    results.push({ testName, value });
  }

  const resultData = {
    mrn: selectedPatient.mrn,
    name: selectedPatient.name,
    sampleNo: selectedPatient.sampleNo,
    results,
    savedAt: new Date().toLocaleString()
  };

  // Save to localStorage
  const existing = getFromStorage("results");
  const index = existing.findIndex(r => r.mrn === selectedPatient.mrn);
  if (index !== -1) {
    existing[index] = resultData; // update existing
  } else {
    existing.push(resultData);
  }
  localStorage.setItem("results", JSON.stringify(existing));

  alert("Results saved successfully!");
  resultForm.reset();
  resultForm.classList.add("hidden");
  patientInfo.classList.add("hidden");

  renderResultStatusTable(); // refresh table
};

// Render result status table
function renderResultStatusTable() {
  const patients = getFromStorage("patients");
  const results = getFromStorage("results");
  resultTableBody.innerHTML = "";

  patients.forEach(p => {
    const hasResult = results.some(r => r.mrn === p.mrn);
    const status = hasResult
      ? `<span class="text-green-600 font-semibold">✅ Approved</span>`
      : `<span class="text-yellow-600 font-semibold">⏳ Pending</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-2 border">${p.mrn}</td>
      <td class="p-2 border">${p.name}</td>
      <td class="p-2 border">${p.sampleNo}</td>
      <td class="p-2 border">${status}</td>
    `;
    resultTableBody.appendChild(tr);
  });
}

// Helpers
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
