const labSections = {
  "Hematology": [
    { test: "Complete Blood Count (CBC)", normalMale: "4.5–5.9 million/µL", normalFemale: "4.1–5.1 million/µL" },
    { test: "ESR", normalMale: "0–15 mm/hr", normalFemale: "0–20 mm/hr" },
    { test: "Platelet Count", normalMale: "150–400 ×10^3/µL", normalFemale: "150–400 ×10^3/µL" },
    { test: "PT/INR", normalMale: "PT: 10–13s", normalFemale: "PT: 10–13s" },
    { test: "aPTT", normalMale: "25–40s", normalFemale: "25–40s" },
    { test: "Reticulocyte Count", normalMale: "0.5–2.5%", normalFemale: "0.5–2.5%" },
    { test: "Peripheral Smear", normalMale: "-", normalFemale: "-" }
  ],

  "Clinical Chemistry": [
    { test: "Blood Glucose (Fasting)", normalMale: "70–100 mg/dL", normalFemale: "70–100 mg/dL" },
    { test: "Blood Glucose (Random)", normalMale: "<140 mg/dL", normalFemale: "<140 mg/dL" },
    { test: "Urea", normalMale: "15–40 mg/dL", normalFemale: "15–40 mg/dL" },
    { test: "Creatinine", normalMale: "0.6–1.2 mg/dL", normalFemale: "0.5–1.1 mg/dL" },
    { test: "Uric Acid", normalMale: "3.4–7.0 mg/dL", normalFemale: "2.4–6.0 mg/dL" },
    { test: "SGPT (ALT)", normalMale: "10–40 IU/L", normalFemale: "10–40 IU/L" },
    { test: "SGOT (AST)", normalMale: "10–40 IU/L", normalFemale: "10–40 IU/L" },
    { test: "ALP", normalMale: "30–120 IU/L", normalFemale: "30–120 IU/L" },
    { test: "Total Bilirubin", normalMale: "0.3–1.2 mg/dL", normalFemale: "0.3–1.2 mg/dL" },
    { test: "Cholesterol", normalMale: "<200 mg/dL", normalFemale: "<200 mg/dL" },
    { test: "HDL", normalMale: ">40 mg/dL", normalFemale: ">50 mg/dL" },
    { test: "LDL", normalMale: "<100 mg/dL", normalFemale: "<100 mg/dL" },
    { test: "Triglycerides", normalMale: "<150 mg/dL", normalFemale: "<150 mg/dL" }
  ],

  "Microbiology & Serology": [
    { test: "Urine Culture", normalMale: "No growth", normalFemale: "No growth" },
    { test: "Stool Culture", normalMale: "No pathogens", normalFemale: "No pathogens" },
    { test: "Widal Test", normalMale: "Negative", normalFemale: "Negative" },
    { test: "HBsAg", normalMale: "Negative", normalFemale: "Negative" },
    { test: "Anti-HCV", normalMale: "Negative", normalFemale: "Negative" },
    { test: "HIV I/II", normalMale: "Negative", normalFemale: "Negative" },
    { test: "RPR (Syphilis)", normalMale: "Non-reactive", normalFemale: "Non-reactive" }
  ],

  "Immunology & Blood Bank": [
    { test: "Blood Grouping (ABO & Rh)", normalMale: "O+, A+, B+, AB+", normalFemale: "O+, A+, B+, AB+" },
    { test: "Coombs Test (Direct)", normalMale: "Negative", normalFemale: "Negative" },
    { test: "Coombs Test (Indirect)", normalMale: "Negative", normalFemale: "Negative" },
    { test: "Rheumatoid Factor", normalMale: "<14 IU/mL", normalFemale: "<14 IU/mL" },
    { test: "CRP", normalMale: "<5 mg/L", normalFemale: "<5 mg/L" },
    { test: "ANA", normalMale: "Negative", normalFemale: "Negative" }
  ],

  "Hormones & Endocrinology": [
    { test: "TSH", normalMale: "0.4–4.0 mIU/L", normalFemale: "0.4–4.0 mIU/L" },
    { test: "Free T3", normalMale: "2.3–4.2 pg/mL", normalFemale: "2.3–4.2 pg/mL" },
    { test: "Free T4", normalMale: "0.7–1.8 ng/dL", normalFemale: "0.7–1.8 ng/dL" },
    { test: "FSH", normalMale: "1.5–12.4 mIU/mL", normalFemale: "2.5–10.2 mIU/mL" },
    { test: "LH", normalMale: "1.7–8.6 mIU/mL", normalFemale: "1.9–12.5 mIU/mL" },
    { test: "Prolactin", normalMale: "2–18 ng/mL", normalFemale: "2–29 ng/mL" },
    { test: "Testosterone", normalMale: "300–1000 ng/dL", normalFemale: "15–70 ng/dL" }
  ],

  "Urine & Stool Examination": [
    { test: "Urinalysis", normalMale: "Normal pH, SG, no protein/glucose", normalFemale: "Same" },
    { test: "Stool R/E", normalMale: "No ova/cyst", normalFemale: "No ova/cyst" },
    { test: "Stool Occult Blood", normalMale: "Negative", normalFemale: "Negative" }
  ],

  "Tumor Markers": [
    { test: "PSA", normalMale: "<4 ng/mL", normalFemale: "-" },
    { test: "CA-125", normalMale: "-", normalFemale: "<35 U/mL" },
    { test: "CEA", normalMale: "<3 ng/mL", normalFemale: "<3 ng/mL" },
    { test: "AFP", normalMale: "<10 ng/mL", normalFemale: "<10 ng/mL" }
  ],

  "Molecular / PCR": [
    { test: "COVID-19 PCR", normalMale: "Negative", normalFemale: "Negative" },
    { test: "Influenza A/B PCR", normalMale: "Negative", normalFemale: "Negative" },
    { test: "Tuberculosis PCR (Xpert MTB/RIF)", normalMale: "Negative", normalFemale: "Negative" },
    { test: "Dengue RNA PCR", normalMale: "Negative", normalFemale: "Negative" },
    { test: "CMV DNA PCR", normalMale: "Negative", normalFemale: "Negative" },
    { test: "EBV DNA PCR", normalMale: "Negative", normalFemale: "Negative" },
    { test: "HPV DNA PCR", normalMale: "Negative", normalFemale: "Negative" }
  ]
};

localStorage.setItem("labSections", JSON.stringify(labSections));
