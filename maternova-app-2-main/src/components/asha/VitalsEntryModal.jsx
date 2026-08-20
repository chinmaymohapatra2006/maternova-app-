import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { evaluateBloodPressure, evaluateBloodSugar, evaluateHemoglobin, calculateBMI } from '../../services/rules/vitalsTriageRules';
import { HeartPulse, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export const VitalsEntryModal = ({ isOpen, onClose, patient }) => {
  const { addVitals } = useAppData();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weightKg: '',
    heightCm: '',
    systolicBp: '',
    diastolicBp: '',
    hemoglobin: '',
    bloodSugarFasting: '',
    bloodSugarPostPrandial: '',
    pulse: '',
    spO2: '',
    fundalHeightCm: '',
    recordedBy: 'ASHA-VNS-04'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!patient) return null;

  const isPregnant = patient.category === 'PREGNANT_WOMAN';
  const isInfant = patient.category === 'INFANT';

  const bpStatus = evaluateBloodPressure(
    parseInt(formData.systolicBp),
    parseInt(formData.diastolicBp),
    isPregnant
  );

  const hbStatus = evaluateHemoglobin(formData.hemoglobin, isPregnant);
  const sugarStatus = evaluateBloodSugar(
    parseInt(formData.bloodSugarFasting),
    parseInt(formData.bloodSugarPostPrandial)
  );
  const bmiInfo = calculateBMI(parseFloat(formData.weightKg), parseFloat(formData.heightCm));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addVitals({
        patientId: patient.id,
        date: formData.date,
        weightKg: formData.weightKg ? parseFloat(formData.weightKg) : null,
        heightCm: formData.heightCm ? parseFloat(formData.heightCm) : null,
        systolicBp: formData.systolicBp ? parseInt(formData.systolicBp) : null,
        diastolicBp: formData.diastolicBp ? parseInt(formData.diastolicBp) : null,
        hemoglobin: formData.hemoglobin ? parseFloat(formData.hemoglobin) : null,
        bloodSugarFasting: formData.bloodSugarFasting ? parseInt(formData.bloodSugarFasting) : null,
        bloodSugarPostPrandial: formData.bloodSugarPostPrandial ? parseInt(formData.bloodSugarPostPrandial) : null,
        pulse: formData.pulse ? parseInt(formData.pulse) : null,
        spO2: formData.spO2 ? parseInt(formData.spO2) : null,
        fundalHeightCm: formData.fundalHeightCm ? parseFloat(formData.fundalHeightCm) : null,
        recordedBy: formData.recordedBy
      });

      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error('Error saving vitals:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Record Health Vitals — ${patient.name}`}
      subtitle={`Category: ${patient.category.replace('_', ' ')} | ID: ${patient.id}`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-600">
            <span className="font-semibold">Visit Date:</span>
          </div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="input-field max-w-[180px] text-xs py-1"
          />
        </div>

        {/* Vitals Form Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="input-label">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              name="weightKg"
              value={formData.weightKg}
              onChange={handleChange}
              placeholder="e.g. 58.0"
              className="input-field"
            />
          </div>

          <div>
            <label className="input-label">{isInfant ? 'Length (cm)' : 'Height (cm)'}</label>
            <input
              type="number"
              step="0.5"
              name="heightCm"
              value={formData.heightCm}
              onChange={handleChange}
              placeholder="e.g. 155"
              className="input-field"
            />
          </div>

          {!isInfant && (
            <div>
              <label className="input-label">Hemoglobin (g/dL)</label>
              <input
                type="number"
                step="0.1"
                name="hemoglobin"
                value={formData.hemoglobin}
                onChange={handleChange}
                placeholder="e.g. 9.5"
                className="input-field"
              />
            </div>
          )}

          {!isInfant && (
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
          )}

          {!isInfant && (
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
          )}

          {isPregnant && (
            <div>
              <label className="input-label">Fundal Height (cm)</label>
              <input
                type="number"
                step="0.5"
                name="fundalHeightCm"
                value={formData.fundalHeightCm}
                onChange={handleChange}
                placeholder="e.g. 26"
                className="input-field"
              />
            </div>
          )}

          <div>
            <label className="input-label">Pulse (bpm)</label>
            <input
              type="number"
              name="pulse"
              value={formData.pulse}
              onChange={handleChange}
              placeholder="76"
              className="input-field"
            />
          </div>

          <div>
            <label className="input-label">Oxygen SpO2 (%)</label>
            <input
              type="number"
              name="spO2"
              value={formData.spO2}
              onChange={handleChange}
              placeholder="98"
              className="input-field"
            />
          </div>

          {!isInfant && (
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
          )}

          {!isInfant && (
            <div>
              <label className="input-label">PP Blood Sugar (mg/dL)</label>
              <input
                type="number"
                name="bloodSugarPostPrandial"
                value={formData.bloodSugarPostPrandial}
                onChange={handleChange}
                placeholder="130"
                className="input-field"
              />
            </div>
          )}
        </div>

        {/* Live Rule-Engine Clinical Feedback Banner */}
        <div className="bg-slate-900 text-white p-3.5 rounded-xl text-xs space-y-2">
          <div className="text-teal-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> Instant Rule-Engine Clinical Check
          </div>

          <div className="space-y-1.5 text-slate-300">
            {formData.systolicBp && formData.diastolicBp && (
              <div className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${bpStatus.urgent ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`}></span>
                <div>
                  <span className="font-semibold text-white">BP Evaluation:</span> {bpStatus.label} — {bpStatus.action}
                </div>
              </div>
            )}

            {formData.hemoglobin && (
              <div className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${hbStatus.urgent ? 'bg-rose-500' : 'bg-emerald-400'}`}></span>
                <div>
                  <span className="font-semibold text-white">Hemoglobin:</span> {hbStatus.label} — {hbStatus.action}
                </div>
              </div>
            )}

            {bmiInfo && (
              <div className="text-slate-300">
                <span className="font-semibold text-white">BMI:</span> {bmiInfo.value} kg/m² ({bmiInfo.label})
              </div>
            )}

            {!formData.systolicBp && !formData.hemoglobin && !formData.weightKg && (
              <div className="text-slate-400 italic">Enter vitals above to see immediate rule-based clinical classification.</div>
            )}
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
            <HeartPulse className="w-4 h-4" />
            {isSubmitting ? 'Saving Vitals...' : 'Save Vitals Locally'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
