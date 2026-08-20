import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  HeartPulse,
  LogOut,
  Globe
} from 'lucide-react';

export const Navbar = ({ onOpenSyncModal }) => {
  const { currentUser, logout } = useAuth();
  const { currentLang, setLanguage, t } = useLanguage();
  const {
    isOnline,
    isSimulatedOffline,
    toggleOfflineSimulation,
    pendingSyncCount,
    isSyncing,
    resetToMockData
  } = useAppData();

  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Left: Branding & Tag */}
        <div className="navbar-brand-section">
          <div className="navbar-logo-badge">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="navbar-title">{t.appTitle}</h1>
              <span className="navbar-tag">MATERNOVA</span>
            </div>
            <p className="navbar-subtitle">{t.appSub}</p>
          </div>
        </div>

        {/* Center: Offline/Online Simulator & Sync Indicator */}
        <div className="navbar-center-controls">
          <button
            onClick={() => toggleOfflineSimulation(!isSimulatedOffline)}
            className={`network-toggle-btn ${isOnline ? 'network-online' : 'network-offline'}`}
            title="Toggle Online / Offline"
          >
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-800">{t.onlineBadge}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-800">{t.offlineMode}</span>
              </>
            )}
          </button>

          {/* Sync Trigger & Pending Count */}
          <button
            onClick={onOpenSyncModal}
            className={`sync-trigger-btn ${pendingSyncCount > 0 ? 'has-pending' : 'all-synced'}`}
            title="Open Sync Manager"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-teal-600' : 'text-slate-600'}`} />
            <span className="text-xs font-medium">
              {pendingSyncCount > 0 ? `${pendingSyncCount} ${t.pendingSync}` : t.allSynced}
            </span>
            {pendingSyncCount > 0 && <span className="pending-badge-dot"></span>}
          </button>
        </div>

        {/* Right: Language Switcher, User Profile & Logout Button */}
        <div className="navbar-right-section flex items-center gap-2.5">
          {/* Global Language Switcher */}
          <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-300 px-2.5 py-1.5 rounded-xl shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-amber-800 shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-bold text-amber-950 outline-none cursor-pointer"
              title="Change platform language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeLabel} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          {currentUser && (
            <div className="flex items-center gap-2">
              {/* User badge */}
              <div className="hidden lg:flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-xs">
                <span className="text-base">{currentUser.avatar || '👤'}</span>
                <div>
                  <div className="font-extrabold text-amber-950 truncate max-w-[140px]">
                    {currentUser.name}
                  </div>
                  <span className="text-[10px] text-amber-800 font-semibold block">
                    {currentUser.roleTitle}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-xs"
                title="Log out and return to Login Screen"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          )}

          <button
            onClick={() => {
              if (confirm('Reset database to clean seed data?')) {
                resetToMockData();
              }
            }}
            className="text-[11px] text-slate-400 hover:text-slate-600 px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 transition hidden xl:inline"
            title="Reset to fresh seed data"
          >
            {t.resetSeed}
          </button>
        </div>
      </div>
    </header>
  );
};
