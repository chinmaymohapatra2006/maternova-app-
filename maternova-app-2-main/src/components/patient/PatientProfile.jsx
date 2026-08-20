import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import { SyncStatusPill } from '../common/SyncStatusPill';
import { MicroChart } from '../common/MicroChart';
import { PregnancyModule } from './PregnancyModule';
import { InfantModule } from './InfantModule';
import { ElderlyModule } from './ElderlyModule';
import { NutritionAdvisor } from './NutritionAdvisor';
import { ReportsViewer } from './ReportsViewer';
import { VitalsEntryModal } from '../asha/VitalsEntryModal';
import { DoctorEditPatientModal } from '../doctor/DoctorEditPatientModal';
import { analyzePatientHealthTrajectory } from '../../services/ai/healthInsightsService';
import {
  ArrowLeft,
  Heart,
  Baby,
  User,
  Activity,
  Utensils,
  FileText,
  Sparkles,
  PlusCircle,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Edit3,
  Lock
} from 'lucide-react';

export const PatientProfile = ({ patientId, onBack }) => {
  const { patients, vitals, vaccinations, reports } = useAppData();
  const { currentRole } = useAuth();
  const [activeTab, setActiveTab] = useState('TRACK'); // TRACK, VITALS, NUTRITION, REPORTS, AI
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [isDoctorEditOpen, setIsDoctorEditOpen] = useState(false);

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h4 className="font-bold text-slate-700">Patient not found</h4>
        <button onClick={onBack} className="btn-primary mt-4">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const patientVitals = vitals.filter((v) => v.patientId === patient.id).sort((a, b) => new Date(a.date) - new Date(b.date));
  const patientVaccines = vaccinations.filter((v) => v.patientId === patient.id);
  const patientReports = reports.filter((r) => r.patientId === patient.id);

  const aiAnalysis = analyzePatientHealthTrajectory(patient, patientVitals, patientReports, patientVaccines);

  const categoryIcons = {
    PREGNANT_WOMAN: Heart,
    INFANT: Baby,
    ELDERLY: User
  };
  const CategoryIcon = categoryIcons[patient.category] || Heart;

  const isDoctor = currentRole === 'DOCTOR';
  const isAsha = currentRole === 'ASHA_WORKER';
  const isPatient = currentRole === 'PATIENT';

  return (
    <div className="space-y-6">
      {/* 1. Header & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 transition border border-amber-300 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Dashboard
        </button>

        <div className="flex items-center gap-2">
          {isPatient ? (
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-300 font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> View-Only Access Mode
            </span>
          ) : (
            <SyncStatusPill status={patient.syncStatus} lastSync={patient.lastSyncTimestamp} />
          )}

          {/* Doctor Edit Button */}
          {isDoctor && (
            <button
              onClick={() => setIsDoctorEditOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-700 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition flex items-center gap-1.5 shadow-xs"
            >
              <Edit3 className="w-4 h-4" /> Edit Medical Record
            </button>
          )}

          {/* ASHA Vitals Button */}
          {isAsha && (
            <button
              onClick={() => setIsVitalsModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Record New Vitals
            </button>
          )}
        </div>
      </div>

      {/* 2. Patient Master Identity Card */}
      <div className="bg-white p-5 rounded-3xl border-2 border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-bold shadow-xs">
              <CategoryIcon className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{patient.name}</h2>
                <Badge variant={patient.category === 'PREGNANT_WOMAN' ? 'rose' : patient.category === 'INFANT' ? 'teal' : 'indigo'}>
                  {patient.category.replace('_', ' ')}
                </Badge>
                {aiAnalysis && aiAnalysis.triageBand === 'HIGH_RISK' && (
                  <Badge variant="rose">⚠️ High Risk Triage</Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                <span>
                  <strong>ABHA / Patient ID:</strong> <span className="font-mono">{patient.id}</span>
                </span>
                <span>•</span>
                <span>
                  <strong>Age:</strong> {patient.age} Yrs ({patient.gender})
                </span>
                <span>•</span>
                <span>
                  <strong>Guardian:</strong> {patient.guardianName} ({patient.guardianRelation})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 text-xs text-slate-700 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Village {patient.village || 'Rampur'}, {patient.region || 'North India'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-700" />
              <span>{patient.phone || 'No mobile'}</span>
            </div>
          </div>
        </div>

        {/* Doctor Clinical Order Display */}
        {patient.doctorClinicalOrder && (
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
            <div>
              <strong>Doctor's Active Clinical Prescription & Order:</strong>{' '}
              {patient.doctorClinicalOrder}
            </div>
          </div>
        )}
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-amber-200 gap-2 pb-px text-xs font-bold">
        <button
          onClick={() => setActiveTab('TRACK')}
          className={`px-4 py-2.5 border-b-2 flex items-center gap-2 transition ${activeTab === 'TRACK' ? 'border-amber-700 text-amber-900 bg-amber-100/60 rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <CategoryIcon className="w-4 h-4" />
          {patient.category === 'PREGNANT_WOMAN'
            ? 'ANC & Pregnancy Track'
            : patient.category === 'INFANT'
              ? 'Immunization & Growth Track'
              : 'Geriatric & Chronic Care Track'}
        </button>

        <button
          onClick={() => setActiveTab('VITALS')}
          className={`px-4 py-2.5 border-b-2 flex items-center gap-2 transition ${activeTab === 'VITALS' ? 'border-amber-700 text-amber-900 bg-amber-100/60 rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Activity className="w-4 h-4" /> Vitals History & Trends ({patientVitals.length})
        </button>

        <button
          onClick={() => setActiveTab('NUTRITION')}
          className={`px-4 py-2.5 border-b-2 flex items-center gap-2 transition ${activeTab === 'NUTRITION' ? 'border-amber-700 text-amber-900 bg-amber-100/60 rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Utensils className="w-4 h-4" /> Regional Nutrition Advisor
        </button>

        <button
          onClick={() => setActiveTab('REPORTS')}
          className={`px-4 py-2.5 border-b-2 flex items-center gap-2 transition ${activeTab === 'REPORTS' ? 'border-amber-700 text-amber-900 bg-amber-100/60 rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <FileText className="w-4 h-4" /> Medical Reports ({patientReports.length})
        </button>

        {!isPatient && (
          <button
            onClick={() => setActiveTab('AI')}
            className={`px-4 py-2.5 border-b-2 flex items-center gap-2 transition ${activeTab === 'AI' ? 'border-amber-700 text-amber-900 bg-amber-100/60 rounded-t-xl' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" /> AI Insights & Doctor Digest
          </button>
        )}
      </div>

      {/* 4. Tab Content Panels */}
      {activeTab === 'TRACK' && (
        <>
          {patient.category === 'PREGNANT_WOMAN' && <PregnancyModule patient={patient} />}
          {patient.category === 'INFANT' && <InfantModule patient={patient} />}
          {patient.category === 'ELDERLY' && <ElderlyModule patient={patient} />}
        </>
      )}

      {activeTab === 'VITALS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patient.category !== 'INFANT' && (
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Systolic Blood Pressure Trend
                  </h4>
                  <span className="text-[11px] font-semibold text-rose-600">Threshold: ≥140 mmHg</span>
                </div>
                <MicroChart
                  data={patientVitals.filter((v) => v.systolicBp)}
                  dataKey="systolicBp"
                  labelKey="date"
                  color="#E11D48"
                  unit="mmHg"
                  maxThreshold={140}
                />
              </div>
            )}

            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Weight Trajectory History
                </h4>
                <span className="text-[11px] font-semibold text-teal-700">Progression</span>
              </div>
              <MicroChart
                data={patientVitals.filter((v) => v.weightKg)}
                dataKey="weightKg"
                labelKey="date"
                color="#0D9488"
                unit="kg"
              />
            </div>
          </div>

          {/* Vitals History Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Chronological Measurements Log
              </h4>
              {!isPatient && (
                <button
                  onClick={() => setIsVitalsModalOpen(true)}
                  className="btn-secondary text-xs flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add Reading
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Weight</th>
                    <th className="p-3">Blood Pressure</th>
                    <th className="p-3">Hemoglobin</th>
                    <th className="p-3">Blood Sugar</th>
                    <th className="p-3">Recorded By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {patientVitals.slice().reverse().map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{v.date}</td>
                      <td className="p-3">{v.weightKg ? `${v.weightKg} kg` : '--'}</td>
                      <td className="p-3">
                        {v.systolicBp ? (
                          <span className={v.systolicBp >= 140 ? 'text-rose-600 font-bold' : ''}>
                            {v.systolicBp}/{v.diastolicBp} mmHg
                          </span>
                        ) : '--'}
                      </td>
                      <td className="p-3">
                        {v.hemoglobin ? (
                          <span className={v.hemoglobin < 10 ? 'text-amber-600 font-bold' : ''}>
                            {v.hemoglobin} g/dL
                          </span>
                        ) : '--'}
                      </td>
                      <td className="p-3">{v.bloodSugarFasting ? `${v.bloodSugarFasting} mg/dL (F)` : '--'}</td>
                      <td className="p-3 text-slate-400">{v.recordedBy || 'ASHA Worker'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'NUTRITION' && <NutritionAdvisor patient={patient} />}

      {activeTab === 'REPORTS' && <ReportsViewer patient={patient} />}

      {activeTab === 'AI' && !isPatient && (
        <div className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">AI Clinical Health Insights & Trajectory Analysis</h3>
                  <p className="text-xs text-slate-300">
                    Rule-assisted pattern recognition for decision support.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Triage Risk Score</span>
                <span className="text-lg font-black text-teal-400">{aiAnalysis.riskScore} / 100</span>
              </div>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur rounded-2xl border border-white/10 text-xs space-y-1.5 leading-relaxed">
              <span className="text-teal-300 font-bold uppercase text-[10px] tracking-wider block">
                Doctor Case Digest Summary:
              </span>
              <p className="text-slate-100">{aiAnalysis.doctorDigest}</p>
            </div>
          </div>
        </div>
      )}

      {/* Vitals Entry Modal */}
      <VitalsEntryModal
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        patient={patient}
      />

      {/* Doctor Edit Modal */}
      {isDoctorEditOpen && (
        <DoctorEditPatientModal
          isOpen={isDoctorEditOpen}
          onClose={() => setIsDoctorEditOpen(false)}
          patient={patient}
        />
      )}
    </div>
  );
};
