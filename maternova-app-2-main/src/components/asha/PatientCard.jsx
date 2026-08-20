import React from 'react';
import { Badge } from '../common/Badge';
import { SyncStatusPill } from '../common/SyncStatusPill';
import {
  User,
  Heart,
  Baby,
  Activity,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronRight,
  PlusCircle,
  FileText
} from 'lucide-react';

export const PatientCard = ({ patient, onSelect, onRecordVitals }) => {
  const categoryConfig = {
    PREGNANT_WOMAN: {
      label: 'Pregnant Mother',
      icon: Heart,
      badgeVariant: 'rose',
      highlightColor: 'border-l-rose-500'
    },
    INFANT: {
      label: 'Infant / Child',
      icon: Baby,
      badgeVariant: 'teal',
      highlightColor: 'border-l-teal-500'
    },
    ELDERLY: {
      label: 'Elderly Citizen',
      icon: User,
      badgeVariant: 'indigo',
      highlightColor: 'border-l-indigo-500'
    }
  };

  const config = categoryConfig[patient.category] || categoryConfig.PREGNANT_WOMAN;
  const CategoryIcon = config.icon;
  const latestVitals = patient.latestVitals || {};

  return (
    <div
      onClick={() => onSelect(patient.id)}
      className={`patient-card cursor-pointer border-l-4 ${config.highlightColor} hover:shadow-md transition`}
    >
      <div className="p-4 space-y-3">
        {/* Top row: Name & Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm">
              <CategoryIcon className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm hover:text-teal-700 transition">
                {patient.name}
              </h4>
              <span className="text-xs text-slate-400">ID: {patient.id}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Badge variant={config.badgeVariant} size="sm">
              {config.label}
            </Badge>
            <SyncStatusPill status={patient.syncStatus} lastSync={patient.lastSyncTimestamp} showText={false} />
          </div>
        </div>

        {/* Demographics row */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{patient.village || 'Rampur'} ({patient.region || 'North India'})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{patient.phone || 'No phone'}</span>
          </div>
        </div>

        {/* Category specific metrics preview */}
        {patient.category === 'PREGNANT_WOMAN' && patient.pregnancyDetails && (
          <div className="text-xs text-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Gestational Stage:</span>
              <span className="font-semibold text-rose-700">
                {patient.pregnancyDetails.gestationalWeeks || 28} Wks (Trimester {patient.pregnancyDetails.trimester || 3})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Latest BP / Hb:</span>
              <span className="font-semibold">
                {latestVitals.systolicBp ? `${latestVitals.systolicBp}/${latestVitals.diastolicBp} mmHg` : '--'} | {latestVitals.hemoglobin ? `${latestVitals.hemoglobin} g/dL` : '--'}
              </span>
            </div>
          </div>
        )}

        {patient.category === 'INFANT' && patient.infantDetails && (
          <div className="text-xs text-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Weight & Height:</span>
              <span className="font-semibold text-teal-700">
                {latestVitals.weightKg ? `${latestVitals.weightKg} kg` : 'N/A'} | {latestVitals.heightCm ? `${latestVitals.heightCm} cm` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Growth Status:</span>
              <Badge variant={patient.infantDetails.growthStatus === 'SEVERELY_UNDERWEIGHT' ? 'rose' : patient.infantDetails.growthStatus === 'MODERATELY_UNDERWEIGHT' ? 'amber' : 'emerald'} size="sm">
                {patient.infantDetails.growthStatus || 'NORMAL'}
              </Badge>
            </div>
          </div>
        )}

        {patient.category === 'ELDERLY' && patient.elderlyDetails && (
          <div className="text-xs text-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Known Conditions:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                {(patient.elderlyDetails.conditions || []).join(', ') || 'Hypertension'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">BP / Fasting Sugar:</span>
              <span className="font-semibold">
                {latestVitals.systolicBp ? `${latestVitals.systolicBp}/${latestVitals.diastolicBp}` : '--'} | {latestVitals.bloodSugarFasting ? `${latestVitals.bloodSugarFasting} mg/dL` : '--'}
              </span>
            </div>
          </div>
        )}

        {/* Action footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRecordVitals(patient);
            }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:bg-teal-50 px-2 py-1 rounded transition"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Record Vitals
          </button>

          <span className="text-xs font-medium text-slate-500 flex items-center gap-0.5 group-hover:text-teal-600">
            View History <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
