const labTests = {
  Hematology: [
    { name: "CBC", normal: "4.5–11.0 x10^3/μL" },
    { name: "Hemoglobin", normal: "13.0–17.0 g/dL" },
    { name: "Hematocrit", normal: "40–52%" },
    { name: "WBC Count", normal: "4,000–11,000/μL" },
    { name: "RBC Count", normal: "4.7–6.1 million/μL" },
    { name: "Platelet Count", normal: "150,000–450,000/μL" },
    { name: "ESR", normal: "0–20 mm/hr" },
    { name: "MCV", normal: "80–96 fL" },
    { name: "MCH", normal: "27–33 pg" },
    { name: "MCHC", normal: "33–36 g/dL" },
    { name: "RDW", normal: "11.5–14.5%" },
    { name: "Reticulocyte Count", normal: "0.5–2.5%" },
    { name: "Peripheral Smear", normal: "Normal Morphology" },
    { name: "BT", normal: "2–9 min" },
    { name: "CT", normal: "8–15 min" },
    { name: "Coagulation Profile", normal: "Normal" },
    { name: "D-Dimer", normal: "< 0.5 μg/mL" },
    { name: "Prothrombin Time (PT)", normal: "11–13.5 sec" },
    { name: "APTT", normal: "30–40 sec" },
    { name: "INR", normal: "0.8–1.1" },
    { name: "Fibrinogen", normal: "200–400 mg/dL" },
    { name: "Sickling Test", normal: "Negative" },
    { name: "LE Cell Test", normal: "Negative" },
    { name: "Malaria Parasite", normal: "Negative" },
    { name: "Hb Electrophoresis", normal: "Normal" },
    { name: "Bone Marrow Aspiration", normal: "Normal" },
    { name: "Serum Ferritin", normal: "12–300 ng/mL" },
    { name: "G6PD", normal: "Normal" },
    { name: "Vitamin B12", normal: "200–900 pg/mL" },
    { name: "Folate", normal: "2.7–17 ng/mL" }
  ],

  Serology: [
    { name: "HCV Antibody", normal: "Negative" },
    { name: "HBsAg", normal: "Negative" },
    { name: "HIV I/II", normal: "Negative" },
    { name: "VDRL", normal: "Non-Reactive" },
    { name: "Widal Test", normal: "Negative" },
    { name: "RA Factor", normal: "< 14 IU/mL" },
    { name: "ASO Titer", normal: "< 200 IU/mL" },
    { name: "CRP", normal: "< 5 mg/L" },
    { name: "Anti-CCP", normal: "< 20 U/mL" },
    { name: "Typhidot", normal: "Negative" },
    { name: "Dengue IgG", normal: "Negative" },
    { name: "Dengue IgM", normal: "Negative" },
    { name: "Covid IgG/IgM", normal: "Negative" },
    { name: "ANA", normal: "Negative" },
    { name: "Anti-dsDNA", normal: "Negative" },
    { name: "TPHA", normal: "Negative" },
    { name: "H. Pylori Antibody", normal: "Negative" },
    { name: "Brucella Antibody", normal: "Negative" },
    { name: "Rubella IgM", normal: "Negative" },
    { name: "Rubella IgG", normal: "Positive" },
    { name: "Toxoplasma IgM", normal: "Negative" },
    { name: "Toxoplasma IgG", normal: "Positive" },
    { name: "CMV IgM", normal: "Negative" },
    { name: "CMV IgG", normal: "Positive" },
    { name: "HbsAb", normal: "Positive" },
    { name: "Anti-HBe", normal: "Negative" },
    { name: "Anti-HBc", normal: "Negative" },
    { name: "HAV IgM", normal: "Negative" },
    { name: "Anti-HCV RNA", normal: "Negative" },
    { name: "Syphilis Rapid Test", normal: "Negative" }
  ],

  Microbiology: [
    { name: "Urine Culture", normal: "No Growth" },
    { name: "Blood Culture", normal: "No Growth" },
    { name: "Sputum Culture", normal: "No Growth" },
    { name: "Throat Swab", normal: "No Growth" },
    { name: "Wound Swab", normal: "No Growth" },
    { name: "Stool Culture", normal: "No Pathogen" },
    { name: "CSF Culture", normal: "No Growth" },
    { name: "Pus Culture", normal: "No Growth" },
    { name: "Ear Swab", normal: "No Growth" },
    { name: "Nasal Swab", normal: "No Growth" },
    { name: "Endotracheal Aspirate", normal: "No Growth" },
    { name: "Pleural Fluid Culture", normal: "No Growth" },
    { name: "Ascitic Fluid Culture", normal: "No Growth" },
    { name: "Mycobacterium TB", normal: "Negative" },
    { name: "AFB Stain", normal: "Negative" },
    { name: "Fungal Culture", normal: "Negative" },
    { name: "H. pylori Culture", normal: "Negative" },
    { name: "Staph Aureus Detection", normal: "Negative" },
    { name: "Salmonella Detection", normal: "Negative" },
    { name: "Shigella Detection", normal: "Negative" },
    { name: "Campylobacter", normal: "Negative" },
    { name: "Vibrio Cholerae", normal: "Negative" },
    { name: "Candida Albicans", normal: "Negative" },
    { name: "Neisseria Gonorrhoeae", normal: "Negative" },
    { name: "Chlamydia", normal: "Negative" },
    { name: "E. Coli", normal: "Negative" },
    { name: "Klebsiella", normal: "Negative" },
    { name: "Proteus", normal: "Negative" },
    { name: "Pseudomonas", normal: "Negative" },
    { name: "Bacillus anthracis", normal: "Negative" }
  ],

  // You can add the remaining 6 departments like this:
  // Histopathology, Biochemistry, Blood Banking, Culture Tests, Special Chemistry, Molecular Biology

  // Example Template:
  Histopathology: Array.from({ length: 30 }, (_, i) => ({
    name: `Histopath Test ${i + 1}`,
    normal: "Normal"
  })),
  Biochemistry: Array.from({ length: 30 }, (_, i) => ({
    name: `Biochemistry Test ${i + 1}`,
    normal: "Normal Range"
  })),
  BloodBanking: Array.from({ length: 30 }, (_, i) => ({
    name: `Blood Bank Test ${i + 1}`,
    normal: "Compatible"
  })),
  CultureTests: Array.from({ length: 30 }, (_, i) => ({
    name: `Culture Test ${i + 1}`,
    normal: "No Growth"
  })),
  SpecialChemistry: Array.from({ length: 30 }, (_, i) => ({
    name: `Special Chem Test ${i + 1}`,
    normal: "Normal"
  })),
  MolecularBiology: Array.from({ length: 30 }, (_, i) => ({
    name: `Molecular Test ${i + 1}`,
    normal: "Negative"
  }))
};
