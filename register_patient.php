<?php
// =============================
//  CONFIGURATION
// =============================
require 'vendor/autoload.php'; // QR Code & Barcode libraries
include 'db_connect.php';

// =============================
//  AUTO MRN GENERATE
// =============================
$mrn = "MRN" . str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);

// =============================
//  HANDLE FORM SUBMIT
// =============================
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name       = $_POST['name'];
    $dob        = $_POST['dob'];
    $gender     = $_POST['gender'];
    $phone      = $_POST['phone'];
    $cnic       = $_POST['cnic'];
    $address    = $_POST['address'];
    $mrn        = $_POST['mrn'];

    // Save Patient Data
    $stmt = $conn->prepare("INSERT INTO patients (mrn, name, dob, gender, phone, cnic, address) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $mrn, $name, $dob, $gender, $phone, $cnic, $address);
    $stmt->execute();

    // Generate QR Code
    $qrCodePath = "qrcodes/{$mrn}.png";
    $qr = new Endroid\QrCode\QrCode($mrn);
    $qr->writeFile($qrCodePath);

    // Generate Barcode
    $barcodePath = "barcodes/{$mrn}.png";
    $barcode = new Picqer\Barcode\BarcodeGeneratorPNG();
    file_put_contents($barcodePath, $barcode->getBarcode($mrn, $barcode::TYPE_CODE_128));

    echo "<script>alert('Patient Registered Successfully!');</script>";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register Patient</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <img src="logo.png" class="logo" alt="Lab Logo">
    <h1>Register New Patient</h1>
    <a href="dashboard.php" class="logout-btn">Back</a>
</header>

<div class="dashboard-container">
    <form method="POST">
        <label>MRN (Auto)</label>
        <input type="text" name="mrn" value="<?php echo $mrn; ?>" readonly>

        <label>Full Name</label>
        <input type="text" name="name" required>

        <label>Date of Birth</label>
        <input type="date" name="dob" required>

        <label>Gender</label>
        <select name="gender" required>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
        </select>

        <label>Phone Number</label>
        <input type="text" name="phone" required>

        <label>CNIC</label>
        <input type="text" name="cnic" required>

        <label>Address</label>
        <textarea name="address" required></textarea>

        <button type="submit">Register Patient</button>
    </form>
</div>

<footer>
    <p>© <?php echo date("Y"); ?> Your Lab Name - All Rights Reserved</p>
</footer>
</body>
</html>
