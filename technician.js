// Normal ranges for common tests
const normalRanges = {
  "Blood Sugar": "70-110 mg/dL",
  "Hemoglobin": "13.5-17.5 g/dL",
  "WBC": "4,500-11,000 /mcL",
  "Platelets": "150,000-450,000 /mcL",
  "Cholesterol": "Below 200 mg/dL",
  "Creatinine": "0.6–1.2 mg/dL",
  "Uric Acid": "3.4–7.0 mg/dL",
  "ALT (SGPT)": "7–56 U/L",
  "AST (SGOT)": "5–40 U/L",
  "Bilirubin": "0.3–1.2 mg/dL",
  "TSH": "0.4–4.0 mIU/L",
  "Vitamin D": "30–100 ng/mL"
};

// Load patients into dropdown
window.onload = function () {
  loadPatients();
  loadResults();
  document.getElementById('testName').addEventListener('input', showNormalRange);
};

// Load registered patients from localStorage
function loadPatients() {
  const select = document.getElementById('patientSelect');
  const patients = JSON.parse(localStorage.getItem('patients')) || [];

  select.innerHTML = `<option value="">-- Select Patient --</option>`;
  patients.forEach((patient) => {
    const option = document.createElement('option');
    option.value = patient.mrn;
    option.textContent = `${patient.name} (MRN: ${patient.mrn})`;
    select.appendChild(option);
  });
}

// Show normal range when typing test
function showNormalRange() {
  const test = document.getElementById('testName').value.trim();
  const range = normalRanges[test] || "N/A";
  document.getElementById('normalRange').innerText = range !== "N/A"
    ? `Normal Range: ${range}`
    : '';
}

// Add test result
function addTestResult() {
  const patientSelect = document.getElementById('patientSelect');
  const testName = document.getElementById('testName').value.trim();
  const testResult = document.getElementById('testResult').value.trim();

  if (!patientSelect.value || !testName || !testResult) {
    alert('Please fill in all fields.');
    return;
  }

  const range = normalRanges[testName] || "N/A";

  const resultData = {
    mrn: patientSelect.value,
    patientName: patientSelect.options[patientSelect.selectedIndex].text,
    test: testName,
    result: testResult,
    range: range
  };

  const results = JSON.parse(localStorage.getItem('testResults')) || [];
  results.push(resultData);
  localStorage.setItem('testResults', JSON.stringify(results));

  clearForm();
  loadResults();
}

// Display results
function loadResults() {
  const tbody = document.querySelector("#resultsTable tbody");
  tbody.innerHTML = "";
  const results = JSON.parse(localStorage.getItem('testResults')) || [];

  results.forEach((res, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${res.patientName}</td>
      <td>${res.test}</td>
      <td>${res.result}</td>
      <td>${res.range}</td>
      <td><button onclick="deleteResult(${index})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Clear form fields
function clearForm() {
  document.getElementById('testName').value = '';
  document.getElementById('testResult').value = '';
  document.getElementById('normalRange').innerText = '';
}

// Delete result
function deleteResult(index) {
  const results = JSON.parse(localStorage.getItem('testResults')) || [];
  results.splice(index, 1);
  localStorage.setItem('testResults', JSON.stringify(results));
  loadResults();
}

// Filter/search results
function filterResults() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#resultsTable tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}
