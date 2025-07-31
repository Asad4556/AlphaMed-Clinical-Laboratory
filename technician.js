// Load result status on page load
document.addEventListener("DOMContentLoaded", () => {
  renderResultStatusTable();
});

// Search patient by CNIC or MRN
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  const patients = getFromStorage("patients");

  const found = patients.find(p =>
    p.cnic === query || p.mrn === query
  );

  if (found) {
    showPatient(found);
  } else {
    alert("Patient not found!");
  }
});

// Show patient and their tests
function showPatient(patient) {
  document.getElementById("patientInfo").classList.remove("hidden");
  document.getElementById("resultForm").classList.remove("hidden");

  document.getElementById("pName").textContent = patient.name;
  document.getElementById("pMRN").textContent = patient.mrn;
  document.getElementById("pSample").textContent = patient.sampleNo;

  const testFields = document.getElementById("testFields");
  testFields.innerHTML = "";

  // Fetch assigned tests (from reception)
  const assignedTests = getFromStorage("reception_tests").filter(
    t => t.mrn === patient.mrn
  );

  if (assignedTests.length === 0) {
    testFields.innerHTML = "<p class='text-red-500'>No tests assigned.</p>";
    return;
  }

  assignedTests.forEach(test => {
    const field = document.createElement("div");
    field.innerHTML = `
      <label class="block font-medium">${test.name}</label>
      <input type="text" name="${test.name}" class="w-full border px-2 py-1 rounded" placeholder="Enter result" required />
    `;
    testFields.appendChild(field);
  });

  // Save test results
  document.getElementById("resultForm").onsubmit = function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const results = [];

    for (let pair of formData.entries()) {
      results.push({ testName: pair[0], value: pair[1] });
    }

    const resultData = {
      mrn: patient.mrn,
      name: patient.name,
      sampleNo: patient.sampleNo,
      results,
      savedAt: new Date().toLocaleString()
    };

    // Save to results
    const allResults = getFromStorage("results");
    const index = allResults.findIndex(r => r.mrn === patient.mrn);
    if (index !== -1) {
      allResults[index] = resultData;
    } else {
      allResults.push(resultData);
    }
    localStorage.setItem("results", JSON.stringify(allResults));

    alert("✅ Results saved successfully.");
    e.target.reset();
    document.getElementById("resultForm").classList.add("hidden");
    document.getElementById("patientInfo").classList.add("hidden");

    renderResultStatusTable();
  };
}

// Show status table (Pending / Approved)
function renderResultStatusTable() {
  const patients = getFromStorage("patients");
  const results = getFromStorage("results");
  const tbody = document.getElementById("resultTableBody");
  tbody.innerHTML = "";

  patients.forEach(p => {
    const isDone = results.some(r => r.mrn === p.mrn);
    const status = isDone
      ? `<span class="text-green-600 font-semibold">✅ Approved</span>`
      : `<span class="text-yellow-600 font-semibold">⏳ Pending</span>`;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-2 border">${p.mrn}</td>
      <td class="p-2 border">${p.name}</td>
      <td class="p-2 border">${p.sampleNo}</td>
      <td class="p-2 border">${status}</td>
    `;
    tbody.appendChild(row);
  });
}

// Storage helper
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
