<?php
session_start();
require_once "db_connect.php"; // Database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $role = $_POST['role'] ?? '';
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($role) || empty($username) || empty($password)) {
        die("All fields are required.");
    }

    // Prepared statement for security
    $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = ? AND role = ?");
    $stmt->bind_param("ss", $username, $role);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            // Role-based redirection
            switch ($user['role']) {
                case 'admin':
                    header("Location: admin_dashboard.php");
                    break;
                case 'reception':
                    header("Location: reception_dashboard.php");
                    break;
                case 'technician':
                    header("Location: technician_dashboard.php");
                    break;
                default:
                    die("Invalid role.");
            }
            exit;
        } else {
            die("Invalid password.");
        }
    } else {
        die("User not found or role mismatch.");
    }
}
?>
