const labSections = [
  {
    id: "hematology",
    name: "Hematology",
    tests: [
      { name: "Complete Blood Count (CBC)", normalRange: "WBC: 4.5-11 x10^9/L, RBC: 4.7–6.1 million/mcL" },
      { name: "Hemoglobin (Hb)", normalRange: "Male: 13.8–17.2 g/dL, Female: 12.1–15.1 g/dL" },
      { name: "Hematocrit (HCT)", normalRange: "Male: 40.7–50.3%, Female: 36.1–44.3%" },
      { name: "WBC Count", normalRange: "4.5–11 x10^9/L" },
      { name: "Platelet Count", normalRange: "150–450 x10^9/L" },
      { name: "ESR", normalRange: "Male: 0–15 mm/hr, Female: 0–20 mm/hr" },
      { name: "Red Cell Indices", normalRange: "MCV: 80–96 fL, MCH: 27–33 pg" },
      { name: "Peripheral Blood Smear", normalRange: "Normal morphology" },
      { name: "Reticulocyte Count", normalRange: "0.5–2.5%" }
    ]
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    tests: [
      { name: "Blood Glucose (Fasting)", normalRange: "70–99 mg/dL" },
      { name: "Blood Glucose (Random)", normalRange: "< 140 mg/dL" },
      { name: "Urea", normalRange: "7–20 mg/dL" },
      { name: "Creatinine", normalRange: "Male: 0.7–1.3, Female: 0.6–1.1 mg/dL" },
      { name: "Cholesterol", normalRange: "< 200 mg/dL" },
      { name: "Triglycerides", normalRange: "< 150 mg/dL" },
      { name: "HDL", normalRange: "> 40 mg/dL" },
      { name: "LDL", normalRange: "< 100 mg/dL" },
      { name: "Liver Function Test (ALT)", normalRange: "7–56 U/L" },
      { name: "Bilirubin (Total)", normalRange: "0.3–1.2 mg/dL" }
    ]
  },
  {
    id: "serology",
    name: "Serology",
    tests: [
      { name: "HBsAg", normalRange: "Negative" },
      { name: "Anti-HCV", normalRange: "Negative" },
      { name: "HIV I & II", normalRange: "Non-reactive" },
      { name: "Widal Test", normalRange: "<1:80" },
      { name: "VDRL", normalRange: "Non-reactive" },
      { name: "RA Factor", normalRange: "< 14 IU/mL" },
      { name: "ASO Titre", normalRange: "< 200 IU/mL" },
      { name: "CRP", normalRange: "< 3 mg/L" }
    ]
  },
  {
    id: "microbiology",
    name: "Microbiology",
    tests: [
      { name: "Urine C/S", normalRange: "No growth after 48 hours" },
      { name: "Blood Culture", normalRange: "No growth" },
      { name: "Sputum Culture", normalRange: "No pathogenic organisms" },
      { name: "Throat Swab", normalRange: "Normal flora" },
      { name: "Gram Staining", normalRange: "No pathogens" }
    ]
  },
  {
    id: "special-chemistry",
    name: "Special Chemistry",
    tests: [
      { name: "HbA1c", normalRange: "< 5.7%" },
      { name: "Vitamin D", normalRange: "30–100 ng/mL" },
      { name: "Vitamin B12", normalRange: "200–900 pg/mL" },
      { name: "TSH", normalRange: "0.4–4.0 µIU/mL" },
      { name: "Free T3", normalRange: "2.3–4.2 pg/mL" },
      { name: "Free T4", normalRange: "0.8–1.8 ng/dL" }
    ]
  },
  {
    id: "molecular-biology",
    name: "Molecular Biology",
    tests: [
      { name: "COVID-19 PCR", normalRange: "Negative" },
      { name: "HCV RNA PCR", normalRange: "Not Detected" },
      { name: "HBV DNA PCR", normalRange: "Not Detected" },
      { name: "MTB PCR", normalRange: "Negative" }
    ]
  }
];

// Export for Node.js if needed
if (typeof module !== "undefined") {
  module.exports = labSections;
}
