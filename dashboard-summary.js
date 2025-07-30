function loadSummary() {
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  const totalPatients = patients.length;
  const totalResults = results.length;
  const completedMRNs = results.map(r => r.mrn);
  const pendingPatients = patients.filter(p => !completedMRNs.includes(p.mrn));

  const html = `
    <div class="bg-white p-4 rounded shadow-md">
      <p><strong>Total Registered Patients:</strong> ${totalPatients}</p>
      <p><strong>Reports Completed:</strong> ${totalResults}</p>
      <p><strong>Pending Reports:</strong> ${pendingPatients.length}</p>
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">📝 All Patients</h2>
      <ul class="space-y-1 list-disc list-inside text-sm">
        ${patients.map(p => `
          <li>
            <strong>${p.name}</strong> (MRN: ${p.mrn}) - CNIC: ${p.cnic}, Phone: ${p.phone}
          </li>
        `).join("")}
      </ul>
    </div>

    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">✅ Completed Reports</h2>
      <ul class="space-y-1 list-disc list-inside text-sm">
        ${results.map(r => `
          <li>
            MRN: ${r.mrn} | Department: ${r.department} | Tests: ${r.tests.length}
          </li>
        `).join("")}
      </ul>
    </div>
  `;

  document.getElementById("summaryContainer").innerHTML = html;
}
