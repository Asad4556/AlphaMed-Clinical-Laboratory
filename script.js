// -----------------------------
// Basic Login System
// -----------------------------

const users = [
  { cnic: "34501-8971113-7", password: "Asad@2723", role: "admin" },
  { cnic: "12345-1234567-1", password: "tech@123", role: "technician" },
  { cnic: "54321-7654321-1", password: "reception@123", role: "reception" }
];

// Login Function
function login() {
  const cnic = document.getElementById("cnic").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.cnic === cnic && u.password === password);

  if (user) {
    localStorage.setItem("loggedIn", JSON.stringify(user));
    if (user.role === "admin") {
      window.location.href = "admin_dashboard.html";
    } else if (user.role === "technician") {
      window.location.href = "technician_dashboard.html";
    } else if (user.role === "reception") {
      window.location.href = "reception_dashboard.html";
    }
  } else {
    alert("CNIC یا پاسورڈ غلط ہے");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Show Password
function togglePassword() {
  const field = document.getElementById("password");
  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
}

// Protect Dashboard Pages
function checkAuth(role) {
  const user = JSON.parse(localStorage.getItem("loggedIn"));
  if (!user || user.role !== role) {
    window.location.href = "login.html";
  }
}

// Change Password
function changePassword() {
  const oldPass = document.getElementById("oldPass").value.trim();
  const newPass = document.getElementById("newPass").value.trim();

  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  const userIndex = users.findIndex(u => u.cnic === loggedIn.cnic && u.password === oldPass);

  if (userIndex >= 0) {
    users[userIndex].password = newPass;
    alert("پاسورڈ تبدیل ہو گیا ✅");
    logout();
  } else {
    alert("پرانا پاسورڈ غلط ہے");
  }
}
