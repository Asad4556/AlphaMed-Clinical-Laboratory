const testDatabase = {
  "Hematology": [
    "CBC", "Hemoglobin", "Hematocrit", "RBC Count", "WBC Count", "Platelet Count",
    "Reticulocyte Count", "ESR", "Peripheral Smear", "Bleeding Time", "Clotting Time",
    "PT", "APTT", "INR", "Eosinophil Count", "Basophil Count", "Lymphocyte Count",
    "Monocyte Count", "Neutrophil Count", "Red Cell Indices", "MCV", "MCH", "MCHC",
    "RDW", "MPV", "PDW", "Bone Marrow Aspiration", "Sickling Test", "Coombs Test"
  ],
  "Serology": [
    "Widal Test", "Rheumatoid Factor", "CRP", "ASO Titre", "VDRL", "TPHA",
    "HIV I & II", "HBsAg", "HCV", "Brucella Antibodies", "Toxoplasma IgG",
    "Toxoplasma IgM", "Rubella IgG", "Rubella IgM", "CMV IgG", "CMV IgM",
    "EBV IgG", "EBV IgM", "Helicobacter Pylori", "Anti CCP", "ANA", "Anti-DNA",
    "Anti-Smooth Muscle", "Anti-Mitochondrial", "ANCA", "ELISA", "COVID IgM", "COVID IgG", "Dengue NS1"
  ],
  "Microbiology": [
    "Gram Stain", "Ziehl-Neelsen Stain", "Blood Culture", "Urine Culture", "Sputum Culture",
    "Throat Swab Culture", "Stool Culture", "CSF Culture", "Wound Swab", "Sensitivity Testing",
    "AFB Culture", "Fungal Culture", "TB PCR", "MALDI-TOF", "BioFire", "PCR Respiratory",
    "MRSA Screening", "Carbapenemase Detection", "VRE Detection", "ESBL Detection",
    "Anaerobic Culture", "Bacterial ID", "MIC Determination", "Urease Test", "Catalase Test",
    "Oxidase Test", "Indole Test", "TSI", "Motility Test", "CAMP Test"
  ],
  "Histopathology": [
    "Tissue Biopsy", "Frozen Section", "H&E Stain", "Special Stains", "Immunohistochemistry",
    "Breast Biopsy", "Prostate Biopsy", "Lymph Node Biopsy", "Liver Biopsy", "Skin Biopsy",
    "GIT Biopsy", "Endometrial Biopsy", "Bone Biopsy", "Renal Biopsy", "Testicular Biopsy",
    "Tumor Grading", "Pap Smear", "Cervical Biopsy", "Lung Biopsy", "Oral Biopsy",
    "Salivary Gland Biopsy", "Brain Biopsy", "Gynae Path", "GI Path", "Dermato Path",
    "Muscle Biopsy", "Bone Marrow Biopsy", "IHC HER2", "IHC ER/PR", "Ki-67"
  ],
  "Biochemistry": [
    "Blood Sugar Fasting", "Blood Sugar Random", "HbA1c", "Urea", "Creatinine",
    "Uric Acid", "Sodium", "Potassium", "Calcium", "Phosphate", "LFT", "Bilirubin",
    "ALT", "AST", "ALP", "GGT", "Total Protein", "Albumin", "Globulin", "A/G Ratio",
    "Lipid Profile", "Cholesterol", "Triglycerides", "HDL", "LDL", "VLDL", "TSH",
    "T3", "T4", "Amylase"
  ],
  "Blood Banking": [
    "Blood Group", "Rh Typing", "Cross Match", "Coombs Direct", "Coombs Indirect",
    "Antibody Screening", "Antibody Identification", "DAT", "ICT", "Donor Screening",
    "HBsAg (Donor)", "HCV (Donor)", "HIV (Donor)", "Malaria (Donor)", "Syphilis (Donor)",
    "Hemoglobin Estimation", "Packed Cells", "Whole Blood", "Platelet Concentrate",
    "FFP", "Cryoprecipitate", "Irradiated Blood", "Washed RBCs", "Leukoreduced Blood",
    "Thawed Plasma", "CMV Negative Blood", "Extended Typing", "Neonatal Transfusion",
    "Massive Transfusion"
  ],
  "Culture Tests": [
    "Urine Culture", "Blood Culture", "Sputum Culture", "Stool Culture", "CSF Culture",
    "Pus Culture", "Throat Swab Culture", "Ear Swab Culture", "Wound Swab Culture",
    "Genital Swab Culture", "Eye Swab Culture", "Nasal Swab Culture", "Bronchial Wash",
    "Endotracheal Culture", "Synovial Fluid Culture", "Peritoneal Fluid Culture",
    "Pleural Fluid Culture", "Catheter Tip Culture", "Semen Culture", "Fungal Culture",
    "AFB Culture", "Anaerobic Culture", "Aerobic Culture", "Swab for MRSA", "KOH Mount",
    "Cervical Swab", "Urethral Swab", "Penile Swab", "Nail Culture", "Skin Scraping"
  ],
  "Special Chemistry": [
    "Cortisol", "Insulin", "Prolactin", "Ferritin", "Vitamin D", "Vitamin B12",
    "Folate", "Testosterone", "DHEA-S", "FSH", "LH", "Estradiol", "Progesterone",
    "PTH", "ACTH", "Growth Hormone", "CEA", "CA-125", "CA-19.9", "AFP", "PSA",
    "Free PSA", "β-HCG", "Cyfra 21-1", "NSE", "Trop I", "Trop T", "BNP", "NT-proBNP", "IgE"
  ],
  "Molecular Biology": [
    "HBV PCR", "HCV PCR", "HIV PCR", "CMV PCR", "EBV PCR", "TB PCR", "COVID PCR",
    "HPV DNA", "Chlamydia PCR", "Gonorrhea PCR", "BRCA1", "BRCA2", "KRAS", "NRAS",
    "EGFR", "BCR-ABL", "JAK2", "Factor V Leiden", "MTHFR", "CFTR", "MLH1", "MSH2",
    "NPM1", "FLT3", "IDH1", "IDH2", "GeneXpert", "Liquid Biopsy", "Next Gen Seq",
    "RT-PCR"
  ]
};

// Populate Test dropdown dynamically
function populateTests(department) {
  const testSelect = document.getElementById("testSelect");
  testSelect.innerHTML = "";
  if (testDatabase[department]) {
    testDatabase[department].forEach(test => {
      const option = document.createElement("option");
      option.value = test;
      option.textContent = test;
      testSelect.appendChild(option);
    });
  }
}

// Add Event Listener on Department Select
document.getElementById("departmentSelect").addEventListener("change", function () {
  const selectedDepartment = this.value;
  populateTests(selectedDepartment);
});
