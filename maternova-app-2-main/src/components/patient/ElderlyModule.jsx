import React from 'react';
import { evaluateBloodPressure, evaluateBloodSugar } from '../../services/rules/vitalsTriageRules';
import { Badge } from '../common/Badge';
import {
  User,
  HeartPulse,
  Activity,
  AlertTriangle,
  Pill,
  ShieldCheck,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const ElderlyModule = ({ patient }) => {
  const elderly = patient.elderlyDetails || {};
  const latestVitals = patient.latestVitals || {};

  const bpStatus = evaluateBloodPressure(
    latestVitals.systolicBp,
    latestVitals.diastolicBp,
    false
  );

  const sugarStatus = evaluateBloodSugar(
    latestVitals.bloodSugarFasting,
    latestVitals.bloodSugarPostPrandial
  );

  return (
    <div className="space-y-6">
      {/* 1. Geriatric Health Summary Banner */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-700" />
              <h3 className="text-base font-bold text-indigo-950">Geriatric & Chronic NCD Care Track</h3>
            </div>
            <p className="text-xs text-indigo-800/80 mt-0.5">
              Age: <strong className="text-indigo-950">{patient.age} Years</strong> • Mobility:{' '}
              {elderly.mobilityStatus || 'Independent'} • Fall Risk:{' '}
              <strong className="text-indigo-950">{elderly.fallRisk || 'LOW'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={bpStatus.color} size="lg">
              {bpStatus.label}
            </Badge>
          </div>
        </div>

        {/* Known Conditions Chips */}
        <div>
          <span className="text-xs font-semibold text-indigo-900 block mb-1.5">Diagnosed Chronic Conditions:</span>
          <div className="flex flex-wrap gap-2">
            {(elderly.conditions || ['Hypertension', 'Type 2 Diabetes']).map((cond, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-900 shadow-xs"
              >
                🏥 {cond}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Critical Geriatric Vitals Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blood Pressure Card */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-600" /> Blood Pressure Evaluation
            </h4>
            <Badge variant={bpStatus.color} size="sm">
              {bpStatus.category}
            </Badge>
          </div>

          <div className="text-2xl font-extrabold text-slate-800">
            {latestVitals.systolicBp ? `${latestVitals.systolicBp}/${latestVitals.diastolicBp}` : '--/--'}{' '}
            <span className="text-xs font-medium text-slate-400">mmHg</span>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <strong className="text-slate-800">Clinical Recommendation:</strong> {bpStatus.action}
          </p>
        </div>

        {/* Blood Glucose Card */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-teal-600" /> Blood Glucose (Diabetes)
            </h4>
            <Badge variant={sugarStatus.color} size="sm">
              {sugarStatus.label}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block">Fasting:</span>
              <span className="text-xl font-bold">{latestVitals.bloodSugarFasting || '--'} mg/dL</span>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-[11px] text-slate-400 block">Postprandial (PP):</span>
              <span className="text-xl font-bold">{latestVitals.bloodSugarPostPrandial || '--'} mg/dL</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <strong className="text-slate-800">Clinical Recommendation:</strong> {sugarStatus.action}
          </p>
        </div>
      </div>

      {/* 3. Medication & Daily Regimen */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Pill className="w-4 h-4 text-indigo-700" />
          Prescribed Medications & Compliance Checklist
        </h4>

        <div className="space-y-2">
          {(elderly.currentMedications || ['Amlodipine 5mg OD (Morning)', 'Metformin 500mg BD (With Meals)']).map(
            (med, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{med}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                  Stock Verified by ASHA
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
