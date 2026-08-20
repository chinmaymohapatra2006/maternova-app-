import React, { useState } from 'react';
import { Badge } from '../../common/Badge';
import { AshaRankingsSubView } from './AshaRankingsSubView';
import {
  DollarSign,
  Award,
  CheckCircle2,
  Clock,
  Send,
  PlusCircle,
  FileCheck,
  TrendingUp,
  Calendar,
  AlertCircle,
  Trophy,
  Users
} from 'lucide-react';

export const AshaIncentivesView = ({ initialSubTab = 'MY_INCENTIVES' }) => {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  const [incentiveLedger, setIncentiveLedger] = useState([
    {
      id: 'INC-2026-01',
      taskName: 'Early Pregnancy Registration (within 12 weeks) — Sunita Devi',
      scheme: 'PMMVY / NHM',
      beneficiaryId: 'PAT-PW-101',
      date: '2026-08-10',
      rate: 100,
      status: 'APPROVED',
      dbtStatus: 'DISBURSED'
    },
    {
      id: 'INC-2026-02',
      taskName: 'Institutional Delivery Escort & JSY Assistance — Radha Yadav',
      scheme: 'JSY (Janani Suraksha Yojana)',
      beneficiaryId: 'PAT-PW-104',
      date: '2026-08-12',
      rate: 600,
      status: 'APPROVED',
      dbtStatus: 'PENDING_PAYMENT'
    },
    {
      id: 'INC-2026-03',
      taskName: 'Complete Infant 1st Year Immunization Follow-up — Aarav Meena',
      scheme: 'Universal Immunization Programme (UIP)',
      beneficiaryId: 'PAT-INF-201',
      date: '2026-08-14',
      rate: 250,
      status: 'APPROVED',
      dbtStatus: 'PENDING_PAYMENT'
    },
    {
      id: 'INC-2026-04',
      taskName: 'Home Based Newborn Care (HBNC 6 Visits) — Ananya Mondal',
      scheme: 'HBNC Programme',
      beneficiaryId: 'PAT-INF-202',
      date: '2026-08-15',
      rate: 250,
      status: 'SUBMITTED',
      dbtStatus: 'UNDER_REVIEW'
    },
    {
      id: 'INC-2026-05',
      taskName: 'Monthly Village Health Sanitation & Nutrition Day (VHSND) Organization',
      scheme: 'NHM Village Community Meeting',
      beneficiaryId: 'Rampur Anganwadi',
      date: '2026-08-18',
      rate: 200,
      status: 'APPROVED',
      dbtStatus: 'DISBURSED'
    },
    {
      id: 'INC-2026-06',
      taskName: 'NCD Population Screening (BP & Blood Sugar) — Ramcharan Patel',
      scheme: 'Ayushman Bharat NCD Portal',
      beneficiaryId: 'PAT-ELD-301',
      date: '2026-08-19',
      rate: 150,
      status: 'SUBMITTED',
      dbtStatus: 'UNDER_REVIEW'
    }
  ]);

  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimTaskType, setClaimTaskType] = useState('ANC_ESCORT');
  const [claimBeneficiaryId, setClaimBeneficiaryId] = useState('');
  const [claimDate, setClaimDate] = useState(new Date().toISOString().split('T')[0]);

  // Totals
  const totalEarned = incentiveLedger.reduce((acc, item) => acc + item.rate, 0);
  const totalDisbursed = incentiveLedger
    .filter((item) => item.dbtStatus === 'DISBURSED')
    .reduce((acc, item) => acc + item.rate, 0);
  const pendingApproval = incentiveLedger
    .filter((item) => item.status === 'SUBMITTED')
    .reduce((acc, item) => acc + item.rate, 0);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    const rates = {
      PREG_REG: { name: 'Early Pregnancy Registration (<12 Wks)', rate: 100, scheme: 'PMMVY' },
      ANC_ESCORT: { name: 'Institutional Delivery Escort (JSY)', rate: 600, scheme: 'JSY Rural' },
      IMMUNIZATION: { name: 'Complete 1st Year Immunization', rate: 250, scheme: 'UIP India' },
      HBNC: { name: 'Home Based Newborn Care (6 Visits)', rate: 250, scheme: 'HBNC' },
      VHSND: { name: 'Monthly VHSND Health Camp', rate: 200, scheme: 'NHM Community' },
      NCD_SCREENING: { name: 'NCD Screening (BP / Blood Sugar)', rate: 150, scheme: 'NPCDCS / AB' }
    };

    const selected = rates[claimTaskType] || rates.ANC_ESCORT;

    const newClaim = {
      id: `INC-2026-0${incentiveLedger.length + 1}`,
      taskName: `${selected.name} — ${claimBeneficiaryId || 'Beneficiary'}`,
      scheme: selected.scheme,
      beneficiaryId: claimBeneficiaryId || 'PAT-VNS-FIELD',
      date: claimDate,
      rate: selected.rate,
      status: 'SUBMITTED',
      dbtStatus: 'UNDER_REVIEW'
    };

    setIncentiveLedger([newClaim, ...incentiveLedger]);
    setIsClaimModalOpen(false);
    setClaimBeneficiaryId('');
  };

  return (
    <div className="space-y-6">
      {/* Submenu Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border-2 border-amber-200 rounded-2xl shadow-xs">
        <button
          onClick={() => setActiveSubTab('MY_INCENTIVES')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
            activeSubTab === 'MY_INCENTIVES'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-amber-50 hover:text-amber-950'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>My Earnings & Activity Ledger</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeSubTab === 'MY_INCENTIVES' ? 'bg-amber-950 text-amber-200' : 'bg-slate-100 text-slate-600'}`}>
            ₹{totalEarned}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('PHC_RANKINGS')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
            activeSubTab === 'PHC_RANKINGS'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-slate-700 hover:bg-amber-50 hover:text-amber-950'
          }`}
        >
          <Trophy className="w-4 h-4 text-yellow-300" />
          <span>PHC Block ASHA Ranking List</span>
          <span className="text-[10px] bg-yellow-400 text-yellow-950 px-2 py-0.5 rounded-full font-extrabold shadow-2xs">
            25 Workers • Rank #3
          </span>
        </button>
      </div>

      {/* SUBVIEW 1: PHC BLOCK RANKING LIST */}
      {activeSubTab === 'PHC_RANKINGS' && <AshaRankingsSubView />}

      {/* SUBVIEW 2: MY EARNINGS & CLAIMS LEDGER */}
      {activeSubTab === 'MY_INCENTIVES' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-orange-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-amber-600/60">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-600/50 flex items-center justify-center text-xl shadow-xs">
                  💰
                </div>
                <div>
                  <h2 className="text-lg font-bold">ASHA Incentive & Earnings Ledger</h2>
                  <span className="text-xs text-amber-200">
                    National Health Mission (NHM) Performance-Based Monthly Compensation
                  </span>
                </div>
              </div>
              <p className="text-xs text-amber-100/90">
                Track your verified field activities, JSY delivery escorts, immunization follow-ups, and direct benefit transfer (PFMS/DBT) status.
              </p>
            </div>

            <button
              onClick={() => setIsClaimModalOpen(true)}
              className="btn-primary-white flex items-center gap-2 shadow-md hover:scale-105 transition"
            >
              <PlusCircle className="w-4 h-4" /> Submit New Incentive Claim
            </button>
          </div>

          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border-2 border-slate-200 rounded-3xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Total Monthly Claims</span>
                <Award className="w-5 h-5 text-amber-700" />
              </div>
              <div className="text-3xl font-black text-slate-900">₹{totalEarned}</div>
              <p className="text-[11px] text-slate-500">{incentiveLedger.length} Verified Field Tasks Logged</p>
            </div>

            <div className="p-5 bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider">Disbursed into Bank (DBT)</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-emerald-950">₹{totalDisbursed}</div>
              <p className="text-[11px] text-emerald-800 font-medium">Credited via Aadhaar-linked Bank A/C</p>
            </div>

            <div className="p-5 bg-amber-50/80 border-2 border-amber-300 rounded-3xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-amber-900">
                <span className="text-xs font-bold uppercase tracking-wider">Pending PHC Approval</span>
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
              <div className="text-3xl font-black text-amber-950">₹{pendingApproval}</div>
              <p className="text-[11px] text-amber-800 font-medium">Under Medical Officer Verification</p>
            </div>
          </div>

          {/* Incentive Rate Reference Card */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Standard NHM Incentive Rate Chart:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="block text-[11px] text-slate-500">JSY Delivery Escort</span>
                <strong className="text-emerald-800 font-black text-sm">₹600</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="block text-[11px] text-slate-500">HBNC Newborn Care</span>
                <strong className="text-emerald-800 font-black text-sm">₹250</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="block text-[11px] text-slate-500">Infant 1-Yr Vaccines</span>
                <strong className="text-emerald-800 font-black text-sm">₹250</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="block text-[11px] text-slate-500">Monthly VHSND Day</span>
                <strong className="text-emerald-800 font-black text-sm">₹200</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="block text-[11px] text-slate-500">NCD Elderly Screening</span>
                <strong className="text-emerald-800 font-black text-sm">₹150</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="block text-[11px] text-slate-500">Early ANC Reg</span>
                <strong className="text-emerald-800 font-black text-sm">₹100</strong>
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Chronological Incentive Claims Ledger
              </h4>
              <span className="text-[11px] text-slate-500">PHC Varanasi Block Registry</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Claim ID / Date</th>
                    <th className="p-3.5">Activity / Beneficiary</th>
                    <th className="p-3.5">Program Scheme</th>
                    <th className="p-3.5">Incentive Rate</th>
                    <th className="p-3.5">MO Approval</th>
                    <th className="p-3.5 text-right">DBT Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {incentiveLedger.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-slate-900">{item.id}</div>
                        <span className="text-[11px] text-slate-400">{item.date}</span>
                      </td>
                      <td className="p-3.5 font-medium max-w-sm">
                        <div className="font-bold text-slate-900">{item.taskName}</div>
                        <span className="text-[11px] text-slate-500 font-mono">Ref: {item.beneficiaryId}</span>
                      </td>
                      <td className="p-3.5">{item.scheme}</td>
                      <td className="p-3.5 font-black text-emerald-900 text-sm">₹{item.rate}</td>
                      <td className="p-3.5">
                        <Badge variant={item.status === 'APPROVED' ? 'emerald' : 'amber'} size="sm">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border ${item.dbtStatus === 'DISBURSED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : item.dbtStatus === 'PENDING_PAYMENT' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
                        >
                          {item.dbtStatus.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Claim Submission Modal */}
          {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-700" /> Submit Activity Incentive Claim
              </h3>
              <button onClick={() => setIsClaimModalOpen(false)} className="modal-close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
              <div>
                <label className="input-label">Select NHM Task / Activity *</label>
                <select
                  value={claimTaskType}
                  onChange={(e) => setClaimTaskType(e.target.value)}
                  className="input-field font-bold text-xs"
                >
                  <option value="ANC_ESCORT">Institutional Delivery Escort (JSY) — ₹600</option>
                  <option value="HBNC">Home Based Newborn Care (6-7 Visits) — ₹250</option>
                  <option value="IMMUNIZATION">1st Year Complete Immunization Follow-up — ₹250</option>
                  <option value="VHSND">Monthly Village Health & Nutrition Day Camp — ₹200</option>
                  <option value="NCD_SCREENING">NCD Population Screening (BP / Sugar) — ₹150</option>
                  <option value="PREG_REG">Early Pregnancy Registration (&lt;12 Weeks) — ₹100</option>
                </select>
              </div>

              <div>
                <label className="input-label">Beneficiary ID / Name / Venue *</label>
                <input
                  type="text"
                  value={claimBeneficiaryId}
                  onChange={(e) => setClaimBeneficiaryId(e.target.value)}
                  placeholder="e.g. PAT-PW-101 (Sunita Devi) or Rampur Anganwadi"
                  className="input-field text-xs"
                  required
                />
              </div>

              <div>
                <label className="input-label">Activity Date *</label>
                <input
                  type="date"
                  value={claimDate}
                  onChange={(e) => setClaimDate(e.target.value)}
                  className="input-field text-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Submit Claim to PHC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
};
