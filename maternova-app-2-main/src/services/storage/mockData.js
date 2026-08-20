// Comprehensive seed data for AASHA Rural Healthcare Platform

export const INITIAL_PATIENTS = [
  // PREGNANT WOMEN
  {
    id: 'PAT-PW-101',
    name: 'Sunita Devi',
    category: 'PREGNANT_WOMAN',
    dob: '1998-04-12',
    age: 26,
    gender: 'FEMALE',
    guardianName: 'Ramesh Kumar',
    guardianRelation: 'Husband',
    phone: '+91 98765 43210',
    altPhone: '+91 98765 11223',
    address: 'House #24, Rampur Village, District Varanasi, UP',
    region: 'North India',
    dietPreference: 'Vegetarian',
    village: 'Rampur',
    ashaWorkerId: 'ASHA-VNS-04',
    registeredDate: '2026-05-10',
    syncStatus: 'SYNCED',
    lastSyncTimestamp: '2026-08-18T10:30:00Z',
    pregnancyDetails: {
      lmp: '2026-01-15',
      edd: '2026-10-22',
      gestationalWeeks: 31,
      trimester: 3,
      gravida: 2,
      para: 1,
      bloodGroup: 'B+',
      riskLevel: 'HIGH_RISK',
      riskReasons: ['Moderate Anemia (Hb 8.6 g/dL)', 'Elevated Blood Pressure (142/92 mmHg)'],
      ifaTabletsGiven: 120,
      calciumTabletsGiven: 90,
      ttDosesCompleted: 2,
      highRiskNotes: 'Patient complains of mild dizziness and ankle edema. Doctor advised strict salt control and Iron syrup.'
    },
    latestVitals: {
      date: '2026-08-15',
      weightKg: 58.5,
      heightCm: 154,
      systolicBp: 142,
      diastolicBp: 92,
      hemoglobin: 8.6,
      bloodSugarFasting: 98,
      pulse: 82,
      fundalHeightCm: 30
    }
  },
  {
    id: 'PAT-PW-102',
    name: 'Lakshmi Narayanan',
    category: 'PREGNANT_WOMAN',
    dob: '2001-09-03',
    age: 23,
    gender: 'FEMALE',
    guardianName: 'Karthik Narayanan',
    guardianRelation: 'Husband',
    phone: '+91 94432 87654',
    altPhone: '+91 94432 55443',
    address: 'Near Temple, Melur Village, Madurai, Tamil Nadu',
    region: 'South India',
    dietPreference: 'Non-Vegetarian',
    village: 'Melur',
    ashaWorkerId: 'ASHA-MDU-12',
    registeredDate: '2026-06-01',
    syncStatus: 'SYNCED',
    lastSyncTimestamp: '2026-08-19T08:00:00Z',
    pregnancyDetails: {
      lmp: '2026-03-10',
      edd: '2026-12-15',
      gestationalWeeks: 23,
      trimester: 2,
      gravida: 1,
      para: 0,
      bloodGroup: 'O+',
      riskLevel: 'NORMAL',
      riskReasons: [],
      ifaTabletsGiven: 60,
      calciumTabletsGiven: 60,
      ttDosesCompleted: 1,
      highRiskNotes: 'Routine 2nd trimester progress normal. Fetal heartbeat audible and regular (144 bpm).'
    },
    latestVitals: {
      date: '2026-08-10',
      weightKg: 52.0,
      heightCm: 158,
      systolicBp: 116,
      diastolicBp: 74,
      hemoglobin: 11.4,
      bloodSugarFasting: 88,
      pulse: 76,
      fundalHeightCm: 22
    }
  },

  // INFANTS
  {
    id: 'PAT-INF-201',
    name: 'Aarav Meena',
    category: 'INFANT',
    dob: '2026-05-28', // ~12 weeks old
    age: 0,
    gender: 'MALE',
    guardianName: 'Pooja Meena',
    guardianRelation: 'Mother',
    phone: '+91 97890 12345',
    altPhone: '+91 97890 67890',
    address: 'Sector 3, Chomu Village, Jaipur, Rajasthan',
    region: 'North India',
    dietPreference: 'Vegetarian',
    village: 'Chomu',
    ashaWorkerId: 'ASHA-JPR-09',
    registeredDate: '2026-05-30',
    syncStatus: 'PENDING_SYNC',
    lastSyncTimestamp: null,
    infantDetails: {
      birthWeightKg: 2.8,
      birthLengthCm: 48,
      deliveryType: 'Institutional (Normal Delivery)',
      feedingType: 'Exclusive Breastfeeding',
      growthStatus: 'NORMAL',
      vaccinationStatus: 'UP_TO_DATE'
    },
    latestVitals: {
      date: '2026-08-16',
      weightKg: 5.4,
      heightCm: 58.5,
      headCircumferenceCm: 39.5,
      temperatureC: 36.8,
      pulse: 124
    }
  },
  {
    id: 'PAT-INF-202',
    name: 'Ananya Mondal',
    category: 'INFANT',
    dob: '2025-11-15', // ~9 months old
    age: 0,
    gender: 'FEMALE',
    guardianName: 'Rina Mondal',
    guardianRelation: 'Mother',
    phone: '+91 98301 23456',
    altPhone: '+91 98301 98765',
    address: 'Bhatpara Gram, North 24 Parganas, West Bengal',
    region: 'East India',
    dietPreference: 'Non-Vegetarian',
    village: 'Bhatpara',
    ashaWorkerId: 'ASHA-WB-02',
    registeredDate: '2025-11-20',
    syncStatus: 'SYNCED',
    lastSyncTimestamp: '2026-08-17T14:20:00Z',
    infantDetails: {
      birthWeightKg: 2.4,
      birthLengthCm: 47,
      deliveryType: 'Institutional (Cesarean)',
      feedingType: 'Complementary Feeding (Khichdi + Breastfeeding)',
      growthStatus: 'MODERATELY_UNDERWEIGHT',
      vaccinationStatus: 'OVERDUE'
    },
    latestVitals: {
      date: '2026-08-12',
      weightKg: 6.9,
      heightCm: 67.0,
      headCircumferenceCm: 43.0,
      temperatureC: 37.1,
      pulse: 118
    }
  },

  // ELDERLY PERSONS
  {
    id: 'PAT-ELD-301',
    name: 'Ramcharan Patel',
    category: 'ELDERLY',
    dob: '1956-02-14',
    age: 70,
    gender: 'MALE',
    guardianName: 'Dinesh Patel',
    guardianRelation: 'Son',
    phone: '+91 99234 56789',
    altPhone: '+91 99234 99887',
    address: 'Ward 4, Anandpur Village, Vidisha, MP',
    region: 'Central India',
    dietPreference: 'Vegetarian',
    village: 'Anandpur',
    ashaWorkerId: 'ASHA-VDS-07',
    registeredDate: '2026-04-10',
    syncStatus: 'SYNCED',
    lastSyncTimestamp: '2026-08-18T11:00:00Z',
    elderlyDetails: {
      conditions: ['Hypertension (Stage 2)', 'Type 2 Diabetes Mellitus'],
      mobilityStatus: 'Ambulatory with Stick',
      currentMedications: ['Amlodipine 5mg OD', 'Metformin 500mg BD'],
      fallRisk: 'MODERATE',
      visionStatus: 'Cataract operated left eye'
    },
    latestVitals: {
      date: '2026-08-17',
      weightKg: 62.0,
      heightCm: 165,
      systolicBp: 154,
      diastolicBp: 96,
      bloodSugarFasting: 168,
      bloodSugarPostPrandial: 230,
      pulse: 74,
      spO2: 96
    }
  },
  {
    id: 'PAT-ELD-302',
    name: 'Kamalabai Deshmukh',
    category: 'ELDERLY',
    dob: '1961-08-20',
    age: 65,
    gender: 'FEMALE',
    guardianName: 'Sanjay Deshmukh',
    guardianRelation: 'Son',
    phone: '+91 98220 33445',
    altPhone: '+91 98220 77889',
    address: 'Shanti Nagar, Karad, Satara, Maharashtra',
    region: 'West India',
    dietPreference: 'Vegetarian',
    village: 'Karad',
    ashaWorkerId: 'ASHA-MH-15',
    registeredDate: '2026-03-22',
    syncStatus: 'SYNCED',
    lastSyncTimestamp: '2026-08-19T09:30:00Z',
    elderlyDetails: {
      conditions: ['Osteoarthritis Knee', 'Mild Hypertension'],
      mobilityStatus: 'Independent',
      currentMedications: ['Telmisartan 40mg OD', 'Calcium + Vit D3'],
      fallRisk: 'LOW',
      visionStatus: 'Spectacles for reading'
    },
    latestVitals: {
      date: '2026-08-14',
      weightKg: 68.5,
      heightCm: 152,
      systolicBp: 134,
      diastolicBp: 86,
      bloodSugarFasting: 110,
      bloodSugarPostPrandial: 142,
      pulse: 78,
      spO2: 98
    }
  }
];

