<?php
// login.php
require_once 'config.php';
session_start();
$msg = '';
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :u LIMIT 1");
    $stmt->execute([':u'=>$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if($user && password_verify($password, $user['password']) && $user['active']) {
        // login
        $_SESSION['user'] = [
            'id'=>$user['id'],
            'username'=>$user['username'],
            'role'=>$user['role'],
            'name'=>$user['name']
        ];
        // redirect by role
        if($user['role']=='admin') header("Location: admin.php");
        if($user['role']=='reception') header("Location: reception.php");
        if($user['role']=='technician') header("Location: technician.php");
        exit;
    } else {
        $msg = "Invalid credentials or inactive account.";
    }
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Login - AlphaMed</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <div class="login-box">
    <img src="<?php echo e($LOGO_PATH); ?>" alt="logo" style="max-width:120px;">
    <h2>AlphaMed - Login</h2>
    <?php if($msg):?><p class="error"><?php echo e($msg);?></p><?php endif;?>
    <form method="post">
      <label>Username</label>
      <input name="username" required>
      <label>Password</label>
      <input name="password" type="password" required>
      <button type="submit">Login</button>
    </form>
    <p>Admin example: <strong>34501-8971113-7</strong> / <strong>Asad@2723</strong></p>
  </div>
</body>
</html>
