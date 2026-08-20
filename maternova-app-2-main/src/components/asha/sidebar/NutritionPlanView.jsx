import React, { useState } from 'react';
import { REGIONAL_FOOD_DATABASE } from '../../../services/nutrition/regionalFoodDatabase';
import { Badge } from '../../common/Badge';
import {
  Utensils,
  Heart,
  Baby,
  User,
  Sparkles,
  Search,
  CheckCircle2,
  Salad,
  Flame,
  ShieldCheck,
  Apple
} from 'lucide-react';

export const NutritionPlanView = () => {
  const [selectedCohort, setSelectedCohort] = useState('ALL');
  const [selectedNutrientFocus, setSelectedNutrientFocus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = REGIONAL_FOOD_DATABASE.filter((food) => {
    if (selectedCohort !== 'ALL' && !food.categories.includes(selectedCohort)) return false;
    if (selectedNutrientFocus !== 'ALL' && !food.nutritionalStrengths.includes(selectedNutrientFocus)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        food.name.toLowerCase().includes(q) ||
        food.localName.toLowerCase().includes(q) ||
        food.preparationTip.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-amber-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-amber-600/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600/50 flex items-center justify-center text-xl shadow-xs">
              🥗
            </div>
            <div>
              <h2 className="text-lg font-bold">Community Nutrition & Diet Guidance</h2>
              <span className="text-xs text-amber-200">
                Wholesome, Indigenous & Affordable Foods for Maternal, Child & Geriatric Care
              </span>
            </div>
          </div>
          <p className="text-xs text-amber-100/90">
            Practical dietary counseling using universally accessible rural staples like Sattu, Jaggery-Chana, Ragi, Moringa, and Moong Dal Khichdi.
          </p>
        </div>

        <div className="bg-black/20 px-4 py-2 rounded-2xl border border-white/10 text-xs">
          <span className="text-amber-200 block text-[10px] uppercase font-bold">Total Wholesome Foods</span>
          <span className="text-base font-black text-white">{REGIONAL_FOOD_DATABASE.length} Recipes & Staples</span>
        </div>
      </div>

      {/* 2. Core Nutrient Pillars & Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1 */}
        <div className="p-5 bg-rose-50 border-2 border-rose-200 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-rose-900 text-xs">
            <Heart className="w-4 h-4 text-rose-600" /> Maternal Nutrition & Anti-Anemia
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Ensure daily <strong>Iron Folic Acid (IFA)</strong> with Vitamin C sources (Amla, Guava, Lemon). Recommend roasted Chana with Jaggery (Gur) and green leafy vegetables.
          </p>
          <div className="pt-1 text-[11px] text-rose-800 font-bold">
            Key: Never take tea/coffee immediately after iron tablets.
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 bg-teal-50 border-2 border-teal-200 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-teal-900 text-xs">
            <Baby className="w-4 h-4 text-teal-600" /> Infant Weaning & Growth (6-24 Mo)
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Start soft complementary feeding at 6 completed months. Feed thick mashed <strong>Yellow Moong Khichdi</strong> with 1 tsp Cow Ghee, Ragi porridge, and boiled mashed seasonal vegetables.
          </p>
          <div className="pt-1 text-[11px] text-teal-800 font-bold">
            Key: Continue frequent breastfeeding alongside solid feeds.
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 bg-indigo-50 border-2 border-indigo-200 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-indigo-900 text-xs">
            <User className="w-4 h-4 text-indigo-600" /> Geriatric & Chronic NCD Control
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Replace refined white rice/maida with unrefined <strong>Millets (Jowar, Bajra, Ragi)</strong> and broken wheat (Daliya). Strictly limit salt to &lt;1 tsp/day to keep BP under control.
          </p>
          <div className="pt-1 text-[11px] text-indigo-800 font-bold">
            Key: Drink adequate warm water and maintain gentle daily walking.
          </div>
        </div>
      </div>

      {/* 3. General Search & Target Beneficiary Filter (NO Region Switcher) */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by food name, nutrient benefit or preparation..."
              className="input-field pl-10 text-xs py-2"
            />
          </div>

          {/* Beneficiary Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'All Beneficiaries' },
              { id: 'PREGNANT_WOMAN', label: 'Pregnant Mothers' },
              { id: 'INFANT', label: 'Infants & Children' },
              { id: 'ELDERLY', label: 'Elderly Citizens' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCohort(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCohort === tab.id ? 'bg-amber-800 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nutritional Focus Quick Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-600">Nutritional Strength:</span>
          {[
            { id: 'ALL', label: 'All Nutrients' },
            { id: 'HIGH_IRON', label: 'Iron-Rich' },
            { id: 'HIGH_PROTEIN', label: 'High Protein' },
            { id: 'CALCIUM_RICH', label: 'Calcium-Rich' },
            { id: 'LOW_GLYCEMIC', label: 'Low-Sugar / Diabetic Friendly' },
            { id: 'EASILY_DIGESTIBLE', label: 'Easy Digestion' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedNutrientFocus(pill.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${selectedNutrientFocus === pill.id ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Wholesome Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="p-5 bg-white border-2 border-amber-200/80 rounded-3xl hover:border-amber-500 hover:shadow-md transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{food.name}</h4>
                  <span className="text-xs font-bold text-amber-800">{food.localName}</span>
                </div>
                <Badge variant={food.dietType === 'VEGETARIAN' ? 'emerald' : 'rose'} size="sm">
                  {food.dietType}
                </Badge>
              </div>

              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
                <span className="font-semibold text-amber-900">Form: {food.stapleForm}</span>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-100 text-xs text-slate-700 leading-relaxed">
                <strong>Preparation & Intake:</strong> {food.preparationTip}
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {food.nutritionalStrengths.map((str, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold border border-slate-200">
                    ⚡ {str.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-bold">
              <span>✓ {food.affordability.replace('_', ' ')}</span>
              <span className="text-[11px] text-slate-400">Village Staple</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
