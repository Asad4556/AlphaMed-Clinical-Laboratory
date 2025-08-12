<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "lab_system");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Auto-generate MRN (Medical Record Number)
function generateMRN($conn) {
    $result = $conn->query("SELECT MAX(id) AS max_id FROM patients");
    $row = $result->fetch_assoc();
    $next_id = $row['max_id'] + 1;
    return "MRN" . str_pad($next_id, 6, "0", STR_PAD_LEFT);
}

// Auto-generate Sample Number
function generateSampleNo($conn) {
    $result = $conn->query("SELECT MAX(id) AS max_id FROM patients");
    $row = $result->fetch_assoc();
    $next_id = $row['max_id'] + 1;
    return "SMP" . str_pad($next_id, 6, "0", STR_PAD_LEFT);
}

// Save patient data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mrn = generateMRN($conn);
    $sample_no = generateSampleNo($conn);
    $name = $_POST['name'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $cnic = $_POST['cnic'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];
    $department = $_POST['department'];

    $stmt = $conn->prepare("INSERT INTO patients (mrn, sample_no, name, age, gender, cnic, contact, address, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $mrn, $sample_no, $name, $age, $gender, $cnic, $contact, $address, $department);

    if ($stmt->execute()) {
        header("Location: register_patient.php?success=1&mrn=$mrn&sample_no=$sample_no");
        exit;
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register Patient</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Register New Patient</h2>

<?php if (isset($_GET['success'])): ?>
<div class="success-message">
    ✅ Patient registered successfully!  
    MRN: <strong><?php echo $_GET['mrn']; ?></strong>  
    Sample No: <strong><?php echo $_GET['sample_no']; ?></strong>
</div>
<?php endif; ?>

<form method="POST">
    <label>Full Name:</label>
    <input type="text" name="name" required>

    <label>Age:</label>
    <input type="number" name="age" required>

    <label>Gender:</label>
    <select name="gender" required>
        <option value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
    </select>

    <label>CNIC:</label>
    <input type="text" name="cnic" required placeholder="xxxxx-xxxxxxx-x">

    <label>Contact:</label>
    <input type="text" name="contact" required>

    <label>Address:</label>
    <textarea name="address" required></textarea>

    <label>Department:</label>
    <select name="department" required>
        <option value="">Select Department</option>
        <option>Hematology</option>
        <option>Biochemistry</option>
        <option>Microbiology</option>
        <option>Histopathology</option>
        <option>Molecular Biology</option>
        <option>Immunology</option>
        <option>Serology</option>
        <option>Virology</option>
        <option>Parasitology</option>
        <option>Clinical Pathology</option>
        <option>Blood Bank</option>
        <option>Endocrinology</option>
        <option>Toxicology</option>
        <option>Radiology</option>
        <option>Other</option>
    </select>

    <button type="submit">Register Patient</button>
</form>
</body>
</html>
