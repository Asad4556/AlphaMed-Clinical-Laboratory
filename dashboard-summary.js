function loadSummary() {
  // موجودہ یوزر کو لوکل اسٹوریج سے لیں
  const user = JSON.parse(localStorage.getItem("currentUser"));
  
  // اگر یوزر لاگ ان نہیں یا رول ایڈمن نہیں ہے تو پیغام دکھائیں اور فنکشن ختم کریں
  if (!user || user.role !== "Admin") {
    document.getElementById("summaryContainer").innerHTML = `
      <p class="text-red-600 font-semibold">Access denied. Only Admin can see this summary.</p>
    `;
    return;
  }

  // ڈیٹا لوکل اسٹوریج سے حاصل کریں
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  // شماریات نکالیں
  const totalPatients = patients.length;
  const totalResults = results.length;

  const completedMRNs = results.map(r => r.mrn);
  const pendingPatients = patients.filter(p => !completedMRNs.includes(p.mrn));

  // مریضوں کی لسٹ HTML
  const patientListHTML = patients.length > 0
    ? patients.map(p => ` 
        <li class="text-gray-700">
          <strong>${p.name || "Unnamed"}</strong> 
          (MRN: ${p.mrn || "N/A"}) – 
          CNIC: ${p.cnic || "N/A"}, Phone: ${p.phone || "N/A"}
        </li>
      `).join("")
    : `<li class="text-gray-500">No patients registered.</li>`;

  // مکمل رپورٹس کی لسٹ HTML
  const resultsListHTML = results.length > 0
    ? results.map(r => `
        <li class="text-gray-700">
          MRN: ${r.mrn || "N/A"} | Department: ${r.department || "N/A"} | Tests: ${r.tests?.length || 0}
        </li>
      `).join("")
    : `<li class="text-gray-500">No completed reports yet.</li>`;

  // summary کا مکمل HTML
  const html = `
    <div class="bg-white p-4 rounded shadow-md space-y-2">
      <p><strong>Total Registered Patients:</strong> 
        <span class="${totalPatients > 50 ? 'text-red-600' : 'text-green-600'}">${totalPatients}</span>
      </p>
      <p><strong>Reports Completed:</strong> ${totalResults}</p>
      <p><strong>Pending Reports:</strong> 
        <span class="${pendingPatients.length > 0 ? 'text-yellow-600' : 'text-gray-600'}">${pendingPatients.length}</span>
      </p>
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

  // summaryContainer میں HTML ڈالیں
  document.getElementById("summaryContainer").innerHTML = html;
}
