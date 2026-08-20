import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/common/Navbar';
import { LoginPage } from './components/auth/LoginPage';
import { SyncManagerModal } from './components/sync/SyncManagerModal';
import { AshaDashboard } from './components/asha/AshaDashboard';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { PatientHomePortal } from './components/patient_portal/PatientHomePortal';
import { PatientProfile } from './components/patient/PatientProfile';
import './index.css';

function MainLayout() {
  const { currentRole, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [viewingPatientId, setViewingPatientId] = useState(null);

  // If not logged in, render Login Page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleSelectPatient = (id) => {
    setViewingPatientId(id);
  };

  const handleBackToDashboard = () => {
    setViewingPatientId(null);
  };

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Navigation Bar with Persistent Language Switcher */}
      <Navbar onOpenSyncModal={() => setIsSyncModalOpen(true)} />

      {/* Main Dedicated Portal Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {viewingPatientId ? (
          <PatientProfile
            patientId={viewingPatientId}
            onBack={handleBackToDashboard}
          />
        ) : (
          <>
            {/* 1. ASHA Worker Homepage */}
            {currentRole === 'ASHA_WORKER' && (
              <AshaDashboard onSelectPatient={handleSelectPatient} />
            )}

            {/* 2. Doctor Homepage */}
            {currentRole === 'DOCTOR' && (
              <DoctorDashboard onSelectPatient={handleSelectPatient} />
            )}

            {/* 3. Patient & Family Homepage */}
            {currentRole === 'PATIENT' && (
              <PatientHomePortal />
            )}
          </>
        )}
      </main>

      {/* Global Sync Manager Modal */}
      <SyncManagerModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      {/* Dynamic Translated Footer */}
      <footer className="border-t-2 border-amber-200 bg-amber-100/60 py-4 px-6 text-center text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-bold flex items-center justify-center gap-1.5">
            <span>🪔</span> <strong>{t.appTitle}</strong> — {t.appSub}
          </span>
          <span className="text-amber-800/80 font-medium">
            {t.footerText}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppDataProvider>
          <MainLayout />
        </AppDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
