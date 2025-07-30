export const labSections = [
  {
    id: "hematology",
    name: "Hematology",
    tests: [
      { id: "cbc", name: "Complete Blood Count (CBC)", normalRange: "Lab Defined" },
      { id: "hb", name: "Hemoglobin (Hb)", normalRange: "13–17 g/dL" },
      { id: "tlc", name: "Total Leukocyte Count (TLC)", normalRange: "4,000–11,000/μL" },
      { id: "dlc", name: "Differential Leukocyte Count (DLC)", normalRange: "Lab Defined" },
      { id: "platelet", name: "Platelet Count", normalRange: "150,000–400,000/μL" },
      { id: "esr", name: "ESR", normalRange: "0–20 mm/hr" },
      { id: "reticulocyte", name: "Reticulocyte Count", normalRange: "0.5–2.5%" },
      { id: "smear", name: "Peripheral Smear", normalRange: "Normal morphology" },
      { id: "btct", name: "BT/CT", normalRange: "Bleeding <7 mins / Clotting 8–15 mins" },
      { id: "hb-electro", name: "Hemoglobin Electrophoresis", normalRange: "HbA, HbA2, HbF" }
    ],
  },
  {
    id: "serology",
    name: "Serology",
    tests: [
      { id: "hbsag", name: "HBsAg", normalRange: "Negative" },
      { id: "hcv", name: "Anti-HCV", normalRange: "Negative" },
      { id: "hiv", name: "HIV I/II", normalRange: "Negative" },
      { id: "widal", name: "Widal Test", normalRange: "Negative" },
      { id: "aso", name: "ASO Titre", normalRange: "<200 IU/mL" },
      { id: "ra", name: "RA Factor", normalRange: "<14 IU/mL" },
      { id: "crp-qual", name: "CRP (Qualitative)", normalRange: "Negative" },
      { id: "vdrl", name: "VDRL", normalRange: "Non-reactive" },
      { id: "tpha", name: "TPHA", normalRange: "Negative" }
    ],
  },
  {
    id: "histopathology",
    name: "Histopathology",
    tests: [
      { id: "biopsy", name: "Biopsy (Skin, Breast, etc.)", normalRange: "As per report" },
      { id: "fnac", name: "FNAC (Fine Needle Aspiration Cytology)", normalRange: "As per report" },
      { id: "pap-smear", name: "Pap Smear", normalRange: "Negative for malignancy" },
      { id: "endometrial", name: "Endometrial Curettage", normalRange: "Normal histology" },
      { id: "surgical", name: "Surgical Specimen Analysis", normalRange: "As per findings" }
    ],
  },
  {
    id: "microbiology",
    name: "Microbiology",
    tests: [
      { id: "urine-re", name: "Urine R/E", normalRange: "No pus cells / No bacteria" },
      { id: "urine-culture", name: "Urine Culture", normalRange: "No growth" },
      { id: "stool-re", name: "Stool R/E", normalRange: "No ova/cysts" },
      { id: "stool-culture", name: "Stool Culture", normalRange: "Normal flora only" },
      { id: "sputum-afb", name: "Sputum for AFB", normalRange: "Negative" },
      { id: "sputum-culture", name: "Sputum Culture", normalRange: "Sterile" },
      { id: "throat-culture", name: "Throat Swab Culture", normalRange: "No pathogenic growth" }
    ],
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    tests: [
      { id: "fbs", name: "Fasting Blood Sugar", normalRange: "70–100 mg/dL" },
      { id: "rbs", name: "Random Blood Sugar", normalRange: "<140 mg/dL" },
      { id: "hba1c", name: "HbA1c", normalRange: "<5.7%" },
      { id: "urea", name: "Urea", normalRange: "10–50 mg/dL" },
      { id: "creatinine", name: "Creatinine", normalRange: "0.6–1.3 mg/dL" },
      { id: "uric", name: "Uric Acid", normalRange: "3.5–7.2 mg/dL" },
      { id: "bilirubin", name: "Bilirubin Total/Direct", normalRange: "<1.2 / <0.3 mg/dL" },
      { id: "alt", name: "SGPT (ALT)", normalRange: "7–56 U/L" },
      { id: "ast", name: "SGOT (AST)", normalRange: "5–40 U/L" },
      { id: "alp", name: "Alkaline Phosphatase", normalRange: "44–147 U/L" },
      { id: "chol", name: "Cholesterol", normalRange: "<200 mg/dL" },
      { id: "lipids", name: "HDL / LDL / Triglycerides", normalRange: "Lab Defined" },
      { id: "calcium", name: "Calcium", normalRange: "8.6–10.3 mg/dL" },
      { id: "phosphorus", name: "Phosphorus", normalRange: "2.5–4.5 mg/dL" },
      { id: "protein", name: "Total Protein", normalRange: "6.0–8.3 g/dL" },
      { id: "albumin", name: "Albumin", normalRange: "3.5–5.0 g/dL" }
    ],
  },
  {
    id: "culture",
    name: "Culture Tests",
    tests: [
      { id: "urine-cs", name: "Urine Culture and Sensitivity", normalRange: "Sterile" },
      { id: "blood-culture", name: "Blood Culture", normalRange: "No growth" },
      { id: "pus-culture", name: "Pus Culture", normalRange: "No pathogenic growth" },
      { id: "sputum-culture2", name: "Sputum Culture", normalRange: "Sterile" },
      { id: "stool-culture2", name: "Stool Culture", normalRange: "No pathogens" },
      { id: "wound-swab", name: "Wound Swab Culture", normalRange: "No growth" }
    ],
  },
  {
    id: "special-chemistry",
    name: "Special Chemistry",
    tests: [
      { id: "crp-quant", name: "CRP (Quantitative)", normalRange: "<6 mg/L" },
      { id: "ferritin", name: "Ferritin", normalRange: "30–300 ng/mL" },
      { id: "vitd", name: "Vitamin D (25-OH)", normalRange: "30–100 ng/mL" },
      { id: "vitb12", name: "Vitamin B12", normalRange: "200–900 pg/mL" },
      { id: "t3", name: "T3", normalRange: "80–200 ng/dL" },
      { id: "t4", name: "T4", normalRange: "5.1–14.1 μg/dL" },
      { id: "tsh", name: "TSH", normalRange: "0.4–4.0 mIU/L" },
      { id: "prolactin", name: "Prolactin", normalRange: "4.8–23.3 ng/mL" },
      { id: "psa", name: "PSA (Total)", normalRange: "<4 ng/mL" },
      { id: "hcg", name: "β-hCG", normalRange: "Pregnancy Dependent" }
    ],
  },
  {
    id: "molecular",
    name: "Molecular Biology",
    tests: [
      { id: "covid-pcr", name: "COVID-19 PCR", normalRange: "Negative" },
      { id: "hcv-rna", name: "HCV RNA (PCR)", normalRange: "Undetected" },
      { id: "hbv-dna", name: "HBV DNA (PCR)", normalRange: "Undetected" },
      { id: "tb-pcr", name: "Mycobacterium Tuberculosis PCR", normalRange: "Not Detected" },
      { id: "cmv-dna", name: "CMV DNA PCR", normalRange: "Negative" }
    ],
  },
  {
    id: "blood-banking",
    name: "Blood Banking",
    tests: [
      { id: "blood-group", name: "Blood Group", normalRange: "A/B/AB/O +/−" },
      { id: "rh-typing", name: "Rh Typing", normalRange: "Positive / Negative" },
      { id: "crossmatch", name: "Crossmatching", normalRange: "Compatible" },
      { id: "coombs", name: "Coombs Test (Direct/Indirect)", normalRange: "Negative" },
      { id: "irreg-antibodies", name: "Screening for Irregular Antibodies", normalRange: "Negative" }
    ],
  }
];
