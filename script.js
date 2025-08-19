/*******************************
 * User Management & Login
 *******************************/

// LocalStorage mein users ko save karna
let users = JSON.parse(localStorage.getItem("users")) || [];

// Default admin user (agar koi na ho)
if (users.length === 0) {
  users.push({ username: "admin", password: "admin123", role: "admin" });
  localStorage.setItem("users", JSON.stringify(users));
}

// Register New User
function registerUser(username, password, role = "user") {
  if (!username || !password) {
    alert("Please enter username and password!");
    return false;
  }

  let exists = users.find(u => u.username === username);
  if (exists) {
    alert("User already exists!");
    return false;
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User created successfully!");
  return true;
}

// Login Function
function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("login-error");

  if (!username || !password) {
    errorDiv.textContent = "Please enter username and password";
    return;
  }

  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Save logged in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect based on role
    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "reception_dashboard.html";
    }
  } else {
    errorDiv.textContent = "Invalid username or password!";
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/*******************************
 * Password Toggle
 *******************************/
function togglePassword() {
  let pass = document.getElementById("password");
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
}

/*******************************
 * Session Check (Auth Guard)
 *******************************/
function checkAuth(requiredRole = null) {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert("Access Denied!");
    window.location.href = "login.html";
  }
}

/*******************************
 * Utility: Show current user
 *******************************/
function showCurrentUser() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    let el = document.getElementById("current-user");
    if (el) el.textContent = `Logged in as: ${user.username} (${user.role})`;
  }
}
