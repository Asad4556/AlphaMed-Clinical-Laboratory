// ========= QR Code Generation ==========
function generateQRCode(text, canvasId = "qrCode") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  canvas.innerHTML = "";
  QRCode.toCanvas(text, { width: 128 }, function (err, c) {
    if (!err) canvas.appendChild(c);
  });
}

// ========= Form Validation ==========
function validateForm(requiredFields) {
  let isValid = true;
  requiredFields.forEach((id) => {
    const field = document.getElementById(id);
    if (field && field.value.trim() === "") {
      field.classList.add("border-red-500");
      isValid = false;
    } else if (field) {
      field.classList.remove("border-red-500");
    }
  });
  return isValid;
}

// ========= WhatsApp Message ==========
function sendWhatsAppMessage(number, message) {
  const phone = number.replace(/\D/g, ""); // Remove non-digits
  const text = encodeURIComponent(message);
  const url = `https://wa.me/92${phone}?text=${text}`;
  window.open(url, "_blank");
}

// ========= CSV Export ==========
function exportTableToCSV(tableId, filename = "export.csv") {
  const table = document.getElementById(tableId);
  if (!table) return;

  let csv = [];
  const rows = table.querySelectorAll("tr");
  rows.forEach((row) => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols).map(col => `"${col.innerText}"`).join(",");
    csv.push(rowData);
  });

  // Download CSV
  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ========= Toast Alert ==========
function showToast(message, type = "info") {
  const color = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  }[type];

  const toast = document.createElement("div");
  toast.className = `fixed bottom-5 right-5 ${color} text-white px-4 py-2 rounded shadow z-50`;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// ========= Age Calculator ==========
function calculateAge(dob) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
