// qr-generator.js

/**
 * Generates a QR Code for patient data
 * @param {string} elementId - The DOM element ID where the QR code should appear
 * @param {object} patientData - Patient object containing data to encode
 */
function generatePatientQRCode(elementId, patientData) {
  const { name, cnic, mrn, test, date } = patientData;

  const qrContent = `
Alpha Med Clinical Laboratory

Patient Name: ${name}
CNIC: ${cnic}
MRN: ${mrn}
Test: ${test}
Date: ${date}

View Online: https://yourdomain.com/report.html?mrn=${mrn}
  `.trim();

  const qrContainer = document.getElementById(elementId);
  qrContainer.innerHTML = ""; // Clear previous QR if any

  new QRCode(qrContainer, {
    text: qrContent,
    width: 160,
    height: 160,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
