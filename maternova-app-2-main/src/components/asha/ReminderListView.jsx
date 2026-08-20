import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Badge } from '../common/Badge';
import {
  Bell,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Heart,
  Baby,
  User,
  ArrowRight,
  Clock
} from 'lucide-react';

export const ReminderListView = ({ onSelectPatient }) => {
  const { reminders } = useAppData();

  const categoryIcons = {
    PREGNANT_WOMAN: Heart,
    INFANT: Baby,
    ELDERLY: User
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-700" />
            Frontline ASHA Daily Action & Reminder Queue
          </h3>
          <p className="text-xs text-slate-500">
            Rule-generated task list for home visits, high-risk follow-ups, and immunization sessions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reminders.map((rem) => {
          const CategoryIcon = categoryIcons[rem.category] || Heart;
          const isHighPriority = rem.priority === 'HIGH';

          return (
            <div
              key={rem.id}
              onClick={() => onSelectPatient && onSelectPatient(rem.patientId)}
              className={`p-4 rounded-xl border transition cursor-pointer hover:shadow-md ${isHighPriority ? 'bg-rose-50/40 border-rose-200' : 'bg-white border-slate-200'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${isHighPriority ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                    <CategoryIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 hover:text-teal-700">
                      {rem.patientName}
                    </h4>
                    <span className="text-[11px] text-slate-500">Due: {rem.dueDate}</span>
                  </div>
                </div>

                <Badge variant={isHighPriority ? 'rose' : 'amber'} size="sm">
                  {rem.priority} PRIORITY
                </Badge>
              </div>

              <div className="mt-2.5">
                <div className="text-xs font-semibold text-slate-800">{rem.title}</div>
                <p className="text-xs text-slate-600 mt-0.5">{rem.actionText}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-xs text-teal-700 font-medium">
                <span>Assigned: {rem.assignedAsha}</span>
                <span className="flex items-center gap-1 hover:underline">
                  Open Patient Profile <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
