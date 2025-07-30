// Get HTML elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const patientInfo = document.getElementById("patientInfo");
const resultForm = document.getElementById("resultForm");
const testFields = document.getElementById("testFields");

let selectedPatient = null;

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

// Auto-render test fields from patient's assigned tests (reception)
function renderTestFields(patient) {
  testFields.innerHTML = ""; // clear old

  // If receptionist saved tests separately, load that data
  const tests = getFromStorage("reception_tests").filter(t => t.mrn === patient.mrn);

  if (tests.length === 0) {
    testFields.innerHTML = "<p class='text-red-500'>No tests assigned for this patient.</p>";
    return;
  }

  tests.forEach(test => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label class="block font-medium">${test.name} (${test.normalRange})</label>
      <input type="text" name="${test.name}" class="w-full border px-2 py-1 rounded" required>
    `;
    testFields.appendChild(div);
  });
}

// Handle result form submit
resultForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(resultForm);
  const results = [];

  for (const [testName, value] of formData.entries()) {
    results.push({ testName, value });
  }

  // Save results
  const resultData = {
    mrn: selectedPatient.mrn,
    results,
    savedAt: new Date().toLocaleString()
  };

  addToStorage("results", resultData);
  alert("Results saved successfully!");

  resultForm.reset();
  resultForm.classList.add("hidden");
  patientInfo.classList.add("hidden");
};
