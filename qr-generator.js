/**
 * Generates a QR Code for patient data
 * @param {string} elementId - The DOM element ID where the QR code should appear
 * @param {object} patientData - Patient object containing data to encode
 * Required fields: name, cnic, mrn, test, date
 */
function generatePatientQRCode(elementId, patientData) {
  if (!elementId || !patientData || typeof patientData !== 'object') {
    console.error("Invalid parameters for generatePatientQRCode");
    return;
  }

  const {
    name = "N/A",
    cnic = "N/A",
    mrn = "N/A",
    test = "N/A",
    date = "N/A"
  } = patientData;

  const qrContent = [
    "Alpha Med Clinical Laboratory",
    "",
    `Patient Name: ${name}`,
    `CNIC: ${cnic}`,
    `MRN: ${mrn}`,
    `Test: ${test}`,
    `Date: ${date}`,
    "",
    `View Online: https://yourdomain.com/report.html?mrn=${encodeURIComponent(mrn)}`
  ].join('\n');

  const qrContainer = document.getElementById(elementId);
  if (!qrContainer) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  // Clear previous QR if exists
  qrContainer.innerHTML = "";

  // Generate QR code
  new QRCode(qrContainer, {
    text: qrContent,
    width: 160,
    height: 160,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