export const INITIAL_VITALS_HISTORY = [
  // Sunita Devi History
  { id: 'VIT-101-1', patientId: 'PAT-PW-101', date: '2026-05-15', weightKg: 52.0, systolicBp: 122, diastolicBp: 78, hemoglobin: 9.8, fundalHeightCm: 18, recordedBy: 'ASHA-VNS-04', syncStatus: 'SYNCED' },
  { id: 'VIT-101-2', patientId: 'PAT-PW-101', date: '2026-06-20', weightKg: 54.2, systolicBp: 130, diastolicBp: 84, hemoglobin: 9.2, fundalHeightCm: 22, recordedBy: 'ASHA-VNS-04', syncStatus: 'SYNCED' },
  { id: 'VIT-101-3', patientId: 'PAT-PW-101', date: '2026-07-22', weightKg: 56.8, systolicBp: 136, diastolicBp: 88, hemoglobin: 8.9, fundalHeightCm: 26, recordedBy: 'ASHA-VNS-04', syncStatus: 'SYNCED' },
  { id: 'VIT-101-4', patientId: 'PAT-PW-101', date: '2026-08-15', weightKg: 58.5, systolicBp: 142, diastolicBp: 92, hemoglobin: 8.6, fundalHeightCm: 30, recordedBy: 'ASHA-VNS-04', syncStatus: 'SYNCED' },

  // Ramcharan Patel History
  { id: 'VIT-301-1', patientId: 'PAT-ELD-301', date: '2026-05-10', weightKg: 64.0, systolicBp: 160, diastolicBp: 100, bloodSugarFasting: 185, bloodSugarPostPrandial: 260, pulse: 78, spO2: 95, recordedBy: 'ASHA-VDS-07', syncStatus: 'SYNCED' },
  { id: 'VIT-301-2', patientId: 'PAT-ELD-301', date: '2026-06-12', weightKg: 63.2, systolicBp: 152, diastolicBp: 94, bloodSugarFasting: 172, bloodSugarPostPrandial: 245, pulse: 76, spO2: 96, recordedBy: 'ASHA-VDS-07', syncStatus: 'SYNCED' },
  { id: 'VIT-301-3', patientId: 'PAT-ELD-301', date: '2026-07-18', weightKg: 62.5, systolicBp: 158, diastolicBp: 98, bloodSugarFasting: 176, bloodSugarPostPrandial: 250, pulse: 75, spO2: 95, recordedBy: 'ASHA-VDS-07', syncStatus: 'SYNCED' },
  { id: 'VIT-301-4', patientId: 'PAT-ELD-301', date: '2026-08-17', weightKg: 62.0, systolicBp: 154, diastolicBp: 96, bloodSugarFasting: 168, bloodSugarPostPrandial: 230, pulse: 74, spO2: 96, recordedBy: 'ASHA-VDS-07', syncStatus: 'SYNCED' },

  // Ananya Mondal Infant Growth
  { id: 'VIT-202-1', patientId: 'PAT-INF-202', date: '2025-11-15', weightKg: 2.4, heightCm: 47, headCircumferenceCm: 33.0, recordedBy: 'HOSPITAL', syncStatus: 'SYNCED' },
  { id: 'VIT-202-2', patientId: 'PAT-INF-202', date: '2026-01-10', weightKg: 4.1, heightCm: 53, headCircumferenceCm: 37.0, recordedBy: 'ASHA-WB-02', syncStatus: 'SYNCED' },
  { id: 'VIT-202-3', patientId: 'PAT-INF-202', date: '2026-04-15', weightKg: 5.7, heightCm: 60, headCircumferenceCm: 40.5, recordedBy: 'ASHA-WB-02', syncStatus: 'SYNCED' },
  { id: 'VIT-202-4', patientId: 'PAT-INF-202', date: '2026-08-12', weightKg: 6.9, heightCm: 67, headCircumferenceCm: 43.0, recordedBy: 'ASHA-WB-02', syncStatus: 'SYNCED' }
];

