// Comprehensive Regional Indian Food Database for AASHA Nutrition Engine
// Maps authentic, locally accessible, and affordable Indian ingredients across regions

export const REGIONAL_FOOD_DATABASE = [
  // ==================== NORTH INDIA ====================
  {
    id: 'NF-01',
    name: 'Sattu (Roasted Bengal Gram Flour)',
    localName: 'Roasted Gram Flour Drink',
    region: 'North India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_PROTEIN', 'HIGH_IRON', 'LOW_GLYCEMIC', 'HIGH_FIBER'],
    preparationTip: 'Mix with warm water or buttermilk with a pinch of roasted cumin and rock salt. Excellent cooling protein source.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Drink / Dough / Porridge'
  },
  {
    id: 'NF-02',
    name: 'Jaggery and Roasted Chana',
    localName: 'Gur & Bhuna Chana',
    region: 'North India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_IRON', 'ENERGY_DENSE', 'CALCIUM_RICH'],
    preparationTip: 'Consume a handful of roasted chana with a small piece of organic jaggery daily as an afternoon snack to combat anemia.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Snack'
  },
  {
    id: 'NF-03',
    name: 'Spinach & Fenugreek Saag with Pearl Millet Roti',
    localName: 'Palak-Methi Saag with Bajra Roti',
    region: 'North India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_IRON', 'FOLATE_RICH', 'HIGH_FIBER', 'LOW_GLYCEMIC'],
    preparationTip: 'Cook mixed green leafy vegetables with minimal mustard oil, garlic, and tomato. Squeeze fresh lemon to enhance iron absorption.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Main Meal'
  },
  {
    id: 'NF-04',
    name: 'Yellow Moong Dal & Vegetable Khichdi with Pure Ghee',
    localName: 'Moong Dal Khichdi',
    region: 'North India',
    categories: ['INFANT', 'ELDERLY', 'PREGNANT_WOMAN'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['EASILY_DIGESTIBLE', 'HIGH_PROTEIN', 'ENERGY_DENSE'],
    preparationTip: 'Well-cooked soft rice and yellow split moong dal mashed with carrots or bottle gourd and 1 tsp cow ghee. Ideal 7+ months weaning food and geriatric staple.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Soft Meal / Weaning'
  },
  {
    id: 'NF-05',
    name: 'Boiled Country Eggs / Egg Curry',
    localName: 'Desi Eggs',
    region: 'North India',
    categories: ['PREGNANT_WOMAN', 'INFANT', 'ELDERLY'],
    dietType: 'NON_VEGETARIAN',
    nutritionalStrengths: ['COMPLETE_PROTEIN', 'VITAMIN_B12', 'CHOLINE', 'IRON'],
    preparationTip: 'Boiled egg yolk mashed for infants (8+ months); whole hard-boiled egg with pepper for pregnant mothers.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Protein Add-on'
  },
  {
    id: 'NF-06',
    name: 'Indian Gooseberry & Seasonal Guava',
    localName: 'Amla & Fresh Guava',
    region: 'North India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['VITAMIN_C_DENSE', 'IMMUNITY_BOOSTER', 'HIGH_FIBER'],
    preparationTip: 'Eat fresh raw guava or drink raw amla juice. High Vitamin C content multiplies non-heme iron absorption significantly.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Fresh Fruit'
  },

  // ==================== SOUTH INDIA ====================
  {
    id: 'SF-01',
    name: 'Ragi Ganji / Ragi Porridge (Finger Millet)',
    localName: 'Finger Millet Porridge',
    region: 'South India',
    categories: ['PREGNANT_WOMAN', 'INFANT', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['CALCIUM_RICH', 'HIGH_IRON', 'LOW_GLYCEMIC', 'HIGH_FIBER'],
    preparationTip: 'Cook sprouted ragi flour in water or buttermilk for elderly, or with milk/jaggery for pregnant mothers and toddlers. Richest plant calcium source.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Porridge / Dumpling'
  },
  {
    id: 'SF-02',
    name: 'Drumstick Leaf Broth & Stir Fry (Moringa Leaves)',
    localName: 'Moringa Leaf Sambar / Stir Fry',
    region: 'South India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_IRON', 'FOLATE_RICH', 'CALCIUM_RICH', 'ANTIOXIDANT'],
    preparationTip: 'Saute fresh moringa leaves with shallots, garlic, and fresh grated coconut. Superfood for boosting maternal hemoglobin.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Side Dish / Broth'
  },
  {
    id: 'SF-03',
    name: 'Sprouted Green Gram Sundal',
    localName: 'Sprouted Moong Salad',
    region: 'South India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_PROTEIN', 'EASY_DIGESTION', 'FOLATE_RICH', 'LOW_GLYCEMIC'],
    preparationTip: 'Steam sprouted green gram with mustard tempering, curry leaves, and a squeeze of lime juice.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Healthy Snack'
  },
  {
    id: 'SF-04',
    name: 'Small River / Sea Fish Curry (Mathi / Anchovies)',
    localName: 'Small Fish Curry',
    region: 'South India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'NON_VEGETARIAN',
    nutritionalStrengths: ['OMEGA_3_FATTY_ACIDS', 'CALCIUM_RICH', 'HIGH_PROTEIN', 'VITAMIN_D'],
    preparationTip: 'Cook small fish whole with bones in a light tamarind, tomato, and fenugreek broth. Excellent for fetal brain development and bone strength.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Curry'
  },
  {
    id: 'SF-05',
    name: 'Steamed Idli with Vegetable Lentil Sambar',
    localName: 'Steamed Rice & Lentil Cakes',
    region: 'South India',
    categories: ['INFANT', 'ELDERLY', 'PREGNANT_WOMAN'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['FERMENTED_PROBIOTIC', 'EASILY_DIGESTIBLE', 'LOW_FAT'],
    preparationTip: 'Soft steamed fermented rice-lentil cakes mashed with mild lentil-vegetable sambar. Gentle on infant digestion (6+ mo) and geriatric digestive health.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Breakfast / Weaning'
  },

  // ==================== EAST INDIA ====================
  {
    id: 'EF-01',
    name: 'Red Amaranth Greens & Bengal Gram Dal',
    localName: 'Lal Shaak & Cholar Dal',
    region: 'East India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_IRON', 'FOLATE_RICH', 'HIGH_PROTEIN'],
    preparationTip: 'Gently tempered red amaranth or spinach stir-fried with nigella seeds and turmeric.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Main Course'
  },
  {
    id: 'EF-02',
    name: 'Light Freshwater Fish Stew with Green Papaya',
    localName: 'Macher Jhol with Raw Papaya',
    region: 'East India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'NON_VEGETARIAN',
    nutritionalStrengths: ['LEAN_PROTEIN', 'EASILY_DIGESTIBLE', 'OMEGA_3', 'PANTOTHENIC_ACID'],
    preparationTip: 'Light fish curry made with Rohu or Katla, green raw papaya, and potatoes in cumin-ginger broth. Very soothing and nourishing.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Lunch Staple'
  },
  {
    id: 'EF-03',
    name: 'Flattened Rice Porridge with Banana & Curd',
    localName: 'Poha with Banana & Yogurt',
    region: 'East India',
    categories: ['INFANT', 'PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_IRON', 'PROBIOTIC_GUT_HEALTH', 'ENERGY_DENSE'],
    preparationTip: 'Iron-rich flattened rice soaked soft, mixed with mashed sweet ripe banana and homemade fresh curd. Instant energy and gut comfort.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Morning Snack / Weaning'
  },
  {
    id: 'EF-04',
    name: 'Banana Blossom & Black Chana Stir Fry',
    localName: 'Banana Flower Curry',
    region: 'East India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['SUPER_HIGH_IRON', 'FIBER_DENSE', 'LOW_GLYCEMIC'],
    preparationTip: 'Boiled finely chopped banana blossom cooked with black chana and grated coconut. Outstanding natural anti-anemic recipe.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Traditional Vegetable Dish'
  },

  // ==================== WEST INDIA ====================
  {
    id: 'WF-01',
    name: 'Sorghum & Pearl Millet Flatbread with Fenugreek',
    localName: 'Jowar-Bajra Bhakri & Methi Thepla',
    region: 'West India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['LOW_GLYCEMIC', 'HIGH_IRON', 'HIGH_FIBER', 'GLUTEN_FREE'],
    preparationTip: 'Unrefined pearl millet flatbread served with garlic-flaxseed chutney for joint health and blood sugar regulation.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Main Bread'
  },
  {
    id: 'WF-02',
    name: 'Sesame & Jaggery Ladoo / Peanut Chikki',
    localName: 'Til-Gul Ladoo & Peanut Bar',
    region: 'West India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_CALCIUM', 'HIGH_IRON', 'HEALTHY_FATS'],
    preparationTip: 'Sesame seeds and roasted peanuts bound with sugarcane jaggery. One small ladoo provides substantial calcium and iron.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Nutritious Snack'
  },
  {
    id: 'WF-03',
    name: 'Sprouted Pulse Stew (Usal)',
    localName: 'Sprouted Moth Bean Curry',
    region: 'West India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_PROTEIN', 'LOW_FAT', 'EASILY_DIGESTIBLE'],
    preparationTip: 'Sprouted moth beans or mixed pulses lightly stewed with tomatoes and mild spices.',
    affordability: 'AFFORDABLE',
    stapleForm: 'Snack / Curry'
  },

  // ==================== CENTRAL INDIA ====================
  {
    id: 'CF-01',
    name: 'Broken Wheat Porridge with Carrots & Peas (Daliya)',
    localName: 'Daliya Vegetable Porridge',
    region: 'Central India',
    categories: ['INFANT', 'ELDERLY', 'PREGNANT_WOMAN'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['HIGH_FIBER', 'SLOW_BURNING_CARBS', 'LOW_GLYCEMIC'],
    preparationTip: 'Roasted broken wheat cooked soft with seasonal finely diced vegetables and a dollop of pure ghee.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Light Meal'
  },
  {
    id: 'CF-02',
    name: 'Indigenous Minor Millet Rice (Kodo / Kutki)',
    localName: 'Kodo Millet Steamed Grain',
    region: 'Central India',
    categories: ['PREGNANT_WOMAN', 'ELDERLY'],
    dietType: 'VEGETARIAN',
    nutritionalStrengths: ['MINERAL_DENSE', 'LOW_GLYCEMIC', 'HIGH_FIBER'],
    preparationTip: 'Indigenous minor millets cooked like steamed rice or porridge, highly beneficial for diabetic elderly and pregnant mothers.',
    affordability: 'VERY_AFFORDABLE',
    stapleForm: 'Staple Grain'
  }
];
