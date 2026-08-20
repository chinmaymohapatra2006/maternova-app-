// Selective AI Health Insights & Longitudinal Trend Analyzer
// Provides explainable patterns, risk summaries, and clinical digests for Doctors & ASHA workers

import { evaluateBloodPressure, evaluateBloodSugar, evaluateHemoglobin } from '../rules/vitalsTriageRules';

export function analyzePatientHealthTrajectory(patient, vitalsHistory = [], reports = [], vaccinations = []) {
  if (!patient) return null;

  const category = patient.category;
  const sortedVitals = [...vitalsHistory].sort((a, b) => new Date(a.date) - new Date(b.date));
  const latestVital = sortedVitals.length > 0 ? sortedVitals[sortedVitals.length - 1] : (patient.latestVitals || {});
  const previousVital = sortedVitals.length > 1 ? sortedVitals[sortedVitals.length - 2] : null;

  const insights = [];
  const flags = [];
  let riskScore = 10; // Base score (out of 100)

  // 1. Longitudinal BP Trajectory
  if (sortedVitals.length >= 2) {
    const bpReadings = sortedVitals.filter((v) => v.systolicBp && v.diastolicBp);
    if (bpReadings.length >= 2) {
      const recent = bpReadings[bpReadings.length - 1];
      const prior = bpReadings[bpReadings.length - 2];
      const systolicDelta = recent.systolicBp - prior.systolicBp;

      if (systolicDelta >= 10 && recent.systolicBp >= 135) {
        flags.push({
          type: 'BP_ESCALATION',
          severity: 'HIGH',
          title: 'Upward Blood Pressure Trajectory Detected',
          message: `Systolic BP increased by +${systolicDelta} mmHg from prior visit (${prior.systolicBp} → ${recent.systolicBp} mmHg).`,
          recommendation: 'Requires medical officer review and weekly surveillance to rule out pre-eclampsia / hypertensive urgency.'
        });
        riskScore += 35;
      }
    }
  }

  // 2. Hemoglobin & Anemia Progression
  if (latestVital.hemoglobin) {
    const hb = parseFloat(latestVital.hemoglobin);
    if (hb < 9.0) {
      flags.push({
        type: 'SEVERE_ANEMIA_ALERT',
        severity: 'CRITICAL',
        title: `Low Hemoglobin Level (${hb} g/dL)`,
        message: 'Patient has significant microcytic/iron deficiency anemia.',
        recommendation: 'Ensure 2 daily IFA tablets, explore IV Iron sucrose if in 3rd trimester, reinforce Moringa & Jaggery foods.'
      });
      riskScore += 30;
    } else if (hb < 11.0) {
      riskScore += 15;
    }
  }

  // 3. Category Specific Analysis
  if (category === 'PREGNANT_WOMAN') {
    const preg = patient.pregnancyDetails || {};
    if (preg.trimester === 3 && latestVital.systolicBp >= 140) {
      insights.push('Third trimester hypertensive state requires vigilance for symptoms of sudden epigastric pain, visual disturbance, or hyperreflexia.');
    }
    if (preg.ifaTabletsGiven < 100 && (preg.gestationalWeeks || 0) > 28) {
      flags.push({
        type: 'IFA_SUPPLEMENT_GAP',
        severity: 'MEDIUM',
        title: 'IFA Tablet Compliance Gap',
        message: `Only ${preg.ifaTabletsGiven || 0} tablets logged against standard 180 required tablets.`,
        recommendation: 'ASHA worker to deliver remaining IFA stock during next home visit.'
      });
      riskScore += 15;
    }
  } else if (category === 'INFANT') {
    // Growth check
    if (sortedVitals.length >= 2) {
      const w1 = sortedVitals[sortedVitals.length - 2].weightKg;
      const w2 = sortedVitals[sortedVitals.length - 1].weightKg;
      if (w1 && w2 && w2 < w1) {
        flags.push({
          type: 'WEIGHT_FALTERING',
          severity: 'CRITICAL',
          title: 'Weight Loss / Growth Faltering Alert',
          message: `Weight declined from ${w1} kg to ${w2} kg over consecutive visits.`,
          recommendation: 'Immediate feeding evaluation, check for persistent diarrhea or acute respiratory infection.'
        });
        riskScore += 40;
      }
    }

    // Overdue vaccines
    const overdueCount = vaccinations.filter((v) => v.status === 'OVERDUE').length;
    if (overdueCount > 0) {
      flags.push({
        type: 'VACCINE_OVERDUE',
        severity: 'HIGH',
        title: `${overdueCount} Overdue Immunization(s)`,
        message: 'Infant has missed scheduled UIP vaccine milestone window.',
        recommendation: 'Prioritize home mobilization for upcoming Village Health Sanitation and Nutrition Day (VHSND).'
      });
      riskScore += 25;
    }
  } else if (category === 'ELDERLY') {
    if (latestVital.bloodSugarFasting >= 160 || latestVital.bloodSugarPostPrandial >= 220) {
      flags.push({
        type: 'UNCONTROLLED_GLYCEMIA',
        severity: 'HIGH',
        title: 'Uncontrolled Blood Sugar Levels',
        message: `Fasting ${latestVital.bloodSugarFasting || 'N/A'} mg/dL / PP ${latestVital.bloodSugarPostPrandial || 'N/A'} mg/dL exceed safe thresholds.`,
        recommendation: 'Consult PHC doctor for anti-diabetic medication titration and renal function check.'
      });
      riskScore += 30;
    }
  }

  // Generate Doctor Case Summary
  const doctorDigest = generateClinicalDoctorDigest(patient, latestVital, flags, sortedVitals);

  return {
    patientId: patient.id,
    patientName: patient.name,
    category,
    riskScore: Math.min(100, riskScore),
    triageBand: riskScore >= 50 ? 'HIGH_RISK' : riskScore >= 25 ? 'MODERATE_RISK' : 'STABLE',
    flags,
    insights,
    doctorDigest,
    analyzedAt: new Date().toISOString()
  };
}

