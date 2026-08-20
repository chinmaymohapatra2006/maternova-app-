import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Badge } from '../../common/Badge';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  FileText,
  DollarSign,
  Heart,
  Baby,
  Users,
  AlertCircle
} from 'lucide-react';

export const GovernmentSchemesView = () => {
  const { t } = useLanguage();
  const [selectedCohort, setSelectedCohort] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const SCHEMES = [
    {
      id: 'PMMVY',
      name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      hindiName: 'प्रधानमंत्री मातृ वंदना योजना',
      category: 'PREGNANT_WOMAN',
      benefitAmount: '₹5,000 (3 Installments)',
      target: 'Pregnant Women & Lactating Mothers (First Living Child)',
      description: 'Maternity cash incentive disbursed directly into the beneficiary bank account (DBT) to compensate for wage loss and promote institutional nutrition.',
      eligibility: ['Age ≥ 19 Years', 'Mother having first living child', 'Registered within 150 days of LMP'],
      ashaIncentive: '₹100 per registered & verified beneficiary',
      documentsRequired: ['Aadhaar Card of Mother & Husband', 'MCP Card with ANC dates', 'Bank Account Passbook (Aadhaar linked)'],
      status: 'ACTIVE'
    },
    {
      id: 'JSY',
      name: 'Janani Suraksha Yojana (JSY)',
      hindiName: 'जननी सुरक्षा योजना',
      category: 'PREGNANT_WOMAN',
      benefitAmount: '₹1,400 (Rural) / ₹1,000 (Urban)',
      target: 'Mothers opting for Institutional Delivery in PHC / CHC / District Hospital',
      description: 'Direct cash assistance to reduce maternal and neonatal mortality by promoting institutional delivery among poor pregnant women.',
      eligibility: ['All pregnant women delivering in government health facilities or accredited private hospitals'],
      ashaIncentive: '₹600 for escorting mother and staying during institutional delivery in rural areas',
      documentsRequired: ['MCP Card with 4 ANC stamps', 'Discharge Slip from Hospital', 'Aadhaar Card & Bank Details'],
      status: 'ACTIVE'
    },
    {
      id: 'JSSK',
      name: 'Janani Shishu Suraksha Karyakram (JSSK)',
      hindiName: 'जननी शिशु सुरक्षा कार्यक्रम',
      category: 'PREGNANT_WOMAN',
      benefitAmount: '100% Free Treatment (Zero Out-of-Pocket Expense)',
      target: 'Pregnant Women and Sick Newborns (up to 30 days after birth)',
      description: 'Guarantees free cashless delivery including C-Section, free medicines, consumables, diagnostics, free blood transfusion, and free pick-up and drop transport.',
      eligibility: ['All pregnant women seeking care in public health institutions'],
      ashaIncentive: 'Transport arrangement coordination assistance',
      documentsRequired: ['Hospital registration slip & MCP card'],
      status: 'ACTIVE'
    },
    {
      id: 'PMSMA',
      name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
      hindiName: 'प्रधानमंत्री सुरक्षित मातृत्व अभियान',
      category: 'PREGNANT_WOMAN',
      benefitAmount: 'Free Specialist Antenatal Care on 9th of Every Month',
      target: 'Pregnant women in 2nd and 3rd trimester (especially High-Risk Pregnancies)',
      description: 'Comprehensive package of antenatal services by specialist Gynaecologists / Medical Officers at designated government health centres on the 9th day of every month.',
      eligibility: ['Pregnant women in 2nd & 3rd trimesters with emphasis on identifying High-Risk cases (Anemia, Gestational Hypertension)'],
      ashaIncentive: '₹100 per mobilization of High-Risk Pregnancy to PMSMA session',
      documentsRequired: ['MCP Card', 'Prior Vitals / Ultrasound / Lab reports'],
      status: 'ACTIVE'
    },
    {
      id: 'PMJAY',
      name: 'Ayushman Bharat - PM-JAY & Health Wellness Centres',
      hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
      category: 'ELDERLY',
      benefitAmount: '₹5,00,000 Annual Health Cover per Family',
      target: 'Vulnerable and low-income families, elderly individuals requiring secondary & tertiary hospitalization',
      description: 'World’s largest health assurance scheme providing secondary and tertiary care hospitalization across empanelled public and private hospitals across India.',
      eligibility: ['Families verified in SECC database / Antyodaya Anna Yojana ration card holders'],
      ashaIncentive: '₹20 per Ayushman Card generated / NCD screening verification',
      documentsRequired: ['Ration Card / PMJAY Letter', 'Aadhaar Card', 'Mobile OTP verification'],
      status: 'ACTIVE'
    },
    {
      id: 'POSHAN',
      name: 'POSHAN Abhiyaan (National Nutrition Mission)',
      hindiName: 'राष्ट्रीय पोषण अभियान',
      category: 'INFANT',
      benefitAmount: 'Supplementary Nutrition & Growth Monitoring Kit',
      target: 'Children 0-6 Years, Adolescent Girls, Pregnant & Lactating Mothers',
      description: 'Multi-ministerial convergence mission to reduce stunting, under-nutrition, anemia among young children and low birth weight infants.',
      eligibility: ['All children registered at village Anganwadi centres and Sub-Centres'],
      ashaIncentive: '₹250 for complete SAM / MAM growth monitoring and home visits',
      documentsRequired: ['Anganwadi register entry', 'MCP Card with growth chart'],
      status: 'ACTIVE'
    }
  ];

  const filteredSchemes = SCHEMES.filter((scheme) => {
    if (selectedCohort !== 'ALL' && scheme.category !== selectedCohort) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        scheme.name.toLowerCase().includes(q) ||
        scheme.hindiName.toLowerCase().includes(q) ||
        scheme.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-700/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/50 flex items-center justify-center text-xl shadow-xs">
              🏛️
            </div>
            <div>
              <h2 className="text-lg font-bold">Government Health & Maternity Schemes</h2>
              <span className="text-xs text-emerald-200">
                National Health Mission (NHM) & Ministry of Health & Family Welfare
              </span>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90">
            Guide beneficiaries on available cash incentives, free hospital deliveries, and verify DBT eligibility in your village.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/20 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/10 text-xs">
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">Total Active Schemes</span>
            <span className="text-base font-black text-white">{SCHEMES.length} Flagship Programs</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme by name (e.g. PMMVY, JSY, Ayushman Bharat)..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'All Schemes' },
            { id: 'PREGNANT_WOMAN', label: 'Maternity (PMMVY / JSY)' },
            { id: 'INFANT', label: 'Child Nutrition (POSHAN)' },
            { id: 'ELDERLY', label: 'Health Cover (PM-JAY)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCohort(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCohort === tab.id ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="p-5 bg-white border-2 border-slate-200 rounded-3xl hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{scheme.name}</h4>
                  <span className="text-xs font-semibold text-emerald-800 block mt-0.5">{scheme.hindiName}</span>
                </div>
                <Badge variant={scheme.category === 'PREGNANT_WOMAN' ? 'rose' : scheme.category === 'INFANT' ? 'teal' : 'indigo'} size="sm">
                  {scheme.category.replace('_', ' ')}
                </Badge>
              </div>

              {/* Benefit Amount Pill */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Beneficiary Cash & Cover:</span>
                  <span className="text-sm font-black text-emerald-950">{scheme.benefitAmount}</span>
                </div>
                <span className="text-xs bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-xl">
                  DBT Transfer
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {scheme.description}
              </p>

              {/* Key Eligibility & Documents */}
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-800 block mb-1">Key Eligibility Criteria:</strong>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                    {scheme.eligibility.map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-slate-800 block mb-1">Documents Required for Verification:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.documentsRequired.map((doc, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                        ✓ {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ASHA Incentive Box */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                💰 ASHA Incentive: <strong>{scheme.ashaIncentive}</strong>
              </div>

              <span className="text-emerald-700 font-extrabold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> NHM Approved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
