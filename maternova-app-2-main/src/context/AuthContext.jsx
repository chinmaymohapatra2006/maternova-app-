import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_USERS = {
  ASHA_WORKER: {
    id: 'ASHA-VNS-04',
    name: 'Shanti Devi',
    role: 'ASHA_WORKER',
    roleTitle: 'Frontline ASHA Worker',
    englishSubtitle: 'Community Health Assistant',
    center: 'Rampur Sub-Centre, PHC Varanasi',
    assignedVillages: ['Rampur', 'Melur', 'Chomu'],
    permissions: { canRegister: true, canRecordVitals: true, canEditMedicalData: false, canSync: true },
    avatar: '👩🏽‍⚕️',
    defaultPin: '1234'
  },
  DOCTOR: {
    id: 'DOC-UP-88',
    name: 'Dr. Rajesh Mukherjee',
    role: 'DOCTOR',
    roleTitle: 'Medical Officer (PHC In-charge)',
    englishSubtitle: 'Primary Health Centre Officer',
    center: 'Varanasi Central PHC & FRU',
    specialty: 'Community Medicine & Obstetrics',
    permissions: { canRegister: false, canRecordVitals: true, canEditMedicalData: true, canSync: true },
    avatar: '👨🏽‍⚕️',
    defaultPin: '8888'
  },
  PATIENT: {
    id: 'PAT-PW-101',
    name: 'Sunita Devi',
    role: 'PATIENT',
    roleTitle: 'Patient Digital Health Pass',
    englishSubtitle: 'Beneficiary Personal Pass',
    center: 'Village Rampur, Varanasi',
    activePatientId: 'PAT-PW-101',
    phone: '+91 98765 43210',
    permissions: { canRegister: false, canRecordVitals: false, canEditMedicalData: false, canSync: false, isViewOnly: true },
    avatar: '🤰🏽',
    defaultOtp: '1001'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aasha_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePatientIdForPortal, setActivePatientIdForPortal] = useState(() => {
    const saved = localStorage.getItem('aasha_auth_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role === 'PATIENT' && parsed.activePatientId) {
        return parsed.activePatientId;
      }
    }
    return 'PAT-PW-101';
  });

  const login = (role, customUserData = {}) => {
    const base = DEFAULT_USERS[role] || DEFAULT_USERS.ASHA_WORKER;
    const user = { ...base, ...customUserData };
    setCurrentUser(user);
    if (role === 'PATIENT') {
      const patientId = customUserData.activePatientId || customUserData.id || 'PAT-PW-101';
      setActivePatientIdForPortal(patientId);
      user.activePatientId = patientId;
    }
    localStorage.setItem('aasha_auth_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aasha_auth_user');
  };

  const selectPortalPatient = (patientId) => {
    setActivePatientIdForPortal(patientId);
  };

  const currentRole = currentUser ? currentUser.role : null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        currentRole,
        login,
        logout,
        activePatientIdForPortal,
        selectPortalPatient,
        DEFAULT_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
