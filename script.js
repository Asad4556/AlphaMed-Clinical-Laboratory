// ========= QR Code Generation ==========
function generateQRCode(text, canvasId = "qrCode") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  QRCode.toCanvas(text, { width: 128 })
    .then((canvasElement) => {
      canvas.innerHTML = ""; // Clear previous content
      canvas.appendChild(canvasElement);
    })
    .catch((err) => {
      console.error("QR Code generation failed:", err);
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
      showToast(`${field.name || "Field"} is required.`, "error"); // Error message
    } else if (field) {
      field.classList.remove("border-red-500");
    }
  });
  return isValid;
}

// ========= WhatsApp Message ==========
function sendWhatsAppMessage(number, message) {
  const phone = number.replace(/\D/g, ""); // Remove non-digits
  if (phone.length < 10) {
    showToast("Invalid phone number", "error");  // Show error if phone number is invalid
    return;
  }
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank");
}

// ========= CSV Export ==========
function exportTableToCSV(selector, filename = "export.csv") {
  const table = document.querySelector(selector);
  if (!table) return;

  let csv = [];
  const rows = table.querySelectorAll("tr");
  
  rows.forEach((row, index) => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols).map(col => `"${col.innerText.trim()}"`).join(",");
    csv.push(rowData);
    
    if (index === 0) {
      csv.push("\n"); // Add line break after header row
    }
  });

  // Download CSV
  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ========= Toast Alert ==========
function showToast(message, type = "info", duration = 3000) {
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

  setTimeout(() => toast.remove(), duration);
}

// ========= Age Calculator ==========
function calculateAge(dob) {
  if (!dob) {
    showToast("Invalid Date of Birth", "error");
    return "N/A";
  }

  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
