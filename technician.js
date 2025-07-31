document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("testResultsContainer");

  const patients = JSON.parse(localStorage.getItem("registeredPatients") || "[]");

  if (patients.length === 0) {
    container.innerHTML = `<div class="text-red-600 text-center py-8">❌ No registered patients found.</div>`;
    return;
  }

  patients.forEach((patient, patientIndex) => {
    const card = document.createElement("div");
    card.className = "bg-white shadow p-4 rounded mb-6";

    const testDetails = patient.selectedTests?.map((test, testIndex) => {
      const parameters = test.parameters.map((param, paramIndex) => {
        const inputId = `p${patientIndex}-t${testIndex}-param${paramIndex}`;
        return `
          <div class="grid grid-cols-4 gap-2 mb-2">
            <label class="col-span-1 font-medium">${param.name}</label>
            <input type="text" id="${inputId}" class="col-span-1 border px-2 py-1 rounded" placeholder="Enter result"/>
            <span class="col-span-1 text-sm text-gray-500">${param.unit}</span>
            <span class="col-span-1 text-sm text-gray-400">Ref: ${param.range}</span>
          </div>
        `;
      }).join("");

      return `
        <div class="border border-blue-200 rounded p-3 mb-4">
          <h4 class="font-semibold text-blue-600 mb-2">${test.name}</h4>
          ${parameters}
        </div>
      `;
    }).join("");

    card.innerHTML = `
      <h2 class="text-lg font-bold mb-2">🧑 ${patient.name} (${patient.mrn})</h2>
      <p class="mb-2"><strong>CNIC:</strong> ${patient.cnic}</p>
      <p class="mb-4"><strong>Sample No:</strong> ${patient.sampleNo}</p>
      ${testDetails || "<div class='text-gray-400'>No tests selected.</div>"}
      <button onclick="saveResults(${patientIndex})" class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">💾 Save Results</button>
    `;

    container.appendChild(card);
  });
});

function saveResults(patientIndex) {
  const patients = JSON.parse(localStorage.getItem("registeredPatients") || "[]");

  const patient = patients[patientIndex];
  if (!patient || !patient.selectedTests) return;

  patient.selectedTests.forEach((test, testIndex) => {
    test.parameters.forEach((param, paramIndex) => {
      const inputId = `p${patientIndex}-t${testIndex}-param${paramIndex}`;
      const input = document.getElementById(inputId);
      param.result = input.value;
    });
  });

  patients[patientIndex] = patient;
  localStorage.setItem("registeredPatients", JSON.stringify(patients));
  alert("✅ Test results saved!");
}
