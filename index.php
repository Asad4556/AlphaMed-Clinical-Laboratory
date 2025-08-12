<?php
require_once 'functions.php';
if(is_logged_in()) {
    $user = current_user();
    if($user['role']=='admin') header("Location: admin.php");
    if($user['role']=='reception') header("Location: reception.php");
    if($user['role']=='technician') header("Location: technician.php");
} else {
    header("Location: login.php");
}
exit;
?>
