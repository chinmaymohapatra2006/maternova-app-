import React, { useState } from 'react';
import { Badge } from '../../common/Badge';
import {
  Bell,
  Calendar,
  Phone,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  ShieldAlert,
  Heart,
  Baby,
  User,
  ExternalLink
} from 'lucide-react';

export const PatientPriorNotificationsView = ({ patient }) => {
  const isPregnant = patient?.category === 'PREGNANT_WOMAN';
  const isInfant = patient?.category === 'INFANT';
  const isElderly = patient?.category === 'ELDERLY';

  const [notificationList, setNotificationList] = useState([
    {
      id: 'NOTIF-01',
      title: isPregnant
        ? '4th ANC Prenatal Checkup Scheduled'
        : isInfant
          ? '14th Week Pentavalent & OPV-3 Vaccine Due'
          : 'Monthly BP & Blood Sugar Screening Due',
      sender: 'ASHA Shanti Devi',
      role: 'Frontline Field Worker',
      date: 'Today, 09:30 AM',
      type: 'SCHEDULED_CHECKUP',
      urgency: 'HIGH',
      message: isPregnant
        ? 'Namaste Sunita ji! Your 4th ANC checkup is scheduled on 24 Aug at Rampur Sub-Centre. Please bring your MCP card for hemoglobin testing and IFA refill.'
        : isInfant
          ? 'Namaste! Aarav is due for 14th week immunization at the Village Anganwadi session site on Wednesday. Please bring the MCP card.'
          : 'Namaste Ramcharan ji! Your monthly Blood Pressure and Sugar checkup is scheduled tomorrow at the Sub-Centre.',
      actionText: 'Confirm Sub-Centre Visit',
      status: 'UNREAD'
    },
    {
      id: 'NOTIF-02',
      title: 'Doctor Prescription & Advice Updated',
      sender: 'Dr. Alok Verma',
      role: 'Medical Officer, PHC Varanasi',
      date: 'Yesterday, 04:15 PM',
      type: 'CLINICAL_ORDER',
      urgency: 'MEDIUM',
      message: isPregnant
        ? 'Prescribed 30-day Iron Folic Acid (IFA) tablets and Calcium supplements. Ensure daily intake after meals with lemon water or amla.'
        : isInfant
          ? 'Ensure complementary feeding with thick yellow moong khichdi with 1 tsp ghee alongside breastfeeding.'
          : 'Maintain daily morning walking, strict low salt intake (<1 tsp/day), and take Amlodipine 5mg on time.',
      actionText: 'View Prescription Notes',
      status: 'READ'
    },
    {
      id: 'NOTIF-03',
      title: 'PMMVY Direct Benefit Transfer Update',
      sender: 'National Health Mission (NHM)',
      role: 'Government Scheme Portal',
      date: '18 Aug 2026',
      type: 'GOVT_SCHEME',
      urgency: 'NORMAL',
      message: 'Your 1st installment of ₹3,000 has been successfully credited via Aadhaar DBT into your bank account.',
      actionText: 'Check Bank Account',
      status: 'READ'
    }
  ]);

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, status: 'READ' })));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-700/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-700/50 flex items-center justify-center text-xl shadow-xs">
              🔔
            </div>
            <div>
              <h2 className="text-lg font-bold">Prior Notifications & Health Reminders</h2>
              <span className="text-xs text-teal-200">
                Official Checkup Notices, Vaccine Schedules & Doctor Prescriptions
              </span>
            </div>
          </div>
          <p className="text-xs text-teal-100/90">
            View all prior SMS, WhatsApp alerts, and checkup reminders sent by your registered ASHA worker and Primary Health Centre.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="btn-primary-white text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-md shrink-0"
        >
          <CheckCircle2 className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl shadow-xs animate-pulse">
            🚨
          </div>
          <div>
            <h4 className="font-extrabold text-rose-950 text-sm">24x7 Emergency Medical Support</h4>
            <span className="text-xs text-rose-800 font-medium">Free Government Ambulance & Doctor Helpline</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:108"
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Call 108 (Ambulance)
          </a>
          <a
            href="tel:102"
            className="px-3 py-2 bg-white hover:bg-slate-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" /> Call 102 (Mother-Child)
          </a>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notificationList.map((notif) => {
          const isHigh = notif.urgency === 'HIGH';
          const isUnread = notif.status === 'UNREAD';
          return (
            <div
              key={notif.id}
              className={`p-5 bg-white border-2 rounded-3xl space-y-3 shadow-xs transition hover:shadow-md ${isUnread ? 'border-teal-400 bg-teal-50/20' : 'border-slate-200'}`}
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl text-sm ${isHigh ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'}`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">{notif.title}</h4>
                      {isUnread && (
                        <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-extrabold">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      From: <strong>{notif.sender}</strong> ({notif.role})
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-mono shrink-0">{notif.date}</span>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed font-medium">
                "{notif.message}"
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
                  Delivered via SMS & WhatsApp
                </span>

                <button
                  type="button"
                  onClick={() => alert(`Notice action acknowledged: ${notif.title}`)}
                  className="text-xs text-teal-800 hover:text-teal-950 font-extrabold underline"
                >
                  {notif.actionText} →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
