import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { generateANCSchedule, calculateGestationalAge } from '../../services/rules/pregnancyRules';
import { evaluateHighRiskPregnancy } from '../../services/rules/pregnancyRules';
import { Badge } from '../common/Badge';
import {
  Heart,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Pill,
  ShieldAlert,
  ChevronRight,
  Plus
} from 'lucide-react';

export const PregnancyModule = ({ patient }) => {
  const { ancVisits, recordANCVisit } = useAppData();
  const pregnancy = patient.pregnancyDetails || {};
  const lmp = pregnancy.lmp;
  const gestAge = calculateGestationalAge(lmp);
  const patientAncVisits = ancVisits.filter((v) => v.patientId === patient.id);
  const ancSchedule = generateANCSchedule(lmp, patientAncVisits);
  const riskAnalysis = evaluateHighRiskPregnancy(patient);

  const [selectedVisitForLog, setSelectedVisitForLog] = useState(null);
  const [visitNotes, setVisitNotes] = useState('');
  const [ttDose, setTtDose] = useState('TT-1');

  const handleLogANCSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVisitForLog) return;

    await recordANCVisit({
      patientId: patient.id,
      visitNumber: selectedVisitForLog.visitNumber,
      title: selectedVisitForLog.title,
      scheduledWeek: selectedVisitForLog.targetWeek,
      dateCompleted: new Date().toISOString().split('T')[0],
      findings: visitNotes || 'Routine ANC checkup completed. Vitals stable.',
      ttDose: ttDose,
      doctorNotes: 'ASHA recorded field visit.'
    });

    setSelectedVisitForLog(null);
    setVisitNotes('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Maternal Summary Header Banner */}
      <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold text-rose-950">Maternal & Antenatal Health Track</h3>
            </div>
            <p className="text-xs text-rose-800/80 mt-0.5">
              Gestational Stage: <strong className="text-rose-950">{gestAge.formatted}</strong> • Estimated Delivery Date (EDD):{' '}
              <strong className="text-rose-950">{pregnancy.edd || 'Calculated from LMP'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={riskAnalysis.isHighRisk ? 'rose' : 'emerald'} size="lg">
              {riskAnalysis.overallRisk === 'CRITICAL_RISK'
                ? '🚨 CRITICAL HIGH-RISK PREGNANCY'
                : riskAnalysis.overallRisk === 'HIGH_RISK'
                  ? '⚠️ HIGH-RISK PREGNANCY'
                  : '✓ NORMAL PREGNANCY'}
            </Badge>
          </div>
        </div>

        {/* Trimester Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-rose-900 mb-1.5">
            <span>Trimester 1 (Wks 1-13)</span>
            <span>Trimester 2 (Wks 14-27)</span>
            <span>Trimester 3 (Wks 28-40)</span>
          </div>
          <div className="w-full bg-rose-200/80 h-3 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-500 ${gestAge.weeks >= 28 ? 'bg-rose-600' : gestAge.weeks >= 14 ? 'bg-rose-500' : 'bg-rose-400'}`}
              style={{ width: `${Math.min(100, (gestAge.weeks / 40) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* High Risk Flags */}
        {riskAnalysis.riskFactors.length > 0 && (
          <div className="bg-white/80 p-3.5 rounded-xl border border-rose-300 text-xs space-y-2">
            <div className="text-rose-700 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Active High-Risk Conditions Identified:
            </div>
            <ul className="space-y-1 text-slate-700 list-disc list-inside">
              {riskAnalysis.riskFactors.map((r, i) => (
                <li key={i}>
                  <strong className="text-rose-900">{r.label}:</strong> {r.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2. ANC Checkups Schedule (NHM 4-Visit Standard) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              Antenatal Care (ANC) 4-Checkup Protocol
            </h4>
            <p className="text-xs text-slate-500">
              National Health Mission guidelines for mandatory antenatal visits and interventions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ancSchedule.map((visit) => {
            const isCompleted = visit.status === 'COMPLETED';
            const isOverdue = visit.status === 'OVERDUE';
            const isDue = visit.status === 'DUE';

            return (
              <div
                key={visit.visitNumber}
                className={`p-4 rounded-xl border transition ${isCompleted ? 'bg-emerald-50/50 border-emerald-200' : isOverdue ? 'bg-rose-50/60 border-rose-300' : isDue ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{visit.title}</h5>
                    <span className="text-[11px] text-slate-500 font-medium">{visit.windowLabel}</span>
                  </div>

                  <Badge
                    variant={isCompleted ? 'emerald' : isOverdue ? 'rose' : isDue ? 'amber' : 'gray'}
                    size="sm"
                  >
                    {visit.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 mt-2 bg-white/60 p-2 rounded-lg border border-slate-100">
                  <strong className="text-slate-700">Key Interventions:</strong> {visit.keyInterventions}
                </p>

                {isCompleted ? (
                  <div className="mt-3 pt-2 border-t border-emerald-200/60 text-xs text-emerald-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed on {visit.dateCompleted}
                    </div>
                    {visit.findings && <div className="text-[11px] text-slate-600">Findings: {visit.findings}</div>}
                  </div>
                ) : (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Target: Wk {visit.targetWeek} ({visit.dueDate})</span>
                    <button
                      type="button"
                      onClick={() => setSelectedVisitForLog(visit)}
                      className="px-2.5 py-1 bg-teal-700 text-white rounded text-xs font-semibold hover:bg-teal-800 transition"
                    >
                      Log Checkup
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Micronutrient Supplementation Tracker (IFA & Calcium) */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Pill className="w-4 h-4 text-teal-700" />
          Maternal Supplementation Compliance (Anemia & Bone Protection)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Iron Folic Acid (IFA) Tablets</span>
              <span className="font-bold text-rose-700">{pregnancy.ifaTabletsGiven || 60} / 180 Tablets</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${Math.min(100, ((pregnancy.ifaTabletsGiven || 60) / 180) * 100)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Minimum 180 red IFA tablets recommended during pregnancy</span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Calcium (500mg) Tablets</span>
              <span className="font-bold text-teal-700">{pregnancy.calciumTabletsGiven || 60} / 360 Tablets</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-teal-500 h-full rounded-full"
                style={{ width: `${Math.min(100, ((pregnancy.calciumTabletsGiven || 60) / 360) * 100)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">From 14th week onwards (2 tablets daily)</span>
          </div>
        </div>
      </div>

      {/* Log Visit Modal */}
      {selectedVisitForLog && (
        <div className="modal-backdrop">
          <div className="modal-container max-w-lg">
            <div className="modal-header">
              <h4 className="modal-title">Log {selectedVisitForLog.title}</h4>
              <button onClick={() => setSelectedVisitForLog(null)} className="modal-close-btn">×</button>
            </div>
            <form onSubmit={handleLogANCSubmit} className="modal-body space-y-4">
              <div>
                <label className="input-label">Clinical Observations & Findings</label>
                <textarea
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="Record maternal BP, fetal movements, edema, or any complaints..."
                  rows="3"
                  className="input-field"
                ></textarea>
              </div>

              <div>
                <label className="input-label">Tetanus Toxoid (TT) / Td Dose</label>
                <select
                  value={ttDose}
                  onChange={(e) => setTtDose(e.target.value)}
                  className="input-field"
                >
                  <option value="TT-1 Administered">TT-1 / Td-1 Administered</option>
                  <option value="TT-2 Administered">TT-2 / Td-2 Administered</option>
                  <option value="TT-Booster Administered">TT Booster Administered</option>
                  <option value="Previously Completed">Already Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setSelectedVisitForLog(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save ANC Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
