// script.js - General app functionality (login, registration, etc.)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // 🔹 Login System
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find(
        (u) => u.username === username && u.password === password && u.role === role
      );

      if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        if (role === "admin") {
          window.location.href = "admin_dashboard.html";
        } else if (role === "reception") {
          window.location.href = "reception_dashboard.html";
        } else if (role === "technician") {
          window.location.href = "technician_dashboard.html";
        } else if (role === "patient") {
          window.location.href = "patient_dashboard.html";
        }
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // 🔹 Registration System
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newUser = {
        username: document.getElementById("reg_username").value.trim(),
        password: document.getElementById("reg_password").value.trim(),
        role: document.getElementById("reg_role").value,
      };

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((u) => u.username === newUser.username)) {
        alert("Username already exists!");
        return;
      }

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // 🔹 Logout function
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});
