<?php
// admin_tests.php
require_once 'functions.php';
session_start();
if(!is_logged_in()) { header("Location: login.php"); exit; }
$user = current_user();
if($user['role']!='admin') die("Access denied.");
require_once 'config.php';

// Actions: add test, edit test, delete test, import sample params
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    if($action === 'add_test') {
        $dept = (int)$_POST['department_id'];
        $code = trim($_POST['code']);
        $name = trim($_POST['name']);
        $unit = trim($_POST['unit']);
        $normal = trim($_POST['normal_range']);
        $params = isset($_POST['params_json']) ? $_POST['params_json'] : json_encode([]);
        $stmt = $db->prepare("INSERT INTO tests (department_id, code, name, unit, normal_range, parameters) VALUES (:d,:c,:n,:u,:nr,:p)");
        $stmt->execute([':d'=>$dept,':c'=>$code,':n'=>$name,':u'=>$unit,':nr'=>$normal,':p'=>$params]);
    } elseif ($action === 'edit_test') {
        $tid = (int)$_POST['test_id'];
        $code = trim($_POST['code']);
        $name = trim($_POST['name']);
        $unit = trim($_POST['unit']);
        $normal = trim($_POST['normal_range']);
        $params = isset($_POST['params_json']) ? $_POST['params_json'] : json_encode([]);
        $stmt = $db->prepare("UPDATE tests SET code=:c,name=:n,unit=:u,normal_range=:nr,parameters=:p WHERE id=:id");
        $stmt->execute([':c'=>$code,':n'=>$name,':u'=>$unit,':nr'=>$normal,':p'=>$params,':id'=>$tid]);
    } elseif ($action === 'delete_test') {
        $tid = (int)$_POST['test_id'];
        $db->prepare("DELETE FROM tests WHERE id = :id")->execute([':id'=>$tid]);
    }
}

// lists
$departments = $db->query("SELECT * FROM departments ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
$dept_id = isset($_GET['dept']) ? (int)$_GET['dept'] : ($departments[0]['id'] ?? 0);
$tests = [];
if($dept_id) {
    $stmt = $db->prepare("SELECT * FROM tests WHERE department_id = :d ORDER BY id ASC");
    $stmt->execute([':d'=>$dept_id]);
    $tests = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Manage Tests - Admin</title>
  <link rel="stylesheet" href="assets/css/styles.css">
  <style>
    .small { font-size:12px; color:#666; }
    textarea { width:100%; height:120px }
  </style>
</head>
<body>
  <header>
    <img src="<?php echo e($LOGO_PATH);?>" style="height:50px;">
    <h1>Manage Tests</h1>
    <a href="admin.php">Admin Home</a> | <a href="logout.php">Logout</a>
  </header>
  <main>
    <section>
      <h2>Departments</h2>
      <form method="get">
        <select name="dept" onchange="this.form.submit()">
          <?php foreach($departments as $d): ?>
            <option value="<?php echo e($d['id']);?>" <?php echo $dept_id==$d['id']? 'selected':'';?>><?php echo e($d['name']);?></option>
          <?php endforeach; ?>
        </select>
      </form>
    </section>

    <section>
      <h2>Tests in <?php echo e($departments[array_search($dept_id, array_column($departments,'id'))]['name'] ?? ''); ?></h2>
      <table>
        <tr><th>ID</th><th>Code</th><th>Name</th><th>Unit</th><th>Normal Range</th><th>Parameters</th><th>Action</th></tr>
        <?php foreach($tests as $t): ?>
          <tr>
            <td><?php echo e($t['id']);?></td>
            <td><?php echo e($t['code']);?></td>
            <td><?php echo e($t['name']);?></td>
            <td><?php echo e($t['unit']);?></td>
            <td><?php echo e($t['normal_range']);?></td>
            <td class="small"><?php
                $p = json_decode($t['parameters'], true);
                if(!$p) echo '—';
                else {
                    foreach($p as $pp) {
                        echo e($pp['name']) . ' (' . e($pp['unit'] ?? '') . ')<br>';
                    }
                }
            ?></td>
            <td>
              <!-- simple edit form toggle -->
              <button onclick="showEdit(<?php echo e($t['id']);?>)">Edit</button>
              <form method="post" style="display:inline" onsubmit="return confirm('Delete test?')">
                <input type="hidden" name="action" value="delete_test">
                <input type="hidden" name="test_id" value="<?php echo e($t['id']);?>">
                <button type="submit">Delete</button>
              </form>
              <div id="edit-<?php echo e($t['id']);?>" style="display:none;border:1px solid #eee;padding:10px;margin-top:8px;">
                <form method="post">
                  <input type="hidden" name="action" value="edit_test">
                  <input type="hidden" name="test_id" value="<?php echo e($t['id']);?>">
                  <label>Code</label><input name="code" value="<?php echo e($t['code']);?>">
                  <label>Name</label><input name="name" value="<?php echo e($t['name']);?>">
                  <label>Unit</label><input name="unit" value="<?php echo e($t['unit']);?>">
                  <label>Normal Range</label><input name="normal_range" value="<?php echo e($t['normal_range']);?>">
                  <label>Parameters (JSON)</label>
                  <textarea name="params_json"><?php echo e($t['parameters']);?></textarea>
                  <button type="submit">Save</button>
                </form>
              </div>
            </td>
          </tr>
        <?php endforeach; ?>
      </table>

      <h3>Add New Test</h3>
      <form method="post">
        <input type="hidden" name="action" value="add_test">
        <input type="hidden" name="department_id" value="<?php echo e($dept_id);?>">
        <label>Code</label><input name="code" required>
        <label>Name</label><input name="name" required>
        <label>Unit</label><input name="unit">
        <label>Normal Range</label><input name="normal_range">
        <label>Parameters (JSON array: e.g. [{"name":"WBC","unit":"/µL","normal":"4-11"}])</label>
        <textarea name="params_json">[]</textarea>
        <button type="submit">Add Test</button>
      </form>
    </section>
  </main>

<script>
function showEdit(id){
  var el = document.getElementById('edit-' + id);
  if(el.style.display === 'none' || el.style.display === '') el.style.display = 'block'; else el.style.display='none';
}
</script>
</body>
</html>
