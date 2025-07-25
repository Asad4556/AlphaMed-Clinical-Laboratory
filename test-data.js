// Sample Test List
const testCatalog = [
  {
    name: "CBC (Complete Blood Count)",
    male: "4.5-5.5 million cells/mcL",
    female: "4.1-5.1 million cells/mcL",
  },
  {
    name: "Blood Sugar (Fasting)",
    male: "70-100 mg/dL",
    female: "70-100 mg/dL",
  },
  {
    name: "Liver Function Test (LFT)",
    male: "7-56 U/L",
    female: "7-56 U/L",
  },
  {
    name: "Kidney Function Test (KFT)",
    male: "0.6-1.2 mg/dL",
    female: "0.5-1.1 mg/dL",
  },
  {
    name: "Thyroid Profile",
    male: "0.4-4.0 mIU/L",
    female: "0.4-4.0 mIU/L",
  },
  {
    name: "Cholesterol",
    male: "< 200 mg/dL",
    female: "< 200 mg/dL",
  },
  {
    name: "Vitamin D",
    male: "20-50 ng/mL",
    female: "20-50 ng/mL",
  },
  {
    name: "Hemoglobin",
    male: "13.5-17.5 g/dL",
    female: "12.0-15.5 g/dL",
  },
  {
    name: "Uric Acid",
    male: "3.4-7.0 mg/dL",
    female: "2.4-6.0 mg/dL",
  }
];

// Store to localStorage if not already
if (!localStorage.getItem("testCatalog")) {
  localStorage.setItem("testCatalog", JSON.stringify(testCatalog));
}
