function loadSummary() {
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  const totalPatients = patients.length;
  const totalResults = results.length;

  const completedMRNs = results.map(r => r.mrn);
  const pendingPatients = patients.filter(p => !completedMRNs.includes(p.mrn));

  const patientListHTML = patients.length > 0
    ? patients.map(p => `
        <li class="text-gray-700">
          <strong>${p.name || "Unnamed"}</strong> 
          (MRN: ${p.mrn || "N/A"}) – 
          CNIC: ${p.cnic || "N/A"}, Phone: ${p.phone || "N/A"}
        </li>
      `).join("")
    : `<li class="text-gray-500">No patients registered.</li>`;

  const resultsListHTML = results.length > 0
    ? results.map(r => `
        <li class="text-gray-700">
          MRN: ${r.mrn || "N/A"} | Department: ${r.department || "N/A"} | Tests: ${r.tests?.length || 0}
        </li>
      `).join("")
    : `<li class="text-gray-500">No completed reports yet.</li>`;

  const html = `
    <div class="bg-white p-4 rounded shadow-md space-y-2">
      <p><strong>Total Registered Patients:</strong> ${totalPatients}</p>
      <p><strong>Reports Completed:</strong> ${totalResults}</p>
      <p><strong>Pending Reports:</strong> ${pendingPatients.length}</p>
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">📝 All Patients</h2>
      <ul class="space-y-1 list-disc list-inside text-sm">
        ${patientListHTML}
      </ul>
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">✅ Completed Reports</h2>
      <ul class="space-y-1 list-disc list-inside text-sm">
        ${resultsListHTML}
      </ul>
    </div>
  `;

  document.getElementById("summaryContainer").innerHTML = html;
}
