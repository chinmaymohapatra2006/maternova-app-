import React, { useState } from 'react';
import { REGIONAL_FOOD_DATABASE } from '../../../services/nutrition/regionalFoodDatabase';
import { Badge } from '../../common/Badge';
import {
  Utensils,
  Edit3,
  PlusCircle,
  Search,
  CheckCircle2,
  Heart,
  Baby,
  User,
  Sparkles,
  Save,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const DoctorEditableNutritionPlanView = () => {
  const [foodList, setFoodList] = useState(REGIONAL_FOOD_DATABASE);
  const [selectedCohort, setSelectedCohort] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingFood, setEditingFood] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    localName: '',
    dietType: 'VEGETARIAN',
    stapleForm: 'Porridge / Khichdi',
    categories: ['PREGNANT_WOMAN'],
    nutritionalStrengths: ['HIGH_IRON', 'HIGH_PROTEIN'],
    preparationTip: '',
    affordability: 'LOW_COST_VILLAGE_ACCESSIBLE',
    clinicalNotes: ''
  });

  const handleEditClick = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      localName: food.localName,
      dietType: food.dietType,
      stapleForm: food.stapleForm,
      categories: food.categories || ['PREGNANT_WOMAN'],
      nutritionalStrengths: food.nutritionalStrengths || [],
      preparationTip: food.preparationTip,
      affordability: food.affordability,
      clinicalNotes: food.clinicalNotes || 'Approved by Medical Officer for rural maternal/child diet prescription.'
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingFood) return;

    setFoodList((prev) =>
      prev.map((f) => (f.id === editingFood.id ? { ...f, ...formData } : f))
    );
    setEditingFood(null);
  };

  const handleAddNewFood = (e) => {
    e.preventDefault();
    const newFood = {
      id: `DOC-FOOD-${Date.now().toString().slice(-4)}`,
      ...formData
    };
    setFoodList([newFood, ...foodList]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      localName: '',
      dietType: 'VEGETARIAN',
      stapleForm: 'Porridge / Khichdi',
      categories: ['PREGNANT_WOMAN'],
      nutritionalStrengths: ['HIGH_IRON', 'HIGH_PROTEIN'],
      preparationTip: '',
      affordability: 'LOW_COST_VILLAGE_ACCESSIBLE',
      clinicalNotes: ''
    });
  };

  const filteredFoods = foodList.filter((food) => {
    if (selectedCohort !== 'ALL' && !food.categories.includes(selectedCohort)) return false;
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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-xl shadow-xs">
              🥗
            </div>
            <div>
              <h2 className="text-lg font-bold">Clinical Diet Protocols & Nutrient Plan (Doctor Editable)</h2>
              <span className="text-xs text-indigo-300">
                Medical Officer Dietary Customization, Anti-Anemia & Chronic Disease Management
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Customize preparation guidelines, clinical contraindications, and portion rules for field ASHA workers to counsel pregnant mothers, infants, and elderly patients.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: '',
              localName: '',
              dietType: 'VEGETARIAN',
              stapleForm: 'Porridge / Khichdi',
              categories: ['PREGNANT_WOMAN'],
              nutritionalStrengths: ['HIGH_IRON', 'HIGH_PROTEIN'],
              preparationTip: '',
              affordability: 'LOW_COST_VILLAGE_ACCESSIBLE',
              clinicalNotes: 'Medical Officer Approved'
            });
            setIsAddModalOpen(true);
          }}
          className="btn-primary-white flex items-center gap-2 shadow-md hover:scale-105 transition"
        >
          <PlusCircle className="w-4 h-4" /> Add New Clinical Food Protocol
        </button>
      </div>

      {/* Cohort Specific Clinical Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-rose-900 font-bold text-xs">
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-600" /> Maternal Anemia Protocol</span>
            <span className="text-[10px] bg-rose-200 text-rose-950 px-2 py-0.5 rounded font-extrabold">Active</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Prescribe roasted Chana, Jaggery, Moringa with Vitamin C. Emphasize avoiding dairy/tea within 2 hours of IFA tablet intake.
          </p>
        </div>

        <div className="p-4 bg-teal-50 border-2 border-teal-200 rounded-2xl space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-teal-900 font-bold text-xs">
            <span className="flex items-center gap-1.5"><Baby className="w-4 h-4 text-teal-600" /> Infant Weaning (SAM/MAM)</span>
            <span className="text-[10px] bg-teal-200 text-teal-950 px-2 py-0.5 rounded font-extrabold">Active</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Calorie-dense soft foods: Yellow Moong Khichdi enriched with 1 tsp Cow Ghee and mashed seasonal vegetables for rapid catch-up growth.
          </p>
        </div>

        <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-indigo-900 font-bold text-xs">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-indigo-600" /> Geriatric Low-Sodium & Glycemic</span>
            <span className="text-[10px] bg-indigo-200 text-indigo-950 px-2 py-0.5 rounded font-extrabold">Active</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Unrefined Millets (Jowar/Bajra/Ragi) to control glycemic load. Strictly restrict sodium intake to &lt;1 tsp (5g) per day.
          </p>
        </div>
      </div>

      {/* Search & Cohort Filter */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search food protocol by name, ingredient, or preparation..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL', label: 'All Cohorts' },
            { id: 'PREGNANT_WOMAN', label: 'Pregnant Mothers' },
            { id: 'INFANT', label: 'Infants (0-5 Yrs)' },
            { id: 'ELDERLY', label: 'Elderly Citizens' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCohort(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCohort === tab.id ? 'bg-indigo-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editable Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="p-5 bg-white border-2 border-slate-200 rounded-3xl hover:border-indigo-400 hover:shadow-md transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{food.name}</h4>
                  <span className="text-xs font-bold text-indigo-700">{food.localName}</span>
                </div>
                <Badge variant={food.dietType === 'VEGETARIAN' ? 'emerald' : 'rose'} size="sm">
                  {food.dietType}
                </Badge>
              </div>

              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
                <span className="font-semibold text-slate-700">Form: {food.stapleForm}</span>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-slate-700 leading-relaxed">
                <strong>Clinical Preparation & Rule:</strong> {food.preparationTip}
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {(food.nutritionalStrengths || []).map((str, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold border border-slate-200">
                    ⚡ {str.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Doctor Edit Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> MO Authorized
              </span>

              <button
                type="button"
                onClick={() => handleEditClick(food)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Protocol
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingFood && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border-2 border-indigo-400 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-700" /> Edit Clinical Diet Protocol
              </h3>
              <button onClick={() => setEditingFood(null)} className="modal-close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="input-label">Food Standard Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field text-xs font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Local / Regional Name *</label>
                  <input
                    type="text"
                    value={formData.localName}
                    onChange={(e) => setFormData({ ...formData, localName: e.target.value })}
                    className="input-field text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="input-label">Diet Classification</label>
                  <select
                    value={formData.dietType}
                    onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
                    className="input-field text-xs font-bold"
                  >
                    <option value="VEGETARIAN">Vegetarian</option>
                    <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Meal Form</label>
                  <input
                    type="text"
                    value={formData.stapleForm}
                    onChange={(e) => setFormData({ ...formData, stapleForm: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Clinical Preparation Tip & Counseling Rule *</label>
                <textarea
                  rows={3}
                  value={formData.preparationTip}
                  onChange={(e) => setFormData({ ...formData, preparationTip: e.target.value })}
                  className="input-field text-xs leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="input-label">Doctor Clinical Notes / Restrictions</label>
                <input
                  type="text"
                  value={formData.clinicalNotes}
                  onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
                  placeholder="e.g. Contraindicated in severe renal impairment; High sodium warning"
                  className="input-field text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingFood(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center gap-1.5">
                  <Save className="w-4 h-4" /> Save Updated Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW FOOD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border-2 border-indigo-400 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-indigo-700" /> Add Custom Clinical Diet Protocol
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="modal-close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleAddNewFood} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="input-label">Food Standard Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sprouted Ragi Porridge"
                    className="input-field text-xs font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Local Name *</label>
                  <input
                    type="text"
                    value={formData.localName}
                    onChange={(e) => setFormData({ ...formData, localName: e.target.value })}
                    placeholder="e.g. Ragi Ganji"
                    className="input-field text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Preparation & Dosage Guidance *</label>
                <textarea
                  rows={3}
                  value={formData.preparationTip}
                  onChange={(e) => setFormData({ ...formData, preparationTip: e.target.value })}
                  placeholder="Provide explicit instructions for field counseling..."
                  className="input-field text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Authorize & Add to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
