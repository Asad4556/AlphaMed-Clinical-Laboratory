<?php
// functions.php
require_once 'config.php';

function is_logged_in() {
    session_start();
    return isset($_SESSION['user']);
}

function require_role($role) {
    session_start();
    if(!isset($_SESSION['user'])) {
        header("Location: login.php");
        exit;
    }
    if($_SESSION['user']['role'] !== $role && $_SESSION['user']['role'] !== 'admin') {
        // admin can access everything
        die("Access denied.");
    }
}

function current_user() {
    session_start();
    return isset($_SESSION['user']) ? $_SESSION['user'] : null;
}

function generate_sample_code() {
    return 'SMP-' . date('Ymd') . '-' . rand(100,999);
}

// basic sanitization
function e($s) {
    return htmlspecialchars($s, ENT_QUOTES);
}
?>
