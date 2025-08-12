<?php
session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Lab Management System</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
<header class="dashboard-header">
    <img src="logo.png" alt="Lab Logo" class="logo">
    <h1>Admin Dashboard</h1>
    <a href="logout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
</header>

<main class="dashboard-container">
    <div class="dashboard-grid">
        <a href="register_patient.php" class="dashboard-card">
            <i class="fas fa-user-plus"></i>
            <h3>Register Patient</h3>
        </a>
        <a href="add_test_result.php" class="dashboard-card">
            <i class="fas fa-vials"></i>
            <h3>Add Test Result</h3>
        </a>
        <a href="view_reports.php" class="dashboard-card">
            <i class="fas fa-file-medical-alt"></i>
            <h3>View Reports</h3>
        </a>
        <a href="department_management.php" class="dashboard-card">
            <i class="fas fa-building"></i>
            <h3>Departments</h3>
        </a>
        <a href="barcode_qr.php" class="dashboard-card">
            <i class="fas fa-qrcode"></i>
            <h3>QR & Barcode</h3>
        </a>
        <a href="user_management.php" class="dashboard-card">
            <i class="fas fa-users-cog"></i>
            <h3>Manage Users</h3>
        </a>
    </div>
</main>

<footer class="dashboard-footer">
    <p>&copy; <?php echo date("Y"); ?> International Standard Lab System | WHO / PHC Compliant</p>
</footer>

</body>
</html>
