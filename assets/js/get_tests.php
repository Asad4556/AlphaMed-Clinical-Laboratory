<?php
// assets/js/get_tests.php
require_once __DIR__ . '/../../config.php';
$dept = isset($_GET['dept']) ? (int)$_GET['dept'] : 0;
$stmt = $db->prepare("SELECT id,name FROM tests WHERE department_id = :d LIMIT 200");
$stmt->execute([':d'=>$dept]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($rows);
