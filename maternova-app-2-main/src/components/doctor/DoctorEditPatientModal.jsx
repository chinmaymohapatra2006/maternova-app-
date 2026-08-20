import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { Stethoscope, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

export const DoctorEditPatientModal = ({ isOpen, onClose, patient }) => {
  const { updatePatientRecord } = useAppData();

  const [formData, setFormData] = useState({
    name: patient?.name || '',
    age: patient?.age || '',
    phone: patient?.phone || '',
    village: patient?.village || '',
    region: patient?.region || 'North India',
    dietPreference: patient?.dietPreference || 'Vegetarian',

    // Pregnancy specifics if pregnant
    riskLevel: patient?.pregnancyDetails?.riskLevel || 'NORMAL',
    highRiskNotes: patient?.pregnancyDetails?.highRiskNotes || '',
    ifaTabletsGiven: patient?.pregnancyDetails?.ifaTabletsGiven || 60,
    calciumTabletsGiven: patient?.pregnancyDetails?.calciumTabletsGiven || 60,

    // Elderly specifics if elderly
    conditions: patient?.elderlyDetails?.conditions || [],
    currentMedications: patient?.elderlyDetails?.currentMedications || [],

    // Infant specifics if infant
    feedingType: patient?.infantDetails?.feedingType || '',
    growthStatus: patient?.infantDetails?.growthStatus || 'NORMAL',

    // Doctor Clinical Orders
    doctorClinicalOrder: patient?.doctorClinicalOrder || 'Continue regular follow-up and balanced regional nutrition.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!patient) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    setIsSubmitting(true);
    try {
      let updatedPregnancy = patient.pregnancyDetails;
      if (patient.category === 'PREGNANT_WOMAN') {
        updatedPregnancy = {
          ...patient.pregnancyDetails,
          riskLevel: formData.riskLevel,
          highRiskNotes: formData.highRiskNotes,
          ifaTabletsGiven: parseInt(formData.ifaTabletsGiven) || 60,
          calciumTabletsGiven: parseInt(formData.calciumTabletsGiven) || 60
        };
      }

      let updatedElderly = patient.elderlyDetails;
      if (patient.category === 'ELDERLY') {
        updatedElderly = {
          ...patient.elderlyDetails,
          conditions: formData.conditions
        };
      }

      let updatedInfant = patient.infantDetails;
      if (patient.category === 'INFANT') {
        updatedInfant = {
          ...patient.infantDetails,
          feedingType: formData.feedingType,
          growthStatus: formData.growthStatus
        };
      }

      await updatePatientRecord(patient.id, {
        name: formData.name,
        age: parseInt(formData.age) || patient.age,
        phone: formData.phone,
        village: formData.village,
        region: formData.region,
        dietPreference: formData.dietPreference,
        doctorClinicalOrder: formData.doctorClinicalOrder,
        pregnancyDetails: updatedPregnancy,
        elderlyDetails: updatedElderly,
        infantDetails: updatedInfant
      });

      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error('Error updating patient record:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Clinical Record — ${patient.name}`}
      subtitle={`Doctor Modification Access | Patient ID: ${patient.id}`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Doctor Authorization Banner */}
        <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-indigo-900">
          <Stethoscope className="w-5 h-5 text-indigo-700 shrink-0" />
          <div>
            <strong>Doctor Clinical Authorization:</strong> You have full write-access to modify patient demographics, risk classifications, and clinical orders.
          </div>
        </div>

        {/* Basic Demographics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="input-label">Patient Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              className="input-field"
            />
          </div>
          <div>
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="input-label">Village / Location</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        {/* Category Specific Clinical Settings */}
        {patient.category === 'PREGNANT_WOMAN' && (
          <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 space-y-3 text-xs">
            <h4 className="font-bold text-rose-900 uppercase">Maternal Risk Assessment & Orders</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="input-label">High-Risk Classification</label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="NORMAL">Normal Risk</option>
                  <option value="MODERATE_RISK">Moderate Risk</option>
                  <option value="HIGH_RISK">High Risk (Pre-eclampsia/Anemia)</option>
                </select>
              </div>

              <div>
                <label className="input-label">IFA Tablets Prescribed / Stocked</label>
                <input
                  type="number"
                  name="ifaTabletsGiven"
                  value={formData.ifaTabletsGiven}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="input-label">Doctor Clinical Notes for ASHA Follow-up</label>
              <textarea
                name="highRiskNotes"
                value={formData.highRiskNotes}
                onChange={handleChange}
                placeholder="Doctor instructions for weekly BP tracking, diet restrictions, etc."
                rows="2"
                className="input-field"
              ></textarea>
            </div>
          </div>
        )}

        {patient.category === 'ELDERLY' && (
          <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 space-y-3 text-xs">
            <h4 className="font-bold text-indigo-900 uppercase">Geriatric Conditions Diagnosis</h4>
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
        )}

        {/* Doctor Clinical Order / Prescription */}
        <div>
          <label className="input-label font-bold text-slate-800">
            Doctor's Final Clinical Prescription & Advice
          </label>
          <textarea
            name="doctorClinicalOrder"
            value={formData.doctorClinicalOrder}
            onChange={handleChange}
            placeholder="Enter clinical prescription, medicine dosages, dietary directions..."
            rows="3"
            className="input-field"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            {isSubmitting ? 'Saving Changes...' : 'Save & Update Record'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
