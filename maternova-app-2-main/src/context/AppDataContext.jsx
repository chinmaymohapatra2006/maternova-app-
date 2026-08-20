import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dbService } from '../services/storage/db';
import { syncEngine } from '../services/sync/syncService';
import {
  INITIAL_PATIENTS,
  INITIAL_VITALS_HISTORY,
  INITIAL_VACCINATIONS,
  INITIAL_ANC_VISITS,
  INITIAL_REPORTS,
  INITIAL_REMINDERS
} from '../services/storage/mockData';

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [ancVisits, setAncVisits] = useState([]);
  const [reports, setReports] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [isOnline, setIsOnline] = useState(syncEngine.getNetworkStatus());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(syncEngine.simulatedOffline);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState('PAT-PW-101');

  // Load All Data from Local DB
  const loadAllData = useCallback(async () => {
    try {
      let storedPatients = await dbService.getAll('patients');

      // If DB is completely fresh, seed with mock data
      if (!storedPatients || storedPatients.length === 0) {
        await dbService.bulkPut('patients', INITIAL_PATIENTS);
        await dbService.bulkPut('vitals', INITIAL_VITALS_HISTORY);
        await dbService.bulkPut('vaccinations', INITIAL_VACCINATIONS);
        await dbService.bulkPut('anc_visits', INITIAL_ANC_VISITS);
        await dbService.bulkPut('reports', INITIAL_REPORTS);
        await dbService.bulkPut('reminders', INITIAL_REMINDERS);

        storedPatients = INITIAL_PATIENTS;
      }

      const [storedVitals, storedVac, storedAnc, storedRep, storedRem, storedLogs] = await Promise.all([
        dbService.getAll('vitals'),
        dbService.getAll('vaccinations'),
        dbService.getAll('anc_visits'),
        dbService.getAll('reports'),
        dbService.getAll('reminders'),
        dbService.getAll('audit_logs')
      ]);

      setPatients(storedPatients || []);
      setVitals(storedVitals || []);
      setVaccinations(storedVac || []);
      setAncVisits(storedAnc || []);
      setReports(storedRep || []);
      setReminders(storedRem || []);
      setAuditLogs(storedLogs || []);

      const { totalPending } = await syncEngine.getPendingCount();
      setPendingSyncCount(totalPending);
    } catch (err) {
      console.error('Error loading data from offline DB:', err);
    }
  }, []);

  // Sync state listener
  useEffect(() => {
    loadAllData();

    const unsubscribe = syncEngine.subscribe((event) => {
      if (event.type === 'NETWORK_CHANGE') {
        setIsOnline(event.isOnline);
      } else if (event.type === 'SYNC_STARTED') {
        setIsSyncing(true);
      } else if (event.type === 'SYNC_COMPLETED') {
        setIsSyncing(false);
        setLastSyncTime(event.timestamp);
        loadAllData();
      } else if (event.type === 'SYNC_FAILED') {
        setIsSyncing(false);
      } else if (event.type === 'QUEUE_UPDATED') {
        syncEngine.getPendingCount().then(({ totalPending }) => setPendingSyncCount(totalPending));
      }
    });

    return () => unsubscribe();
  }, [loadAllData]);

  // Actions
  const toggleOfflineSimulation = (simOffline) => {
    syncEngine.setSimulatedOffline(simOffline);
    setIsSimulatedOffline(simOffline);
    setIsOnline(syncEngine.getNetworkStatus());
  };

  const triggerManualSync = async () => {
    return await syncEngine.triggerSync();
  };

  // Add Patient (ASHA Worker Action)
  const savePatient = async (patientData) => {
    const id = patientData.id || `PAT-${patientData.category.substring(0, 3)}-${Date.now().toString().slice(-4)}`;
    const newPatient = {
      ...patientData,
      id,
      registeredDate: patientData.registeredDate || new Date().toISOString().split('T')[0]
    };

    await syncEngine.queueRecord('patients', newPatient);
    await loadAllData();
    return newPatient;
  };

  // Update Patient Record (Doctor Action with Full Editing Access)
  const updatePatientRecord = async (patientId, updatedFields) => {
    const existing = patients.find((p) => p.id === patientId);
    if (!existing) return null;

    const merged = {
      ...existing,
      ...updatedFields,
      id: patientId,
      lastModifiedBy: 'DOCTOR_CLINICAL_PORTAL'
    };

    await syncEngine.queueRecord('patients', merged);
    await loadAllData();
    return merged;
  };

  // Add Vitals Entry
  const addVitals = async (vitalData) => {
    const id = `VIT-${Date.now().toString().slice(-6)}`;
    const newVital = {
      ...vitalData,
      id,
      date: vitalData.date || new Date().toISOString().split('T')[0]
    };

    await syncEngine.queueRecord('vitals', newVital);

    // Update patient latest vitals cache
    const currentPatient = patients.find((p) => p.id === vitalData.patientId);
    if (currentPatient) {
      const updatedPatient = {
        ...currentPatient,
        latestVitals: { ...currentPatient.latestVitals, ...newVital }
      };
      await syncEngine.queueRecord('patients', updatedPatient);
    }

    await loadAllData();
    return newVital;
  };

  // Update Vital Record (Doctor Edit Action)
  const updateVitalRecord = async (vitalId, updatedFields) => {
    const existing = vitals.find((v) => v.id === vitalId);
    if (!existing) return null;

    const merged = {
      ...existing,
      ...updatedFields,
      id: vitalId,
      lastModifiedBy: 'DOCTOR_CLINICAL_PORTAL'
    };

    await syncEngine.queueRecord('vitals', merged);
    await loadAllData();
    return merged;
  };

  // Record Vaccination
  const recordVaccineAdministered = async (vaccineData) => {
    const id = vaccineData.id || `VAC-${Date.now().toString().slice(-6)}`;
    const newRecord = {
      ...vaccineData,
      id,
      status: 'GIVEN',
      dateAdministered: vaccineData.dateAdministered || new Date().toISOString().split('T')[0]
    };

    await syncEngine.queueRecord('vaccinations', newRecord);
    await loadAllData();
    return newRecord;
  };

  // Record ANC Checkup Visit
  const recordANCVisit = async (ancData) => {
    const id = ancData.id || `ANC-${Date.now().toString().slice(-6)}`;
    const newVisit = {
      ...ancData,
      id,
      status: 'COMPLETED',
      dateCompleted: ancData.dateCompleted || new Date().toISOString().split('T')[0]
    };

    await syncEngine.queueRecord('anc_visits', newVisit);
    await loadAllData();
    return newVisit;
  };

  // Add Medical Report
  const addReport = async (reportData) => {
    const id = `REP-${Date.now().toString().slice(-6)}`;
    const newReport = {
      ...reportData,
      id,
      date: reportData.date || new Date().toISOString().split('T')[0]
    };

    await syncEngine.queueRecord('reports', newReport);
    await loadAllData();
    return newReport;
  };

  // Update Medical Report (Doctor Edit Action)
  const updateReportRecord = async (reportId, updatedFields) => {
    const existing = reports.find((r) => r.id === reportId);
    if (!existing) return null;

    const merged = {
      ...existing,
      ...updatedFields,
      id: reportId,
      lastModifiedBy: 'DOCTOR_CLINICAL_PORTAL'
    };

    await syncEngine.queueRecord('reports', merged);
    await loadAllData();
    return merged;
  };

  // Delete Patient Record (Doctor / Admin action)
  const deletePatient = async (patientId) => {
    await dbService.delete('patients', patientId);
    await loadAllData();
  };

  // Reset entire database to initial mock state for fresh evaluation
  const resetToMockData = async () => {
    await dbService.clear('patients');
    await dbService.clear('vitals');
    await dbService.clear('vaccinations');
    await dbService.clear('anc_visits');
    await dbService.clear('reports');
    await dbService.clear('reminders');
    await dbService.clear('sync_queue');
    await dbService.clear('audit_logs');
    await loadAllData();
  };

  return (
    <AppDataContext.Provider
      value={{
        patients,
        vitals,
        vaccinations,
        ancVisits,
        reports,
        reminders,
        auditLogs,
        isOnline,
        isSimulatedOffline,
        pendingSyncCount,
        isSyncing,
        lastSyncTime,
        selectedPatientId,
        setSelectedPatientId,
        toggleOfflineSimulation,
        triggerManualSync,
        savePatient,
        updatePatientRecord,
        deletePatient,
        addVitals,
        updateVitalRecord,
        recordVaccineAdministered,
        recordANCVisit,
        addReport,
        updateReportRecord,
        resetToMockData,
        refreshData: loadAllData
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within an AppDataProvider');
  return context;
};
