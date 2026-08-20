import React, { useState } from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { useLanguage } from '../../../context/LanguageContext';
import { calculateAgeDetails } from '../../../services/rules/vaccinationRules';
import { Badge } from '../../common/Badge';
import {
  Bell,
  Phone,
  PhoneCall,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Heart,
  Baby,
  User,
  Search,
  Filter,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Send,
  X
} from 'lucide-react';

export const NotificationsScheduleView = ({ onSelectPatient }) => {
  const { patients, vaccinations, ancVisits, vitals } = useAppData();
  const { t } = useLanguage();

  const [selectedCohort, setSelectedCohort] = useState('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Call simulator modal state
  const [callingPatient, setCallingPatient] = useState(null);
  const [callStatus, setCallStatus] = useState('CONNECTING'); // 'CONNECTING' | 'IN_CALL' | 'COMPLETED'
  const [callNotes, setCallNotes] = useState('');
  const [callHistory, setCallHistory] = useState([
    {
      id: 'CALL-01',
      patientName: 'Sunita Devi',
      phone: '+91 98765 43210',
      reason: '3rd ANC Checkup & IFA Refill Reminder',
      outcome: 'Confirmed Sub-Centre Visit tomorrow',
      timestamp: 'Today, 10:30 AM'
    },
    {
      id: 'CALL-02',
      patientName: 'Kavita Patel (Guardian of Aarav)',
      phone: '+91 91234 56789',
      reason: '14th Week Pentavalent & OPV-3 Vaccine Due',
      outcome: 'Will bring infant to Anganwadi on Wednesday',
      timestamp: 'Yesterday, 04:15 PM'
    }
  ]);

  // Comprehensive Treatment Schedule & Notification Generator
  const generateScheduleItems = () => {
    const items = [];

    patients.forEach((patient) => {
      const isPregnant = patient.category === 'PREGNANT_WOMAN';
      const isInfant = patient.category === 'INFANT';
      const isElderly = patient.category === 'ELDERLY';

      // 1. Pregnant Lady Treatment Milestones
      if (isPregnant) {
        const weeks = patient.pregnancyDetails?.gestationalWeeks || 28;
        const edd = patient.pregnancyDetails?.edd || '2026-10-22';
        const isHighRisk = patient.pregnancyDetails?.riskLevel === 'HIGH_RISK';

        // Checkup deadline
        items.push({
          id: `SCH-ANC-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          phone: patient.phone || '+91 98765 43210',
          guardianName: patient.guardianName,
          guardianRelation: patient.guardianRelation,
          category: 'PREGNANT_WOMAN',
          treatmentTitle: weeks >= 28 ? '4th ANC Prenatal Checkup & Hemoglobin Screening' : '3rd ANC Routine Checkup',
          deadlineDate: '2026-08-24',
          deadlineDaysLeft: 4,
          urgency: isHighRisk ? 'OVERDUE' : 'DUE_THIS_WEEK',
          urgencyLabel: isHighRisk ? 'High-Risk Overdue' : 'Due in 4 Days',
          actionRequired: 'Clinical checkup at PHC/Sub-Centre, BP measurement, urine albumin, and 30-day IFA refill.',
          assignedDoctor: 'Dr. Alok Verma (PHC In-Charge)'
        });

        // Tetanus / Calcium Deadline
        items.push({
          id: `SCH-TT-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          phone: patient.phone || '+91 98765 43210',
          guardianName: patient.guardianName,
          guardianRelation: patient.guardianRelation,
          category: 'PREGNANT_WOMAN',
          treatmentTitle: 'TT-2 / Td Booster Dose & Calcium Refill',
          deadlineDate: '2026-08-28',
          deadlineDaysLeft: 8,
          urgency: 'UPCOMING',
          urgencyLabel: 'Upcoming in 8 Days',
          actionRequired: 'Administer 0.5ml Td injection intramusculary and supply 60 Calcium (500mg) tablets.',
          assignedDoctor: 'ANM Rekha Singh'
        });
      }

      // 2. Infant Immunization & Growth Milestones
      if (isInfant) {
        const ageDetails = calculateAgeDetails(patient.dob);
        const infantAgeFormatted = ageDetails.months > 0
          ? `${ageDetails.months} Months (${ageDetails.weeks} Wks)`
          : `${ageDetails.weeks} Weeks`;

        items.push({
          id: `SCH-VAC-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          phone: patient.phone || '+91 91234 56789',
          guardianName: patient.guardianName,
          guardianRelation: patient.guardianRelation,
          category: 'INFANT',
          treatmentTitle: '14th Week Pentavalent-3, OPV-3 & Rotavirus-3 Vaccine',
          deadlineDate: '2026-08-21',
          deadlineDaysLeft: 1,
          urgency: 'DUE_TODAY',
          urgencyLabel: 'Due Today (VHSND Camp)',
          actionRequired: `Infant age: ${infantAgeFormatted}. Administer Pentavalent-3, OPV drops, and record growth weight in MCP card.`,
          assignedDoctor: 'Anganwadi Site Session'
        });

        items.push({
          id: `SCH-GROWTH-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          phone: patient.phone || '+91 91234 56789',
          guardianName: patient.guardianName,
          guardianRelation: patient.guardianRelation,
          category: 'INFANT',
          treatmentTitle: 'Monthly Growth Monitoring & Weaning Dietary Assessment',
          deadlineDate: '2026-08-27',
          deadlineDaysLeft: 7,
          urgency: 'UPCOMING',
          urgencyLabel: 'Due next week',
          actionRequired: 'Weigh infant, check for MAM/SAM signs using Salter scale, and counsel mother on thick Moong Khichdi with ghee.',
          assignedDoctor: 'ASHA Home Visit'
        });
      }

      // 3. Elderly Chronic Care & NCD Milestones
      if (isElderly) {
        items.push({
          id: `SCH-NCD-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          phone: patient.phone || '+91 94567 89012',
          guardianName: patient.guardianName,
          guardianRelation: patient.guardianRelation,
          category: 'ELDERLY',
          treatmentTitle: 'Monthly Blood Pressure & Fasting Blood Sugar Monitoring',
          deadlineDate: '2026-08-19',
          deadlineDaysLeft: -1,
          urgency: 'OVERDUE',
          urgencyLabel: 'Overdue by 1 Day',
          actionRequired: 'Measure BP and fasting capillary blood glucose using digital strip. Check Amlodipine 5mg medication adherence.',
          assignedDoctor: 'Sub-Centre NCD Clinic'
        });

        items.push({
          id: `SCH-MED-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          phone: patient.phone || '+91 94567 89012',
          guardianName: patient.guardianName,
          guardianRelation: patient.guardianRelation,
          category: 'ELDERLY',
          treatmentTitle: 'Hypertension & Diabetes Monthly Drug Refill',
          deadlineDate: '2026-08-26',
          deadlineDaysLeft: 6,
          urgency: 'DUE_THIS_WEEK',
          urgencyLabel: 'Due in 6 Days',
          actionRequired: 'Collect prescription refill from PHC pharmacy and deliver 30-day supply to patient home.',
          assignedDoctor: 'PHC Medical Officer'
        });
      }
    });

    return items;
  };

  const scheduleList = generateScheduleItems();

  const filteredSchedule = scheduleList.filter((item) => {
    if (selectedCohort !== 'ALL' && item.category !== selectedCohort) return false;
    if (selectedUrgency !== 'ALL' && item.urgency !== selectedUrgency) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.patientName.toLowerCase().includes(q) ||
        item.treatmentTitle.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.actionRequired.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const overdueCount = scheduleList.filter((i) => i.urgency === 'OVERDUE').length;
  const dueTodayCount = scheduleList.filter((i) => i.urgency === 'DUE_TODAY').length;

  const startCall = (patientItem) => {
    setCallingPatient(patientItem);
    setCallStatus('CONNECTING');
    setCallNotes('');

    // Simulate call pick up after 1.5s
    setTimeout(() => {
      setCallStatus('IN_CALL');
    }, 1500);
  };

  const completeCall = (outcomeText) => {
    if (!callingPatient) return;
    const newEntry = {
      id: `CALL-${Date.now().toString().slice(-4)}`,
      patientName: callingPatient.patientName,
      phone: callingPatient.phone,
      reason: callingPatient.treatmentTitle,
      outcome: outcomeText || callNotes || 'Call completed and reminder delivered',
      timestamp: 'Just now'
    };
    setCallHistory([newEntry, ...callHistory]);
    setCallingPatient(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-700/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-700/50 flex items-center justify-center text-xl shadow-xs">
              🔔
            </div>
            <div>
              <h2 className="text-lg font-bold">Treatment Schedule & Notification Center</h2>
              <span className="text-xs text-teal-200">
                Direct Beneficiary Calling • Checkup Deadlines • Maternal, Child & Elderly Trackers
              </span>
            </div>
          </div>
          <p className="text-xs text-teal-100/90">
            Monitor critical treatment deadlines for pregnant women, infants, and elderly citizens. Call patients with 1-click to prevent dropouts and missed doses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-rose-500/20 border border-rose-400/40 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-rose-200 text-xs">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>
              <strong>{overdueCount} Overdue</strong> • {dueTodayCount} Due Today
            </span>
          </div>
        </div>
      </div>

      {/* 2. KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-rose-800">
            <span className="text-xs font-bold uppercase tracking-wider">Overdue Deadlines</span>
            <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-rose-950">{overdueCount} Critical</div>
          <p className="text-[11px] text-rose-700 font-medium">Immediate call required</p>
        </div>

        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-bold uppercase tracking-wider">Due Today</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-amber-950">{dueTodayCount} Scheduled</div>
          <p className="text-[11px] text-amber-800 font-medium">VHSND / Sub-Centre session</p>
        </div>

        <div className="p-4 bg-teal-50 border-2 border-teal-300 rounded-2xl space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-teal-800">
            <span className="text-xs font-bold uppercase tracking-wider">Total Active Schedules</span>
            <Calendar className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-black text-teal-950">{scheduleList.length} Milestones</div>
          <p className="text-[11px] text-teal-700 font-medium">Pregnant, Infant & Elderly</p>
        </div>

        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">Calls Completed</span>
            <PhoneCall className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950">{callHistory.length} Logged</div>
          <p className="text-[11px] text-emerald-800 font-medium">Reminders delivered</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schedule by patient name, treatment, or phone number..."
              className="input-field pl-10 text-xs py-2"
            />
          </div>

          {/* Cohort Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'All Cohorts' },
              { id: 'PREGNANT_WOMAN', label: '🤰 Pregnant Ladies' },
              { id: 'INFANT', label: '👶 Infants (0-5 Yrs)' },
              { id: 'ELDERLY', label: '👴 Elderly Citizens' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCohort(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCohort === tab.id ? 'bg-teal-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-600">Deadline Urgency:</span>
          {[
            { id: 'ALL', label: 'All Urgencies' },
            { id: 'OVERDUE', label: '🔴 Overdue Deadlines' },
            { id: 'DUE_TODAY', label: '🟡 Due Today' },
            { id: 'DUE_THIS_WEEK', label: '🟠 Due This Week' },
            { id: 'UPCOMING', label: '🟢 Upcoming' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedUrgency(pill.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${selectedUrgency === pill.id ? 'bg-teal-100 text-teal-950 border-teal-300 font-bold' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Treatment Schedule Cards List */}
      <div className="space-y-3">
        {filteredSchedule.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-xs text-slate-500">
            No treatment schedule milestones match your search filters.
          </div>
        ) : (
          filteredSchedule.map((item) => {
            const isOverdue = item.urgency === 'OVERDUE';
            const isDueToday = item.urgency === 'DUE_TODAY';

            return (
              <div
                key={item.id}
                className={`p-5 bg-white border-2 rounded-3xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:shadow-md ${isOverdue ? 'border-rose-300 bg-rose-50/20' : isDueToday ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'}`}
              >
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className={`p-1.5 rounded-xl font-bold text-sm ${item.category === 'PREGNANT_WOMAN' ? 'bg-rose-100 text-rose-700' : item.category === 'INFANT' ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {item.category === 'PREGNANT_WOMAN' ? '🤰' : item.category === 'INFANT' ? '👶' : '👴'}
                    </div>

                    <h4
                      onClick={() => onSelectPatient && onSelectPatient(item.patientId)}
                      className="font-black text-slate-900 text-sm hover:text-teal-700 cursor-pointer"
                    >
                      {item.patientName}
                    </h4>

                    <span className="text-[11px] font-mono text-slate-400">({item.patientId})</span>

                    <Badge
                      variant={isOverdue ? 'rose' : isDueToday ? 'amber' : 'teal'}
                      size="sm"
                    >
                      {item.urgencyLabel}
                    </Badge>
                  </div>

                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{item.treatmentTitle}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-rose-700 font-mono">Deadline: {item.deadlineDate}</span>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    <strong>Action Required:</strong> {item.actionRequired}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span><strong>Guardian / Contact:</strong> {item.guardianName} ({item.guardianRelation})</span>
                    <span>•</span>
                    <span className="font-mono text-slate-700 font-bold">{item.phone}</span>
                    <span>•</span>
                    <span><strong>Provider:</strong> {item.assignedDoctor}</span>
                  </div>
                </div>

                {/* Right Action: Call & Alert Trigger */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => startCall(item)}
                    className="btn-primary py-2.5 px-4 text-xs flex items-center gap-2 shadow-md hover:scale-105 transition"
                    title="Initiate direct phone call to patient/guardian"
                  >
                    <PhoneCall className="w-4 h-4 text-white animate-bounce" />
                    <span>Call Beneficiary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`WhatsApp & SMS Reminder sent to ${item.patientName} (${item.phone}):\n\n"Namaste! This is ASHA worker reminder for ${item.treatmentTitle} on ${item.deadlineDate}. Please visit the Sub-Centre."`);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>Send SMS/WA Alert</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Call History & Verification Log */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-teal-700" /> Recent Beneficiary Call Logs & Notes
          </h4>
          <span className="text-[11px] text-slate-400">Total {callHistory.length} calls logged today</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {callHistory.map((call) => (
            <div key={call.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>{call.patientName}</span>
                  <span className="font-mono text-slate-400 text-[11px]">({call.phone})</span>
                  <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Connected
                  </span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  <strong>Outcome:</strong> {call.outcome}
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-medium shrink-0">{call.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. CALL SIMULATOR MODAL */}
      {/* ========================================================================= */}
      {callingPatient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border-2 border-teal-500 space-y-5">
            {/* Top caller info */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-teal-100 border-2 border-teal-300 flex items-center justify-center mx-auto text-2xl shadow-md animate-pulse">
                📞
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800 block">
                  {callStatus === 'CONNECTING' ? 'Calling Field Beneficiary...' : 'Connected (In-Call)'}
                </span>
                <h3 className="text-lg font-black text-slate-900">{callingPatient.patientName}</h3>
                <span className="font-mono text-xs text-slate-500 font-bold">{callingPatient.phone}</span>
              </div>
            </div>

            {/* Treatment Context Box */}
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                Call Purpose / Scheduled Treatment:
              </span>
              <strong className="text-slate-900 block">{callingPatient.treatmentTitle}</strong>
              <p className="text-slate-600 text-[11px]">Deadline: <span className="font-bold text-rose-700">{callingPatient.deadlineDate}</span></p>
            </div>

            {/* Call Outcome Quick Selection Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Log Call Outcome & Notes:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => completeCall('Confirmed Sub-Centre visit as scheduled')}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl border border-emerald-200 transition text-left"
                >
                  ✓ Confirmed Visit
                </button>

                <button
                  type="button"
                  onClick={() => completeCall('Requested home visit by ASHA')}
                  className="p-2.5 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold rounded-xl border border-teal-200 transition text-left"
                >
                  🏠 Request Home Visit
                </button>

                <button
                  type="button"
                  onClick={() => completeCall('Number busy / Will call back evening')}
                  className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl border border-amber-200 transition text-left"
                >
                  ⏳ Busy / Call Later
                </button>

                <button
                  type="button"
                  onClick={() => completeCall('Patient out of village / Traveling')}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition text-left"
                >
                  📍 Out of Village
                </button>
              </div>

              <input
                type="text"
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Or write custom call notes here..."
                className="input-field text-xs mt-2"
              />
            </div>

            {/* End Call Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <a
                href={`tel:${callingPatient.phone}`}
                className="text-xs text-teal-700 font-bold underline flex items-center gap-1"
              >
                Open Native Phone App 📱
              </a>

              <button
                type="button"
                onClick={() => completeCall('Call finished')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <X className="w-4 h-4" /> End & Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
