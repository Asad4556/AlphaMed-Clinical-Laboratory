// script.js

// 🛡️ مخصوص کردار (role) کی بنیاد پر غیر مجاز رسائی روکنے کا فنکشن
function restrictAccess(expectedRole) {
  const role = localStorage.getItem("loggedInRole");
  if (role !== expectedRole) {
    alert("آپ کے پاس اس صفحے تک رسائی کی اجازت نہیں ہے۔");
    window.location.href = "login.html"; // لاگ اِن صفحے پر ری ڈائریکٹ کریں
  }
}

// 🔐 لاگ آؤٹ فنکشن (تمام صفحوں پر استعمال کیا جا سکتا ہے)
function logout() {
  localStorage.removeItem("loggedInUser"); // صارف کا ڈیٹا ختم کریں
  localStorage.removeItem("loggedInRole"); // کردار ختم کریں
  window.location.href = "login.html";     // لاگ اِن صفحے پر واپس جائیں
}

// 📆 موجودہ تاریخ اور وقت کو فارمیٹ کرنے والا فنکشن
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString() + " " + now.toLocaleTimeString(); // دن + وقت
}

// 🕓 کسی HTML عنصر میں تاریخ ظاہر کرنے کا فنکشن (جس کا ID "currentDate" ہو)
function displayCurrentDate() {
  const el = document.getElementById("currentDate");
  if (el) {
    el.innerText = getFormattedDate();
  }
}

// 📌 صفحہ مکمل لوڈ ہونے کے بعد تاریخ ظاہر کریں
document.addEventListener("DOMContentLoaded", () => {
  displayCurrentDate();
});
