<?php
require_once 'functions.php';
session_start();
if(!is_logged_in()) { header("Location: login.php"); exit; }
$user = current_user();
if($user['role']!='admin') die("Access denied.");

require_once 'config.php';

// handle simple actions: list users, toggle active, add user (simplified)
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    if($action==='add_user') {
        $uname = trim($_POST['username']);
        $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $role = $_POST['role'];
        $name = $_POST['name'];
        $stmt = $db->prepare("INSERT INTO users (username,password,role,name) VALUES (:u,:p,:r,:n)");
        $stmt->execute([':u'=>$uname,':p'=>$pass,':r'=>$role,':n'=>$name]);
    } elseif ($action==='toggle_user') {
        $uid = (int)$_POST['user_id'];
        $current = $db->query("SELECT active FROM users WHERE id = $uid")->fetchColumn();
        $db->exec("UPDATE users SET active = " . ($current?0:1) . " WHERE id = $uid");
    } elseif ($action==='delete_user') {
        $uid = (int)$_POST['user_id'];
        $db->exec("DELETE FROM users WHERE id = $uid");
    }
}

// fetch lists
$users = $db->query("SELECT id,username,role,name,active FROM users")->fetchAll(PDO::FETCH_ASSOC);
$departments = $db->query("SELECT * FROM departments")->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Admin - AlphaMed</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <header>
    <img src="<?php echo e($LOGO_PATH);?>" style="height:50px;">
    <h1>Admin Dashboard</h1>
    <a href="logout.php">Logout</a>
  </header>
  <main>
    <section>
      <h2>Users</h2>
      <table>
        <tr><th>ID</th><th>Username</th><th>Name</th><th>Role</th><th>Active</th><th>Action</th></tr>
        <?php foreach($users as $u):?>
          <tr>
            <td><?php echo e($u['id']);?></td>
            <td><?php echo e($u['username']);?></td>
            <td><?php echo e($u['name']);?></td>
            <td><?php echo e($u['role']);?></td>
            <td><?php echo $u['active']? 'Yes':'No';?></td>
            <td>
              <form method="post" style="display:inline">
                <input type="hidden" name="user_id" value="<?php echo e($u['id']);?>">
                <input type="hidden" name="action" value="toggle_user">
                <button type="submit"><?php echo $u['active']? 'Disable':'Enable';?></button>
              </form>
              <form method="post" style="display:inline" onsubmit="return confirm('Delete user?')">
                <input type="hidden" name="user_id" value="<?php echo e($u['id']);?>">
                <input type="hidden" name="action" value="delete_user">
                <button type="submit">Delete</button>
              </form>
            </td>
          </tr>
        <?php endforeach;?>
      </table>

      <h3>Add User</h3>
      <form method="post">
        <input type="text" name="username" placeholder="username" required>
        <input type="text" name="name" placeholder="Full name" required>
        <select name="role">
          <option value="reception">Reception</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
        </select>
        <input type="password" name="password" required>
        <input type="hidden" name="action" value="add_user">
        <button type="submit">Add User</button>
      </form>
    </section>

    <section>
      <h2>Departments / Tests</h2>
      <ul>
        <?php foreach($departments as $d):?>
          <li><?php echo e($d['name']);?> - <a href="admin_tests.php?dept=<?php echo e($d['id']);?>">Manage Tests</a></li>
        <?php endforeach;?>
      </ul>
    </section>
  </main>
</body>
</html>
