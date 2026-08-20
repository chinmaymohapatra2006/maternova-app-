import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Badge } from '../../common/Badge';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Search,
  Check,
  X,
  Stethoscope,
  ExternalLink,
  AlertCircle,
  FileText
} from 'lucide-react';

export const DoctorGovtSchemesView = () => {
  const { t } = useLanguage();
  const [selectedCohort, setSelectedCohort] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCertificationTab, setActiveCertificationTab] = useState('SCHEMES_GUIDE');

  const [pendingCertifications, setPendingCertifications] = useState([
    {
      id: 'CERT-PMMVY-01',
      patientName: 'Sunita Devi',
      patientId: 'PAT-PW-101',
      village: 'Rampur',
      scheme: 'PMMVY (Installment 2 - ₹2,000)',
      requirement: 'Verification of 2 ANC Checkups & Hemoglobin Lab Report',
      ashaWorker: 'ASHA Shanti Devi',
      status: 'PENDING_APPROVAL',
      submittedDate: '2026-08-18'
    },
    {
      id: 'CERT-JSY-02',
      patientName: 'Radha Yadav',
      patientId: 'PAT-PW-104',
      village: 'Rampur',
      scheme: 'JSY Rural (₹1,400 DBT Assistance)',
      requirement: 'Institutional Delivery Discharge Slip & Neonatal Survival Verification',
      ashaWorker: 'ASHA Shanti Devi',
      status: 'PENDING_APPROVAL',
      submittedDate: '2026-08-19'
    },
    {
      id: 'CERT-PMJAY-03',
      patientName: 'Ramcharan Patel',
      patientId: 'PAT-ELD-301',
      village: 'Rampur',
      scheme: 'Ayushman Bharat PM-JAY',
      requirement: 'Hypertension Stage-2 Specialist Referral & Diagnostic Package Pre-Auth',
      ashaWorker: 'ASHA Shanti Devi',
      status: 'PENDING_APPROVAL',
      submittedDate: '2026-08-19'
    }
  ]);

  const DOCTOR_SCHEMES = [
    {
      id: 'PMMVY',
      name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      roleOfDoctor: 'Certify mandatory 2 ANC checkups and confirm gestational progress for DBT installment release.',
      benefit: '₹5,000 in Direct Benefit Transfer',
      clinicalProtocol: 'Record systolic/diastolic BP, maternal weight gain, abdominal palpation, and ensure minimum 180 IFA tablets prescribed.',
      status: 'ACTIVE_GOVT_SCHEME'
    },
    {
      id: 'JSY',
      name: 'Janani Suraksha Yojana (JSY)',
      roleOfDoctor: 'Supervise safe institutional delivery in PHC/CHC, sign birth certificate, and authorize ASHA escort incentive (₹600).',
      benefit: '₹1,400 Cash Assistance (Rural)',
      clinicalProtocol: 'Partograph monitoring, active management of third stage of labor (AMTSL), and 48-hour postpartum stay observation.',
      status: 'ACTIVE_GOVT_SCHEME'
    },
    {
      id: 'PMSMA',
      name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA - 9th of Month)',
      roleOfDoctor: 'Lead the specialist ANC clinic on the 9th day of every month, conduct ultrasound screening, and tag High-Risk Pregnancies.',
      benefit: 'Free Specialist Antenatal & Diagnostic Package',
      clinicalProtocol: 'Red Sticker tagging on MCP card for Severe Anemia (Hb < 7g/dL), Gestational Diabetes, or Pre-eclampsia.',
      status: 'ACTIVE_GOVT_SCHEME'
    },
    {
      id: 'PMJAY',
      name: 'Ayushman Bharat - PM-JAY Secondary & Tertiary Cover',
      roleOfDoctor: 'Provide clinical pre-authorization for secondary hospitalization, surgical packages, and emergency tertiary transfers.',
      benefit: '₹5,00,000 Health Assurance per Family/Year',
      clinicalProtocol: 'Electronic transmission of clinical summary, diagnostic pathology/imaging, and e-card verification to District Hospital.',
      status: 'ACTIVE_GOVT_SCHEME'
    }
  ];

  const handleAuthorize = (id) => {
    setPendingCertifications((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'APPROVED_BY_DOCTOR' } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-xl">
              🏛️
            </div>
            <div>
              <h2 className="text-lg font-bold">Government Health Scheme Clinical Authorization</h2>
              <span className="text-xs text-indigo-300">
                Medical Officer Certification, DBT Clearances & PMSMA Specialist Clinic
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Review and digitally certify pending maternal PMMVY installments, JSY institutional delivery clearances, and PM-JAY diagnostic packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveCertificationTab('PENDING_QUEUE')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${activeCertificationTab === 'PENDING_QUEUE' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Pending Approvals ({pendingCertifications.filter((c) => c.status === 'PENDING_APPROVAL').length})</span>
          </button>

          <button
            onClick={() => setActiveCertificationTab('SCHEMES_GUIDE')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${activeCertificationTab === 'SCHEMES_GUIDE' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            <Landmark className="w-4 h-4" />
            <span>Clinical Guidelines</span>
          </button>
        </div>
      </div>

      {/* VIEW A: PENDING CERTIFICATION QUEUE */}
      {activeCertificationTab === 'PENDING_QUEUE' && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between text-xs text-indigo-950 font-medium">
            <span>
              💡 <strong>Doctor Authorization:</strong> Approving these claims digitally transmits authorization to the District PFMS portal for direct bank disbursement.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingCertifications.map((cert) => {
              const isApproved = cert.status === 'APPROVED_BY_DOCTOR';
              return (
                <div
                  key={cert.id}
                  className={`p-5 bg-white border-2 rounded-3xl space-y-3 flex flex-col justify-between shadow-xs transition ${isApproved ? 'border-emerald-300 bg-emerald-50/20' : 'border-indigo-200 hover:border-indigo-400'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{cert.patientName}</h4>
                        <span className="text-[11px] font-mono text-slate-400">ID: {cert.patientId} • Village {cert.village}</span>
                      </div>
                      <Badge variant={isApproved ? 'emerald' : 'amber'} size="sm">
                        {isApproved ? 'AUTHORIZED' : 'PENDING MO'}
                      </Badge>
                    </div>

                    <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs">
                      <strong className="text-indigo-950 block">{cert.scheme}</strong>
                      <span className="text-slate-600 text-[11px] block mt-0.5">{cert.requirement}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                      <span>Submitted by: <strong>{cert.ashaWorker}</strong></span>
                      <span className="font-mono">{cert.submittedDate}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    {isApproved ? (
                      <div className="p-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Authorized by Medical Officer
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAuthorize(cert.id)}
                        className="w-full btn-primary text-xs py-2 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-4 h-4" /> Authorize & Sign Certification
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: SCHEMES CLINICAL PROTOCOLS */}
      {activeCertificationTab === 'SCHEMES_GUIDE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOCTOR_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="p-5 bg-white border-2 border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{scheme.name}</h4>
                  <span className="text-xs font-bold text-indigo-700 mt-0.5 block">{scheme.benefit}</span>
                </div>
                <Badge variant="indigo" size="sm">
                  NHM Protocol
                </Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-800 block mb-0.5">Doctor's Clinical Responsibility:</strong>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {scheme.roleOfDoctor}
                  </p>
                </div>

                <div>
                  <strong className="text-slate-800 block mb-0.5">Clinical Protocol Guidelines:</strong>
                  <p className="text-slate-600 leading-relaxed bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
                    {scheme.clinicalProtocol}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
