import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { PatientRegistrationModal } from './PatientRegistrationModal';
import { VitalsEntryModal } from './VitalsEntryModal';
import { ReminderListView } from './ReminderListView';
import { NotificationsScheduleView } from './sidebar/NotificationsScheduleView';
import { GovernmentSchemesView } from './sidebar/GovernmentSchemesView';
import { NutritionPlanView } from './sidebar/NutritionPlanView';
import { AshaIncentivesView } from './sidebar/AshaIncentivesView';
import { AshaRankingsSubView } from './sidebar/AshaRankingsSubView';
import { StockStorageView } from './sidebar/StockStorageView';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { SyncStatusPill } from '../common/SyncStatusPill';
import { SidebarLanguageSwitcher } from '../common/SidebarLanguageSwitcher';
import { calculateAgeDetails } from '../../services/rules/vaccinationRules';
import {
  Users,
  Heart,
  Baby,
  User,
  Plus,
  Search,
  Activity,
  ArrowRight,
  ShieldAlert,
  Phone,
  PhoneCall,
  Calendar,
  Sparkles,
  PlusCircle,
  Clock,
  CheckCircle2,
  Home,
  Bell,
  Landmark,
  Utensils,
  DollarSign,
  Trophy,
  Package,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const AshaDashboard = ({ onSelectPatient }) => {
  const { patients, pendingSyncCount } = useAppData();
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  // Sidebar navigation state: 'DASHBOARD' | 'NOTIFICATIONS_SCHEDULE' | 'GOVT_SCHEMES' | 'NUTRITION_PLAN' | 'INCENTIVES' | 'PHC_RANKINGS' | 'STOCK_STORAGE'
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [isIncentivesSubmenuOpen, setIsIncentivesSubmenuOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [vitalModalPatient, setVitalModalPatient] = useState(null);
  const [cohortModalCategory, setCohortModalCategory] = useState(null); // 'PREGNANT_WOMAN' | 'INFANT' | 'ELDERLY' | 'ALL' | null
  const [cohortSearch, setCohortSearch] = useState('');

  // Stats
  const pregnantPatients = patients.filter((p) => p.category === 'PREGNANT_WOMAN');
  const infantPatients = patients.filter((p) => p.category === 'INFANT');
  const elderlyPatients = patients.filter((p) => p.category === 'ELDERLY');

  const navItems = [
    {
      id: 'DASHBOARD',
      label: 'Field Home',
      hindiLabel: 'गृह डैशबोर्ड',
      icon: Home,
      badge: `${patients.length}`
    },
    {
      id: 'NOTIFICATIONS_SCHEDULE',
      label: 'Schedule & Calling',
      hindiLabel: 'उपचार समय सारिणी व कॉल',
      icon: Bell,
      badge: '4 Due',
      highlightBadge: true
    },
    {
      id: 'GOVT_SCHEMES',
      label: 'Government Schemes',
      hindiLabel: 'सरकारी योजनाएं',
      icon: Landmark,
      badge: 'PMMVY / JSY'
    },
    {
      id: 'NUTRITION_PLAN',
      label: 'Nutrient & Diet Plan',
      hindiLabel: 'पोषण व आहार योजना',
      icon: Utensils,
      badge: 'Desi Meals'
    },
    {
      id: 'INCENTIVES_GROUP',
      label: 'ASHA Incentives',
      hindiLabel: 'आशा प्रोत्साहन राशि',
      icon: DollarSign,
      badge: 'NHM Earnings',
      isGroup: true,
      subItems: [
        {
          id: 'INCENTIVES',
          label: 'My Claims Ledger',
          hindiLabel: 'आय व दावा खाता',
          icon: DollarSign,
          badge: '₹8,650'
        },
        {
          id: 'PHC_RANKINGS',
          label: 'PHC Ranking List',
          hindiLabel: 'पीएचसी मेरिट सूची (25 आशा)',
          icon: Trophy,
          badge: 'Rank #3',
          highlight: true
        }
      ]
    },
    {
      id: 'STOCK_STORAGE',
      label: 'Stock & Storage Mgmt',
      hindiLabel: 'दवा स्टॉक व भंडारण',
      icon: Package,
      badge: 'Field Kit'
    }
  ];

  const handleNavSelect = (id) => {
    setActiveTab(id);
    setIsMobileSidebarOpen(false);
  };

  // Filter cohort list inside modal
  const getSelectedCohortPatients = () => {
    let list = patients;
    if (cohortModalCategory && cohortModalCategory !== 'ALL') {
      list = patients.filter((p) => p.category === cohortModalCategory);
    }
    if (cohortSearch.trim()) {
      const q = cohortSearch.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || (p.village || '').toLowerCase().includes(q));
    }
    return list;
  };

  const getCohortModalTitle = () => {
    if (cohortModalCategory === 'PREGNANT_WOMAN') return t.popupPregnantTitle;
    if (cohortModalCategory === 'INFANT') return t.popupInfantTitle;
    if (cohortModalCategory === 'ELDERLY') return t.popupElderlyTitle;
    return t.popupAllTitle;
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)]">
      {/* Mobile Top Toggle Header */}
      <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-amber-200 mb-4 shadow-xs">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-black text-amber-950 bg-amber-100/80 px-3.5 py-2 rounded-xl border border-amber-300 hover:bg-amber-200 transition"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-4 h-4 text-amber-800" />
          <span>
            Menu • {activeTab === 'PHC_RANKINGS' ? 'PHC Ranking List' : navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
          </span>
        </button>

        <button
          onClick={() => setIsRegisterOpen(true)}
          className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> + Register
        </button>
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
        {/* 1. FIXED PERSISTENT SIDEBAR (w-64) */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-6 inset-y-0 left-0 z-50 lg:z-10 w-64 shrink-0 bg-white border-r-2 lg:border-2 border-amber-200 shadow-2xl lg:shadow-xs lg:rounded-3xl p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out h-full lg:h-auto min-h-screen lg:min-h-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="space-y-4">
            {/* Sidebar Header with Mobile Close Button */}
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-700 text-white flex items-center justify-center text-xl shadow-xs">
                  👩🏽‍⚕️
                </div>
                <div>
                  <h3 className="font-black text-amber-950 text-sm">ASHA Portal</h3>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    Field Operations
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
            <SidebarLanguageSwitcher theme="amber" />

            {/* Navigation List */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;

                // Handle Submenu Group for ASHA Incentives
                if (item.isGroup) {
                  const isAnySubActive = activeTab === 'INCENTIVES' || activeTab === 'PHC_RANKINGS';
                  return (
                    <div key={item.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setIsIncentivesSubmenuOpen(!isIncentivesSubmenuOpen);
                          if (!isAnySubActive) handleNavSelect('INCENTIVES');
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl transition flex items-center justify-between gap-2.5 text-xs font-extrabold group ${
                          isAnySubActive
                            ? 'bg-amber-100/90 text-amber-950 border border-amber-300'
                            : 'text-slate-700 hover:bg-amber-50 hover:text-amber-950'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-xl ${isAnySubActive ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block leading-tight">{item.label}</span>
                            <span className="text-[10px] font-semibold text-slate-400 block">
                              {item.hindiLabel}
                            </span>
                          </div>
                        </div>

                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isIncentivesSubmenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Submenu Dropdown / Nested Items */}
                      {isIncentivesSubmenuOpen && (
                        <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-amber-300 ml-3">
                          {item.subItems.map((sub) => {
                            const SubIcon = sub.icon;
                            const isSubActive = activeTab === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleNavSelect(sub.id)}
                                className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between text-[11px] font-extrabold ${
                                  isSubActive
                                    ? 'bg-amber-800 text-white shadow-xs'
                                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-950'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-yellow-300' : 'text-amber-700'}`} />
                                  <span>{sub.label}</span>
                                </div>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                  isSubActive
                                    ? 'bg-amber-950 text-amber-200'
                                    : sub.highlight
                                      ? 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                                      : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {sub.badge}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular Nav Items
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`w-full text-left p-3 rounded-2xl transition flex items-center justify-between gap-2.5 text-xs font-extrabold group ${isActive ? 'bg-amber-800 text-white shadow-md' : 'text-slate-700 hover:bg-amber-50 hover:text-amber-950'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl transition ${isActive ? 'bg-white/20 text-white' : item.highlightBadge ? 'bg-rose-100 text-rose-800 group-hover:bg-rose-200' : 'bg-amber-100/70 text-amber-900 group-hover:bg-amber-200'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block leading-tight">{item.label}</span>
                        <span className={`text-[10px] font-semibold block ${isActive ? 'text-amber-200' : 'text-slate-400'}`}>
                          {item.hindiLabel}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        isActive
                          ? 'bg-amber-900/80 text-amber-100 border border-white/20'
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
          <div className="pt-4 border-t border-amber-100 space-y-3">
            <button
              onClick={() => {
                setIsMobileSidebarOpen(false);
                setIsRegisterOpen(true);
              }}
              className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> {t.registerNewPatient}
            </button>

            <div className="p-2.5 bg-amber-50 rounded-xl text-[11px] text-amber-900 leading-tight">
              <strong>Assigned Center:</strong>
              <div className="text-slate-600 truncate">{currentUser.center}</div>
            </div>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-1 w-full min-w-0">
          {/* VIEW 1: FIELD HOME DASHBOARD */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-700/50">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">👩🏽‍⚕️</span>
                    <div>
                      <h2 className="text-lg font-bold">{t.ashaWelcome}, {currentUser.name}</h2>
                      <span className="text-xs text-teal-200 font-medium">
                        {currentUser.roleTitle} • {currentUser.center}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-teal-100/90">
                    {t.assignedArea}: <strong>{currentUser.assignedVillages.join(', ')}</strong> • Click on any category below to view individual details in pop-up window.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="btn-primary-white flex items-center gap-2 shadow-md hover:scale-105 transition"
                  >
                    <Plus className="w-4 h-4" /> {t.registerNewPatient}
                  </button>
                </div>
              </div>

              {/* Interactive Category Cards (Clicking opens Individual Details Pop-up) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Beneficiaries Card */}
                <div
                  onClick={() => {
                    setCohortModalCategory('ALL');
                    setCohortSearch('');
                  }}
                  className="stat-card cursor-pointer bg-white hover:border-teal-600 hover:shadow-lg transition p-5 rounded-2xl border-2 border-slate-200 group"
                  title="Click to view all individual patient details"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-wider">{t.totalBeneficiaries}</span>
                    <Users className="w-5 h-5 text-teal-600 group-hover:scale-110 transition" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2">{patients.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-teal-700 font-semibold mt-2 pt-2 border-t border-slate-100">
                    <span>{t.viewAllRecords}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                {/* Pregnant Lady / Mothers Card */}
                <div
                  onClick={() => {
                    setCohortModalCategory('PREGNANT_WOMAN');
                    setCohortSearch('');
                  }}
                  className="stat-card cursor-pointer bg-gradient-to-br from-rose-50/80 to-white hover:border-rose-500 hover:shadow-lg transition p-5 rounded-2xl border-2 border-rose-200 group"
                  title="Click to view all Pregnant Women individual details"
                >
                  <div className="flex items-center justify-between text-rose-700">
                    <span className="text-xs font-bold uppercase tracking-wider">{t.pregnantLady}</span>
                    <div className="p-2 rounded-xl bg-rose-100 text-rose-700 group-hover:scale-110 transition">
                      <Heart className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-rose-950 mt-2">{pregnantPatients.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-rose-700 font-bold mt-2 pt-2 border-t border-rose-100">
                    <span>{t.ancMaternalDetails}</span>
                    <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">Pop-up →</span>
                  </div>
                </div>

                {/* Infant Card */}
                <div
                  onClick={() => {
                    setCohortModalCategory('INFANT');
                    setCohortSearch('');
                  }}
                  className="stat-card cursor-pointer bg-gradient-to-br from-teal-50/80 to-white hover:border-teal-500 hover:shadow-lg transition p-5 rounded-2xl border-2 border-teal-200 group"
                  title="Click to view all Infant & Child individual details"
                >
                  <div className="flex items-center justify-between text-teal-700">
                    <span className="text-xs font-bold uppercase tracking-wider">{t.infants}</span>
                    <div className="p-2 rounded-xl bg-teal-100 text-teal-700 group-hover:scale-110 transition">
                      <Baby className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-teal-950 mt-2">{infantPatients.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-teal-700 font-bold mt-2 pt-2 border-t border-teal-100">
                    <span>{t.ageInMonthsVaccines}</span>
                    <span className="text-xs bg-teal-700 text-white px-2 py-0.5 rounded-full">Pop-up →</span>
                  </div>
                </div>

                {/* Elderly People Card */}
                <div
                  onClick={() => {
                    setCohortModalCategory('ELDERLY');
                    setCohortSearch('');
                  }}
                  className="stat-card cursor-pointer bg-gradient-to-br from-indigo-50/80 to-white hover:border-indigo-500 hover:shadow-lg transition p-5 rounded-2xl border-2 border-indigo-200 group"
                  title="Click to view all Elderly People individual details"
                >
                  <div className="flex items-center justify-between text-indigo-700">
                    <span className="text-xs font-bold uppercase tracking-wider">{t.elderlyPeople}</span>
                    <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 group-hover:scale-110 transition">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-indigo-950 mt-2">{elderlyPatients.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-indigo-700 font-bold mt-2 pt-2 border-t border-indigo-100">
                    <span>{t.bpDiabetesDetails}</span>
                    <span className="text-xs bg-indigo-700 text-white px-2 py-0.5 rounded-full">Pop-up →</span>
                  </div>
                </div>
              </div>

              {/* Daily Action Checklist & Scheduled Reminders */}
              <div className="bg-white p-6 rounded-3xl border-2 border-amber-200 shadow-xs space-y-4">
                <ReminderListView onSelectPatient={onSelectPatient} />
              </div>
            </div>
          )}

          {/* VIEW 2: NOTIFICATIONS & TREATMENT SCHEDULE */}
          {activeTab === 'NOTIFICATIONS_SCHEDULE' && (
            <NotificationsScheduleView onSelectPatient={onSelectPatient} />
          )}

          {/* VIEW 3: GOVERNMENT SCHEMES */}
          {activeTab === 'GOVT_SCHEMES' && <GovernmentSchemesView />}

          {/* VIEW 4: NUTRIENT & DIET PLAN */}
          {activeTab === 'NUTRITION_PLAN' && <NutritionPlanView />}

          {/* VIEW 5A: ASHA INCENTIVES - MY CLAIMS LEDGER */}
          {activeTab === 'INCENTIVES' && <AshaIncentivesView initialSubTab="MY_INCENTIVES" />}

          {/* VIEW 5B: ASHA INCENTIVES - PHC BLOCK RANKING LIST */}
          {activeTab === 'PHC_RANKINGS' && <AshaIncentivesView initialSubTab="PHC_RANKINGS" />}

          {/* VIEW 6: STOCK & STORAGE MANAGEMENT */}
          {activeTab === 'STOCK_STORAGE' && <StockStorageView />}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. INDIVIDUAL DETAILS POP-UP MODAL (When clicking on Category Cards) */}
      {/* ========================================================================= */}
      {cohortModalCategory && (
        <Modal
          isOpen={!!cohortModalCategory}
          onClose={() => setCohortModalCategory(null)}
          title={getCohortModalTitle()}
          subtitle={`Showing individual beneficiary records in Village ${currentUser.assignedVillages[0] || 'Rampur'}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            {/* Search Input inside pop-up */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={cohortSearch}
                onChange={(e) => setCohortSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="input-field pl-10 text-xs py-2"
              />
            </div>

            {/* Individual Patient Details Grid inside Pop-up */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {getSelectedCohortPatients().length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-500">
                  No individual records found matching your search.
                </div>
              ) : (
                getSelectedCohortPatients().map((patient) => {
                  const v = patient.latestVitals || {};
                  const isPregnant = patient.category === 'PREGNANT_WOMAN';
                  const isInfant = patient.category === 'INFANT';
                  const isElderly = patient.category === 'ELDERLY';

                  const infantAge = isInfant ? calculateAgeDetails(patient.dob) : null;
                  const infantAgeFormatted = infantAge 
                    ? (infantAge.months > 0 ? `${infantAge.months} ${t.months} (${infantAge.weeks} ${t.weeks})` : `${infantAge.weeks} ${t.weeks}`)
                    : null;

                  return (
                    <div
                      key={patient.id}
                      className="p-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-teal-500 hover:shadow-md transition space-y-3"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${isPregnant ? 'bg-rose-100 text-rose-700' : isInfant ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'}`}>
                            {isPregnant ? '🤰🏽' : isInfant ? '👶🏽' : '👴🏽'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-slate-900 text-sm">{patient.name}</h4>
                              <span className="text-[11px] font-mono text-slate-400">({patient.id})</span>
                              <Badge variant={isPregnant ? 'rose' : isInfant ? 'teal' : 'indigo'} size="sm">
                                {patient.category.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                              <span>
                                <strong>{t.age}:</strong>{' '}
                                {isInfant ? (
                                  <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                                    {infantAgeFormatted}
                                  </span>
                                ) : (
                                  `${patient.age} ${t.years} (${patient.gender})`
                                )}
                              </span>
                              <span>•</span>
                              <span><strong>{t.guardian}:</strong> {patient.guardianName} ({patient.guardianRelation})</span>
                              <span>•</span>
                              <span><strong>{t.location}:</strong> Village {patient.village || 'Rampur'}</span>
                            </div>
                          </div>
                        </div>

                        <SyncStatusPill status={patient.syncStatus} lastSync={patient.lastSyncTimestamp} />
                      </div>

                      {/* Individual Category Metrics */}
                      {isPregnant && patient.pregnancyDetails && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                          <div>
                            <span className="text-slate-500 block">Gestational {t.weeks}:</span>
                            <span className="font-bold text-rose-900">{patient.pregnancyDetails.gestationalWeeks || 28} {t.weeks} (Trimester {patient.pregnancyDetails.trimester || 3})</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.eddLabel}:</span>
                            <span className="font-bold text-rose-900">{patient.pregnancyDetails.edd || '22 Oct 2026'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.bloodPressure} / Hb:</span>
                            <span className="font-bold text-slate-800">{v.systolicBp ? `${v.systolicBp}/${v.diastolicBp} mmHg` : '--'} | {v.hemoglobin ? `${v.hemoglobin} g/dL` : '--'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Risk Status:</span>
                            <Badge variant={patient.pregnancyDetails.riskLevel === 'HIGH_RISK' ? 'rose' : 'emerald'} size="sm">
                              {patient.pregnancyDetails.riskLevel || 'NORMAL'}
                            </Badge>
                          </div>
                        </div>
                      )}

                      {isInfant && patient.infantDetails && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-teal-50/70 p-3 rounded-xl border border-teal-100">
                          <div>
                            <span className="text-slate-500 block">{t.age} in {t.months}:</span>
                            <span className="font-bold text-teal-900">{infantAgeFormatted}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.weight} Progression:</span>
                            <span className="font-bold text-teal-900">{patient.infantDetails.birthWeightKg || 2.8} kg → {v.weightKg || '--'} kg</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Growth Status:</span>
                            <Badge variant={patient.infantDetails.growthStatus === 'SEVERELY_UNDERWEIGHT' ? 'rose' : patient.infantDetails.growthStatus === 'MODERATELY_UNDERWEIGHT' ? 'amber' : 'emerald'} size="sm">
                              {patient.infantDetails.growthStatus || 'NORMAL'}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.vaccination}:</span>
                            <Badge variant={patient.infantDetails.vaccinationStatus === 'OVERDUE' ? 'rose' : 'emerald'} size="sm">
                              {patient.infantDetails.vaccinationStatus || 'UP_TO_DATE'}
                            </Badge>
                          </div>
                        </div>
                      )}

                      {isElderly && patient.elderlyDetails && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
                          <div className="col-span-2">
                            <span className="text-slate-500 block">Diagnosed Conditions:</span>
                            <span className="font-bold text-indigo-950">{(patient.elderlyDetails.conditions || ['Hypertension']).join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.bloodPressure}:</span>
                            <span className="font-bold text-slate-800">{v.systolicBp ? `${v.systolicBp}/${v.diastolicBp} mmHg` : '--'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t.bloodSugar}:</span>
                            <span className="font-bold text-indigo-900">{v.bloodSugarFasting ? `${v.bloodSugarFasting} mg/dL` : '--'}</span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons inside individual record */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setCohortModalCategory(null);
                            setVitalModalPatient(patient);
                          }}
                          className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-xl font-bold transition flex items-center gap-1.5"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> {t.recordVitals}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setCohortModalCategory(null);
                            onSelectPatient(patient.id);
                          }}
                          className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-extrabold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <span>{t.openTimeline}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCohortModalCategory(null)}
                className="btn-secondary"
              >
                {t.close}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Registration Modal */}
      <PatientRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegistered={(id) => onSelectPatient(id)}
      />

      {/* Vitals Entry Modal */}
      {vitalModalPatient && (
        <VitalsEntryModal
          isOpen={!!vitalModalPatient}
          onClose={() => setVitalModalPatient(null)}
          patient={vitalModalPatient}
        />
      )}
    </div>
  );
};
