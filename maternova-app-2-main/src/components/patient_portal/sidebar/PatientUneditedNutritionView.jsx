import React from 'react';
import { getPersonalizedNutritionPlan } from '../../../services/nutrition/nutritionEngine';
import { Badge } from '../../common/Badge';
import {
  Utensils,
  Lock,
  Sparkles,
  Heart,
  Baby,
  User,
  ShieldCheck,
  CheckCircle2,
  Salad
} from 'lucide-react';

export const PatientUneditedNutritionView = ({ patient }) => {
  if (!patient) return null;

  const nutritionPlan = getPersonalizedNutritionPlan(patient, patient.latestVitals);

  return (
    <div className="space-y-6">
      {/* Recommended Foods Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800">
            Recommended Daily Foods & Village Recipes
          </h3>
          <Badge variant="emerald" size="sm">
            {patient.dietPreference || 'Vegetarian'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nutritionPlan?.recommendedFoods?.map((food) => (
            <div
              key={food.id}
              className="p-5 bg-white border-2 border-slate-200 rounded-3xl space-y-3 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-black text-slate-900 text-sm">{food.name}</h5>
                    <span className="text-xs font-bold text-teal-800">{food.localName}</span>
                  </div>
                  <Badge variant={food.dietType === 'VEGETARIAN' ? 'emerald' : 'rose'} size="sm">
                    {food.dietType}
                  </Badge>
                </div>

                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Meal Form: {food.stapleForm}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong>Preparation & Intake:</strong> {food.preparationTip}
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {(food.nutritionalStrengths || []).map((str, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold border border-slate-200">
                      ⚡ {str.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-bold">
                <span>✓ {food.affordability.replace(/_/g, ' ')}</span>
                <span className="text-[11px] text-slate-400">Village Staple</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ASHA Counseling Tip */}
      <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-3xl text-xs text-amber-950 flex items-start gap-3 shadow-xs">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-extrabold text-sm block">ASHA Nutrition Counseling Tip:</strong>
          <p className="leading-relaxed">{nutritionPlan?.localSeasonalTip}</p>
        </div>
      </div>
    </div>
  );
};
