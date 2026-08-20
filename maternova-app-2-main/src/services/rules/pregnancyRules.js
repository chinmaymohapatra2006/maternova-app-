// Maternal & Pregnancy Rule Engine (ANC Checkup Schedule & High-Risk Stratification)

// Calculate EDD using Naegele's rule (LMP + 280 days)
export function calculateEDD(lmpString) {
  if (!lmpString) return null;
  const lmp = new Date(lmpString);
  const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  return edd.toISOString().split('T')[0];
}

// Calculate Gestational Age in Weeks & Days
export function calculateGestationalAge(lmpString) {
  if (!lmpString) return { weeks: 0, days: 0, trimester: 1, formatted: 'Unknown' };
  const lmp = new Date(lmpString);
  const now = new Date();
  const diffTime = Math.max(0, now - lmp);
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;

  let trimester = 1;
  if (weeks >= 28) {
    trimester = 3;
  } else if (weeks >= 14) {
    trimester = 2;
  }

  return {
    weeks,
    days: remainderDays,
    totalDays,
    trimester,
    formatted: `${weeks} weeks ${remainderDays} days (Trimester ${trimester})`
  };
}

// Generate Standard India National Health Mission (NHM) ANC Checkup Milestones
export function generateANCSchedule(lmpString, completedVisits = []) {
  if (!lmpString) return [];
  const lmp = new Date(lmpString);

  const ANC_MILESTONES = [
    {
      visitNumber: 1,
      title: 'ANC 1 (First Contact / Registration)',
      targetWeek: 12,
      windowLabel: 'Within 12 Weeks (1st Trimester)',
      keyInterventions: 'Early pregnancy registration, MCP card issue, Blood Group, Hb, UPT, USG dating, IFA initiation, TT-1.'
    },
    {
      visitNumber: 2,
      title: 'ANC 2 (Second Contact)',
      targetWeek: 20,
      windowLabel: '14 - 26 Weeks (2nd Trimester)',
      keyInterventions: 'Level II Anomaly Ultrasound, Fundal height, Blood Pressure check, TT-2 / Booster dose, Calcium tablets.'
    },
    {
      visitNumber: 3,
      title: 'ANC 3 (Third Contact)',
      targetWeek: 30,
      windowLabel: '28 - 34 Weeks (3rd Trimester)',
      keyInterventions: 'Screen for Pre-eclampsia, Severe Anemia, Gestational Diabetes, Fetal presentation & movements.'
    },
    {
      visitNumber: 4,
      title: 'ANC 4 (Fourth Contact / Pre-Delivery)',
      targetWeek: 36,
      windowLabel: '36 Weeks to Delivery',
      keyInterventions: 'Birth preparedness, Institutional delivery plan, Emergency referral transport, Danger signs counseling.'
    }
  ];

  const currentGestAge = calculateGestationalAge(lmpString);

  return ANC_MILESTONES.map((milestone) => {
    const existing = completedVisits.find((v) => v.visitNumber === milestone.visitNumber);
    const dueDate = new Date(lmp.getTime() + milestone.targetWeek * 7 * 24 * 60 * 60 * 1000);
    const dueDateStr = dueDate.toISOString().split('T')[0];

    if (existing && existing.status === 'COMPLETED') {
      return {
        ...milestone,
        status: 'COMPLETED',
        dueDate: dueDateStr,
        dateCompleted: existing.dateCompleted,
        findings: existing.findings,
        doctorNotes: existing.doctorNotes,
        ttDose: existing.ttDose
      };
    }

    let status = 'UPCOMING';
    if (currentGestAge.weeks >= milestone.targetWeek + 3) {
      status = 'OVERDUE';
    } else if (currentGestAge.weeks >= milestone.targetWeek - 2) {
      status = 'DUE';
    }

    return {
      ...milestone,
      status,
      dueDate: dueDateStr,
      dateCompleted: null,
      findings: existing ? existing.findings : '',
      doctorNotes: existing ? existing.doctorNotes : '',
      ttDose: existing ? existing.ttDose : ''
    };
  });
}

// Evaluate High-Risk Pregnancy (HRP) Triggers
export function evaluateHighRiskPregnancy(patient, vitals = null) {
  const currentVitals = vitals || patient.latestVitals || {};
  const riskFactors = [];

  // Age limits
  if (patient.age < 18) {
    riskFactors.push({ level: 'HIGH', label: 'Teenage Pregnancy (<18 yrs)', reason: 'High risk of cephalopelvic disproportion, anemia, and pre-term birth.' });
  } else if (patient.age >= 35) {
    riskFactors.push({ level: 'HIGH', label: 'Advanced Maternal Age (≥35 yrs)', reason: 'Elevated risk of gestational diabetes, hypertension, and chromosomal abnormalities.' });
  }

  // Blood Pressure / Pre-eclampsia
  if (currentVitals.systolicBp >= 140 || currentVitals.diastolicBp >= 90) {
    riskFactors.push({
      level: 'CRITICAL',
      label: `Hypertension in Pregnancy (${currentVitals.systolicBp}/${currentVitals.diastolicBp} mmHg)`,
      reason: 'Risk of Pre-eclampsia/Eclampsia. Urgent medical officer evaluation and weekly BP monitoring required.'
    });
  }

  // Hemoglobin / Anemia
  if (currentVitals.hemoglobin) {
    if (currentVitals.hemoglobin < 7.0) {
      riskFactors.push({
        level: 'CRITICAL',
        label: `Severe Anemia (Hb ${currentVitals.hemoglobin} g/dL)`,
        reason: 'Critical danger of postpartum hemorrhage and fetal hypoxia. Requires parenteral Iron/blood transfusion referral.'
      });
    } else if (currentVitals.hemoglobin < 10.0) {
      riskFactors.push({
        level: 'MODERATE',
        label: `Moderate Anemia (Hb ${currentVitals.hemoglobin} g/dL)`,
        reason: 'Requires double IFA dosage (2 tablets daily) and regional iron-rich nutrition.'
      });
    }
  }

  // Blood Sugar / Gestational Diabetes
  if (currentVitals.bloodSugarFasting >= 92) {
    riskFactors.push({
      level: 'HIGH',
      label: `Elevated Fasting Glucose (${currentVitals.bloodSugarFasting} mg/dL)`,
      reason: 'Indicative of Gestational Diabetes Mellitus (GDM). Requires OGTT confirmatory test.'
    });
  }

  // Gravida status
  if (patient.pregnancyDetails && patient.pregnancyDetails.gravida >= 4) {
    riskFactors.push({ level: 'MODERATE', label: 'Grand Multipara (Gravida ≥ 4)', reason: 'Increased risk of uterine atony and post-partum hemorrhage.' });
  }

  let overallRisk = 'NORMAL';
  if (riskFactors.some((r) => r.level === 'CRITICAL')) {
    overallRisk = 'CRITICAL_RISK';
  } else if (riskFactors.some((r) => r.level === 'HIGH')) {
    overallRisk = 'HIGH_RISK';
  } else if (riskFactors.length > 0) {
    overallRisk = 'MODERATE_RISK';
  }

  return {
    overallRisk,
    riskFactors,
    isHighRisk: overallRisk !== 'NORMAL'
  };
}
