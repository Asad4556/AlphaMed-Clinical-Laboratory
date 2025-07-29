// test-data.js

// Check if labSections is already stored
if (!localStorage.getItem("labSections")) {
  const labSections = {
    "Hematology": [
      { test: "CBC", normalMale: "4.5-6.0", normalFemale: "4.0-5.5" },
      { test: "ESR", normalMale: "0-15 mm/hr", normalFemale: "0-20 mm/hr" },
      { test: "Platelet Count", normalMale: "150-450 x10^3/uL", normalFemale: "150-450 x10^3/uL" },
      { test: "Reticulocyte Count", normalMale: "0.5-2.5%", normalFemale: "0.5-2.5%" },
      { test: "BT/CT", normalMale: "BT: 2-5 min / CT: 3-10 min", normalFemale: "BT: 2-5 min / CT: 3-10 min" }
    ],
    "Biochemistry": [
      { test: "Glucose (Fasting)", normalMale: "70-110 mg/dL", normalFemale: "70-110 mg/dL" },
      { test: "Glucose (Random)", normalMale: "80-140 mg/dL", normalFemale: "80-140 mg/dL" },
      { test: "Urea", normalMale: "10-50 mg/dL", normalFemale: "10-50 mg/dL" },
      { test: "Creatinine", normalMale: "0.7-1.3 mg/dL", normalFemale: "0.6-1.1 mg/dL" },
      { test: "Uric Acid", normalMale: "3.4-7.0 mg/dL", normalFemale: "2.4-6.0 mg/dL" },
      { test: "Cholesterol", normalMale: "<200 mg/dL", normalFemale: "<200 mg/dL" },
      { test: "Triglycerides", normalMale: "<150 mg/dL", normalFemale: "<150 mg/dL" },
      { test: "HDL", normalMale: ">40 mg/dL", normalFemale: ">50 mg/dL" },
      { test: "LDL", normalMale: "<130 mg/dL", normalFemale: "<130 mg/dL" }
    ],
    "Liver Function Tests (LFT)": [
      { test: "ALT (SGPT)", normalMale: "7-56 U/L", normalFemale: "7-56 U/L" },
      { test: "AST (SGOT)", normalMale: "10-40 U/L", normalFemale: "10-40 U/L" },
      { test: "ALP", normalMale: "40-129 U/L", normalFemale: "35-104 U/L" },
      { test: "Bilirubin Total", normalMale: "0.1-1.2 mg/dL", normalFemale: "0.1-1.2 mg/dL" },
      { test: "Albumin", normalMale: "3.4-5.4 g/dL", normalFemale: "3.4-5.4 g/dL" }
    ],
    "Renal Function Tests (RFT)": [
      { test: "Blood Urea", normalMale: "10-50 mg/dL", normalFemale: "10-50 mg/dL" },
      { test: "Serum Creatinine", normalMale: "0.7-1.3 mg/dL", normalFemale: "0.6-1.1 mg/dL" },
      { test: "Uric Acid", normalMale: "3.4-7.0 mg/dL", normalFemale: "2.4-6.0 mg/dL" }
    ],
    "Thyroid Profile": [
      { test: "TSH", normalMale: "0.4-4.0 mIU/L", normalFemale: "0.4-4.0 mIU/L" },
      { test: "Free T3", normalMale: "2.3-4.2 pg/mL", normalFemale: "2.3-4.2 pg/mL" },
      { test: "Free T4", normalMale: "0.8-1.8 ng/dL", normalFemale: "0.8-1.8 ng/dL" }
    ],
    "Urine Examination": [
      { test: "Urine R/E", normalMale: "Normal", normalFemale: "Normal" },
      { test: "Urine Culture", normalMale: "No Growth", normalFemale: "No Growth" }
    ],
    "Stool Examination": [
      { test: "Stool R/E", normalMale: "Normal", normalFemale: "Normal" },
      { test: "Stool Culture", normalMale: "No Growth", normalFemale: "No Growth" }
    ],
    "Microbiology": [
      { test: "Blood Culture", normalMale: "No Growth", normalFemale: "No Growth" },
      { test: "Urine Culture", normalMale: "No Growth", normalFemale: "No Growth" },
      { test: "Sputum Culture", normalMale: "No Growth", normalFemale: "No Growth" },
      { test: "Wound Swab", normalMale: "No Growth", normalFemale: "No Growth" }
    ],
    "Immunology": [
      { test: "CRP", normalMale: "<6 mg/L", normalFemale: "<6 mg/L" },
      { test: "RF", normalMale: "<20 IU/mL", normalFemale: "<20 IU/mL" },
      { test: "ANA", normalMale: "Negative", normalFemale: "Negative" }
    ],
    "Serology": [
      { test: "HCV", normalMale: "Negative", normalFemale: "Negative" },
      { test: "HBsAg", normalMale: "Negative", normalFemale: "Negative" },
      { test: "HIV", normalMale: "Negative", normalFemale: "Negative" },
      { test: "Widal Test", normalMale: "<1:80", normalFemale: "<1:80" },
      { test: "Typhidot IgM/IgG", normalMale: "Negative", normalFemale: "Negative" }
    ],
    "PCR & Molecular": [
      { test: "COVID-19 PCR", normalMale: "Negative", normalFemale: "Negative" },
      { test: "HCV PCR", normalMale: "Undetected", normalFemale: "Undetected" },
      { test: "HBV PCR", normalMale: "Undetected", normalFemale: "Undetected" },
      { test: "TB PCR", normalMale: "Undetected", normalFemale: "Undetected" },
      { test: "CMV PCR", normalMale: "Undetected", normalFemale: "Undetected" }
    ]
  };

  // Save to localStorage
  localStorage.setItem("labSections", JSON.stringify(labSections));
}
