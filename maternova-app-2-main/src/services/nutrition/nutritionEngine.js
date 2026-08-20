// Rule-Based Region-Specific Nutrition Recommendation Engine

import { REGIONAL_FOOD_DATABASE } from './regionalFoodDatabase';

export function getPersonalizedNutritionPlan(patient, vitals = null) {
  if (!patient) return null;

  const currentVitals = vitals || patient.latestVitals || {};
  const region = patient.region || 'North India';
  const dietPref = (patient.dietPreference || 'Vegetarian').toUpperCase();
  const category = patient.category;

  // 1. Identify Nutritional Priority Needs
  const targetNeeds = [];
  const rationaleNotes = [];

  if (category === 'PREGNANT_WOMAN') {
    targetNeeds.push('FOLATE_RICH', 'ENERGY_DENSE');
    rationaleNotes.push('Increased metabolic and caloric requirement for fetal gestation.');

    if (currentVitals.hemoglobin && currentVitals.hemoglobin < 11.0) {
      targetNeeds.push('HIGH_IRON', 'VITAMIN_C_DENSE');
      rationaleNotes.push(`Hemoglobin is ${currentVitals.hemoglobin} g/dL (Anemia). Prioritizing high-bioavailability iron and Vitamin C.`);
    }

    if (currentVitals.systolicBp >= 130 || currentVitals.diastolicBp >= 85) {
      targetNeeds.push('LOW_SODIUM', 'POTASSIUM_RICH');
      rationaleNotes.push('Elevated blood pressure observed. Restrict salted snacks and encourage natural potassium.');
    }

    targetNeeds.push('CALCIUM_RICH');
    rationaleNotes.push('Skeletal mineralization for growing baby and maternal bone conservation.');
  } else if (category === 'INFANT') {
    const ageMonths = patient.dob ? Math.floor((new Date() - new Date(patient.dob)) / (1000 * 60 * 60 * 24 * 30.4)) : 6;
    if (ageMonths < 6) {
      return {
        exclusiveBreastfeedingOnly: true,
        title: 'Exclusive Breastfeeding (0-6 Months)',
        primaryGuideline: 'DO NOT give water, ghutti, honey, or animal milk. Give ONLY mother’s milk on demand (8-12 times in 24 hours).',
        recommendedFoods: [],
        maternalDietAdvice: 'Mothers should consume high-protein, galactagogue foods like Sattu, Methi, and Drumstick leaves.',
        rationaleNotes: ['Infant is under 6 months. Gut mucosal barrier is fragile and breastfeeding provides complete immunity and hydration.']
      };
    } else {
      targetNeeds.push('EASILY_DIGESTIBLE', 'ENERGY_DENSE', 'HIGH_PROTEIN');
      rationaleNotes.push(`Infant is ${ageMonths} months old. Complementary feeding must be thick, semi-solid, nutrient-rich with added ghee/oil.`);
    }
  } else if (category === 'ELDERLY') {
    targetNeeds.push('EASILY_DIGESTIBLE', 'HIGH_FIBER');
    rationaleNotes.push('Age-related slowed gastric motility and muscle preservation.');

    if (currentVitals.systolicBp >= 140 || currentVitals.diastolicBp >= 90) {
      targetNeeds.push('LOW_SODIUM', 'LOW_GLYCEMIC');
      rationaleNotes.push('Hypertension management: strict reduction of pickles, papad, and table salt.');
    }

    if (currentVitals.bloodSugarFasting >= 126 || currentVitals.bloodSugarPostPrandial >= 200) {
      targetNeeds.push('LOW_GLYCEMIC', 'HIGH_FIBER');
      rationaleNotes.push('Elevated glycemic parameters: switch to unpolished millets, lentils, and bitter vegetables.');
    }

    targetNeeds.push('CALCIUM_RICH');
    rationaleNotes.push('Osteopenia and joint health support.');
  }

  // 2. Filter Regional Foods
  let matchedFoods = REGIONAL_FOOD_DATABASE.filter((food) => {
    // Check Category
    const categoryMatch = food.categories.includes(category);
    // Check Region (Primary match or fallback if needed)
    const regionMatch = food.region === region;
    // Check Diet Preference (If Vegetarian, do not recommend Non-Veg foods)
    const dietMatch = dietPref.includes('NON') ? true : food.dietType === 'VEGETARIAN';

    return categoryMatch && regionMatch && dietMatch;
  });

  // If few regional items found, supplement with universal items from other regions
  if (matchedFoods.length < 3) {
    const backupFoods = REGIONAL_FOOD_DATABASE.filter(
      (food) => food.categories.includes(category) && (dietPref.includes('NON') ? true : food.dietType === 'VEGETARIAN')
    );
    matchedFoods = [...new Set([...matchedFoods, ...backupFoods])];
  }

  // Score foods based on matching target needs
  const scoredFoods = matchedFoods.map((food) => {
    let score = 1;
    food.nutritionalStrengths.forEach((strength) => {
      if (targetNeeds.includes(strength)) {
        score += 2;
      }
    });
    return { ...food, score };
  });

  // Sort by highest relevance score
  scoredFoods.sort((a, b) => b.score - a.score);

  return {
    patientCategory: category,
    region,
    dietPreference: patient.dietPreference || 'Vegetarian',
    targetNeeds: [...new Set(targetNeeds)],
    rationaleNotes,
    recommendedFoods: scoredFoods.slice(0, 6),
    localSeasonalTip: getSeasonalRegionalTip(region, category)
  };
}

function getSeasonalRegionalTip(region, category) {
  if (region === 'North India') {
    return 'Encourage fresh seasonal leafy vegetables (Bathua/Sarson/Palak) and roasted Chana-Gur snacks. Use iron cooking utensils (Loha Kadhai) to naturally fortify meals.';
  } else if (region === 'South India') {
    return 'Incorporate fresh Drumstick leaves (Murungai) twice a week and replace refined white rice with Ragi (finger millet) Ganji once a day.';
  } else if (region === 'East India') {
    return 'Add boiled raw papaya and light Rohu fish stew (Macher Jhol) for convalescent nourishment. Mix flattened iron rice (Chira) with fresh curd for gut health.';
  } else if (region === 'West India') {
    return 'Use Jowar and Bajra Bhakri with garlic-flaxseed chutney for excellent blood pressure regulation and high fiber.';
  }
  return 'Emphasize local pulses, whole grains, seasonal citrus fruits, and adequate hydration with boiled lukewarm water.';
}
