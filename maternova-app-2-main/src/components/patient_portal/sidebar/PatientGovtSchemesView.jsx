import React, { useState } from 'react';
import { Badge } from '../../common/Badge';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  FileText,
  DollarSign,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const PatientGovtSchemesView = ({ patient }) => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  const isPregnant = patient?.category === 'PREGNANT_WOMAN';
  const isInfant = patient?.category === 'INFANT';
  const isElderly = patient?.category === 'ELDERLY';

  const SCHEMES = [
    {
      id: 'PMMVY',
      name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      hindiName: 'प्रधानमंत्री मातृ वंदना योजना',
      cashBenefit: '₹5,000 Direct Bank Transfer (DBT)',
      eligibilityStatus: isPregnant ? 'ELIGIBLE_AND_ACTIVE' : 'NOT_APPLICABLE',
      statusText: isPregnant ? 'Active • 2nd Installment Due on Next ANC' : 'Applicable for Pregnant Mothers',
      description: 'Maternity cash assistance directly credited into mother’s bank account to support adequate nutrition during pregnancy and childbirth.',
      howToClaim: 'Submit Aadhaar card and MCP card with 2 recorded ANC checkups to your ASHA worker.',
      documents: ['Aadhaar Card of Mother & Husband', 'MCP Card (Mamta Card)', 'Aadhaar-linked Bank Passbook']
    },
    {
      id: 'JSY',
      name: 'Janani Suraksha Yojana (JSY)',
      hindiName: 'जननी सुरक्षा योजना',
      cashBenefit: '₹1,400 Cash Assistance (Rural)',
      eligibilityStatus: isPregnant ? 'ELIGIBLE_FOR_DELIVERY' : 'NOT_APPLICABLE',
      statusText: isPregnant ? 'Disbursed at Hospital Discharge' : 'For Institutional Deliveries',
      description: 'Financial assistance provided immediately upon delivering your baby in a government hospital or accredited healthcare centre.',
      howToClaim: 'Deliver in the Primary Health Centre (PHC) or District Hospital with ASHA escort.',
      documents: ['Hospital Delivery Discharge Card', 'MCP Card', 'Bank Account Details']
    },
    {
      id: 'JSSK',
      name: 'Janani Shishu Suraksha Karyakram (JSSK)',
      hindiName: 'जननी शिशु सुरक्षा कार्यक्रम',
      cashBenefit: '100% Free Treatment & Delivery (Zero Cost)',
      eligibilityStatus: (isPregnant || isInfant) ? 'ACTIVE_BENEFICIARY' : 'AVAILABLE_FOR_INFANTS',
      statusText: '100% Free Medicines, Diagnostics, C-Section & Transport',
      description: 'Entitles all pregnant mothers and sick newborns (up to 1 year) to completely free delivery, free laboratory tests, free blood, and free emergency ambulance transportation.',
      howToClaim: 'Show your MCP card at any government hospital / PHC.',
      documents: ['MCP Card / Ayushman Bharat Pass']
    },
    {
      id: 'PMSMA',
      name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
      hindiName: 'प्रधानमंत्री सुरक्षित मातृत्व अभियान',
      cashBenefit: 'Free Specialist Doctor Checkup on 9th of Every Month',
      eligibilityStatus: isPregnant ? 'UPCOMING_SESSION' : 'NOT_APPLICABLE',
      statusText: isPregnant ? 'Next Session: 9th of Next Month at PHC' : 'For Pregnant Women',
      description: 'Free comprehensive checkups and ultrasound screening by specialist gynaecologists on the 9th day of every month at the PHC.',
      howToClaim: 'Visit the PHC on the 9th of the month along with your ASHA worker.',
      documents: ['MCP Card', 'Previous ANC Reports']
    },
    {
      id: 'PMJAY',
      name: 'Ayushman Bharat - PM-JAY (Golden Health Card)',
      hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
      cashBenefit: '₹5,00,000 Annual Health Insurance Cover per Family',
      eligibilityStatus: 'VERIFIED_ACTIVE',
      statusText: 'Family Card Active • Free Hospitalization across India',
      description: 'Cashless secondary and tertiary hospitalization across all government and empanelled private hospitals in India.',
      howToClaim: 'Show your Ayushman Bharat ABHA card at hospital helpdesk.',
      documents: ['Ration Card / PMJAY Letter', 'Aadhaar Card']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-700/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-700/50 flex items-center justify-center text-xl shadow-xs">
              🏛️
            </div>
            <div>
              <h2 className="text-lg font-bold">Government Health & Maternity Welfare Schemes</h2>
              <span className="text-xs text-teal-200">
                Direct Benefit Transfer (DBT) • Free Healthcare Entitlements • Ayushman Bharat
              </span>
            </div>
          </div>
          <p className="text-xs text-teal-100/90">
            Check your cash benefit entitlements, application verification status, and required documents under national health programs.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-xs">
          <span className="text-teal-200 block text-[10px] uppercase font-bold">Assistance Support</span>
          <span className="text-sm font-black text-white">ASHA Shanti Devi (Help)</span>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHEMES.map((scheme) => (
          <div
            key={scheme.id}
            className="p-5 bg-white border-2 border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-teal-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{scheme.name}</h4>
                  <span className="text-xs font-semibold text-teal-800 block mt-0.5">{scheme.hindiName}</span>
                </div>
                <Badge
                  variant={
                    scheme.eligibilityStatus.includes('ACTIVE') || scheme.eligibilityStatus.includes('ELIGIBLE')
                      ? 'emerald'
                      : 'slate'
                  }
                  size="sm"
                >
                  {scheme.eligibilityStatus.replace(/_/g, ' ')}
                </Badge>
              </div>

              {/* Cash Benefit Pill */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Your Cash & Service Benefit:</span>
                  <strong className="text-sm font-black text-emerald-950">{scheme.cashBenefit}</strong>
                </div>
                <span className="text-xs bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-lg">
                  Direct Transfer
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {scheme.description}
              </p>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <strong className="text-slate-800 block">How to Avail:</strong>
                <p className="text-slate-600 text-[11px]">{scheme.howToClaim}</p>
              </div>

              <div>
                <strong className="text-slate-700 text-[11px] block mb-1">Required Documents:</strong>
                <div className="flex flex-wrap gap-1">
                  {scheme.documents.map((doc, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px] text-teal-800 font-bold">Status: {scheme.statusText}</span>
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> NHM Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
