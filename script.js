// script.js

// Restrict unauthorized access based on role
function restrictAccess(expectedRole) {
  const role = localStorage.getItem("loggedInRole");
  if (role !== expectedRole) {
    alert("آپ کے پاس اس صفحے تک رسائی کی اجازت نہیں ہے۔");
    window.location.href = "login.html";
  }
}

// Logout function (can be reused across all pages)
function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("loggedInRole");
  window.location.href = "login.html";
}

// Format current date (for slips, reports, etc.)
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

// Example: Inject current date into any element with ID "currentDate"
function displayCurrentDate() {
  const el = document.getElementById("currentDate");
  if (el) {
    el.innerText = getFormattedDate();
  }
}

// Call on page load if needed
document.addEventListener("DOMContentLoaded", () => {
  displayCurrentDate();
});
