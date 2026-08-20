// Universal Immunization Programme (UIP) India Rule Engine & Growth Analysis

export const UIP_VACCINATION_SCHEDULE = [
  {
    code: 'BCG',
    name: 'BCG',
    targetAgeDays: 0,
    targetAgeLabel: 'At Birth (up to 1 yr)',
    description: 'Tuberculosis protection',
    dose: '0.1 ml (0.05 ml <1 month)',
    route: 'Intra-dermal (Left upper arm)'
  },
  {
    code: 'OPV-0',
    name: 'Oral Polio Vaccine (Birth dose)',
    targetAgeDays: 0,
    targetAgeLabel: 'At Birth (within 15 days)',
    description: 'Polio protection',
    dose: '2 drops',
    route: 'Oral'
  },
  {
    code: 'HEP-B-0',
    name: 'Hepatitis B (Birth dose)',
    targetAgeDays: 0,
    targetAgeLabel: 'At Birth (within 24 hrs)',
    description: 'Hepatitis B viral protection',
    dose: '0.5 ml',
    route: 'Intra-muscular (Anterolateral mid-thigh)'
  },
  {
    code: 'OPV-1',
    name: 'OPV 1',
    targetAgeDays: 42, // 6 weeks
    targetAgeLabel: '6 Weeks',
    description: 'Polio protection dose 1',
    dose: '2 drops',
    route: 'Oral'
  },
  {
    code: 'PENTA-1',
    name: 'Pentavalent 1',
    targetAgeDays: 42,
    targetAgeLabel: '6 Weeks',
    description: 'Diphtheria, Pertussis, Tetanus, Hep B, Hib',
    dose: '0.5 ml',
    route: 'Intra-muscular (Left mid-thigh)'
  },
  {
    code: 'ROTA-1',
    name: 'Rotavirus 1',
    targetAgeDays: 42,
    targetAgeLabel: '6 Weeks',
    description: 'Rotavirus Diarrhea prevention',
    dose: '5 drops / 2.5 ml',
    route: 'Oral'
  },
  {
    code: 'fIPV-1',
    name: 'Fractional IPV 1',
    targetAgeDays: 42,
    targetAgeLabel: '6 Weeks',
    description: 'Inactivated Polio Vaccine',
    dose: '0.1 ml',
    route: 'Intra-dermal (Right upper arm)'
  },
  {
    code: 'PCV-1',
    name: 'PCV 1 (Pneumococcal)',
    targetAgeDays: 42,
    targetAgeLabel: '6 Weeks',
    description: 'Pneumonia and meningitis protection',
    dose: '0.5 ml',
    route: 'Intra-muscular (Right mid-thigh)'
  },
  {
    code: 'OPV-2',
    name: 'OPV 2',
    targetAgeDays: 70, // 10 weeks
    targetAgeLabel: '10 Weeks',
    description: 'Polio protection dose 2',
    dose: '2 drops',
    route: 'Oral'
  },
  {
    code: 'PENTA-2',
    name: 'Pentavalent 2',
    targetAgeDays: 70,
    targetAgeLabel: '10 Weeks',
    description: 'Pentavalent dose 2',
    dose: '0.5 ml',
    route: 'Intra-muscular (Left mid-thigh)'
  },
  {
    code: 'ROTA-2',
    name: 'Rotavirus 2',
    targetAgeDays: 70,
    targetAgeLabel: '10 Weeks',
    description: 'Rotavirus dose 2',
    dose: '5 drops / 2.5 ml',
    route: 'Oral'
  },
  {
    code: 'OPV-3',
    name: 'OPV 3',
    targetAgeDays: 98, // 14 weeks
    targetAgeLabel: '14 Weeks',
    description: 'Polio protection dose 3',
    dose: '2 drops',
    route: 'Oral'
  },
  {
    code: 'PENTA-3',
    name: 'Pentavalent 3',
    targetAgeDays: 98,
    targetAgeLabel: '14 Weeks',
    description: 'Pentavalent dose 3',
    dose: '0.5 ml',
    route: 'Intra-muscular (Left mid-thigh)'
  },
  {
    code: 'ROTA-3',
    name: 'Rotavirus 3',
    targetAgeDays: 98,
    targetAgeLabel: '14 Weeks',
    description: 'Rotavirus dose 3',
    dose: '5 drops / 2.5 ml',
    route: 'Oral'
  },
  {
    code: 'fIPV-2',
    name: 'Fractional IPV 2',
    targetAgeDays: 98,
    targetAgeLabel: '14 Weeks',
    description: 'Fractional Inactivated Polio 2',
    dose: '0.1 ml',
    route: 'Intra-dermal'
  },
  {
    code: 'PCV-2',
    name: 'PCV 2',
    targetAgeDays: 98,
    targetAgeLabel: '14 Weeks',
    description: 'Pneumococcal dose 2',
    dose: '0.5 ml',
    route: 'Intra-muscular'
  },
  {
    code: 'MR-1',
    name: 'Measles & Rubella 1 (MR-1)',
    targetAgeDays: 270, // 9 completed months
    targetAgeLabel: '9-12 Months',
    description: 'Measles & Rubella protection',
    dose: '0.5 ml',
    route: 'Sub-cutaneous (Right upper arm)'
  },
  {
    code: 'VIT-A-1',
    name: 'Vitamin A (1st Dose)',
    targetAgeDays: 270,
    targetAgeLabel: '9 Months (with MR-1)',
    description: 'Night blindness & immunity protection',
    dose: '1 ml (1 lakh IU)',
    route: 'Oral'
  },
  {
    code: 'PCV-BOOSTER',
    name: 'PCV Booster',
    targetAgeDays: 270,
    targetAgeLabel: '9 Months',
    description: 'Pneumococcal conjugate booster',
    dose: '0.5 ml',
    route: 'Intra-muscular'
  },
  {
    code: 'MR-2',
    name: 'Measles & Rubella 2 (MR-2)',
    targetAgeDays: 485, // 16-24 months
    targetAgeLabel: '16-24 Months',
    description: 'Measles & Rubella dose 2',
    dose: '0.5 ml',
    route: 'Sub-cutaneous'
  },
  {
    code: 'DPT-BOOSTER-1',
    name: 'DPT Booster 1',
    targetAgeDays: 485,
    targetAgeLabel: '16-24 Months',
    description: 'Diphtheria, Pertussis, Tetanus Booster 1',
    dose: '0.5 ml',
    route: 'Intra-muscular'
  },
  {
    code: 'OPV-BOOSTER',
    name: 'OPV Booster',
    targetAgeDays: 485,
    targetAgeLabel: '16-24 Months',
    description: 'Polio booster dose',
    dose: '2 drops',
    route: 'Oral'
  },
  {
    code: 'DPT-BOOSTER-2',
    name: 'DPT Booster 2',
    targetAgeDays: 1825, // 5-6 years
    targetAgeLabel: '5-6 Years',
    description: 'DPT Booster dose 2',
    dose: '0.5 ml',
    route: 'Intra-muscular'
  }
];

