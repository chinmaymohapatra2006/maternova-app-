import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { evaluateInfantImmunizations, evaluateInfantGrowth, calculateAgeDetails } from '../../services/rules/vaccinationRules';
import { Badge } from '../common/Badge';
import {
  Baby,
  Syringe,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  ShieldCheck,
  Scale,
  Calendar
} from 'lucide-react';

export const InfantModule = ({ patient }) => {
  const { vaccinations, recordVaccineAdministered } = useAppData();
  const infant = patient.infantDetails || {};
  const dob = patient.dob;
  const ageDetails = calculateAgeDetails(dob);

  const patientVaccines = vaccinations.filter((v) => v.patientId === patient.id);
  const immunizationSchedule = evaluateInfantImmunizations(dob, patientVaccines);

  const latestWeight = patient.latestVitals ? patient.latestVitals.weightKg : infant.birthWeightKg;
  const growthEvaluation = evaluateInfantGrowth(ageDetails.months, latestWeight, patient.gender);

  const [selectedVaccineForAdmin, setSelectedVaccineForAdmin] = useState(null);
  const [batchNo, setBatchNo] = useState('');
  const [center, setCenter] = useState('Anganwadi Centre Rampur');

  const handleAdministerVaccine = async (e) => {
    e.preventDefault();
    if (!selectedVaccineForAdmin) return;

    await recordVaccineAdministered({
      patientId: patient.id,
      vaccineCode: selectedVaccineForAdmin.code,
      vaccineName: selectedVaccineForAdmin.name,
      scheduledAge: selectedVaccineForAdmin.targetAgeLabel,
      dateAdministered: new Date().toISOString().split('T')[0],
      batchNumber: batchNo || `BATCH-${Date.now().toString().slice(-4)}`,
      center: center
    });

    setSelectedVaccineForAdmin(null);
    setBatchNo('');
  };

  const givenCount = immunizationSchedule.filter((v) => v.status === 'GIVEN').length;
  const overdueCount = immunizationSchedule.filter((v) => v.status === 'OVERDUE').length;

  return (
    <div className="space-y-6">
      {/* 1. Infant Summary & Growth Card */}
      <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Baby className="w-5 h-5 text-teal-700" />
              <h3 className="text-base font-bold text-teal-950">Infant Immunization & Growth Tracking</h3>
            </div>
            <p className="text-xs text-teal-800/80 mt-0.5">
              Age: <strong className="text-teal-950">{ageDetails.formatted}</strong> (Born: {dob}) • Delivery:{' '}
              {infant.deliveryType || 'Institutional'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={growthEvaluation.color} size="lg">
              {growthEvaluation.label}
            </Badge>
          </div>
        </div>

        {/* Growth & Feeding Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white/80 p-3 rounded-xl border border-teal-100">
          <div>
            <span className="text-slate-500 block">Birth Weight vs Current:</span>
            <span className="font-bold text-teal-900 text-sm">
              {infant.birthWeightKg || 2.8} kg → {latestWeight || '--'} kg
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Current Feeding Mode:</span>
            <span className="font-semibold text-slate-800">{infant.feedingType || 'Breastfeeding'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Immunization Coverage:</span>
            <span className="font-bold text-teal-800">
              {givenCount} of {immunizationSchedule.length} Doses Given
            </span>
          </div>
        </div>

        {/* Growth Faltering Alert */}
        {growthEvaluation.status !== 'NORMAL' && (
          <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">{growthEvaluation.label}:</strong> {growthEvaluation.description}
            </div>
          </div>
        )}
      </div>

      {/* 2. Universal Immunization Programme (UIP) India Schedule */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Syringe className="w-4 h-4 text-teal-700" />
              National Immunization Schedule (Universal Immunization Programme)
            </h4>
            <p className="text-xs text-slate-500">
              Mandatory vaccines calculated dynamically according to infant date of birth.
            </p>
          </div>

          {overdueCount > 0 && (
            <Badge variant="rose" size="md">
              ⚠️ {overdueCount} Overdue Vaccine(s)
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {immunizationSchedule.map((vac) => {
            const isGiven = vac.status === 'GIVEN';
            const isOverdue = vac.status === 'OVERDUE';
            const isDue = vac.status === 'DUE';

            return (
              <div
                key={vac.code}
                className={`p-3.5 rounded-xl border transition ${isGiven ? 'bg-emerald-50/50 border-emerald-200' : isOverdue ? 'bg-rose-50/60 border-rose-300' : isDue ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{vac.name}</h5>
                    <span className="text-[11px] text-teal-700 font-medium">{vac.targetAgeLabel}</span>
                  </div>

                  <Badge
                    variant={isGiven ? 'emerald' : isOverdue ? 'rose' : isDue ? 'amber' : 'gray'}
                    size="sm"
                  >
                    {vac.status}
                  </Badge>
                </div>

                <div className="text-[11px] text-slate-500 mt-1.5 space-y-0.5">
                  <div>{vac.description}</div>
                  <div>
                    <span className="font-semibold text-slate-700">Dose & Route:</span> {vac.dose} ({vac.route})
                  </div>
                </div>

                {isGiven ? (
                  <div className="mt-2 pt-2 border-t border-emerald-200/60 text-xs text-emerald-800 flex items-center justify-between">
                    <span className="flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Administered on {vac.dateAdministered}
                    </span>
                    <span className="text-[10px] text-slate-500">Batch: {vac.batchNumber}</span>
                  </div>
                ) : (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Due Date: {vac.dueDate}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedVaccineForAdmin(vac)}
                      className="px-2.5 py-1 bg-teal-700 text-white rounded text-xs font-semibold hover:bg-teal-800 transition"
                    >
                      Administer Dose
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Administer Vaccine Modal */}
      {selectedVaccineForAdmin && (
        <div className="modal-backdrop">
          <div className="modal-container max-w-md">
            <div className="modal-header">
              <h4 className="modal-title">Record {selectedVaccineForAdmin.name}</h4>
              <button onClick={() => setSelectedVaccineForAdmin(null)} className="modal-close-btn">×</button>
            </div>
            <form onSubmit={handleAdministerVaccine} className="modal-body space-y-4">
              <div>
                <label className="input-label">Vaccine Batch Number</label>
                <input
                  type="text"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  placeholder="e.g. PNT-8921B"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Administering Health Facility / Session</label>
                <input
                  type="text"
                  value={center}
                  onChange={(e) => setCenter(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setSelectedVaccineForAdmin(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Vaccine Administration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
