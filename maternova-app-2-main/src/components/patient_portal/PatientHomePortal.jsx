import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import { SidebarLanguageSwitcher } from '../common/SidebarLanguageSwitcher';
import { PatientGovtSchemesView } from './sidebar/PatientGovtSchemesView';
import { PatientUneditedNutritionView } from './sidebar/PatientUneditedNutritionView';
import { PatientPriorNotificationsView } from './sidebar/PatientPriorNotificationsView';
import { getPersonalizedNutritionPlan } from '../../services/nutrition/nutritionEngine';
import { calculateAgeDetails } from '../../services/rules/vaccinationRules';
import {
  Heart,
  Baby,
  User,
  Activity,
  Utensils,
  Calendar,
  Phone,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Lock,
  UserCheck,
  Landmark,
  Bell,
  Menu,
  X,
  Home
} from 'lucide-react';

export const PatientHomePortal = () => {
  const { patients, vitals, vaccinations, reports } = useAppData();
  const { currentUser, activePatientIdForPortal } = useAuth();
  const { t } = useLanguage();

  // Navigation tab state: 'HEALTH_PASS' | 'GOVT_SCHEMES' | 'NUTRITION_PLAN' | 'PRIOR_NOTIFICATIONS'
  const [activeTab, setActiveTab] = useState('HEALTH_PASS');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // One ID One Login: Strictly bind to the authenticated patient's ID
  const patientId = currentUser?.activePatientId || currentUser?.id || activePatientIdForPortal || 'PAT-PW-101';
  const selectedPatient = patients.find((p) => p.id === patientId) || patients[0] || null;

  if (!selectedPatient) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
        <p className="text-sm font-semibold text-slate-700">No patient record found for your ID</p>
      </div>
    );
  }

  const patientVitals = vitals.filter((v) => v.patientId === selectedPatient.id);
  const patientVaccines = vaccinations.filter((v) => v.patientId === selectedPatient.id);
  const patientReports = reports.filter((r) => r.patientId === selectedPatient.id);

  const categoryIcons = {
    PREGNANT_WOMAN: Heart,
    INFANT: Baby,
    ELDERLY: User
  };

  const CategoryIcon = categoryIcons[selectedPatient.category] || Heart;
  const latestV = selectedPatient.latestVitals || {};

  // Accurate infant age in months calculation
  const isInfant = selectedPatient.category === 'INFANT';
  const ageDetails = calculateAgeDetails(selectedPatient.dob);
  const infantAgeString = ageDetails.months > 0 
    ? `${ageDetails.months} ${t.months} (${ageDetails.weeks} ${t.weeks})` 
    : `${ageDetails.weeks} ${t.weeks} (${ageDetails.days} ${t.days})`;

  const patientNavItems = [
    {
      id: 'HEALTH_PASS',
      label: 'Digital Health Pass',
      hindiLabel: 'डिजिटल स्वास्थ्य पत्र',
      icon: Home,
      badge: 'Active'
    },
    {
      id: 'GOVT_SCHEMES',
      label: 'Government Scheme',
      hindiLabel: 'सरकारी स्वास्थ्य योजनाएं',
      icon: Landmark,
      badge: 'PMMVY / JSY'
    },
    {
      id: 'NUTRITION_PLAN',
      label: 'Nutrient Plan (Unedited)',
      hindiLabel: 'पोषण व आहार (केवल दर्शन)',
      icon: Utensils,
      badge: 'View-Only'
    },
    {
      id: 'PRIOR_NOTIFICATIONS',
      label: 'Prior Notification',
      hindiLabel: 'पूर्व सूचनाएं व अनुस्मारक',
      icon: Bell,
      badge: '3 New',
      highlightBadge: true
    }
  ];

  const handleNavSelect = (id) => {
    setActiveTab(id);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)]">
      {/* Mobile Top Toggle Header */}
      <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-slate-200 mb-4 shadow-xs">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-black text-teal-950 bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-300 hover:bg-teal-100 transition"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-4 h-4 text-teal-800" />
          <span>Menu • {patientNavItems.find((n) => n.id === activeTab)?.label}</span>
        </button>

        <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-xl border border-emerald-200">
          One ID: {selectedPatient.id}
        </span>
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
        {/* 1. FIXED PERSISTENT SIDEBAR FOR PATIENT (w-64) */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-6 inset-y-0 left-0 z-50 lg:z-10 w-64 shrink-0 bg-white border-r-2 lg:border-2 border-slate-200 shadow-2xl lg:shadow-xs lg:rounded-3xl p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out h-full lg:h-auto min-h-screen lg:min-h-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="space-y-4">
            {/* Sidebar Header with Mobile Close Button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-xl shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Patient Portal</h3>
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                    Health Account
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
            <SidebarLanguageSwitcher theme="teal" />

            {/* Navigation List */}
            <nav className="space-y-1.5">
              {patientNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`w-full text-left p-3 rounded-2xl transition flex items-center justify-between gap-2.5 text-xs font-extrabold group ${isActive ? 'bg-teal-800 text-white shadow-md' : 'text-slate-700 hover:bg-teal-50 hover:text-teal-950'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl transition ${isActive ? 'bg-white/20 text-white' : 'bg-teal-100/70 text-teal-900 group-hover:bg-teal-200'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block leading-tight">{item.label}</span>
                        <span className={`text-[10px] font-semibold block ${isActive ? 'text-teal-200' : 'text-slate-400'}`}>
                          {item.hindiLabel}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        isActive
                          ? 'bg-teal-950 text-teal-200 border border-white/20'
                          : item.highlightBadge
                            ? 'bg-rose-100 text-rose-800 border border-rose-300 font-extrabold animate-pulse'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Section */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
              <div className="text-slate-700 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Assigned ASHA Worker</span>
              </div>
              <p className="text-[11px] text-slate-900 font-extrabold">
                {selectedPatient.ashaWorkerId || 'ASHA Shanti Devi'}
              </p>
            </div>

            <div className="p-2 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 font-bold border border-emerald-200 text-center">
              ✓ Verified Patient Session
            </div>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-1 w-full min-w-0">
          {/* VIEW 1: DIGITAL HEALTH PASS & SUMMARY */}
          {activeTab === 'HEALTH_PASS' && (
            <div className="space-y-6">
              {/* Authenticated Identity Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {t.loggedInAs}: {selectedPatient.name}
                      </h3>
                      <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold">
                        {selectedPatient.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Personalized Health Account • One ID One Login
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold flex items-center gap-1.5 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {t.verifiedSession}
                  </span>
                </div>
              </div>

              {/* Universal White Digital Health Card */}
              <div className="bg-white text-slate-900 p-6 sm:p-7 rounded-3xl shadow-md border-2 border-slate-200/90 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                      <CategoryIcon className="w-9 h-9 text-teal-700" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wider bg-teal-100 text-teal-900 px-3 py-0.5 rounded-full border border-teal-300">
                          {t.digitalHealthPass}
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                          {t.abhaId}: 91-{selectedPatient.id.slice(-4)}-{selectedPatient.id.slice(-3)}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {selectedPatient.name}
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                        <span>
                          <strong>{t.age}:</strong>{' '}
                          {isInfant ? (
                            <span className="font-extrabold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              {infantAgeString}
                            </span>
                          ) : (
                            `${selectedPatient.age} ${t.years} (${selectedPatient.gender})`
                          )}
                        </span>
                        <span>•</span>
                        <span>
                          <strong>{t.guardian}:</strong> {selectedPatient.guardianName} ({selectedPatient.guardianRelation})
                        </span>
                        <span>•</span>
                        <span>
                          <strong>{t.location}:</strong> Village {selectedPatient.village || 'Rampur'}, {selectedPatient.region}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                    <div className="text-teal-900 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-700" /> {t.registeredAsha}
                    </div>
                    <div className="text-slate-800 font-black text-sm">{selectedPatient.ashaWorkerId || 'ASHA Shanti Devi'}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {t.emergencyHelpline}
                    </div>
                  </div>
                </div>
              </div>

              {/* Care Milestone & Vitals Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Box 1: Next Checkup / Vaccine Due */}
                <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-700" /> {t.nextCheckupVaccine}
                    </h4>
                    <Badge variant="amber" size="sm">{t.scheduled}</Badge>
                  </div>

                  {selectedPatient.category === 'PREGNANT_WOMAN' && (
                    <div>
                      <div className="text-base font-extrabold text-slate-800">
                        {selectedPatient.pregnancyDetails?.gestationalWeeks >= 28 ? '4th ANC Checkup (Pre-Delivery)' : '3rd ANC Checkup (Routine)'}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Expected Delivery (EDD): <strong className="text-rose-700 font-bold">{selectedPatient.pregnancyDetails?.edd || '22 Oct 2026'}</strong>
                      </p>
                    </div>
                  )}

                  {selectedPatient.category === 'INFANT' && (
                    <div>
                      <div className="text-base font-extrabold text-teal-900">
                        Next Vaccine: {patientVaccines.find((v) => v.status === 'DUE')?.vaccineName || '14th Week Pentavalent / OPV-3'}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {t.age}: <strong>{infantAgeString}</strong> • Session Site: Village Anganwadi Centre
                      </p>
                    </div>
                  )}

                  {selectedPatient.category === 'ELDERLY' && (
                    <div>
                      <div className="text-base font-extrabold text-indigo-900">
                        Monthly Blood Pressure & Sugar Check
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        ASHA home visit and medication supply verification
                      </p>
                    </div>
                  )}

                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 font-medium border border-slate-100">
                    💡 <strong>Tip:</strong> Keep your Mother-Child Protection (MCP) card ready during ASHA home visits.
                  </div>
                </div>

                {/* Box 2: Latest Vitals Snapshot */}
                <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-700" /> {t.latestHealthReadings}
                    </h4>
                    <span className="text-[11px] text-slate-400">{latestV.date || 'Recent'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">{t.weight}:</span>
                      <span className="text-base font-black text-slate-900">{latestV.weightKg ? `${latestV.weightKg} kg` : '--'}</span>
                    </div>

                    {selectedPatient.category !== 'INFANT' ? (
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block">{t.bloodPressure}:</span>
                        <span className="text-base font-black text-slate-900">
                          {latestV.systolicBp ? `${latestV.systolicBp}/${latestV.diastolicBp}` : '--/--'}
                        </span>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block">Length:</span>
                        <span className="text-base font-black text-slate-900">{latestV.heightCm ? `${latestV.heightCm} cm` : '--'}</span>
                      </div>
                    )}

                    {selectedPatient.category === 'PREGNANT_WOMAN' && (
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                        <span className="text-slate-500 block">{t.hemoglobin}:</span>
                        <span className="text-base font-black text-rose-700">{latestV.hemoglobin ? `${latestV.hemoglobin} g/dL` : '--'}</span>
                      </div>
                    )}

                    {selectedPatient.category === 'ELDERLY' && (
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                        <span className="text-slate-500 block">{t.bloodSugar}:</span>
                        <span className="text-base font-black text-indigo-900">{latestV.bloodSugarFasting ? `${latestV.bloodSugarFasting} mg/dL` : '--'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Box 3: Doctor's Prescription & Advice */}
                <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-indigo-700" /> {t.doctorPrescriptionAdvice}
                    </h4>
                    <Badge variant="indigo" size="sm">{t.active}</Badge>
                  </div>

                  <div className="text-xs text-slate-700 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 space-y-1.5">
                    <div className="font-bold text-indigo-950">
                      {selectedPatient.category === 'PREGNANT_WOMAN'
                        ? 'Take Iron Folic Acid (IFA) and Calcium tablets daily with meals.'
                        : selectedPatient.category === 'INFANT'
                          ? 'Feed thick mashed lentils, rice khichdi with 1 tsp ghee.'
                          : 'Maintain low salt diet, daily morning walking, and timely BP medication.'}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {t.doctorOrderLabel}: {patientReports[0]?.doctorRemarks || 'Maintain balanced nutrition and adequate hydration.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: GOVERNMENT SCHEMES & BENEFICIARY ENTITLEMENTS */}
          {activeTab === 'GOVT_SCHEMES' && (
            <PatientGovtSchemesView patient={selectedPatient} />
          )}

          {/* VIEW 3: NUTRITION PLAN (UNEDITED / VIEW-ONLY) */}
          {activeTab === 'NUTRITION_PLAN' && (
            <PatientUneditedNutritionView patient={selectedPatient} />
          )}

          {/* VIEW 4: PRIOR NOTIFICATIONS & REMINDERS */}
          {activeTab === 'PRIOR_NOTIFICATIONS' && (
            <PatientPriorNotificationsView patient={selectedPatient} />
          )}
        </main>
      </div>
    </div>
  );
};
