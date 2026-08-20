import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { calculateEDD, calculateGestationalAge } from '../../services/rules/pregnancyRules';
import {
  Heart,
  Baby,
  User,
  Check,
  Calendar,
  Phone,
  MapPin,
  Activity,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const PatientRegistrationModal = ({ isOpen, onClose, onRegistered }) => {
  const { savePatient } = useAppData();

  const [category, setCategory] = useState('PREGNANT_WOMAN');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    gender: 'FEMALE',
    guardianName: '',
    guardianRelation: 'Husband',
    phone: '',
    altPhone: '',
    address: '',
    village: 'Rampur',
    region: 'North India',
    dietPreference: 'Vegetarian',

    // Pregnancy
    lmp: '',
    gravida: 1,
    para: 0,
    bloodGroup: 'B+',

    // Infant
    birthWeightKg: '',
    birthLengthCm: '',
    deliveryType: 'Institutional (Normal Delivery)',
    feedingType: 'Exclusive Breastfeeding',

    // Elderly
    conditions: ['Hypertension (Stage 1)'],
    mobilityStatus: 'Independent',

    // Initial vitals
    weightKg: '',
    heightCm: '',
    systolicBp: '',
    diastolicBp: '',
    hemoglobin: '',
    bloodSugarFasting: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      // Auto compute age if DOB changes
      if (name === 'dob' && value) {
        const birth = new Date(value);
        const ageYears = Math.floor((new Date() - birth) / (1000 * 60 * 60 * 24 * 365.25));
        next.age = ageYears >= 0 ? ageYears : '';
      }

      return next;
    });
  };

  const handleConditionToggle = (condition) => {
    setFormData((prev) => {
      const current = prev.conditions || [];
      const updated = current.includes(condition)
        ? current.filter((c) => c !== condition)
        : [...current, condition];
      return { ...prev, conditions: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter patient name');
      return;
    }

    setIsSubmitting(true);
    try {
      let pregnancyDetails = null;
      let infantDetails = null;
      let elderlyDetails = null;

      if (category === 'PREGNANT_WOMAN') {
        const gestInfo = calculateGestationalAge(formData.lmp);
        pregnancyDetails = {
          lmp: formData.lmp,
          edd: calculateEDD(formData.lmp),
          gestationalWeeks: gestInfo.weeks,
          trimester: gestInfo.trimester,
          gravida: parseInt(formData.gravida) || 1,
          para: parseInt(formData.para) || 0,
          bloodGroup: formData.bloodGroup,
          ifaTabletsGiven: 30,
          calciumTabletsGiven: 30,
          riskLevel: 'NORMAL',
          riskReasons: []
        };
      } else if (category === 'INFANT') {
        infantDetails = {
          birthWeightKg: parseFloat(formData.birthWeightKg) || 3.0,
          birthLengthCm: parseFloat(formData.birthLengthCm) || 50,
          deliveryType: formData.deliveryType,
          feedingType: formData.feedingType,
          growthStatus: 'NORMAL',
          vaccinationStatus: 'UP_TO_DATE'
        };
      } else if (category === 'ELDERLY') {
        elderlyDetails = {
          conditions: formData.conditions,
          mobilityStatus: formData.mobilityStatus,
          fallRisk: 'LOW'
        };
      }

      const newPatient = {
        name: formData.name,
        category,
        dob: formData.dob || new Date().toISOString().split('T')[0],
        age: parseInt(formData.age) || (category === 'INFANT' ? 0 : 25),
        gender: category === 'PREGNANT_WOMAN' ? 'FEMALE' : formData.gender,
        guardianName: formData.guardianName,
        guardianRelation: formData.guardianRelation,
        phone: formData.phone,
        altPhone: formData.altPhone,
        address: formData.address,
        village: formData.village,
        region: formData.region,
        dietPreference: formData.dietPreference,
        pregnancyDetails,
        infantDetails,
        elderlyDetails,
        latestVitals: {
          date: new Date().toISOString().split('T')[0],
          weightKg: parseFloat(formData.weightKg) || null,
          heightCm: parseFloat(formData.heightCm) || null,
          systolicBp: parseInt(formData.systolicBp) || null,
          diastolicBp: parseInt(formData.diastolicBp) || null,
          hemoglobin: parseFloat(formData.hemoglobin) || null,
          bloodSugarFasting: parseInt(formData.bloodSugarFasting) || null
        }
      };

      const saved = await savePatient(newPatient);
      setIsSubmitting(false);
      onClose();
      if (onRegistered) onRegistered(saved.id);
    } catch (err) {
      console.error('Registration failed:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Patient (Offline-Ready)"
      subtitle="Data will be saved locally in IndexedDB and queued for sync"
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Category Selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Select Patient Category *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setCategory('PREGNANT_WOMAN');
                setFormData((p) => ({ ...p, gender: 'FEMALE', guardianRelation: 'Husband' }));
              }}
              className={`p-3 rounded-xl border flex items-center gap-3 transition ${category === 'PREGNANT_WOMAN' ? 'border-rose-500 bg-rose-50/50 text-rose-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className={`p-2 rounded-lg ${category === 'PREGNANT_WOMAN' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Heart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">Pregnant Mother</div>
                <div className="text-[11px] text-slate-500">ANC & Maternal Care</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setCategory('INFANT');
                setFormData((p) => ({ ...p, guardianRelation: 'Mother' }));
              }}
              className={`p-3 rounded-xl border flex items-center gap-3 transition ${category === 'INFANT' ? 'border-teal-500 bg-teal-50/50 text-teal-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className={`p-2 rounded-lg ${category === 'INFANT' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Baby className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">Infant / Child</div>
                <div className="text-[11px] text-slate-500">UIP Vaccination & Growth</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setCategory('ELDERLY');
                setFormData((p) => ({ ...p, guardianRelation: 'Son' }));
              }}
              className={`p-3 rounded-xl border flex items-center gap-3 transition ${category === 'ELDERLY' ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className={`p-2 rounded-lg ${category === 'ELDERLY' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">Elderly Citizen</div>
                <div className="text-[11px] text-slate-500">NCD & Chronic Care</div>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Personal Information */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">1. Personal & Contact Details</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Patient Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Meera Devi"
                required
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="input-label">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Age (Years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="input-label">Guardian / Spouse Name</label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Guardian Relationship</label>
              <select
                name="guardianRelation"
                value={formData.guardianRelation}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Husband">Husband</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Self">Self / Other</option>
              </select>
            </div>

            <div>
              <label className="input-label">Primary Mobile Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Village / Ward</label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder="e.g. Rampur"
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Geographic Region (For Nutrition Engine)</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="input-field"
              >
                <option value="North India">North India (UP, Bihar, Punjab, Rajasthan)</option>
                <option value="South India">South India (TN, Karnataka, Kerala, AP, TS)</option>
                <option value="East India">East India (WB, Odisha, Assam, NE)</option>
                <option value="West India">West India (Maharashtra, Gujarat, Goa)</option>
                <option value="Central India">Central India (MP, Chhattisgarh)</option>
              </select>
            </div>

            <div>
              <label className="input-label">Dietary Preference</label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Vegetarian">Vegetarian (Lacto-Vegetarian)</option>
                <option value="Non-Vegetarian">Non-Vegetarian (Eggs / Fish / Meat)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Category Specific Health Module Inputs */}
        {category === 'PREGNANT_WOMAN' && (
          <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
              2. Maternal & Pregnancy Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="input-label">Last Menstrual Period (LMP) *</label>
                <input
                  type="date"
                  name="lmp"
                  value={formData.lmp}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Calculated EDD (Delivery Date)</label>
                <div className="p-2.5 bg-white border border-rose-300 rounded-lg text-xs font-bold text-rose-700">
                  {formData.lmp ? calculateEDD(formData.lmp) : 'Select LMP'}
                </div>
              </div>
              <div>
                <label className="input-label">Gestational Age</label>
                <div className="p-2.5 bg-white border border-rose-300 rounded-lg text-xs font-bold text-slate-800">
                  {formData.lmp ? calculateGestationalAge(formData.lmp).formatted : 'Select LMP'}
                </div>
              </div>

              <div>
                <label className="input-label">Gravida (Total Pregnancies)</label>
                <input
                  type="number"
                  name="gravida"
                  min="1"
                  max="10"
                  value={formData.gravida}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Para (Live Births)</label>
                <input
                  type="number"
                  name="para"
                  min="0"
                  max="10"
                  value={formData.para}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {category === 'INFANT' && (
          <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
              2. Infant Birth & Growth Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Birth Weight (Kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="birthWeightKg"
                  value={formData.birthWeightKg}
                  onChange={handleChange}
                  placeholder="e.g. 2.8"
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Birth Length (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  name="birthLengthCm"
                  value={formData.birthLengthCm}
                  onChange={handleChange}
                  placeholder="e.g. 48.5"
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Delivery Type</label>
                <select
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Institutional (Normal Delivery)">Institutional (Normal Delivery)</option>
                  <option value="Institutional (Cesarean)">Institutional (Cesarean)</option>
                  <option value="Home Delivery (SBA)">Home Delivery (SBA)</option>
                </select>
              </div>
              <div>
                <label className="input-label">Current Feeding Type</label>
                <select
                  name="feedingType"
                  value={formData.feedingType}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Exclusive Breastfeeding">Exclusive Breastfeeding (0-6 Months)</option>
                  <option value="Complementary Feeding + Breastmilk">Complementary Feeding + Breastmilk (6+ Months)</option>
                  <option value="Top Milk / Animal Milk">Top Milk / Animal Milk</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {category === 'ELDERLY' && (
          <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              2. Chronic Conditions & Mobility
            </h4>
            <div>
              <label className="input-label block mb-2">Select Known Chronic Conditions</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Hypertension (Stage 1)',
                  'Hypertension (Stage 2)',
                  'Type 2 Diabetes Mellitus',
                  'Osteoarthritis Knee',
                  'COPD / Asthma',
                  'Heart Disease'
                ].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => handleConditionToggle(cond)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${formData.conditions.includes(cond) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Baseline Vitals */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">3. Baseline Vitals (Optional)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="input-label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                name="weightKg"
                value={formData.weightKg}
                onChange={handleChange}
                placeholder="55.0"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Height (cm)</label>
              <input
                type="number"
                name="heightCm"
                value={formData.heightCm}
                onChange={handleChange}
                placeholder="155"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Systolic BP (mmHg)</label>
              <input
                type="number"
                name="systolicBp"
                value={formData.systolicBp}
                onChange={handleChange}
                placeholder="120"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Diastolic BP (mmHg)</label>
              <input
                type="number"
                name="diastolicBp"
                value={formData.diastolicBp}
                onChange={handleChange}
                placeholder="80"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Hemoglobin (g/dL)</label>
              <input
                type="number"
                step="0.1"
                name="hemoglobin"
                value={formData.hemoglobin}
                onChange={handleChange}
                placeholder="11.5"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Fasting Sugar (mg/dL)</label>
              <input
                type="number"
                name="bloodSugarFasting"
                value={formData.bloodSugarFasting}
                onChange={handleChange}
                placeholder="95"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            {isSubmitting ? 'Saving to Offline DB...' : 'Register & Save Locally'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
