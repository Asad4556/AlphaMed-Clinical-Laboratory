<?php
// config.php
// SQLite connection + basic settings
$db_file = __DIR__ . "/lab_system.db";

try {
    $db = new PDO("sqlite:" . $db_file);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Foreign keys
    $db->exec("PRAGMA foreign_keys = ON;");
} catch (Exception $e) {
    die("Database connection failed: " . $e->getMessage());
}

// site settings
$LAB_NAME = "AlphaMed Clinical Laboratory";
$LAB_TAGLINE = "Quality Assurance Through Advance Technology";
$LOGO_PATH = "assets/images/logo.png"; // put your logo here
$BASE_URL = ""; // leave empty for localhost or set if hosted in subfolder
?>