function generateClinicalDoctorDigest(patient, latestVital, flags, vitalsHistory) {
  const parts = [];
  parts.push(`Patient ${patient.name} (${patient.age}y, ${patient.gender}) from ${patient.village || patient.address}.`);

  if (patient.category === 'PREGNANT_WOMAN') {
    const p = patient.pregnancyDetails || {};
    parts.push(`G${p.gravida || 1}P${p.para || 0}, ${p.gestationalWeeks || 'N/A'} weeks gestation (EDD: ${p.edd || 'N/A'}).`);
    parts.push(`Latest BP: ${latestVital.systolicBp || '--'}/${latestVital.diastolicBp || '--'} mmHg, Hb: ${latestVital.hemoglobin || '--'} g/dL.`);
  } else if (patient.category === 'INFANT') {
    const inf = patient.infantDetails || {};
    parts.push(`Infant profile. Feeding: ${inf.feedingType || 'Breastfed'}. Current weight: ${latestVital.weightKg || '--'} kg.`);
  } else if (patient.category === 'ELDERLY') {
    const eld = patient.elderlyDetails || {};
    parts.push(`Geriatric profile. Known conditions: ${(eld.conditions || []).join(', ') || 'None'}.`);
    parts.push(`BP: ${latestVital.systolicBp || '--'}/${latestVital.diastolicBp || '--'} mmHg, Fasting Sugar: ${latestVital.bloodSugarFasting || '--'} mg/dL.`);
  }

  if (flags.length > 0) {
    parts.push(`Active alerts: ${flags.map((f) => f.title).join('; ')}.`);
  } else {
    parts.push('Clinical trajectory appears stable with no acute escalation indicators.');
  }

  return parts.join(' ');
}
