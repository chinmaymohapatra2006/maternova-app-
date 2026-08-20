import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import { SidebarLanguageSwitcher } from '../common/SidebarLanguageSwitcher';
import { DoctorEditPatientModal } from './DoctorEditPatientModal';
import { DoctorGovtSchemesView } from './sidebar/DoctorGovtSchemesView';
import { DoctorEditableNutritionPlanView } from './sidebar/DoctorEditableNutritionPlanView';
import { DoctorStockStorageView } from './sidebar/DoctorStockStorageView';
import { analyzePatientHealthTrajectory } from '../../services/ai/healthInsightsService';
import {
  Stethoscope,
  AlertTriangle,
  Heart,
  Baby,
  User,
  Search,
  CheckCircle2,
  FileText,
  Activity,
  ArrowRight,
  Sparkles,
  ClipboardList,
  Edit3,
  Trash2,
  Filter,
  Landmark,
  Utensils,
  Package,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const DoctorDashboard = ({ onSelectPatient }) => {
  const { patients, vitals, reports, vaccinations } = useAppData();
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  // Navigation tab state: 'CLINICAL_TRIAGE' | 'GOVT_SCHEMES' | 'NUTRITION_PLAN_EDITABLE' | 'STOCK_STORAGE'
  const [activeTab, setActiveTab] = useState('CLINICAL_TRIAGE');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [filterCohort, setFilterCohort] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);

  // Analyze all patients for triage ranking
  const triagedPatients = patients
    .map((patient) => {
      const pVitals = vitals.filter((v) => v.patientId === patient.id);
      const pReports = reports.filter((r) => r.patientId === patient.id);
      const pVac = vaccinations.filter((v) => v.patientId === patient.id);
      const analysis = analyzePatientHealthTrajectory(patient, pVitals, pReports, pVac);
      return { patient, analysis };
    })
    .sort((a, b) => b.analysis.riskScore - a.analysis.riskScore);

  const highRiskQueue = triagedPatients.filter((item) => item.analysis.triageBand === 'HIGH_RISK');

  const filteredItems = triagedPatients.filter(({ patient }) => {
    if (filterCohort !== 'ALL' && patient.category !== filterCohort) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return patient.name.toLowerCase().includes(q) || patient.id.toLowerCase().includes(q);
    }
    return true;
  });

  const doctorNavItems = [
    {
      id: 'CLINICAL_TRIAGE',
      label: 'Clinical Registry',
      hindiLabel: 'क्लिनिकल मरीज रजिस्टर',
      icon: Stethoscope,
      badge: `${patients.length}`
    },
    {
      id: 'GOVT_SCHEMES',
      label: 'Government Schemes',
      hindiLabel: 'योजना क्लिनिकल सत्यापन',
      icon: Landmark,
      badge: 'PMMVY / JSY'
    },
    {
      id: 'NUTRITION_PLAN_EDITABLE',
      label: 'Nutrient Plan (Editable)',
      hindiLabel: 'पोषण प्रोटोकॉल संपादन',
      icon: Utensils,
      badge: 'MO Editable'
    },
    {
      id: 'STOCK_STORAGE',
      label: 'Stock & Storage Mgmt',
      hindiLabel: 'दवा भंडार व इंडेंट स्वीकृति',
      icon: Package,
      badge: 'PHC Pharmacy'
    }
  ];

  const handleNavSelect = (id) => {
    setActiveTab(id);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)]">
      {/* Mobile Top Toggle Header */}
      <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-indigo-200 mb-4 shadow-xs">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-black text-indigo-950 bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-300 hover:bg-indigo-100 transition"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-4 h-4 text-indigo-800" />
          <span>Menu • {doctorNavItems.find((n) => n.id === activeTab)?.label}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-rose-50 text-rose-800 font-bold px-2.5 py-1 rounded-xl border border-rose-200">
            {highRiskQueue.length} High Risk
          </span>
        </div>
      </div>

      {/* Dark Semi-Transparent Backdrop Overlay on Mobile */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Layout Wrapper: Fixed persistent left sidebar (w-64) + Content area */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* 1. FIXED PERSISTENT SIDEBAR FOR DOCTOR (w-64) */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-6 inset-y-0 left-0 z-50 lg:z-10 w-64 shrink-0 bg-white border-r-2 lg:border-2 border-indigo-200 shadow-2xl lg:shadow-xs lg:rounded-3xl p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out h-full lg:h-auto min-h-screen lg:min-h-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="space-y-4">
            {/* Sidebar Header with Mobile Close Button */}
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-900 text-white flex items-center justify-center text-xl shadow-xs">
                  👨🏽‍⚕️
                </div>
                <div>
                  <h3 className="font-black text-indigo-950 text-sm">Doctor Portal</h3>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                    Medical Officer PHC
                  </span>
                </div>
              </div>

              {/* Close Button on Mobile Drawer */}
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Language Switcher with All Options */}
            <SidebarLanguageSwitcher theme="indigo" />

            {/* Navigation List */}
            <nav className="space-y-1.5">
              {doctorNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`w-full text-left p-3 rounded-2xl transition flex items-center justify-between gap-2.5 text-xs font-extrabold group ${isActive ? 'bg-indigo-900 text-white shadow-md' : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-950'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl transition ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-900 group-hover:bg-indigo-200'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block leading-tight">{item.label}</span>
                        <span className={`text-[10px] font-semibold block ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {item.hindiLabel}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${isActive ? 'bg-indigo-950 text-indigo-200 border border-white/20' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Section */}
          <div className="pt-4 border-t border-indigo-100 space-y-2.5">
            <div className="p-3 bg-indigo-50/80 rounded-2xl border border-indigo-200 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-indigo-950">
                <span>Clinical Authorization</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Full Diagnosis & Data Editing Permissions Active
              </p>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600 truncate">
              <strong>Center:</strong> {currentUser.center}
            </div>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-1 w-full min-w-0">
          {/* VIEW 1: CLINICAL TRIAGE & PATIENT MASTER */}
          {activeTab === 'CLINICAL_TRIAGE' && (
            <div className="space-y-6">
              {/* Doctor Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-800/40">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-xl">
                      👨🏽‍⚕️
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{currentUser.name}</h2>
                      <span className="text-xs text-indigo-300 font-medium">
                        {currentUser.roleTitle} • {currentUser.center}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    {currentUser.specialty} • <strong className="text-emerald-400">Clinical Editing & Diagnosis Authorization Active</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.prioritySurveillance}</span>
                    <span className="text-base font-black text-rose-400">{highRiskQueue.length} {t.highRiskCases}</span>
                  </div>
                </div>
              </div>

              {/* High-Risk Surveillance Queue */}
              {highRiskQueue.length > 0 && (
                <div className="p-5 bg-rose-50/80 border-2 border-rose-300 rounded-3xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-rose-950 font-black text-sm">
                      <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />
                      {t.highRiskQueueTitle}
                    </div>
                    <Badge variant="rose" size="sm">
                      {highRiskQueue.length} {t.priorityReview}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {highRiskQueue.map(({ patient, analysis }) => (
                      <div
                        key={patient.id}
                        className="p-4 bg-white border border-rose-200 rounded-2xl hover:shadow-md transition flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h5
                                onClick={() => onSelectPatient(patient.id)}
                                className="text-xs font-bold text-slate-900 hover:text-teal-700 cursor-pointer"
                              >
                                {patient.name}
                              </h5>
                              <span className="text-[11px] text-slate-400 font-mono">({patient.id})</span>
                            </div>
                            <Badge variant="rose" size="sm">
                              Risk Score: {analysis.riskScore}/100
                            </Badge>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed bg-rose-50/50 p-2 rounded-xl border border-rose-100">
                            {analysis.doctorDigest}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <button
                            onClick={() => setEditingPatient(patient)}
                            className="text-indigo-700 font-bold flex items-center gap-1 hover:bg-indigo-50 px-2.5 py-1 rounded-lg transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> {t.editDataBtn}
                          </button>

                          <button
                            onClick={() => onSelectPatient(patient.id)}
                            className="text-teal-700 font-bold flex items-center gap-1 hover:underline"
                          >
                            {t.viewFileBtn} <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Health Centre Patient Master Registry */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-indigo-700" />
                      {t.phcRegistryTitle}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {t.phcRegistrySub}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {[
                      { id: 'ALL', label: t.totalBeneficiaries },
                      { id: 'PREGNANT_WOMAN', label: t.pregnantLady },
                      { id: 'INFANT', label: t.infants },
                      { id: 'ELDERLY', label: t.elderlyPeople }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setFilterCohort(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterCohort === tab.id ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="input-field pl-10 text-xs py-2"
                  />
                </div>

                {/* Master Table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3.5">Patient / ID</th>
                          <th className="p-3.5">Cohort</th>
                          <th className="p-3.5">{t.location}</th>
                          <th className="p-3.5">{t.latestHealthReadings}</th>
                          <th className="p-3.5">Risk Level</th>
                          <th className="p-3.5">{t.doctorOrderLabel}</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredItems.map(({ patient, analysis }) => {
                          const v = patient.latestVitals || {};
                          return (
                            <tr key={patient.id} className="hover:bg-slate-50">
                              <td className="p-3.5">
                                <div
                                  onClick={() => onSelectPatient(patient.id)}
                                  className="font-bold text-slate-900 hover:text-indigo-700 cursor-pointer"
                                >
                                  {patient.name}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono">{patient.id}</div>
                              </td>
                              <td className="p-3.5">
                                <Badge
                                  variant={patient.category === 'PREGNANT_WOMAN' ? 'rose' : patient.category === 'INFANT' ? 'teal' : 'indigo'}
                                  size="sm"
                                >
                                  {patient.category.replace('_', ' ')}
                                </Badge>
                              </td>
                              <td className="p-3.5">{patient.village || 'Rampur'}</td>
                              <td className="p-3.5 font-mono">
                                {v.systolicBp ? `${v.systolicBp}/${v.diastolicBp}` : '--'} | {v.weightKg ? `${v.weightKg}kg` : '--'}
                              </td>
                              <td className="p-3.5">
                                <Badge
                                  variant={analysis.triageBand === 'HIGH_RISK' ? 'rose' : analysis.triageBand === 'MODERATE_RISK' ? 'amber' : 'emerald'}
                                  size="sm"
                                >
                                  {analysis.triageBand.replace('_', ' ')}
                                </Badge>
                              </td>
                              <td className="p-3.5 max-w-xs text-slate-600 truncate">
                                {patient.doctorClinicalOrder || patient.pregnancyDetails?.highRiskNotes || 'Standard follow-up.'}
                              </td>
                              <td className="p-3.5 text-right space-x-2">
                                <button
                                  onClick={() => setEditingPatient(patient)}
                                  className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-bold hover:bg-indigo-100 transition inline-flex items-center gap-1"
                                  title="Edit patient diagnosis, risk levels, and orders"
                                >
                                  <Edit3 className="w-3 h-3" /> {t.editDataBtn}
                                </button>
                                <button
                                  onClick={() => onSelectPatient(patient.id)}
                                  className="px-2.5 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-bold hover:bg-teal-100 transition"
                                >
                                  {t.viewFileBtn}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: GOVERNMENT SCHEMES & CLINICAL CERTIFICATION */}
          {activeTab === 'GOVT_SCHEMES' && <DoctorGovtSchemesView />}

          {/* VIEW 3: NUTRITION PLAN (DOCTOR EDITABLE) */}
          {activeTab === 'NUTRITION_PLAN_EDITABLE' && <DoctorEditableNutritionPlanView />}

          {/* VIEW 4: STOCK & STORAGE MANAGEMENT (PHC WAREHOUSE & INDENTS) */}
          {activeTab === 'STOCK_STORAGE' && <DoctorStockStorageView />}
        </main>
      </div>

      {/* Edit Patient Modal */}
      {editingPatient && (
        <DoctorEditPatientModal
          isOpen={!!editingPatient}
          onClose={() => setEditingPatient(null)}
          patient={editingPatient}
        />
      )}
    </div>
  );
};
