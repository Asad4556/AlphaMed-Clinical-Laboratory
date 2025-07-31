const labDepartments = [
  {
    name: "Hematology / Coagulation",
    tests: [
      {
        name: "Complete Blood Count (CBC)",
        parameters: [
          { name: "WBC", range: "4.0–11.0", unit: "×10³/µL" },
          { name: "RBC", range: "4.5–6.0", unit: "×10⁶/µL" },
          { name: "Hemoglobin", range: "13–17", unit: "g/dL" },
          { name: "Hematocrit", range: "40–50", unit: "%" },
          { name: "Platelets", range: "150–400", unit: "×10³/µL" },
          { name: "MCV", range: "80–100", unit: "fL" },
          { name: "MCH", range: "27–33", unit: "pg" },
          { name: "MCHC", range: "32–36", unit: "g/dL" }
        ]
      },
      {
        name: "ESR",
        parameters: [
          { name: "ESR", range: "0–20", unit: "mm/hr" }
        ]
      },
      {
        name: "PT / INR",
        parameters: [
          { name: "PT", range: "10–14", unit: "sec" },
          { name: "INR", range: "0.8–1.2", unit: "" }
        ]
      },
      {
        name: "APTT",
        parameters: [
          { name: "APTT", range: "25–35", unit: "sec" }
        ]
      }
    ]
  },
  {
    name: "Biochemistry / Metabolic Panels",
    tests: [
      {
        name: "Liver Function Test (LFT)",
        parameters: [
          { name: "ALT", range: "7–56", unit: "U/L" },
          { name: "AST", range: "5–40", unit: "U/L" },
          { name: "ALP", range: "44–147", unit: "U/L" },
          { name: "Bilirubin Total", range: "<1.2", unit: "mg/dL" },
          { name: "Bilirubin Direct", range: "<0.3", unit: "mg/dL" },
          { name: "Albumin", range: "3.5–5.0", unit: "g/dL" }
        ]
      },
      {
        name: "Renal Function Test (RFT)",
        parameters: [
          { name: "Urea", range: "10–50", unit: "mg/dL" },
          { name: "Creatinine", range: "0.6–1.3", unit: "mg/dL" },
          { name: "Uric Acid", range: "3.5–7.2", unit: "mg/dL" }
        ]
      },
      {
        name: "Lipid Profile",
        parameters: [
          { name: "Total Cholesterol", range: "<200", unit: "mg/dL" },
          { name: "HDL", range: ">40", unit: "mg/dL" },
          { name: "LDL", range: "<100", unit: "mg/dL" },
          { name: "Triglycerides", range: "<150", unit: "mg/dL" }
        ]
      },
      {
        name: "Blood Glucose",
        parameters: [
          { name: "Fasting", range: "70–100", unit: "mg/dL" },
          { name: "Random", range: "<140", unit: "mg/dL" }
        ]
      },
      {
        name: "Electrolytes",
        parameters: [
          { name: "Sodium", range: "135–145", unit: "mmol/L" },
          { name: "Potassium", range: "3.5–5.0", unit: "mmol/L" },
          { name: "Chloride", range: "98–106", unit: "mmol/L" },
          { name: "Bicarbonate", range: "22–28", unit: "mmol/L" }
        ]
      }
    ]
  },
  {
    name: "Serology / Immunology",
    tests: [
      { name: "HBsAg", parameters: [{ name: "Result", range: "Negative", unit: "" }] },
      { name: "Anti-HCV", parameters: [{ name: "Result", range: "Negative", unit: "" }] },
      { name: "HIV", parameters: [{ name: "Result", range: "Non-reactive", unit: "" }] },
      { name: "CRP", parameters: [{ name: "CRP", range: "<6", unit: "mg/L" }] },
      { name: "Dengue IgM/IgG", parameters: [{ name: "Result", range: "Negative", unit: "" }] }
    ]
  },
  {
    name: "Hormones / Special Chemistry",
    tests: [
      {
        name: "Thyroid Panel (T3 T4 TSH)",
        parameters: [
          { name: "TSH", range: "0.4–4.0", unit: "mIU/L" },
          { name: "T3", range: "80–200", unit: "ng/dL" },
          { name: "T4", range: "5.1–14.1", unit: "µg/dL" }
        ]
      },
      { name: "Vitamin D", parameters: [{ name: "Vitamin D", range: "30–100", unit: "ng/mL" }] },
      { name: "Ferritin", parameters: [{ name: "Ferritin", range: "30–300", unit: "ng/mL" }] },
      { name: "Insulin", parameters: [{ name: "Insulin", range: "2–25", unit: "µIU/mL" }] },
      { name: "Cortisol", parameters: [{ name: "Cortisol", range: "6–23", unit: "µg/dL" }] }
    ]
  },
  {
    name: "Microbiology / Culture",
    tests: [
      { name: "Urine Culture", parameters: [{ name: "Result", range: "No Growth", unit: "" }] },
      { name: "Blood Culture", parameters: [{ name: "Result", range: "No Growth", unit: "" }] },
      { name: "Throat Swab", parameters: [{ name: "Result", range: "No Pathogen", unit: "" }] }
    ]
  },
  {
    name: "Molecular Biology / PCR",
    tests: [
      { name: "COVID-19 PCR", parameters: [{ name: "Result", range: "Negative", unit: "" }] },
      { name: "HCV RNA PCR", parameters: [{ name: "Result", range: "Undetected", unit: "IU/mL" }] },
      { name: "HBV DNA PCR", parameters: [{ name: "Result", range: "Undetected", unit: "IU/mL" }] }
    ]
  },
  {
    name: "Blood Banking",
    tests: [
      { name: "Blood Group", parameters: [{ name: "Group", range: "A/B/AB/O", unit: "" }] },
      { name: "Rh Factor", parameters: [{ name: "Rh", range: "Positive/Negative", unit: "" }] },
      { name: "Crossmatch", parameters: [{ name: "Result", range: "Compatible/Incompatible", unit: "" }] }
    ]
  },
  {
    name: "Histopathology / Cytology",
    tests: [
      { name: "Biopsy", parameters: [{ name: "Diagnosis", range: "Benign/Malignant", unit: "" }] },
      { name: "Pap Smear", parameters: [{ name: "Result", range: "Normal/Abnormal", unit: "" }] }
    ]
  },
  {
    name: "Urine / Stool Analysis",
    tests: [
      {
        name: "Urine D/R",
        parameters: [
          { name: "Color", range: "Yellow", unit: "" },
          { name: "Appearance", range: "Clear", unit: "" },
          { name: "pH", range: "4.5–8.0", unit: "" },
          { name: "Protein", range: "Negative", unit: "" },
          { name: "Sugar", range: "Negative", unit: "" }
        ]
      },
      {
        name: "Stool D/R",
        parameters: [
          { name: "Color", range: "Brown", unit: "" },
          { name: "Consistency", range: "Formed", unit: "" },
          { name: "Occult Blood", range: "Negative", unit: "" },
          { name: "Ova/Parasite", range: "None", unit: "" }
        ]
      }
    ]
  }
];
