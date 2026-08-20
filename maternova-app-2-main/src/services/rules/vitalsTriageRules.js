// Vitals Evaluation & Clinical Triage Rule Engine

// Blood Pressure Classification (JNC 8 & Indian Hypertension Guidelines)
export function evaluateBloodPressure(systolic, diastolic, isPregnant = false) {
  if (!systolic || !diastolic) return { category: 'UNKNOWN', label: 'Not Recorded', color: 'gray' };

  if (isPregnant) {
    if (systolic >= 160 || diastolic >= 110) {
      return {
        category: 'SEVERE_HYPERTENSION',
        label: 'Severe Hypertensive Emergency (Pregnancy)',
        color: 'rose',
        urgent: true,
        action: 'Immediate referral to District Hospital / FRU for antihypertensive stabilization.'
      };
    }
    if (systolic >= 140 || diastolic >= 90) {
      return {
        category: 'GESTATIONAL_HYPERTENSION',
        label: 'Elevated BP (Pre-eclampsia Risk)',
        color: 'rose',
        urgent: true,
        action: 'Weekly BP tracking, urine albumin test, and consultation with Medical Officer.'
      };
    }
    if (systolic >= 130 || diastolic >= 85) {
      return {
        category: 'BORDERLINE',
        label: 'Borderline Elevated BP',
        color: 'amber',
        urgent: false,
        action: 'Dietary salt restriction, reduce stress, monitor weekly.'
      };
    }
    return {
      category: 'OPTIMAL',
      label: 'Normal Blood Pressure',
      color: 'emerald',
      urgent: false,
      action: 'Routine maternal monitoring.'
    };
  }

  // General / Elderly Staging
  if (systolic >= 180 || diastolic >= 120) {
    return {
      category: 'HYPERTENSIVE_CRISIS',
      label: 'Hypertensive Crisis (Urgent)',
      color: 'rose',
      urgent: true,
      action: 'Immediate medical attention required to prevent stroke or myocardial infarction.'
    };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return {
      category: 'STAGE_2_HYPERTENSION',
      label: 'Stage 2 Hypertension',
      color: 'rose',
      urgent: false,
      action: 'Requires physician review for anti-hypertensive medication dosage adjustment.'
    };
  }
  if (systolic >= 130 || diastolic >= 80) {
    return {
      category: 'STAGE_1_HYPERTENSION',
      label: 'Stage 1 Hypertension',
      color: 'amber',
      urgent: false,
      action: 'Lifestyle modification, low sodium diet, regular morning walking.'
    };
  }
  if (systolic < 90 || diastolic < 60) {
    return {
      category: 'HYPOTENSION',
      label: 'Low Blood Pressure (Hypotension)',
      color: 'amber',
      urgent: false,
      action: 'Check for dehydration or weakness. Increase oral fluid intake.'
    };
  }
  return {
    category: 'NORMAL',
    label: 'Normal Blood Pressure',
    color: 'emerald',
    urgent: false,
    action: 'Healthy range maintained.'
  };
}

// Blood Sugar Classification (ADA / ICMR Guidelines)
export function evaluateBloodSugar(fasting, postPrandial) {
  if (!fasting && !postPrandial) return { category: 'UNKNOWN', label: 'Not Recorded', color: 'gray' };

  let fastingStatus = 'NORMAL';
  if (fasting) {
    if (fasting >= 126) fastingStatus = 'DIABETIC';
    else if (fasting >= 100) fastingStatus = 'PREDIABETIC';
  }

  let ppStatus = 'NORMAL';
  if (postPrandial) {
    if (postPrandial >= 200) ppStatus = 'DIABETIC';
    else if (postPrandial >= 140) ppStatus = 'PREDIABETIC';
  }

  if (fastingStatus === 'DIABETIC' || ppStatus === 'DIABETIC') {
    return {
      category: 'UNCONTROLLED_DIABETES',
      label: 'Elevated Blood Sugar (Diabetic Range)',
      color: 'rose',
      urgent: false,
      action: 'Doctor consultation needed for glycemic control and HbA1c testing.'
    };
  }
  if (fastingStatus === 'PREDIABETIC' || ppStatus === 'PREDIABETIC') {
    return {
      category: 'PREDIABETES',
      label: 'Impaired Glycemia (Prediabetes)',
      color: 'amber',
      urgent: false,
      action: 'Low glycemic diet, eliminate refined sugars, daily physical activity.'
    };
  }
  return {
    category: 'NORMAL',
    label: 'Normal Glycemic Level',
    color: 'emerald',
    urgent: false,
    action: 'Maintain balanced diet.'
  };
}

// Hemoglobin Evaluation
export function evaluateHemoglobin(hb, isPregnant = false) {
  if (!hb) return { category: 'UNKNOWN', label: 'Not Recorded', color: 'gray' };

  const num = parseFloat(hb);
  if (num < 7.0) {
    return {
      category: 'SEVERE_ANEMIA',
      label: 'Severe Anemia (Hb < 7.0 g/dL)',
      color: 'rose',
      urgent: true,
      action: 'Critical! Urgent referral for parenteral Iron sucrose or transfusion evaluation.'
    };
  }
  if (num < (isPregnant ? 10.0 : 11.0)) {
    return {
      category: 'MODERATE_ANEMIA',
      label: `Moderate Anemia (Hb ${num} g/dL)`,
      color: 'amber',
      urgent: false,
      action: 'Prescribe therapeutic Iron Folic Acid (2 tablets/day) + iron-rich local diet.'
    };
  }
  if (num < (isPregnant ? 11.0 : 12.0)) {
    return {
      category: 'MILD_ANEMIA',
      label: `Mild Anemia (Hb ${num} g/dL)`,
      color: 'yellow',
      urgent: false,
      action: 'Prophylactic IFA supplement and Vitamin C rich foods.'
    };
  }
  return {
    category: 'NORMAL',
    label: `Normal Hemoglobin (${num} g/dL)`,
    color: 'emerald',
    urgent: false,
    action: 'Adequate iron stores.'
  };
}

// BMI Calculator & Classifier
export function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);
  const val = parseFloat(bmi);

  let category = 'NORMAL';
  let color = 'emerald';
  let label = 'Normal Weight';

  if (val < 18.5) {
    category = 'UNDERWEIGHT';
    color = 'amber';
    label = 'Underweight';
  } else if (val >= 25 && val < 30) {
    category = 'OVERWEIGHT';
    color = 'yellow';
    label = 'Overweight';
  } else if (val >= 30) {
    category = 'OBESE';
    color = 'rose';
    label = 'Obese';
  }

  return { value: val, category, color, label };
}
