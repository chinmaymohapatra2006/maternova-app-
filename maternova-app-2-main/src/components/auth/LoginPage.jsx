import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import {
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Baby,
  User,
  Heart,
  Lock,
  Phone,
  KeyRound,
  ArrowRight,
  Sparkles,
  WifiOff,
  Globe,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const { patients } = useAppData();
  const { currentLang, setLanguage, t } = useLanguage();

  // Pop-up modal state: 'ASHA_WORKER' | 'DOCTOR' | 'PATIENT' | null
  const [activeLoginModal, setActiveLoginModal] = useState(null);

  // Form states
  const [identifier, setIdentifier] = useState('ASHA-VNS-04');
  const [pin, setPin] = useState('1234');
  const [errorMessage, setErrorMessage] = useState('');

  const openLoginModal = (role) => {
    setActiveLoginModal(role);
    setErrorMessage('');
    if (role === 'ASHA_WORKER') {
      setIdentifier('ASHA-VNS-04');
      setPin('1234');
    } else if (role === 'DOCTOR') {
      setIdentifier('DOC-UP-88');
      setPin('8888');
    } else if (role === 'PATIENT') {
      setIdentifier('PAT-PW-101');
      setPin('1001');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (activeLoginModal === 'ASHA_WORKER') {
      if (!identifier.trim()) {
        setErrorMessage('Please enter your ASHA ID');
        return;
      }
      login('ASHA_WORKER', { id: identifier.trim() });
      setActiveLoginModal(null);
    } else if (activeLoginModal === 'DOCTOR') {
      if (!identifier.trim()) {
        setErrorMessage('Please enter your Medical Registration Number');
        return;
      }
      login('DOCTOR', { id: identifier.trim() });
      setActiveLoginModal(null);
    } else if (activeLoginModal === 'PATIENT') {
      const cleanInput = identifier.trim().toUpperCase();
      // Find patient strictly by matching ID or mobile number
      const foundPatient = patients.find(
        (p) =>
          p.id.toUpperCase() === cleanInput ||
          p.id.toUpperCase().replace('-', '') === cleanInput.replace('-', '') ||
          (p.phone && p.phone.replace(/\D/g, '').includes(cleanInput.replace(/\D/g, '')))
      );

      if (!foundPatient) {
        setErrorMessage(
          `Unique Patient ID "${identifier}" not found. Sample valid IDs: PAT-PW-101 (Sunita Devi), PAT-INF-201 (Aarav Meena), PAT-ELD-301 (Ramcharan Patel)`
        );
        return;
      }

      // Successful 1 ID 1 Login
      login('PATIENT', {
        id: foundPatient.id,
        name: foundPatient.name,
        activePatientId: foundPatient.id,
        center: `Village ${foundPatient.village || 'Rampur'}`
      });
      setActiveLoginModal(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100/70 via-amber-50/50 to-orange-100/60 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Header with Language Switcher */}
      <header className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-700 to-orange-800 text-white flex items-center justify-center shadow-md">
            <HeartPulse className="w-7 h-7 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-amber-950 tracking-tight">{t.appTitle}</h1>
              <span className="text-[11px] font-extrabold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-300">
                MATERNOVA
              </span>
            </div>
            <p className="text-xs text-amber-900/80 font-semibold">{t.appSub}</p>
          </div>
        </div>

        {/* Right: Language Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border-2 border-amber-300 px-3 py-1.5 rounded-xl shadow-xs">
            <Globe className="w-4 h-4 text-amber-700" />
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-bold text-amber-950 outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeLabel} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs">
            <WifiOff className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.offlineBadge}</span>
          </div>
        </div>
      </header>

      {/* Main Role Selection Area */}
      <div className="max-w-4xl mx-auto w-full my-6 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
        <div className="p-6 sm:p-10 space-y-8">
          {/* Title and Intro */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              {t.loginTagline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.loginHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.loginSubheading}
            </p>
          </div>

          {/* 3 Interactive Category Cards (Clicking opens credentials pop-up) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. ASHA Worker Card */}
            <div
              onClick={() => openLoginModal('ASHA_WORKER')}
              className="p-6 rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50/80 to-white hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between gap-4 group transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition">
                  👩🏽‍⚕️
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg group-hover:text-orange-700 transition">
                    {t.ashaTitle}
                  </h3>
                  <span className="text-xs text-orange-800 font-bold block">{t.ashaSubtitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.ashaDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-orange-100 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-orange-950 bg-orange-100 px-2.5 py-1 rounded-lg">
                  {t.ashaBadge}
                </span>
                <span className="text-xs font-bold text-orange-700 flex items-center gap-1 group-hover:translate-x-1 transition">
                  {t.signInBtn} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 2. Doctor Card */}
            <div
              onClick={() => openLoginModal('DOCTOR')}
              className="p-6 rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white hover:border-indigo-600 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between gap-4 group transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition">
                  👨🏽‍⚕️
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg group-hover:text-indigo-800 transition">
                    {t.doctorTitle}
                  </h3>
                  <span className="text-xs text-indigo-900 font-bold block">{t.doctorSubtitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.doctorDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-indigo-100 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-indigo-950 bg-indigo-100 px-2.5 py-1 rounded-lg">
                  {t.doctorBadge}
                </span>
                <span className="text-xs font-bold text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition">
                  {t.signInBtn} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 3. Patient Card */}
            <div
              onClick={() => openLoginModal('PATIENT')}
              className="p-6 rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white hover:border-emerald-600 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between gap-4 group transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition">
                  🪔
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg group-hover:text-emerald-800 transition">
                    {t.patientTitle}
                  </h3>
                  <span className="text-xs text-emerald-800 font-bold block">{t.patientSubtitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.patientDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  {t.patientBadge}
                </span>
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition">
                  {t.signInBtn} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-amber-900/80 font-medium py-3 border-t border-amber-200">
        <div>{t.footerText}</div>
        <div className="text-[11px] text-amber-800/60 mt-0.5">
          End-to-End Encrypted Offline Local Storage (IndexedDB) with Central Health Registry Sync
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* CREDENTIALS LOGIN POP-UP MODAL (For ASHA, Doctor, and Patient) */}
      {/* ========================================================================= */}
      {activeLoginModal && (
        <Modal
          isOpen={!!activeLoginModal}
          onClose={() => setActiveLoginModal(null)}
          title={
            activeLoginModal === 'ASHA_WORKER'
              ? t.modalAshaTitle
              : activeLoginModal === 'DOCTOR'
                ? t.modalDoctorTitle
                : t.modalPatientTitle
          }
          subtitle={
            activeLoginModal === 'ASHA_WORKER'
              ? t.modalAshaSubtitle
              : activeLoginModal === 'DOCTOR'
                ? t.modalDoctorSubtitle
                : t.modalPatientSubtitle
          }
          maxWidth="max-w-md"
        >
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ASHA Login Inputs */}
            {activeLoginModal === 'ASHA_WORKER' && (
              <>
                <div>
                  <label className="input-label">{t.ashaLabel}</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={t.idPlaceholderAsha}
                    className="input-field font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">{t.pinLabelAsha}</label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={t.pinPlaceholder}
                    className="input-field text-xs"
                    required
                  />
                </div>
              </>
            )}

            {/* Doctor Login Inputs */}
            {activeLoginModal === 'DOCTOR' && (
              <>
                <div>
                  <label className="input-label">{t.docLabel}</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={t.idPlaceholderDoc}
                    className="input-field font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">{t.pinLabelDoc}</label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={t.pinPlaceholder}
                    className="input-field text-xs"
                    required
                  />
                </div>
              </>
            )}

            {/* Unique Patient 1 ID 1 Login Inputs */}
            {activeLoginModal === 'PATIENT' && (
              <>
                <div>
                  <label className="input-label">{t.patientLabel}</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={t.idPlaceholderPatient}
                    className="input-field font-mono text-xs"
                    required
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Sample IDs: <strong>PAT-PW-101</strong> (Sunita Devi), <strong>PAT-INF-201</strong> (Aarav Meena), <strong>PAT-ELD-301</strong> (Ramcharan Patel)
                  </span>
                </div>
                <div>
                  <label className="input-label">{t.pinLabelPatient}</label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="1001"
                    className="input-field text-xs"
                    required
                  />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveLoginModal(null)}
                className="btn-secondary"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center gap-1.5"
              >
                <span>{t.signInBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