// Helper: Calculate age in days, weeks, months from DOB
export function calculateAgeDetails(dobString) {
  if (!dobString) return { days: 0, weeks: 0, months: 0, years: 0, formatted: 'Unknown' };
  const birth = new Date(dobString);
  const now = new Date();
  const diffTime = Math.max(0, now - birth);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.4375);
  const years = Math.floor(days / 365.25);

  let formatted = '';
  if (days < 30) {
    formatted = `${days} Days (${weeks} Weeks)`;
  } else if (months < 24) {
    formatted = `${months} Months (${weeks} Weeks)`;
  } else {
    formatted = `${years} Years ${months % 12} Months`;
  }

  return { days, weeks, months, years, formatted };
}

// Compute full immunization status based on DOB and recorded vaccines
export function evaluateInfantImmunizations(dobString, administeredVaccines = []) {
  const ageDetails = calculateAgeDetails(dobString);
  const birthDate = new Date(dobString);

  return UIP_VACCINATION_SCHEDULE.map((vaccine) => {
    const administered = administeredVaccines.find(
      (v) => v.vaccineCode === vaccine.code && (v.status === 'GIVEN' || v.dateAdministered)
    );

    const dueDate = new Date(birthDate);
    dueDate.setDate(dueDate.getDate() + vaccine.targetAgeDays);
    const dueDateStr = dueDate.toISOString().split('T')[0];

    if (administered) {
      return {
        ...vaccine,
        status: 'GIVEN',
        dueDate: dueDateStr,
        dateAdministered: administered.dateAdministered || administered.date,
        batchNumber: administered.batchNumber || 'N/A',
        center: administered.center || 'Health Centre',
        isOverdue: false
      };
    }

    const isPastDue = ageDetails.days >= vaccine.targetAgeDays;
    const isGracePeriodOver = ageDetails.days > vaccine.targetAgeDays + 21; // 3 weeks grace period

    let status = 'UPCOMING';
    if (isGracePeriodOver) {
      status = 'OVERDUE';
    } else if (isPastDue) {
      status = 'DUE';
    }

    return {
      ...vaccine,
      status,
      dueDate: dueDateStr,
      dateAdministered: null,
      batchNumber: null,
      center: null,
      isOverdue: status === 'OVERDUE'
    };
  });
}

// Evaluate infant growth status (WHO weight-for-age standard approximations)
export function evaluateInfantGrowth(ageMonths, weightKg, gender = 'MALE') {
  if (!weightKg || ageMonths === undefined) return { status: 'NORMAL', label: 'Adequate Growth', color: 'emerald' };

  // Approximate median & -2SD/-3SD curves for Indian/WHO charts
  const isBoy = (gender || '').toUpperCase() === 'MALE';
  const expectedMedian = isBoy ? 3.3 + ageMonths * 0.6 : 3.2 + ageMonths * 0.55;
  const severeUnderweightCutoff = expectedMedian * 0.65;
  const moderateUnderweightCutoff = expectedMedian * 0.8;

  if (weightKg < severeUnderweightCutoff) {
    return {
      status: 'SEVERELY_UNDERWEIGHT',
      label: 'Severely Underweight (SAM Flag)',
      description: 'Weight significantly below WHO standards. Immediate referral to Nutrition Rehabilitation Centre (NRC) required.',
      color: 'rose'
    };
  }

  if (weightKg < moderateUnderweightCutoff) {
    return {
      status: 'MODERATELY_UNDERWEIGHT',
      label: 'Moderately Underweight (MAM)',
      description: 'Weight faltering observed. Advise frequent calorie-dense complementary feeding, extra oil/ghee, and weekly monitoring.',
      color: 'amber'
    };
  }

  return {
    status: 'NORMAL',
    label: 'Normal Growth',
    description: 'Infant growth tracking along healthy developmental trajectory.',
    color: 'emerald'
  };
}
