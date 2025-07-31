const form = document.getElementById("patientForm");
const list = document.getElementById("patientList");
const container = document.getElementById("labSectionContainer");

let patients = [];
let mrnCounter = 1;

// labSections.js سے لیب ڈیٹا لوڈ کریں
window.addEventListener("DOMContentLoaded", () => {
  labDepartments.forEach((dept, index) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "border rounded p-3";

    const title = document.createElement("h3");
    title.textContent = dept.name;
    title.className = "font-bold text-blue-700 mb-2";

    sectionDiv.appendChild(title);

    dept.tests.forEach(test => {
      const label = document.createElement("label");
      label.className = "block";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = test.name;
      checkbox.className = "mr-2";

      label.appendChild(checkbox);
      label.append(test.name);
      sectionDiv.appendChild(label);
    });

    container.appendChild(sectionDiv);
  });
});

// فارم سبمٹ
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("patientName").value;
  const cnic = document.getElementById("patientCNIC").value;
  const sampleNumber = document.getElementById("sampleNumber").value;

  const mrn = "MRN" + String(mrnCounter).padStart(3, "0"); // MRN001, MRN002
  mrnCounter++;

  const selectedTests = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(cb => cb.value);

  if (selectedTests.length === 0) {
    alert("براہ کرم کم از کم ایک ٹیسٹ منتخب کریں۔");
    return;
  }

  patients.push({ name, cnic, mrn, sampleNumber, selectedTests });

  renderList();
  form.reset();
});

function renderList() {
  list.innerHTML = "";
  patients.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border px-2 py-1">${p.name}</td>
      <td class="border px-2 py-1">${p.cnic}</td>
      <td class="border px-2 py-1">${p.mrn}</td>
      <td class="border px-2 py-1">${p.sampleNumber}</td>
      <td class="border px-2 py-1">${p.selectedTests.join(", ")}</td>
    `;
    list.appendChild(tr);
  });
}
