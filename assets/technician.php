<?php
require_once 'functions.php';
session_start();
if(!is_logged_in()) header("Location: login.php");
$user = current_user();
if(!in_array($user['role'], ['technician','admin'])) die("Access denied.");

require_once 'config.php';

// assign to technician is currently by default none; admin could set assigned_to
// show order_tests where assigned_to == current tech OR assigned_to IS NULL (if admin assigns later)
$techId = $user['id'];
$stmt = $db->prepare("SELECT ot.*, t.name as test_name, p.name as patient_name, o.sample_code
                      FROM order_tests ot
                      JOIN tests t ON ot.test_id = t.id
                      JOIN sample_orders o ON ot.order_id = o.id
                      JOIN patients p ON o.patient_id = p.id
                      WHERE (ot.assigned_to = :tech OR ot.assigned_to IS NULL) AND ot.status != 'done'
                      ORDER BY ot.id ASC
                      LIMIT 200");
$stmt->execute([':tech'=>$techId]);
$jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

// handle result submission
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['action']) && $_POST['action']=='submit_result') {
    $otid = (int)$_POST['order_test_id'];
    $result_json = json_encode($_POST['results']); // results array keyed by param name
    $db->prepare("UPDATE order_tests SET result = :res, result_data = :rdata, status='done', reported_at=CURRENT_TIMESTAMP, assigned_to=:tech WHERE id=:id")
       ->execute([':res'=>$_POST['summary'],':rdata'=>$result_json,':tech'=>$techId,':id'=>$otid]);
    header("Location: technician.php");
    exit;
}
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Technician - AlphaMed</title>
<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<header>
  <img src="<?php echo e($LOGO_PATH);?>" style="height:50px;">
  <h1>Technician Dashboard</h1>
  <a href="logout.php">Logout</a>
</header>
<main>
  <h2>Assigned Tests</h2>
  <?php foreach($jobs as $job): ?>
    <div class="job-card">
      <h3><?php echo e($job['test_name']);?> — <?php echo e($job['patient_name']);?> (<?php echo e($job['sample_code']);?>)</h3>
      <?php
        // load test parameter definitions
        $tstmt = $db->prepare("SELECT * FROM tests WHERE id = :id");
        $tstmt->execute([':id'=>$job['test_id']]);
        $tinfo = $tstmt->fetch(PDO::FETCH_ASSOC);
        $params = json_decode($tinfo['parameters'], true);
        if(!$params) $params = [['name'=>'Result','unit'=>$tinfo['unit'],'normal'=>$tinfo['normal_range']]];
      ?>
      <form method="post">
        <input type="hidden" name="action" value="submit_result">
        <input type="hidden" name="order_test_id" value="<?php echo e($job['id']);?>">
        <table>
          <tr><th>Parameter</th><th>Result</th><th>Unit</th><th>Normal</th></tr>
          <?php foreach($params as $p): ?>
            <tr>
              <td><?php echo e($p['name']);?></td>
              <td><input name="results[<?php echo e($p['name']);?>]" required></td>
              <td><?php echo e($p['unit'] ?? ''); ?></td>
              <td><?php echo e($p['normal'] ?? ''); ?></td>
            </tr>
          <?php endforeach;?>
        </table>
        <label>Summary/Comment</label>
        <input name="summary">
        <button type="submit">Submit Result</button>
      </form>
    </div>
  <?php endforeach; ?>
</main>
</body>
</html>
