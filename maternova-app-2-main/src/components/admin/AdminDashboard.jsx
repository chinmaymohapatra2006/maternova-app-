import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import { UIP_VACCINATION_SCHEDULE } from '../../services/rules/vaccinationRules';
import { REGIONAL_FOOD_DATABASE } from '../../services/nutrition/regionalFoodDatabase';
import {
  Shield,
  Database,
  Sliders,
  FileSpreadsheet,
  Activity,
  CheckCircle2,
  AlertCircle,
  Building,
  Server,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard = () => {
  const { patients, vitals, auditLogs, pendingSyncCount, isOnline } = useAppData();
  const { currentUser } = useAuth();
  const [adminTab, setAdminTab] = useState('OVERVIEW'); // OVERVIEW, RULES, FOOD_DB, AUDIT

  return (
    <div className="space-y-6">
      {/* 1. Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <h2 className="text-lg font-bold">System Administration & Health Governance</h2>
            <span className="text-xs bg-slate-700 px-2.5 py-0.5 rounded-full border border-slate-600">
              National Health Mission Node
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {currentUser.center} • System Config, Clinical Protocols & Regional Food Datasets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Network Synchronization</span>
            <span className="text-xs font-bold text-emerald-400">
              {isOnline ? 'Online • Live Central Sync' : 'Offline / Standalone'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-bold">
        {[
          { id: 'OVERVIEW', label: 'System Overview & Telemetry', icon: Activity },
          { id: 'RULES', label: 'Deterministic Rule Engine Settings', icon: Sliders },
          { id: 'FOOD_DB', label: 'Regional Nutrition Database', icon: FileSpreadsheet },
          { id: 'AUDIT', label: 'Security & Sync Audit Trail', icon: Shield }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`px-4 py-2.5 border-b-2 flex items-center gap-1.5 transition ${adminTab === tab.id ? 'border-slate-900 text-slate-900 bg-slate-100 rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              <TabIcon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {adminTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Registered Patients</span>
              <div className="text-2xl font-bold text-slate-800">{patients.length}</div>
              <span className="text-[11px] text-teal-700">100% stored in local IndexedDB</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Vital Metric Logs</span>
              <div className="text-2xl font-bold text-slate-800">{vitals.length}</div>
              <span className="text-[11px] text-indigo-700">Longitudinal entries</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Pending Sync Queue</span>
              <div className="text-2xl font-bold text-slate-800">{pendingSyncCount}</div>
              <span className="text-[11px] text-amber-700">Uncommitted records</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Security Audit Events</span>
              <div className="text-2xl font-bold text-slate-800">{auditLogs.length}</div>
              <span className="text-[11px] text-slate-500">Immutable audit log</span>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'RULES' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-800">Standard Healthcare Rules Configured in AASHA:</h4>
            <p className="text-slate-600 leading-relaxed">
              The platform executes deterministic rule logic based on Government of India guidelines (NHM, UIP, and ICMR).
              No artificial intelligence hallucinations can alter these safety-critical schedules.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
              Universal Immunization Programme (UIP) Vaccine Milestones
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
              {UIP_VACCINATION_SCHEDULE.map((v) => (
                <div key={v.code} className="p-3 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <strong className="text-slate-900">{v.name}</strong> ({v.code}) —{' '}
                    <span className="text-teal-700 font-semibold">{v.targetAgeLabel}</span>
                    <div className="text-[11px] text-slate-500">{v.description}</div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <div>{v.dose}</div>
                    <div className="font-mono">{v.route}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === 'FOOD_DB' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
            <h4 className="font-bold text-emerald-900">Regional Indian Food Dataset ({REGIONAL_FOOD_DATABASE.length} Food Items):</h4>
            <p className="text-emerald-800">
              Curated low-cost, nutrient-rich local ingredients mapped by geographic region and dietary preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {REGIONAL_FOOD_DATABASE.map((food) => (
              <div key={food.id} className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-slate-900">{food.name} ({food.localName})</h5>
                    <span className="text-[11px] text-teal-700 font-medium">{food.region} • {food.dietType}</span>
                  </div>
                  <Badge variant={food.dietType === 'VEGETARIAN' ? 'emerald' : 'rose'} size="sm">
                    {food.affordability.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-slate-600 text-[11px] bg-slate-50 p-2 rounded border border-slate-100">
                  {food.preparationTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'AUDIT' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
            System & Offline Sync Audit Log Trail
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
            {auditLogs.length === 0 ? (
              <div className="p-6 text-center text-slate-400">No audit records logged yet</div>
            ) : (
              auditLogs.slice().reverse().map((log) => (
                <div key={log.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800">{log.action}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Target Store: {log.storeName} | ID: {log.recordId}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${log.networkState === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {log.networkState}
                    </span>
                    <div className="mt-0.5">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
