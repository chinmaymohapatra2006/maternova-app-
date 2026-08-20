import React, { useState } from 'react';
import { Badge } from '../../common/Badge';
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  Truck,
  Search,
  Filter,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Check,
  X
} from 'lucide-react';

export const DoctorStockStorageView = () => {
  const [phcStock, setPhcStock] = useState([
    {
      id: 'PHC-STK-01',
      itemName: 'Iron Folic Acid (IFA) Tablets (100mg Elemental Iron + 500mcg FA)',
      category: 'MATERNAL_SUPPLEMENTS',
      unit: 'Tablets (10x10 Strips)',
      currentStock: 4800,
      minThreshold: 1200,
      expiryDate: '2027-09-30',
      batchNo: 'IFA-PHC-881',
      status: 'ADEQUATE'
    },
    {
      id: 'PHC-STK-02',
      itemName: 'Calcium & Vitamin D3 Tablets (500mg/250IU)',
      category: 'MATERNAL_SUPPLEMENTS',
      unit: 'Tablets',
      currentStock: 3600,
      minThreshold: 1000,
      expiryDate: '2027-11-15',
      batchNo: 'CAL-PHC-442',
      status: 'ADEQUATE'
    },
    {
      id: 'PHC-STK-03',
      itemName: 'Oxytocin Injection (10 IU / 1ml Ampoules)',
      category: 'EMERGENCY_OBSTETRIC',
      unit: 'Ampoules',
      currentStock: 85,
      minThreshold: 100,
      expiryDate: '2027-03-20',
      batchNo: 'OXY-EMG-09',
      status: 'LOW_STOCK'
    },
    {
      id: 'PHC-STK-04',
      itemName: 'Magnesium Sulfate 50% Injection (Eclampsia Protocol)',
      category: 'EMERGENCY_OBSTETRIC',
      unit: 'Ampoules',
      currentStock: 60,
      minThreshold: 40,
      expiryDate: '2027-05-10',
      batchNo: 'MGSO4-2026',
      status: 'ADEQUATE'
    },
    {
      id: 'PHC-STK-05',
      itemName: 'Oral Rehydration Salts (ORS) & Zinc Sulfate Kits',
      category: 'CHILD_HEALTH',
      unit: 'Kits',
      currentStock: 850,
      minThreshold: 300,
      expiryDate: '2027-08-01',
      batchNo: 'ORS-ZNC-99',
      status: 'ADEQUATE'
    },
    {
      id: 'PHC-STK-06',
      itemName: 'Amlodipine 5mg & Telmisartan 40mg (Hypertension Supply)',
      category: 'CHRONIC_NCD',
      unit: 'Strips of 10',
      currentStock: 1200,
      minThreshold: 500,
      expiryDate: '2027-12-31',
      batchNo: 'AML-TEL-21',
      status: 'ADEQUATE'
    },
    {
      id: 'PHC-STK-07',
      itemName: 'Blood Glucose Test Strips (NCD Glucometer)',
      category: 'DIAGNOSTICS',
      unit: 'Strips (Vials of 50)',
      currentStock: 140,
      minThreshold: 400,
      expiryDate: '2026-10-15',
      batchNo: 'GLU-PHC-11',
      status: 'CRITICAL_LOW'
    },
    {
      id: 'PHC-STK-08',
      itemName: 'Clean Delivery Kits (CDK / Disposable Delivery Set)',
      category: 'MATERNAL_SUPPLEMENTS',
      unit: 'Sterile Kits',
      currentStock: 95,
      minThreshold: 50,
      expiryDate: '2028-04-10',
      batchNo: 'CDK-DISP-08',
      status: 'ADEQUATE'
    }
  ]);

  const [subCentreIndents, setSubCentreIndents] = useState([
    {
      id: 'IND-VNS-2026-88',
      subCentre: 'Rampur Sub-Centre',
      requestedBy: 'ASHA Shanti Devi',
      date: '2026-08-20',
      itemsRequested: [
        { name: 'IFA Tablets (Adult)', qty: 300 },
        { name: 'Calcium Tablets', qty: 200 },
        { name: 'ORS & Zinc Sachets', qty: 50 },
        { name: 'Blood Glucose Strips', qty: 100 }
      ],
      status: 'PENDING_MO_APPROVAL'
    },
    {
      id: 'IND-VNS-2026-89',
      subCentre: 'Shivpur Sub-Centre',
      requestedBy: 'ASHA Rekha Devi',
      date: '2026-08-19',
      itemsRequested: [
        { name: 'Clean Delivery Kits (CDK)', qty: 10 },
        { name: 'IFA Syrup (Infant)', qty: 40 }
      ],
      status: 'APPROVED_AND_DISPATCHED'
    }
  ]);

  const [activeTab, setActiveTab] = useState('SUB_CENTRE_INDENTS'); // 'SUB_CENTRE_INDENTS' | 'PHC_WAREHOUSE'
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [newStockItem, setNewStockItem] = useState({
    itemName: '',
    category: 'MATERNAL_SUPPLEMENTS',
    unit: 'Tablets / Units',
    currentStock: 500,
    minThreshold: 100,
    batchNo: 'BATCH-2026',
    expiryDate: '2027-12-31'
  });

  const handleApproveIndent = (indentId) => {
    setSubCentreIndents((prev) =>
      prev.map((ind) =>
        ind.id === indentId ? { ...ind, status: 'APPROVED_AND_DISPATCHED' } : ind
      )
    );
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const item = {
      id: `PHC-STK-0${phcStock.length + 1}`,
      ...newStockItem,
      status: 'ADEQUATE'
    };
    setPhcStock([item, ...phcStock]);
    setIsAddStockOpen(false);
  };

  const filteredStock = phcStock.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.itemName.toLowerCase().includes(q) || item.batchNo.toLowerCase().includes(q);
    }
    return true;
  });

  const lowStockCount = phcStock.filter(
    (item) => item.status === 'LOW_STOCK' || item.status === 'CRITICAL_LOW'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-xl">
              📦
            </div>
            <div>
              <h2 className="text-lg font-bold">PHC Central Medicine Inventory & Sub-Centre Indents</h2>
              <span className="text-xs text-indigo-300">
                Primary Health Centre Pharmacy • Sub-Centre Supply Chain & Indent Authorization
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Authorize Sub-Centre supply indents requested by village ASHA workers, monitor emergency obstetric drug reserves, and log incoming pharmaceutical shipments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('SUB_CENTRE_INDENTS')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'SUB_CENTRE_INDENTS' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            <Truck className="w-4 h-4" />
            <span>Sub-Centre Indents ({subCentreIndents.filter((i) => i.status === 'PENDING_MO_APPROVAL').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('PHC_WAREHOUSE')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'PHC_WAREHOUSE' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            <Package className="w-4 h-4" />
            <span>PHC Warehouse Stock</span>
          </button>
        </div>
      </div>

      {/* VIEW A: SUB-CENTRE REQUISITION INDENTS */}
      {activeTab === 'SUB_CENTRE_INDENTS' && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between text-xs text-indigo-950 font-medium">
            <span>
              💡 <strong>ASHA Supply Chain:</strong> Reviewing and approving these indents authorizes the PHC storekeeper to dispatch medicine boxes to the respective village Sub-Centres.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subCentreIndents.map((indent) => {
              const isApproved = indent.status === 'APPROVED_AND_DISPATCHED';
              return (
                <div
                  key={indent.id}
                  className={`p-5 bg-white border-2 rounded-3xl space-y-4 shadow-xs flex flex-col justify-between transition ${isApproved ? 'border-emerald-300 bg-emerald-50/20' : 'border-indigo-300'}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{indent.subCentre}</h4>
                        <span className="text-xs text-slate-500 font-medium">
                          Requested by <strong>{indent.requestedBy}</strong> • {indent.date}
                        </span>
                      </div>
                      <Badge variant={isApproved ? 'emerald' : 'amber'} size="sm">
                        {isApproved ? 'DISPATCHED' : 'PENDING MO APPROVAL'}
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Requisitioned Supplies:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {indent.itemsRequested.map((item, idx) => (
                          <div key={idx} className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between">
                            <span className="text-slate-800 font-medium">{item.name}</span>
                            <span className="font-mono font-bold text-indigo-900">+{item.qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    {isApproved ? (
                      <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Approved & Dispatched from PHC Warehouse
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApproveIndent(indent.id)}
                        className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Check className="w-4 h-4" /> Approve Indent & Dispatch Supplies
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: PHC CENTRAL WAREHOUSE INVENTORY */}
      {activeTab === 'PHC_WAREHOUSE' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PHC drug stock by name or batch number..."
                className="input-field pl-10 text-xs py-2"
              />
            </div>

            <button
              onClick={() => setIsAddStockOpen(true)}
              className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" /> Log Incoming Batch
            </button>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Pharmaceutical Item / Category</th>
                    <th className="p-3.5">Available Stock</th>
                    <th className="p-3.5">Min Safe Threshold</th>
                    <th className="p-3.5">Batch / Expiry</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredStock.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <div className="font-extrabold text-slate-900 text-xs">{item.itemName}</div>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {item.id} • {item.category}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-black text-sm text-slate-900">{item.currentStock}</span>
                        <span className="text-[11px] text-slate-500 ml-1">{item.unit}</span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono">
                        {item.minThreshold} {item.unit}
                      </td>
                      <td className="p-3.5">
                        <div className="font-mono text-[11px] text-slate-600 font-bold">{item.batchNo}</div>
                        <span className="text-[10px] text-slate-400">Exp: {item.expiryDate}</span>
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={item.status === 'CRITICAL_LOW' ? 'rose' : item.status === 'LOW_STOCK' ? 'amber' : 'emerald'}
                          size="sm"
                        >
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LOG INCOMING SHIPMENT MODAL */}
      {isAddStockOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border-2 border-indigo-400 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-700" /> Log Incoming Pharmaceutical Shipment
              </h3>
              <button onClick={() => setIsAddStockOpen(false)} className="modal-close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleAddStock} className="space-y-3.5 text-xs">
              <div>
                <label className="input-label">Medicine / Item Name *</label>
                <input
                  type="text"
                  value={newStockItem.itemName}
                  onChange={(e) => setNewStockItem({ ...newStockItem, itemName: e.target.value })}
                  placeholder="e.g. Paracetamol 500mg Tablets"
                  className="input-field text-xs font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="input-label">Quantity Received *</label>
                  <input
                    type="number"
                    value={newStockItem.currentStock}
                    onChange={(e) => setNewStockItem({ ...newStockItem, currentStock: parseInt(e.target.value, 10) })}
                    className="input-field text-xs font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Batch Number *</label>
                  <input
                    type="text"
                    value={newStockItem.batchNo}
                    onChange={(e) => setNewStockItem({ ...newStockItem, batchNo: e.target.value })}
                    className="input-field text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Expiration Date *</label>
                <input
                  type="date"
                  value={newStockItem.expiryDate}
                  onChange={(e) => setNewStockItem({ ...newStockItem, expiryDate: e.target.value })}
                  className="input-field text-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddStockOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center gap-1">
                  ✓ Log into PHC Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
