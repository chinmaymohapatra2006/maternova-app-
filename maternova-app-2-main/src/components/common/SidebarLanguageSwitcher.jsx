import React, { useState } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import { Globe, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

/**
 * SidebarLanguageSwitcher - Comprehensive interactive language switcher designed specifically
 * for Dashboard Sidebars across ASHA, Doctor, and Patient portals.
 *
 * Provides all available language options:
 * - 🇬🇧 English
 * - 🇮🇳 हिंदी (Hindi)
 * - 🇮🇳 தமிழ் (Tamil)
 * - 🇮🇳 తెలుగు (Telugu)
 * - 🇮🇳 বাংলা (Bengali)
 * - 🇮🇳 मराठी (Marathi)
 *
 * @param {string} theme - 'amber' (ASHA) | 'indigo' (Doctor) | 'teal' (Patient) | 'slate'
 * @param {boolean} compact - If true, displays compact version
 */
export const SidebarLanguageSwitcher = ({ theme = 'amber', compact = false }) => {
  const { currentLang, setLanguage, t, languages = SUPPORTED_LANGUAGES } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  // Theme-specific color mappings
  const themeStyles = {
    amber: {
      cardBg: 'bg-gradient-to-b from-amber-50/90 to-orange-50/50',
      border: 'border-amber-200 hover:border-amber-300',
      headerBg: 'bg-amber-100/70',
      headerText: 'text-amber-950',
      iconColor: 'text-amber-700',
      badgeBg: 'bg-amber-800 text-amber-50',
      activeBtn: 'bg-amber-800 text-white shadow-sm border-amber-900 ring-2 ring-amber-400/40',
      inactiveBtn: 'bg-white/80 hover:bg-amber-100/60 text-slate-700 hover:text-amber-950 border-amber-200/80',
      selectBorder: 'border-amber-300 focus:ring-amber-500 bg-white/90 text-amber-950',
      subtext: 'text-amber-800/80'
    },
    indigo: {
      cardBg: 'bg-gradient-to-b from-indigo-50/90 to-slate-50/50',
      border: 'border-indigo-200 hover:border-indigo-300',
      headerBg: 'bg-indigo-100/70',
      headerText: 'text-indigo-950',
      iconColor: 'text-indigo-700',
      badgeBg: 'bg-indigo-900 text-indigo-50',
      activeBtn: 'bg-indigo-900 text-white shadow-sm border-indigo-950 ring-2 ring-indigo-400/40',
      inactiveBtn: 'bg-white/80 hover:bg-indigo-100/60 text-slate-700 hover:text-indigo-950 border-indigo-200/80',
      selectBorder: 'border-indigo-300 focus:ring-indigo-500 bg-white/90 text-indigo-950',
      subtext: 'text-indigo-800/80'
    },
    teal: {
      cardBg: 'bg-gradient-to-b from-teal-50/90 to-emerald-50/50',
      border: 'border-teal-200 hover:border-teal-300',
      headerBg: 'bg-teal-100/70',
      headerText: 'text-teal-950',
      iconColor: 'text-teal-700',
      badgeBg: 'bg-teal-800 text-teal-50',
      activeBtn: 'bg-teal-800 text-white shadow-sm border-teal-900 ring-2 ring-teal-400/40',
      inactiveBtn: 'bg-white/80 hover:bg-teal-100/60 text-slate-700 hover:text-teal-950 border-teal-200/80',
      selectBorder: 'border-teal-300 focus:ring-teal-500 bg-white/90 text-teal-950',
      subtext: 'text-teal-800/80'
    },
    slate: {
      cardBg: 'bg-slate-50',
      border: 'border-slate-200 hover:border-slate-300',
      headerBg: 'bg-slate-100',
      headerText: 'text-slate-900',
      iconColor: 'text-slate-700',
      badgeBg: 'bg-slate-800 text-slate-50',
      activeBtn: 'bg-slate-900 text-white shadow-sm border-slate-950 ring-2 ring-slate-400/40',
      inactiveBtn: 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200',
      selectBorder: 'border-slate-300 focus:ring-slate-500 bg-white text-slate-900',
      subtext: 'text-slate-600'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.amber;
  const currentLanguageObj = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div
      className={`rounded-2xl border ${currentTheme.border} ${currentTheme.cardBg} p-2.5 transition-all shadow-xs space-y-2`}
      aria-label="Dashboard Language Switcher"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-left focus:outline-hidden group"
          title="Toggle Language Switcher"
        >
          <div className={`p-1 rounded-lg ${currentTheme.headerBg} ${currentTheme.iconColor}`}>
            <Globe className="w-3.5 h-3.5" />
          </div>
          <span className={`text-[11px] font-black ${currentTheme.headerText} tracking-tight`}>
            {t?.languageLabel || 'Language / भाषा'}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${currentTheme.badgeBg} flex items-center gap-1`}
          >
            <span>{currentLanguageObj.flag}</span>
            <span>{currentLanguageObj.code.toUpperCase()}</span>
          </span>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition"
            aria-label={isExpanded ? 'Collapse language selector' : 'Expand language selector'}
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Interactive Switcher Panel */}
      {isExpanded && (
        <div className="space-y-2 pt-1">
          {/* Quick 2-column or 3-column Grid for All 6 Languages */}
          <div className="grid grid-cols-2 gap-1.5">
            {languages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs relative ${
                    isSelected ? currentTheme.activeBtn : currentTheme.inactiveBtn
                  }`}
                  title={`Switch language to ${lang.label} (${lang.nativeLabel})`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm shrink-0">{lang.flag}</span>
                    <div className="truncate">
                      <span className="block font-black text-[11px] leading-tight truncate">
                        {lang.nativeLabel}
                      </span>
                      <span
                        className={`text-[9px] block font-semibold truncate ${
                          isSelected ? 'opacity-80' : 'text-slate-400'
                        }`}
                      >
                        {lang.label}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3 h-3 text-current shrink-0 ml-1 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Select Dropdown fallback */}
          <div className="relative">
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full text-[11px] font-bold py-1.5 px-2 rounded-xl border ${currentTheme.selectBorder} outline-none cursor-pointer shadow-2xs`}
              aria-label="Select language dropdown"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeLabel} — {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subtle Live Translation Subtitle */}
          <div className="flex items-center justify-between text-[9px] px-0.5 font-bold">
            <span className={currentTheme.subtext}>
              {t?.allAvailableOptions || '6 Indian Languages Available'}
            </span>
            <span className="text-emerald-700 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Live</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
