// reports.js - Manage viewing and downloading of reports

document.addEventListener("DOMContentLoaded", () => {
  const reportsTable = document.getElementById("reportsTable");
  const storedReports = JSON.parse(localStorage.getItem("patientReports")) || [];

  function loadReports() {
    reportsTable.innerHTML = "";

    if (storedReports.length === 0) {
      reportsTable.innerHTML = `<tr><td colspan="5">No reports available.</td></tr>`;
      return;
    }

    storedReports.forEach((report, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${report.patientName}</td>
        <td>${report.testName}</td>
        <td>${report.date}</td>
        <td>
          <button class="btn download" data-index="${index}">Download</button>
        </td>
      `;

      reportsTable.appendChild(row);
    });
  }

  function downloadReport(index) {
    const report = storedReports[index];
    const reportContent = `
      Report - AlphaMed Clinical Laboratory
      ------------------------------------
      Patient Name: ${report.patientName}
      Patient ID: ${report.patientId}
      Test: ${report.testName}
      Result: ${report.result}
      Date: ${report.date}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Report_${report.patientName}_${report.testName}.txt`;
    link.click();
  }

  reportsTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("download")) {
      const index = e.target.getAttribute("data-index");
      downloadReport(index);
    }
  });

  loadReports();
});
