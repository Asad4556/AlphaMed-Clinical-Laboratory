// Fixed Admin Credentials
const adminCredentials = {
  cnic: "34501-8971113-7",
  password: "Asad@2723"
};

// Login Function
function login() {
  const cnic = document.getElementById("cnic").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (cnic === adminCredentials.cnic && password === adminCredentials.password) {
    // Save session info
    localStorage.setItem("loggedInUser", "admin");
    window.location.href = "admin-dashboard.html";
  } else {
    error.textContent = "Invalid CNIC or Password!";
  }
}

// Password Show/Hide
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-password");
  const passwordField = document.getElementById("password");

  toggle.addEventListener("click", () => {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggle.textContent = "🙈";
    } else {
      passwordField.type = "password";
      toggle.textContent = "👁️";
    }
  });
});
