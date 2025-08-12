<?php
require_once 'config.php';
require_once 'functions.php';
session_start();
// Allow admin and reception and technician to view (read-only)
if(!is_logged_in()) header("Location: login.php");

$orderId = isset($_GET['order']) ? (int)$_GET['order'] : 0;
$order = $db->prepare("SELECT o.*, p.* FROM sample_orders o JOIN patients p ON o.patient_id = p.id WHERE o.id = :id");
$order->execute([':id'=>$orderId]);
$ord = $order->fetch(PDO::FETCH_ASSOC);
if(!$ord) { echo "Order not found"; exit; }

$tests = $db->prepare("SELECT ot.*, t.name as test_name, t.unit, t.normal_range, ot.result_data
                        FROM order_tests ot
                        JOIN tests t ON ot.test_id = t.id
                        WHERE ot.order_id = :oid");
$tests->execute([':oid'=>$orderId]);
$testsList = $tests->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Report - <?php echo e($ord['sample_code']);?></title>
<link rel="stylesheet" href="assets/css/styles.css">
<style>
.report { width: 800px; margin: 0 auto; background:#fff; padding:20px; }
.header { text-align:center; }
.watermark { position: fixed; top:200px; left:120px; opacity:0.06; font-size:80px; transform:rotate(-15deg); }
table { width:100%; border-collapse: collapse;}
table, td, th { border: 1px solid #ddd; padding:8px;}
.flag-high { color:red; font-weight:bold;}
.flag-low { color:orange; font-weight:bold;}
</style>
</head>
<body>
<div class="report">
  <div class="watermark"><img src="<?php echo e($LOGO_PATH);?>" style="height:160px; opacity:0.08;"></div>
  <div class="header">
    <img src="<?php echo e($LOGO_PATH);?>" style="height:60px;">
    <h1><?php echo e($LAB_NAME);?></h1>
    <p><?php echo e($LAB_TAGLINE);?></p>
  </div>

  <h3>Patient: <?php echo e($ord['name']);?> — MR#: <?php echo e($ord['mr_no']);?></h3>
  <p>Sample Code: <?php echo e($ord['sample_code']);?> | Date: <?php echo e($ord['created_at']);?></p>

  <table>
    <tr><th>Test</th><th>Parameter Data</th><th>Summary</th></tr>
    <?php foreach($testsList as $tl):
        $rd = $tl['result_data'] ? json_decode($tl['result_data'], true) : null;
    ?>
      <tr>
        <td><?php echo e($tl['test_name']);?></td>
        <td>
          <?php
            if($rd) {
              echo '<table style="width:100%">';
              echo '<tr><th>Parameter</th><th>Value</th><th>Normal</th></tr>';
              foreach($rd as $k=>$v) {
                // simple flagging: not robust — admin should set ranges properly
                echo '<tr><td>'.e($k).'</td><td>'.e($v).'</td><td>'.e($tl['normal_range']).'</td></tr>';
              }
              echo '</table>';
            } else {
              echo "No result entered";
            }
          ?>
        </td>
        <td><?php echo e($tl['result']);?></td>
      </tr>
    <?php endforeach;?>
  </table>

  <p>Reported by: _____________________</p>
  <p>Approved by: _____________________</p>

  <p>QR: <img src="https://api.qrserver.com/v1/create-qr-code/?data=<?php echo urlencode('https://alpha.local/report/'.$ord['sample_code']); ?>&size=100x100"></p>
  <p><button onclick="window.print()">Print / Save PDF</button></p>
</div>
</body>
</html>
