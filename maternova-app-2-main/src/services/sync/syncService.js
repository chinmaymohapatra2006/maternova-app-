// Offline Sync Engine & Synchronization Manager
import { dbService } from '../storage/db';

class SyncService {
  constructor() {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.simulatedOffline = false;
    this.listeners = new Set();
    this.syncInProgress = false;
    this.lastSyncTime = null;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleNetworkChange(true));
      window.addEventListener('offline', () => this.handleNetworkChange(false));
    }
  }

  // Network State
  getNetworkStatus() {
    if (this.simulatedOffline) return false;
    return this.isOnline;
  }

  setSimulatedOffline(status) {
    this.simulatedOffline = status;
    this.notifyListeners({ type: 'NETWORK_CHANGE', isOnline: this.getNetworkStatus() });
  }

  handleNetworkChange(isOnline) {
    this.isOnline = isOnline;
    this.notifyListeners({ type: 'NETWORK_CHANGE', isOnline: this.getNetworkStatus() });
    if (this.getNetworkStatus()) {
      // Auto-trigger sync on reconnect
      this.triggerSync();
    }
  }

  // Subscribe to sync events
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(data) {
    this.listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (err) {
        console.error('Sync listener error:', err);
      }
    });
  }

  // Count pending records across all stores
  async getPendingCount() {
    const stores = ['patients', 'vitals', 'vaccinations', 'anc_visits', 'reports'];
    let totalPending = 0;
    const pendingDetails = {};

    for (const storeName of stores) {
      const items = await dbService.getAll(storeName);
      const pending = items.filter(
        (item) => item.syncStatus === 'PENDING_SYNC' || item.syncStatus === 'NEW' || item.syncStatus === 'SYNC_FAILED'
      );
      totalPending += pending.length;
      pendingDetails[storeName] = pending;
    }

    return { totalPending, pendingDetails };
  }

  // Enqueue record for sync
  async queueRecord(storeName, item) {
    const itemToSave = {
      ...item,
      syncStatus: this.getNetworkStatus() ? 'PENDING_SYNC' : 'NEW',
      updatedAt: new Date().toISOString()
    };

    await dbService.put(storeName, itemToSave);

    // Also record an audit log
    await dbService.put('audit_logs', {
      id: `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action: item.id ? 'UPDATE_RECORD' : 'CREATE_RECORD',
      storeName,
      recordId: item.id,
      timestamp: new Date().toISOString(),
      networkState: this.getNetworkStatus() ? 'ONLINE' : 'OFFLINE',
      user: 'ASHA_FIELD_USER'
    });

    this.notifyListeners({ type: 'QUEUE_UPDATED' });

    if (this.getNetworkStatus()) {
      this.triggerSync();
    }

    return itemToSave;
  }

  // Trigger synchronization process
  async triggerSync() {
    if (this.syncInProgress) return { success: false, message: 'Sync already in progress' };
    if (!this.getNetworkStatus()) {
      return { success: false, message: 'Device is offline. Changes saved locally in IndexedDB.' };
    }

    this.syncInProgress = true;
    this.notifyListeners({ type: 'SYNC_STARTED' });

    try {
      // Small simulated network roundtrip latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      const { pendingDetails } = await this.getPendingCount();
      let syncedCount = 0;

      for (const [storeName, items] of Object.entries(pendingDetails)) {
        for (const item of items) {
          const syncedItem = {
            ...item,
            syncStatus: 'SYNCED',
            lastSyncTimestamp: new Date().toISOString()
          };
          await dbService.put(storeName, syncedItem);
          syncedCount++;
        }
      }

      this.lastSyncTime = new Date().toISOString();
      this.syncInProgress = false;

      this.notifyListeners({
        type: 'SYNC_COMPLETED',
        syncedCount,
        timestamp: this.lastSyncTime
      });

      return { success: true, syncedCount, timestamp: this.lastSyncTime };
    } catch (error) {
      this.syncInProgress = false;
      this.notifyListeners({ type: 'SYNC_FAILED', error: error.message });
      return { success: false, error: error.message };
    }
  }
}

export const syncEngine = new SyncService();
