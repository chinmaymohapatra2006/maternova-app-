import React, { useState } from 'react';
import { getPersonalizedNutritionPlan } from '../../services/nutrition/nutritionEngine';
import { Badge } from '../common/Badge';
import {
  Utensils,
  Leaf,
  HeartPulse,
  Sparkles,
  Lightbulb
} from 'lucide-react';

export const NutritionAdvisor = ({ patient }) => {
  const [selectedDiet, setSelectedDiet] = useState(patient?.dietPreference || 'Vegetarian');

  if (!patient) return null;

  // Patient dietary plan
  const interactivePatient = {
    ...patient,
    dietPreference: selectedDiet
  };

  const plan = getPersonalizedNutritionPlan(interactivePatient, patient.latestVitals);

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-emerald-900 text-white p-5 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold">Wholesome Nutrition & Diet Guidance</h3>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Recommending authentic, accessible local ingredients and indigenous nutrition.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-800 px-3 py-1 rounded-full border border-emerald-600 font-semibold">
              Cohort: {patient.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Dietary Preference Filter */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-emerald-800 text-xs">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-300" />
            <span className="font-semibold text-emerald-200">Dietary Preference:</span>
          </div>
          <div className="flex items-center gap-2">
            {['Vegetarian', 'Non-Vegetarian'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-3 py-1 rounded-lg font-bold transition text-xs ${selectedDiet === diet ? 'bg-emerald-500 text-white shadow-xs' : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-800'}`}
              >
                {diet === 'Vegetarian' ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exclusive Breastfeeding Rule Banner for Young Infants */}
      {plan.exclusiveBreastfeedingOnly ? (
        <div className="bg-teal-50 border-2 border-teal-400 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-base">
            <Sparkles className="w-5 h-5 text-teal-600" />
            {plan.title}
          </div>
          <p className="text-sm font-semibold text-teal-800 bg-white p-3 rounded-xl border border-teal-200">
            {plan.primaryGuideline}
          </p>
          <div className="text-xs text-slate-700 space-y-1">
            <strong>Maternal Dietary Guidance:</strong> {plan.maternalDietAdvice}
          </div>
        </div>
      ) : (
        <>
          {/* Clinical Rationale & Priority Target Needs */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              Nutritional Priorities for this Patient
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {plan.targetNeeds.map((need, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-bold"
                >
                  ⚡ {need.replace('_', ' ')}
                </span>
              ))}
            </div>

            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              {plan.rationaleNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          {/* Recommended Food Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800">
              Curated Recommended Foods ({selectedDiet})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.recommendedFoods.map((food) => (
                <div
                  key={food.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">{food.name}</h5>
                        <span className="text-xs text-teal-700 font-semibold">{food.localName}</span>
                      </div>
                      <Badge variant={food.dietType === 'VEGETARIAN' ? 'emerald' : 'rose'} size="sm">
                        {food.dietType === 'VEGETARIAN' ? '🟢 Veg' : '🔴 Non-Veg'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {food.nutritionalStrengths.map((str, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold"
                        >
                          {str.replace('_', ' ')}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      <strong className="text-slate-800">Preparation & Intake:</strong> {food.preparationTip}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Form: <strong className="text-slate-700">{food.stapleForm}</strong></span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      {food.affordability.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kitchen Tip Card */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">ASHA Field Counseling Tip:</strong>
              <p className="mt-1 text-amber-800 leading-relaxed">{plan.localSeasonalTip}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
