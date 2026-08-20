// IndexedDB and LocalStorage persistent storage layer for AASHA Offline-First Platform

const DB_NAME = 'aasha_offline_db';
const DB_VERSION = 1;

class OfflineStorageEngine {
  constructor() {
    this.db = null;
    this.isIndexedDBAvailable = typeof window !== 'undefined' && 'indexedDB' in window;
    this.initPromise = this.initDB();
  }

  async initDB() {
    if (!this.isIndexedDBAvailable) {
      console.warn('IndexedDB not available, falling back to LocalStorage');
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Stores
        const stores = [
          'patients',
          'vitals',
          'vaccinations',
          'anc_visits',
          'reports',
          'reminders',
          'sync_queue',
          'audit_logs'
        ];

        stores.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: 'id' });
            if (storeName === 'patients') {
              store.createIndex('category', 'category', { unique: false });
              store.createIndex('syncStatus', 'syncStatus', { unique: false });
              store.createIndex('region', 'region', { unique: false });
            } else if (storeName === 'vitals' || storeName === 'vaccinations' || storeName === 'anc_visits' || storeName === 'reports') {
              store.createIndex('patientId', 'patientId', { unique: false });
            }
          }
        });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB open error:', event.target.error);
        resolve(null); // Fallback gracefully to localStorage
      };
    });
  }

  // Generic Get All
  async getAll(storeName) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } else {
      // LocalStorage fallback
      const data = localStorage.getItem(`aasha_${storeName}`);
      return data ? JSON.parse(data) : [];
    }
  }

  // Generic Get by ID
  async getById(storeName, id) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } else {
      const all = await this.getAll(storeName);
      return all.find((item) => item.id === id) || null;
    }
  }

  // Generic Put (Insert or Update)
  async put(storeName, item) {
    await this.initPromise;
    const itemWithTimestamps = {
      ...item,
      updatedAt: new Date().toISOString(),
      syncStatus: item.syncStatus || 'PENDING_SYNC'
    };

    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(itemWithTimestamps);
        request.onsuccess = () => resolve(itemWithTimestamps);
        request.onerror = () => reject(request.error);
      });
    } else {
      const all = await this.getAll(storeName);
      const index = all.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        all[index] = itemWithTimestamps;
      } else {
        all.push(itemWithTimestamps);
      }
      localStorage.setItem(`aasha_${storeName}`, JSON.stringify(all));
      return itemWithTimestamps;
    }
  }

  // Put Multiple (Bulk)
  async bulkPut(storeName, items) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        items.forEach((item) => store.put(item));
        transaction.oncomplete = () => resolve(items);
        transaction.onerror = () => reject(transaction.error);
      });
    } else {
      localStorage.setItem(`aasha_${storeName}`, JSON.stringify(items));
      return items;
    }
  }

  // Generic Delete
  async delete(storeName, id) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } else {
      const all = await this.getAll(storeName);
      const filtered = all.filter((i) => i.id !== id);
      localStorage.setItem(`aasha_${storeName}`, JSON.stringify(filtered));
      return true;
    }
  }

  // Clear Store
  async clear(storeName) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } else {
      localStorage.removeItem(`aasha_${storeName}`);
      return true;
    }
  }
}

export const dbService = new OfflineStorageEngine();