export const INITIAL_VACCINATIONS = [
  // Aarav Meena (12 wks)
  { id: 'VAC-201-1', patientId: 'PAT-INF-201', vaccineCode: 'BCG', vaccineName: 'BCG', scheduledAge: 'At Birth', dateAdministered: '2026-05-29', status: 'GIVEN', batchNumber: 'BCG-8902', center: 'PHC Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-2', patientId: 'PAT-INF-201', vaccineCode: 'OPV-0', vaccineName: 'OPV (Birth Dose)', scheduledAge: 'At Birth', dateAdministered: '2026-05-29', status: 'GIVEN', batchNumber: 'OPV-4412', center: 'PHC Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-3', patientId: 'PAT-INF-201', vaccineCode: 'HEP-B-0', vaccineName: 'Hepatitis B (Birth Dose)', scheduledAge: 'At Birth', dateAdministered: '2026-05-29', status: 'GIVEN', batchNumber: 'HEPB-1029', center: 'PHC Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-4', patientId: 'PAT-INF-201', vaccineCode: 'OPV-1', vaccineName: 'OPV 1', scheduledAge: '6 Weeks', dateAdministered: '2026-07-10', status: 'GIVEN', batchNumber: 'OPV-5521', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-5', patientId: 'PAT-INF-201', vaccineCode: 'PENTA-1', vaccineName: 'Pentavalent 1 (DPT+HepB+Hib)', scheduledAge: '6 Weeks', dateAdministered: '2026-07-10', status: 'GIVEN', batchNumber: 'PNT-3301', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-6', patientId: 'PAT-INF-201', vaccineCode: 'ROTA-1', vaccineName: 'Rotavirus 1', scheduledAge: '6 Weeks', dateAdministered: '2026-07-10', status: 'GIVEN', batchNumber: 'ROT-1190', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-7', patientId: 'PAT-INF-201', vaccineCode: 'OPV-2', vaccineName: 'OPV 2', scheduledAge: '10 Weeks', dateAdministered: '2026-08-08', status: 'GIVEN', batchNumber: 'OPV-5588', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-8', patientId: 'PAT-INF-201', vaccineCode: 'PENTA-2', vaccineName: 'Pentavalent 2', scheduledAge: '10 Weeks', dateAdministered: '2026-08-08', status: 'GIVEN', batchNumber: 'PNT-3388', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-9', patientId: 'PAT-INF-201', vaccineCode: 'ROTA-2', vaccineName: 'Rotavirus 2', scheduledAge: '10 Weeks', dateAdministered: '2026-08-08', status: 'GIVEN', batchNumber: 'ROT-1199', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-10', patientId: 'PAT-INF-201', vaccineCode: 'OPV-3', vaccineName: 'OPV 3', scheduledAge: '14 Weeks', dateAdministered: null, status: 'DUE', dueDate: '2026-09-04', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-11', patientId: 'PAT-INF-201', vaccineCode: 'PENTA-3', vaccineName: 'Pentavalent 3', scheduledAge: '14 Weeks', dateAdministered: null, status: 'DUE', dueDate: '2026-09-04', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },
  { id: 'VAC-201-12', patientId: 'PAT-INF-201', vaccineCode: 'ROTA-3', vaccineName: 'Rotavirus 3', scheduledAge: '14 Weeks', dateAdministered: null, status: 'DUE', dueDate: '2026-09-04', center: 'Anganwadi Chomu', syncStatus: 'SYNCED' },

  // Ananya Mondal (9 Months - Overdue MR-1)
  { id: 'VAC-202-1', patientId: 'PAT-INF-202', vaccineCode: 'BCG', vaccineName: 'BCG', scheduledAge: 'At Birth', dateAdministered: '2025-11-16', status: 'GIVEN', batchNumber: 'BCG-4410', center: 'Subdiv Hospital', syncStatus: 'SYNCED' },
  { id: 'VAC-202-2', patientId: 'PAT-INF-202', vaccineCode: 'PENTA-1', vaccineName: 'Pentavalent 1', scheduledAge: '6 Weeks', dateAdministered: '2026-01-05', status: 'GIVEN', batchNumber: 'PNT-1122', center: 'Bhatpara SC', syncStatus: 'SYNCED' },
  { id: 'VAC-202-3', patientId: 'PAT-INF-202', vaccineCode: 'PENTA-2', vaccineName: 'Pentavalent 2', scheduledAge: '10 Weeks', dateAdministered: '2026-02-10', status: 'GIVEN', batchNumber: 'PNT-2233', center: 'Bhatpara SC', syncStatus: 'SYNCED' },
  { id: 'VAC-202-4', patientId: 'PAT-INF-202', vaccineCode: 'PENTA-3', vaccineName: 'Pentavalent 3', scheduledAge: '14 Weeks', dateAdministered: '2026-03-25', status: 'GIVEN', batchNumber: 'PNT-3344', center: 'Bhatpara SC', syncStatus: 'SYNCED' },
  { id: 'VAC-202-5', patientId: 'PAT-INF-202', vaccineCode: 'MR-1', vaccineName: 'Measles & Rubella 1 (MR-1)', scheduledAge: '9 Months', dateAdministered: null, status: 'OVERDUE', dueDate: '2026-08-15', center: 'Bhatpara SC', syncStatus: 'SYNCED' },
  { id: 'VAC-202-6', patientId: 'PAT-INF-202', vaccineCode: 'VIT-A-1', vaccineName: 'Vitamin A (1st Dose - 1 lakh IU)', scheduledAge: '9 Months', dateAdministered: null, status: 'OVERDUE', dueDate: '2026-08-15', center: 'Bhatpara SC', syncStatus: 'SYNCED' }
];

export const INITIAL_ANC_VISITS = [
  {
    id: 'ANC-101-1',
    patientId: 'PAT-PW-101',
    visitNumber: 1,
    title: '1st ANC Checkup (Within 12 Weeks)',
    scheduledWeek: 12,
    dateCompleted: '2026-03-28',
    status: 'COMPLETED',
    findings: 'Pregnancy confirmed via UPT. Early ultrasound confirmed single intrauterine pregnancy. IFA tablets initiated.',
    ttDose: 'TT-1 Administered',
    doctorNotes: 'Advised nutritional counseling and regular hydration.',
    syncStatus: 'SYNCED'
  },
  {
    id: 'ANC-101-2',
    patientId: 'PAT-PW-101',
    visitNumber: 2,
    title: '2nd ANC Checkup (14-26 Weeks)',
    scheduledWeek: 20,
    dateCompleted: '2026-05-28',
    status: 'COMPLETED',
    findings: 'Fundal height corresponds to gestational age. Blood pressure 128/82. Hb 9.2 g/dL.',
    ttDose: 'TT-2 Administered',
    doctorNotes: 'Calcium supplements prescribed. Anomaly scan showed normal fetal anatomy.',
    syncStatus: 'SYNCED'
  },
  {
    id: 'ANC-101-3',
    patientId: 'PAT-PW-101',
    visitNumber: 3,
    title: '3rd ANC Checkup (28-34 Weeks)',
    scheduledWeek: 30,
    dateCompleted: '2026-08-10',
    status: 'COMPLETED',
    findings: 'Systolic BP elevated to 142/92. Hemoglobin dipped to 8.6 g/dL. Mild pedal edema noted.',
    ttDose: 'Completed',
    doctorNotes: 'HIGH RISK: Pre-eclampsia vigilance. Weekly BP check required. Iron sucrose consideration if Hb drops below 8.0.',
    syncStatus: 'SYNCED'
  },
  {
    id: 'ANC-101-4',
    patientId: 'PAT-PW-101',
    visitNumber: 4,
    title: '4th ANC Checkup (36 Weeks to Delivery)',
    scheduledWeek: 36,
    dateCompleted: null,
    status: 'UPCOMING',
    dueDate: '2026-09-20',
    findings: '',
    ttDose: '',
    doctorNotes: 'Institutional delivery planning at Varanasi District Hospital.',
    syncStatus: 'SYNCED'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'REP-101-1',
    patientId: 'PAT-PW-101',
    title: 'Complete Blood Count & Hemogram',
    category: 'LAB_TEST',
    date: '2026-08-14',
    facility: 'District Hospital Varanasi Lab',
    summary: 'Hemoglobin: 8.6 g/dL (Microcytic Hypochromic Anemia), Platelets: 210,000 /uL, WBC: 8,400 /uL.',
    status: 'REVIEWED_BY_DOCTOR',
    fileType: 'PDF Document',
    fileName: 'CBC_Report_SunitaDevi_Aug2026.pdf',
    doctorRemarks: 'Microcytic anemia likely due to nutritional iron deficiency. Continue double-dose IFA and dietary modifications.',
    syncStatus: 'SYNCED'
  },
  {
    id: 'REP-101-2',
    patientId: 'PAT-PW-101',
    title: 'Obstetric Ultrasound (Level II Anomaly Scan)',
    category: 'ULTRASOUND',
    date: '2026-05-25',
    facility: 'Varanasi Diagnostic Centre',
    summary: 'Single live intrauterine fetus at 20 weeks 3 days. Placenta fundal anterior. Adequate liquor (AFI 14 cm).',
    status: 'NORMAL',
    fileType: 'Imaging Report',
    fileName: 'USG_Obstetric_20wks.pdf',
    doctorRemarks: 'Normal fetal anatomy and growth parameters.',
    syncStatus: 'SYNCED'
  },
  {
    id: 'REP-301-1',
    patientId: 'PAT-ELD-301',
    title: 'Fasting Blood Glucose & HbA1c Profile',
    category: 'LAB_TEST',
    date: '2026-08-16',
    facility: 'Vidisha Community Health Centre',
    summary: 'Fasting Glucose: 168 mg/dL, HbA1c: 8.4% (Uncontrolled Diabetes), Serum Creatinine: 1.1 mg/dL.',
    status: 'ATTENTION_REQUIRED',
    fileType: 'Lab Slip',
    fileName: 'HbA1c_Ramcharan_Aug2026.pdf',
    doctorRemarks: 'Uncontrolled glycemic levels. Suggested increasing Metformin or adding Glimepiride after consultation at CHC.',
    syncStatus: 'SYNCED'
  }
];

export const INITIAL_REMINDERS = [
  {
    id: 'REM-001',
    patientId: 'PAT-PW-101',
    patientName: 'Sunita Devi',
    category: 'PREGNANT_WOMAN',
    title: 'Weekly High-Risk BP & Edema Follow-up',
    dueDate: '2026-08-22',
    priority: 'HIGH',
    status: 'PENDING',
    actionText: 'Check BP and record symptoms of headache/blurred vision',
    assignedAsha: 'ASHA-VNS-04'
  },
  {
    id: 'REM-002',
    patientId: 'PAT-INF-202',
    patientName: 'Ananya Mondal',
    category: 'INFANT',
    title: 'Overdue MR-1 & Vitamin A Vaccination Visit',
    dueDate: '2026-08-21',
    priority: 'HIGH',
    status: 'PENDING',
    actionText: 'Visit household and mobilize mother to Bhatpara Sub-Centre for MR-1 dose',
    assignedAsha: 'ASHA-WB-02'
  },
  {
    id: 'REM-003',
    patientId: 'PAT-INF-201',
    patientName: 'Aarav Meena',
    category: 'INFANT',
    title: '14th Week Vaccination (Pentavalent-3 / OPV-3)',
    dueDate: '2026-09-04',
    priority: 'MEDIUM',
    status: 'UPCOMING',
    actionText: 'Notify mother for next immunization session',
    assignedAsha: 'ASHA-JPR-09'
  },
  {
    id: 'REM-004',
    patientId: 'PAT-ELD-301',
    patientName: 'Ramcharan Patel',
    category: 'ELDERLY',
    title: 'Monthly Fasting Sugar & BP Checkup',
    dueDate: '2026-08-25',
    priority: 'HIGH',
    status: 'PENDING',
    actionText: 'Perform home glucometer test and check medication stock',
    assignedAsha: 'ASHA-VDS-07'
  }
];
