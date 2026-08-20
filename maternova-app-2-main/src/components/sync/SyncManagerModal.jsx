import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import {
  Cloud,
  CloudOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Database,
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';

export const SyncManagerModal = ({ isOpen, onClose }) => {
  const {
    isOnline,
    isSimulatedOffline,
    toggleOfflineSimulation,
    pendingSyncCount,
    isSyncing,
    lastSyncTime,
    triggerManualSync,
    auditLogs
  } = useAppData();

  const [syncResult, setSyncResult] = useState(null);

  const handleSyncClick = async () => {
    const res = await triggerManualSync();
    setSyncResult(res);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Offline Sync & Data Control Center"
      subtitle="Manage IndexedDB local store and Central Server Synchronization"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Status Dashboard Banner */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isOnline ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {isOnline ? <Cloud className="w-6 h-6" /> : <CloudOff className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">
                {isOnline ? 'Connected to Central Healthcare Server' : 'Device in Offline Mode'}
              </h4>
              <p className="text-xs text-slate-600">
                {isOnline
                  ? 'Changes will synchronize securely with the state medical registry.'
                  : 'All patient registrations, vitals, and reports are safely preserved locally in IndexedDB.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleOfflineSimulation(!isSimulatedOffline)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${isSimulatedOffline ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-amber-600 text-white border-amber-600'}`}
            >
              {isSimulatedOffline ? 'Switch to Online' : 'Simulate Offline Mode'}
            </button>
          </div>
        </div>

        {/* Sync Action Area */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Sync Items</span>
            <div className="text-2xl font-bold text-slate-800 mt-1">{pendingSyncCount}</div>
            <span className="text-[11px] text-slate-400">Records waiting for central commit</span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Storage Engine</span>
            <div className="text-sm font-bold text-teal-700 mt-2 flex items-center justify-center gap-1.5">
              <Database className="w-4 h-4" /> IndexedDB Local Store
            </div>
            <span className="text-[11px] text-slate-400">Encrypted Local Persistence</span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Sync</span>
            <div className="text-sm font-bold text-slate-700 mt-2 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString() : 'Recent'}
            </div>
            <span className="text-[11px] text-slate-400">Automatic Background Sync</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            {syncResult && syncResult.success && (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Successfully pushed {syncResult.syncedCount} records to Central DB
              </span>
            )}
            {syncResult && !syncResult.success && (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> {syncResult.message}
              </span>
            )}
          </div>

          <button
            onClick={handleSyncClick}
            disabled={isSyncing || !isOnline}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Synchronizing with Server...' : 'Trigger Immediate Sync'}
          </button>
        </div>

        {/* Data Sync Pipeline Diagram */}
        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs space-y-2 font-mono">
          <div className="text-teal-400 font-semibold uppercase tracking-wider text-[10px]">
            AASHA Offline-First Sync Architecture
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-300">
            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">1. ASHA Field Mobile</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="bg-teal-900/60 text-teal-200 px-2 py-1 rounded border border-teal-700">2. IndexedDB Local DB</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">3. Sync Manager Queue</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="bg-indigo-900/60 text-indigo-200 px-2 py-1 rounded border border-indigo-700">4. Central NHM DB</span>
          </div>
        </div>

        {/* Recent Audit Trail */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Recent Local Data Audit Logs</h5>
          <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg divide-y divide-slate-100 text-xs">
            {auditLogs.length === 0 ? (
              <div className="p-3 text-slate-400 text-center">No recent local data modifications</div>
            ) : (
              auditLogs.slice(-6).reverse().map((log) => (
                <div key={log.id} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-semibold text-slate-700">{log.action}</span>
                    <span className="text-slate-400">({log.storeName})</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${log.networkState === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {log.networkState}
                    </span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
