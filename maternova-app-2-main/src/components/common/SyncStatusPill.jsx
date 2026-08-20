import React from 'react';
import { CheckCircle2, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';

export const SyncStatusPill = ({ status = 'SYNCED', lastSync = null, showText = true }) => {
  if (status === 'SYNCED') {
    return (
      <span className="sync-pill sync-pill-synced" title={`Synchronized with Central Health Database${lastSync ? ` (${new Date(lastSync).toLocaleTimeString()})` : ''}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {showText && <span className="text-emerald-700 font-medium">Synced</span>}
      </span>
    );
  }

  if (status === 'PENDING_SYNC' || status === 'NEW') {
    return (
      <span className="sync-pill sync-pill-pending" title="Saved locally in offline database. Pending sync when network connects.">
        <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
        {showText && <span className="text-amber-700 font-medium">Offline (Pending Sync)</span>}
      </span>
    );
  }

  if (status === 'SYNC_FAILED') {
    return (
      <span className="sync-pill sync-pill-failed" title="Synchronization failed. Will retry automatically.">
        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
        {showText && <span className="text-rose-700 font-medium">Sync Failed</span>}
      </span>
    );
  }

  return (
    <span className="sync-pill sync-pill-offline" title="Offline Mode Active">
      <CloudOff className="w-3.5 h-3.5 text-slate-500" />
      {showText && <span className="text-slate-600 font-medium">Local Only</span>}
    </span>
  );
};
