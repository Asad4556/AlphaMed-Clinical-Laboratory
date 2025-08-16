// Technician Panel Script

document.addEventListener("DOMContentLoaded", () => {
  const resultForm = document.getElementById("resultForm");

  // Save results in localStorage
  resultForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const patientId = document.getElementById("patientId").value.trim();
    const testName = document.getElementById("testName").value;
    const result = document.getElementById("result").value.trim();
    const remarks = document.getElementById("remarks").value.trim();

    if (!patientId || !testName || !result) {
      alert("Please fill in all required fields.");
      return;
    }

    const newResult = {
      patientId,
      testName,
      result,
      remarks,
      date: new Date().toLocaleString()
    };

    let results = JSON.parse(localStorage.getItem("testResults")) || [];
    results.push(newResult);
    localStorage.setItem("testResults", JSON.stringify(results));

    alert("Result saved successfully!");
    resultForm.reset();
  });
});
