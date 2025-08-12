<?php
require_once 'functions.php';
session_start();
if(!is_logged_in()) { header("Location: login.php"); exit; }
$user = current_user();
if(!in_array($user['role'], ['reception','admin'])) die("Access denied.");

require_once 'config.php';

// create patient
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['action'])) {
    if($_POST['action']=='create_patient') {
        $name = trim($_POST['name']);
        $gender = $_POST['gender'];
        $age = (int)$_POST['age'];
        $phone = $_POST['phone'];
        $mrno = 'MR-' . time();
        $stmt = $db->prepare("INSERT INTO patients (name,gender,age,phone,mr_no) VALUES (:n,:g,:a,:p,:m)");
        $stmt->execute([':n'=>$name,':g'=>$gender,':a'=>$age,':p'=>$phone,':m'=>$mrno]);
    } elseif($_POST['action']=='create_order') {
        $patient_id = (int)$_POST['patient_id'];
        $sample_code = generate_sample_code();
        $db->prepare("INSERT INTO sample_orders (patient_id,created_by,sample_code) VALUES (:p,:c,:s)")
            ->execute([':p'=>$patient_id,':c'=>$user['id'],':s'=>$sample_code]);
        $order_id = $db->lastInsertId();
        // assign tests (array of test ids)
        $test_ids = isset($_POST['tests']) ? $_POST['tests'] : [];
        $assignStmt = $db->prepare("INSERT INTO order_tests (order_id,test_id,status) VALUES (:o,:t,'not_done')");
        foreach($test_ids as $tid) {
            $assignStmt->execute([':o'=>$order_id,':t'=>(int)$tid]);
        }
    }
}

// lists
$patients = $db->query("SELECT * FROM patients ORDER BY id DESC LIMIT 50")->fetchAll(PDO::FETCH_ASSOC);
$departments = $db->query("SELECT * FROM departments")->fetchAll(PDO::FETCH_ASSOC);
$recent_orders = $db->query("SELECT o.*, p.name as patient_name FROM sample_orders o JOIN patients p ON o.patient_id = p.id ORDER BY o.id DESC LIMIT 50")->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Reception - AlphaMed</title>
<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<header>
  <img src="<?php echo e($LOGO_PATH);?>" style="height:50px;">
  <h1>Reception Dashboard</h1>
  <a href="logout.php">Logout</a>
</header>
<main>
  <section>
    <h2>Create Patient</h2>
    <form method="post">
      <input type="hidden" name="action" value="create_patient">
      <input name="name" placeholder="Full name" required>
      <select name="gender">
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input name="age" placeholder="Age" type="number" required>
      <input name="phone" placeholder="Phone">
      <button type="submit">Create Patient</button>
    </form>

    <h3>Recent Patients</h3>
    <ul>
      <?php foreach($patients as $p):?>
        <li><?php echo e($p['name']);?> - <?php echo e($p['mr_no']);?> - <a href="?pid=<?php echo e($p['id']);?>">Assign Tests</a></li>
      <?php endforeach;?>
    </ul>
  </section>

  <section>
    <h2>Assign Tests</h2>
    <?php if(isset($_GET['pid'])): 
        $pid = (int)$_GET['pid'];
        $pstmt = $db->prepare("SELECT * FROM patients WHERE id=:id");
        $pstmt->execute([':id'=>$pid]);
        $patient = $pstmt->fetch(PDO::FETCH_ASSOC);
    ?>
      <h3>Assign for: <?php echo e($patient['name']);?></h3>
      <form method="post">
        <input type="hidden" name="action" value="create_order">
        <input type="hidden" name="patient_id" value="<?php echo e($patient['id']);?>">
        <label>Select Department:</label>
        <select id="dept_select" onchange="loadTests(this.value)">
          <option value="">--Select--</option>
          <?php foreach($departments as $d):?>
            <option value="<?php echo e($d['id']);?>"><?php echo e($d['name']);?></option>
          <?php endforeach;?>
        </select>

        <div id="tests_container"></div>
        <button type="submit">Create Order</button>
      </form>
    <?php else: ?>
      <p>Select a patient from Recent Patients to assign tests.</p>
    <?php endif; ?>
  </section>

  <section>
    <h2>Recent Orders</h2>
    <ul>
      <?php foreach($recent_orders as $o):?>
        <li><?php echo e($o['patient_name']);?> - <?php echo e($o['sample_code']);?> - <?php echo e($o['status']);?> - <a href="generate_report.php?order=<?php echo e($o['id']);?>">View Report</a></li>
      <?php endforeach;?>
    </ul>
  </section>
</main>

<script src="assets/js/main.js"></script>
<script>
function loadTests(deptId){
  if(!deptId) { document.getElementById('tests_container').innerHTML=''; return;}
  fetch('assets/js/get_tests.php?dept='+deptId).then(r=>r.json()).then(data=>{
    let html = '<h4>Choose Tests</h4>';
    data.forEach(t=>{
      html += `<label><input type="checkbox" name="tests[]" value="${t.id}"> ${t.name}</label><br>`;
    });
    document.getElementById('tests_container').innerHTML = html;
  });
}
</script>
</body>
</html>
