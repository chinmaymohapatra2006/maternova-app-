import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Badge } from '../../common/Badge';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Users,
  Building,
  ArrowUpRight,
  ShieldCheck,
  Star,
  ChevronDown
} from 'lucide-react';

export const AshaRankingsSubView = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('AUG_2026');
  const [selectedSubCentre, setSelectedSubCentre] = useState('ALL');

  // 25 Realistic ASHA Workers at the PHC Block Level ranked by verified incentive earnings
  const ASHA_PHC_ROSTER = [
    {
      rank: 1,
      name: 'Rekha Devi',
      ashaId: 'ASHA-VNS-01',
      village: 'Shivpur Khas',
      subCentre: 'Shivpur Sub-Centre',
      totalIncentive: 9450,
      jsyDeliveries: 9,
      immunizations: 14,
      ancRegistrations: 11,
      hbncVisits: 10,
      ncdScreenings: 42,
      tier: 'STAR_PERFORMER',
      isCurrentUser: false
    },
    {
      rank: 2,
      name: 'Sunita Sharma',
      ashaId: 'ASHA-VNS-02',
      village: 'Chiraigaon',
      subCentre: 'Chiraigaon Sub-Centre',
      totalIncentive: 8900,
      jsyDeliveries: 8,
      immunizations: 13,
      ancRegistrations: 10,
      hbncVisits: 9,
      ncdScreenings: 38,
      tier: 'STAR_PERFORMER',
      isCurrentUser: false
    },
    {
      rank: 3,
      name: currentUser?.name || 'Shanti Devi',
      ashaId: currentUser?.id || 'ASHA-VNS-04',
      village: currentUser?.assignedVillages?.[0] || 'Rampur',
      subCentre: currentUser?.center || 'Rampur Sub-Centre',
      totalIncentive: 8650,
      jsyDeliveries: 8,
      immunizations: 12,
      ancRegistrations: 9,
      hbncVisits: 8,
      ncdScreenings: 35,
      tier: 'STAR_PERFORMER',
      isCurrentUser: true
    },
    {
      rank: 4,
      name: 'Pooja Maurya',
      ashaId: 'ASHA-VNS-03',
      village: 'Babarpur',
      subCentre: 'Babarpur Sub-Centre',
      totalIncentive: 8100,
      jsyDeliveries: 7,
      immunizations: 11,
      ancRegistrations: 9,
      hbncVisits: 8,
      ncdScreenings: 32,
      tier: 'HIGH_ACHIEVER',
      isCurrentUser: false
    },
    {
      rank: 5,
      name: 'Kusum Lata',
      ashaId: 'ASHA-VNS-05',
      village: 'Kashi Puram',
      subCentre: 'Kashi Sub-Centre',
      totalIncentive: 7850,
      jsyDeliveries: 7,
      immunizations: 10,
      ancRegistrations: 8,
      hbncVisits: 7,
      ncdScreenings: 30,
      tier: 'HIGH_ACHIEVER',
      isCurrentUser: false
    },
    {
      rank: 6,
      name: 'Manju Verma',
      ashaId: 'ASHA-VNS-06',
      village: 'Bhelupur Rural',
      subCentre: 'Bhelupur Sub-Centre',
      totalIncentive: 7600,
      jsyDeliveries: 6,
      immunizations: 11,
      ancRegistrations: 8,
      hbncVisits: 7,
      ncdScreenings: 28,
      tier: 'HIGH_ACHIEVER',
      isCurrentUser: false
    },
    {
      rank: 7,
      name: 'Sushila Yadav',
      ashaId: 'ASHA-VNS-07',
      village: 'Lohta Khurd',
      subCentre: 'Lohta Sub-Centre',
      totalIncentive: 7350,
      jsyDeliveries: 6,
      immunizations: 10,
      ancRegistrations: 7,
      hbncVisits: 7,
      ncdScreenings: 29,
      tier: 'HIGH_ACHIEVER',
      isCurrentUser: false
    },
    {
      rank: 8,
      name: 'Geeta Kumari',
      ashaId: 'ASHA-VNS-08',
      village: 'Ramnagar Basti',
      subCentre: 'Ramnagar Sub-Centre',
      totalIncentive: 7100,
      jsyDeliveries: 6,
      immunizations: 9,
      ancRegistrations: 8,
      hbncVisits: 6,
      ncdScreenings: 26,
      tier: 'HIGH_ACHIEVER',
      isCurrentUser: false
    },
    {
      rank: 9,
      name: 'Kamla Devi',
      ashaId: 'ASHA-VNS-09',
      village: 'Phulwaria',
      subCentre: 'Phulwaria Sub-Centre',
      totalIncentive: 6900,
      jsyDeliveries: 5,
      immunizations: 10,
      ancRegistrations: 7,
      hbncVisits: 6,
      ncdScreenings: 25,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 10,
      name: 'Anjali Pandey',
      ashaId: 'ASHA-VNS-10',
      village: 'Sarnath Dehat',
      subCentre: 'Sarnath Sub-Centre',
      totalIncentive: 6750,
      jsyDeliveries: 5,
      immunizations: 9,
      ancRegistrations: 7,
      hbncVisits: 6,
      ncdScreenings: 24,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 11,
      name: 'Parvati Bind',
      ashaId: 'ASHA-VNS-11',
      village: 'Kotwa',
      subCentre: 'Kotwa Sub-Centre',
      totalIncentive: 6500,
      jsyDeliveries: 5,
      immunizations: 9,
      ancRegistrations: 6,
      hbncVisits: 6,
      ncdScreenings: 22,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 12,
      name: 'Meena Srivastava',
      ashaId: 'ASHA-VNS-12',
      village: 'Karkhiyaon',
      subCentre: 'Karkhiyaon Sub-Centre',
      totalIncentive: 6350,
      jsyDeliveries: 5,
      immunizations: 8,
      ancRegistrations: 6,
      hbncVisits: 5,
      ncdScreenings: 23,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 13,
      name: 'Urmila Rajbhar',
      ashaId: 'ASHA-VNS-13',
      village: 'Harahua West',
      subCentre: 'Harahua Sub-Centre',
      totalIncentive: 6200,
      jsyDeliveries: 4,
      immunizations: 9,
      ancRegistrations: 6,
      hbncVisits: 5,
      ncdScreenings: 21,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 14,
      name: 'Anita Vishwakarma',
      ashaId: 'ASHA-VNS-14',
      village: 'Pindra',
      subCentre: 'Pindra Sub-Centre',
      totalIncentive: 6050,
      jsyDeliveries: 4,
      immunizations: 8,
      ancRegistrations: 6,
      hbncVisits: 5,
      ncdScreenings: 20,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 15,
      name: 'Kanti Devi',
      ashaId: 'ASHA-VNS-15',
      village: 'Baragaon',
      subCentre: 'Baragaon Sub-Centre',
      totalIncentive: 5850,
      jsyDeliveries: 4,
      immunizations: 8,
      ancRegistrations: 5,
      hbncVisits: 5,
      ncdScreenings: 19,
      tier: 'CONSISTENT',
      isCurrentUser: false
    },
    {
      rank: 16,
      name: 'Radha Tripathi',
      ashaId: 'ASHA-VNS-16',
      village: 'Cholapur',
      subCentre: 'Cholapur Sub-Centre',
      totalIncentive: 5650,
      jsyDeliveries: 4,
      immunizations: 7,
      ancRegistrations: 5,
      hbncVisits: 4,
      ncdScreenings: 18,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 17,
      name: 'Savita Singh',
      ashaId: 'ASHA-VNS-17',
      village: 'Arajiline East',
      subCentre: 'Arajiline Sub-Centre',
      totalIncentive: 5450,
      jsyDeliveries: 3,
      immunizations: 8,
      ancRegistrations: 5,
      hbncVisits: 4,
      ncdScreenings: 17,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 18,
      name: 'Bimla Chauhan',
      ashaId: 'ASHA-VNS-18',
      village: 'Kashi Vidyapeeth',
      subCentre: 'Vidyapeeth Sub-Centre',
      totalIncentive: 5200,
      jsyDeliveries: 3,
      immunizations: 7,
      ancRegistrations: 5,
      hbncVisits: 4,
      ncdScreenings: 16,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 19,
      name: 'Chandrawati Patel',
      ashaId: 'ASHA-VNS-19',
      village: 'Tarna',
      subCentre: 'Tarna Sub-Centre',
      totalIncentive: 4950,
      jsyDeliveries: 3,
      immunizations: 6,
      ancRegistrations: 4,
      hbncVisits: 4,
      ncdScreenings: 15,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 20,
      name: 'Pinki Sonkar',
      ashaId: 'ASHA-VNS-20',
      village: 'Manduadih Dehat',
      subCentre: 'Manduadih Sub-Centre',
      totalIncentive: 4700,
      jsyDeliveries: 3,
      immunizations: 6,
      ancRegistrations: 4,
      hbncVisits: 3,
      ncdScreenings: 14,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 21,
      name: 'Saroj Kumari',
      ashaId: 'ASHA-VNS-21',
      village: 'Rohaniya',
      subCentre: 'Rohaniya Sub-Centre',
      totalIncentive: 4450,
      jsyDeliveries: 2,
      immunizations: 6,
      ancRegistrations: 4,
      hbncVisits: 3,
      ncdScreenings: 13,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 22,
      name: 'Tara Devi',
      ashaId: 'ASHA-VNS-22',
      village: 'Mirzamurad',
      subCentre: 'Mirzamurad Sub-Centre',
      totalIncentive: 4200,
      jsyDeliveries: 2,
      immunizations: 5,
      ancRegistrations: 3,
      hbncVisits: 3,
      ncdScreenings: 12,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 23,
      name: 'Lalita Gautam',
      ashaId: 'ASHA-VNS-23',
      village: 'Kapoordhara',
      subCentre: 'Kapoordhara Sub-Centre',
      totalIncentive: 3950,
      jsyDeliveries: 2,
      immunizations: 5,
      ancRegistrations: 3,
      hbncVisits: 2,
      ncdScreenings: 11,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 24,
      name: 'Reena Prajapati',
      ashaId: 'ASHA-VNS-24',
      village: 'Dafi',
      subCentre: 'Dafi Sub-Centre',
      totalIncentive: 3700,
      jsyDeliveries: 2,
      immunizations: 4,
      ancRegistrations: 3,
      hbncVisits: 2,
      ncdScreenings: 10,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    },
    {
      rank: 25,
      name: 'Madhu Jaiswal',
      ashaId: 'ASHA-VNS-25',
      village: 'Lanka Rural',
      subCentre: 'Lanka Sub-Centre',
      totalIncentive: 3450,
      jsyDeliveries: 1,
      immunizations: 4,
      ancRegistrations: 2,
      hbncVisits: 2,
      ncdScreenings: 8,
      tier: 'CONTRIBUTOR',
      isCurrentUser: false
    }
  ];

  const filteredRoster = ASHA_PHC_ROSTER.filter((asha) => {
    if (selectedSubCentre !== 'ALL' && asha.subCentre !== selectedSubCentre) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        asha.name.toLowerCase().includes(q) ||
        asha.ashaId.toLowerCase().includes(q) ||
        asha.village.toLowerCase().includes(q) ||
        asha.subCentre.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const currentUserData = ASHA_PHC_ROSTER.find((a) => a.isCurrentUser) || ASHA_PHC_ROSTER[2];
  const topPerformer = ASHA_PHC_ROSTER[0];
  const averageIncentive = Math.round(
    ASHA_PHC_ROSTER.reduce((acc, a) => acc + a.totalIncentive, 0) / ASHA_PHC_ROSTER.length
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-yellow-900 to-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-amber-600/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600/40 border border-amber-400/40 flex items-center justify-center text-xl shadow-xs">
              🏆
            </div>
            <div>
              <h2 className="text-lg font-bold">PHC Block ASHA Leaderboard & Performance Ranking</h2>
              <span className="text-xs text-amber-200">
                Primary Health Centre (PHC) Varanasi Block • 25 ASHA Workers Evaluated
              </span>
            </div>
          </div>
          <p className="text-xs text-amber-100/90">
            Monthly incentive rankings based on institutional delivery escorts (JSY), complete infant vaccinations, early ANC registrations, and NCD population screenings.
          </p>
        </div>

        {/* Current User Rank Pill */}
        <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl border border-amber-400/30 flex items-center gap-3 shrink-0">
          <div className="text-3xl">🥉</div>
          <div>
            <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">Your PHC Standing</span>
            <div className="text-base font-black text-white">
              Rank #{currentUserData.rank} • ₹{currentUserData.totalIncentive.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-300 font-bold">⭐ Top 10% Star Performer</span>
          </div>
        </div>
      </div>

      {/* 2. Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Rank 2 (Silver) */}
        <div className="p-5 bg-gradient-to-b from-slate-100 to-white border-2 border-slate-300 rounded-3xl space-y-3 relative overflow-hidden shadow-xs order-2 md:order-1">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-500 font-mono">#2</span>
            <span className="text-3xl">🥈</span>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm">{ASHA_PHC_ROSTER[1].name}</h4>
            <span className="text-xs text-slate-500">{ASHA_PHC_ROSTER[1].village} • {ASHA_PHC_ROSTER[1].ashaId}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Monthly Incentive:</span>
            <strong className="text-base font-black text-slate-900">₹{ASHA_PHC_ROSTER[1].totalIncentive.toLocaleString('en-IN')}</strong>
          </div>
          <div className="text-[11px] text-slate-600 flex justify-between font-medium">
            <span>JSY Deliveries: <strong>{ASHA_PHC_ROSTER[1].jsyDeliveries}</strong></span>
            <span>Vaccines: <strong>{ASHA_PHC_ROSTER[1].immunizations}</strong></span>
          </div>
        </div>

        {/* Rank 1 (Gold - Elevated) */}
        <div className="p-6 bg-gradient-to-b from-amber-50 to-white border-2 border-amber-400 rounded-3xl space-y-3 relative overflow-hidden shadow-md order-1 md:order-2 md:-translate-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-amber-700 font-mono">#1</span>
              <span className="text-xs bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                PHC Champion
              </span>
            </div>
            <span className="text-4xl">🥇</span>
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base">{ASHA_PHC_ROSTER[0].name}</h4>
            <span className="text-xs text-amber-900 font-semibold">{ASHA_PHC_ROSTER[0].village} • {ASHA_PHC_ROSTER[0].ashaId}</span>
          </div>
          <div className="p-3 bg-amber-100/70 rounded-2xl border border-amber-300 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950">Total Verified Earnings:</span>
            <strong className="text-lg font-black text-amber-950">₹{ASHA_PHC_ROSTER[0].totalIncentive.toLocaleString('en-IN')}</strong>
          </div>
          <div className="text-xs text-slate-700 flex justify-between font-bold pt-1">
            <span>JSY Deliveries: <strong className="text-emerald-800">{ASHA_PHC_ROSTER[0].jsyDeliveries}</strong></span>
            <span>Vaccines: <strong className="text-teal-800">{ASHA_PHC_ROSTER[0].immunizations}</strong></span>
            <span>NCDs: <strong className="text-indigo-800">{ASHA_PHC_ROSTER[0].ncdScreenings}</strong></span>
          </div>
        </div>

        {/* Rank 3 (Bronze - You) */}
        <div className="p-5 bg-gradient-to-b from-orange-50 to-white border-2 border-orange-300 rounded-3xl space-y-3 relative overflow-hidden shadow-xs order-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-orange-700 font-mono">#3</span>
              <span className="text-xs bg-orange-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                You
              </span>
            </div>
            <span className="text-3xl">🥉</span>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm">{currentUserData.name}</h4>
            <span className="text-xs text-orange-900 font-semibold">{currentUserData.village} • {currentUserData.ashaId}</span>
          </div>
          <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 flex items-center justify-between">
            <span className="text-xs font-bold text-orange-950">Monthly Incentive:</span>
            <strong className="text-base font-black text-orange-950">₹{currentUserData.totalIncentive.toLocaleString('en-IN')}</strong>
          </div>
          <div className="text-[11px] text-slate-600 flex justify-between font-medium">
            <span>JSY Deliveries: <strong>{currentUserData.jsyDeliveries}</strong></span>
            <span>Vaccines: <strong>{currentUserData.immunizations}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. Search & Sub-Centre Filter Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ASHA worker by name, ASHA ID, or village..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <Building className="w-4 h-4 text-teal-700" />
            <span>Sub-Centre:</span>
          </div>
          <select
            value={selectedSubCentre}
            onChange={(e) => setSelectedSubCentre(e.target.value)}
            className="input-field text-xs py-1.5 font-bold"
          >
            <option value="ALL">All Sub-Centres (PHC Block)</option>
            <option value="Rampur Sub-Centre">Rampur Sub-Centre</option>
            <option value="Shivpur Sub-Centre">Shivpur Sub-Centre</option>
            <option value="Chiraigaon Sub-Centre">Chiraigaon Sub-Centre</option>
            <option value="Babarpur Sub-Centre">Babarpur Sub-Centre</option>
            <option value="Kashi Sub-Centre">Kashi Sub-Centre</option>
          </select>
        </div>
      </div>

      {/* 4. Complete 25-ASHA PHC Master Ranking Table */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              Complete PHC Block ASHA Merit & Incentive Ledger (25 Workers)
            </h4>
            <p className="text-[11px] text-slate-500">
              Verified monthly NHM earnings evaluated by PHC Medical Officer
            </p>
          </div>

          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-xl font-mono font-bold border border-slate-200">
            Block Avg: ₹{averageIncentive.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 text-center">Rank</th>
                <th className="p-3.5">ASHA Worker / ID</th>
                <th className="p-3.5">Village & Sub-Centre</th>
                <th className="p-3.5 text-center">JSY Deliveries</th>
                <th className="p-3.5 text-center">1-Yr Vaccines</th>
                <th className="p-3.5 text-center">Early ANC</th>
                <th className="p-3.5 text-center">NCD Screened</th>
                <th className="p-3.5 text-right">Total Incentive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRoster.map((asha) => {
                const isUser = asha.isCurrentUser;
                return (
                  <tr
                    key={asha.ashaId}
                    className={`transition ${isUser ? 'bg-amber-50/90 font-bold hover:bg-amber-100/90' : 'hover:bg-slate-50'}`}
                  >
                    <td className="p-3.5 text-center">
                      {asha.rank === 1 ? (
                        <span className="text-base" title="Rank 1 - Gold Medalist">🥇</span>
                      ) : asha.rank === 2 ? (
                        <span className="text-base" title="Rank 2 - Silver Medalist">🥈</span>
                      ) : asha.rank === 3 ? (
                        <span className="text-base" title="Rank 3 - Bronze Medalist">🥉</span>
                      ) : (
                        <span className="font-mono font-extrabold text-slate-600">#{asha.rank}</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">{asha.name}</span>
                        {isUser && (
                          <span className="text-[10px] bg-amber-700 text-white font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{asha.ashaId}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">{asha.village}</div>
                      <span className="text-[10px] text-slate-400">{asha.subCentre}</span>
                    </td>

                    <td className="p-3.5 text-center font-bold text-slate-800">
                      {asha.jsyDeliveries}
                    </td>

                    <td className="p-3.5 text-center font-bold text-teal-800">
                      {asha.immunizations}
                    </td>

                    <td className="p-3.5 text-center font-bold text-rose-800">
                      {asha.ancRegistrations}
                    </td>

                    <td className="p-3.5 text-center font-bold text-indigo-800">
                      {asha.ncdScreenings}
                    </td>

                    <td className="p-3.5 text-right">
                      <span className="font-black text-sm text-emerald-950 font-mono">
                        ₹{asha.totalIncentive.toLocaleString('en-IN')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
