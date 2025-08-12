<?php
// add_test.php
session_start();
if (!isset($_SESSION['user_role']) || !in_array($_SESSION['user_role'], ['Admin', 'Technician'])) {
    header("Location: login.html");
    exit();
}
?>

<?php include 'db_connect.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Add Lab Test Result</title>
<link rel="stylesheet" href="style.css">
<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
<style>
    .form-section {
        background: #1e1e1e;
        padding: 20px;
        border-radius: 12px;
        color: white;
        max-width: 800px;
        margin: auto;
    }
    select, input {
        padding: 10px;
        margin: 5px 0;
        width: 100%;
        border-radius: 6px;
        border: none;
    }
    label { font-weight: bold; }
</style>
</head>
<body>

<div class="form-section">
<h2>Add Test Result</h2>

<form action="save_test.php" method="POST">
    <label>MRN Number:</label>
    <input type="text" name="mrn" value="<?php echo 'MRN'.time(); ?>" readonly>

    <label>Sample Number:</label>
    <input type="text" name="sample_no" value="<?php echo 'SMP'.rand(1000,9999); ?>" readonly>

    <label>Department:</label>
    <select id="department" name="department" required>
        <option value="">Select Department</option>
        <option value="Hematology">Hematology</option>
        <option value="Biochemistry">Biochemistry</option>
        <option value="Microbiology">Microbiology</option>
        <option value="Serology">Serology</option>
        <option value="Histopathology">Histopathology</option>
        <option value="Immunology">Immunology</option>
        <option value="Clinical Pathology">Clinical Pathology</option>
        <option value="Virology">Virology</option>
        <option value="Endocrinology">Endocrinology</option>
        <option value="Molecular Biology">Molecular Biology</option>
        <option value="Cytology">Cytology</option>
        <option value="Parasitology">Parasitology</option>
        <option value="Blood Bank">Blood Bank</option>
        <option value="Toxicology">Toxicology</option>
        <option value="Drug Testing Lab">Drug Testing Lab</option>
    </select>

    <label>Test Name:</label>
    <select id="test_name" name="test_name" required>
        <option value="">Select Test</option>
    </select>

    <label>Normal Range:</label>
    <input type="text" id="normal_range" name="normal_range" readonly>

    <label>Unit:</label>
    <input type="text" id="unit" name="unit" readonly>

    <label>Result:</label>
    <input type="text" name="result" required>

    <div style="display: flex; gap: 20px; margin-top: 10px;">
        <div id="qrcode"></div>
        <svg id="barcode"></svg>
    </div>

    <br>
    <button type="submit">Save Result</button>
</form>
</div>

<script>
const testData = {
    "Hematology": [
        { name: "CBC", range: "4.5-11.0", unit: "x10^9/L" },
        { name: "Hemoglobin", range: "13-17", unit: "g/dL" },
        { name: "Platelet Count", range: "150-450", unit: "x10^9/L" }
    ],
    "Biochemistry": [
        { name: "Glucose (Fasting)", range: "70-99", unit: "mg/dL" },
        { name: "Urea", range: "15-40", unit: "mg/dL" },
        { name: "Creatinine", range: "0.6-1.3", unit: "mg/dL" }
    ],
    "Microbiology": [
        { name: "Urine C/S", range: "No Growth", unit: "" },
        { name: "Blood C/S", range: "No Growth", unit: "" }
    ],
    "Serology": [
        { name: "HIV", range: "Negative", unit: "" },
        { name: "HBsAg", range: "Negative", unit: "" }
    ],
    // ... Add all departments with 30+ tests each here
};

document.getElementById('department').addEventListener('change', function() {
    const dept = this.value;
    const testSelect = document.getElementById('test_name');
    testSelect.innerHTML = '<option value="">Select Test</option>';
    if (testData[dept]) {
        testData[dept].forEach(test => {
            let opt = document.createElement('option');
            opt.value = test.name;
            opt.textContent = test.name;
            opt.dataset.range = test.range;
            opt.dataset.unit = test.unit;
            testSelect.appendChild(opt);
        });
    }
});

document.getElementById('test_name').addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    document.getElementById('normal_range').value = selectedOption.dataset.range || '';
    document.getElementById('unit').value = selectedOption.dataset.unit || '';
});

window.onload = function() {
    const mrn = document.querySelector('[name="mrn"]').value;
    const sample = document.querySelector('[name="sample_no"]').value;
    new QRCode(document.getElementById("qrcode"), mrn);
    JsBarcode("#barcode", sample, { format: "CODE128", displayValue: true });
};
</script>

</body>
</html>
