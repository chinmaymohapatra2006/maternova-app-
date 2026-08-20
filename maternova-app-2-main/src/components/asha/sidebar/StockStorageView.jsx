import React, { useState } from 'react';
import { Badge } from '../../common/Badge';
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  MinusCircle,
  Truck,
  Calendar,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

export const StockStorageView = () => {
  const [stockInventory, setStockInventory] = useState([
    {
      id: 'STK-01',
      itemName: 'Iron Folic Acid (IFA) Tablets (Red / Adult)',
      category: 'SUPPLEMENTS',
      unit: 'Tablets / Strips',
      currentStock: 420,
      minThreshold: 150,
      expiryDate: '2027-04-30',
      batchNo: 'IFA-2026-B8',
      status: 'ADEQUATE',
      location: 'Sub-Centre Cabinet A1'
    },
    {
      id: 'STK-02',
      itemName: 'Iron Folic Acid (IFA) Syrup (Infant / Child)',
      category: 'SUPPLEMENTS',
      unit: 'Bottles (50ml)',
      currentStock: 18,
      minThreshold: 25,
      expiryDate: '2026-12-15',
      batchNo: 'IFAS-992',
      status: 'LOW_STOCK',
      location: 'Sub-Centre Cabinet A2'
    },
    {
      id: 'STK-03',
      itemName: 'Calcium & Vitamin D3 Tablets (500mg)',
      category: 'SUPPLEMENTS',
      unit: 'Tablets',
      currentStock: 310,
      minThreshold: 100,
      expiryDate: '2027-08-20',
      batchNo: 'CAL-8841',
      status: 'ADEQUATE',
      location: 'Sub-Centre Cabinet A3'
    },
    {
      id: 'STK-04',
      itemName: 'Oral Rehydration Salts (ORS) Sachets (WHO Formula)',
      category: 'EMERGENCY',
      unit: 'Sachets',
      currentStock: 65,
      minThreshold: 40,
      expiryDate: '2027-01-10',
      batchNo: 'ORS-WHO-12',
      status: 'ADEQUATE',
      location: 'ASHA Field Drug Kit'
    },
    {
      id: 'STK-05',
      itemName: 'Zinc Sulfate Dispersible Tablets (20mg)',
      category: 'EMERGENCY',
      unit: 'Strips (14 tabs)',
      currentStock: 12,
      minThreshold: 30,
      expiryDate: '2026-11-30',
      batchNo: 'ZNC-7721',
      status: 'LOW_STOCK',
      location: 'ASHA Field Drug Kit'
    },
    {
      id: 'STK-06',
      itemName: 'Clean Delivery Kits (CDK / Suraksha Kit)',
      category: 'MATERNITY',
      unit: 'Sterile Kits',
      currentStock: 8,
      minThreshold: 5,
      expiryDate: '2028-02-15',
      batchNo: 'CDK-SUR-04',
      status: 'ADEQUATE',
      location: 'Sub-Centre Labor Ward'
    },
    {
      id: 'STK-07',
      itemName: 'Rapid Pregnancy Test Strips (Nischay Kits)',
      category: 'DIAGNOSTICS',
      unit: 'Card Tests',
      currentStock: 35,
      minThreshold: 20,
      expiryDate: '2027-06-18',
      batchNo: 'NIS-2026-44',
      status: 'ADEQUATE',
      location: 'ASHA Field Bag'
    },
    {
      id: 'STK-08',
      itemName: 'Blood Glucose Test Strips (Accu-Chek / NCD)',
      category: 'DIAGNOSTICS',
      unit: 'Strips',
      currentStock: 14,
      minThreshold: 50,
      expiryDate: '2026-10-15',
      batchNo: 'GLU-NCD-09',
      status: 'CRITICAL_LOW',
      location: 'ASHA Field Bag'
    },
    {
      id: 'STK-09',
      itemName: 'Sanitary Napkins Packets (Kishori Shakti)',
      category: 'HYGIENE',
      unit: 'Packs of 6',
      currentStock: 140,
      minThreshold: 50,
      expiryDate: '2028-09-01',
      batchNo: 'SAN-KSY-22',
      status: 'ADEQUATE',
      location: 'Sub-Centre Storage Bin'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [disburseModalItem, setDisburseModalItem] = useState(null);
  const [disburseQty, setDisburseQty] = useState(30);
  const [disburseBeneficiary, setDisburseBeneficiary] = useState('');
  const [isIndentModalOpen, setIsIndentModalOpen] = useState(false);

  const lowStockCount = stockInventory.filter(
    (item) => item.status === 'LOW_STOCK' || item.status === 'CRITICAL_LOW'
  ).length;

  const filteredStock = stockInventory.filter((item) => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.itemName.toLowerCase().includes(q) ||
        item.batchNo.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDisburse = (e) => {
    e.preventDefault();
    if (!disburseModalItem) return;

    setStockInventory((prev) =>
      prev.map((item) => {
        if (item.id === disburseModalItem.id) {
          const newQty = Math.max(0, item.currentStock - parseInt(disburseQty, 10));
          let newStatus = 'ADEQUATE';
          if (newQty <= item.minThreshold / 2) newStatus = 'CRITICAL_LOW';
          else if (newQty <= item.minThreshold) newStatus = 'LOW_STOCK';
          return { ...item, currentStock: newQty, status: newStatus };
        }
        return item;
      })
    );

    setDisburseModalItem(null);
    setDisburseBeneficiary('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-700/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-700/50 flex items-center justify-center text-xl shadow-xs">
              📦
            </div>
            <div>
              <h2 className="text-lg font-bold">Sub-Centre Drug Stock & Storage Management</h2>
              <span className="text-xs text-teal-200">
                Rampur Village Sub-Centre • ASHA Field Drug Kit & Medical Consumables
              </span>
            </div>
          </div>
          <p className="text-xs text-teal-100/90">
            Log distributed IFA/Calcium tablets, track ORS/Zinc stocks, monitor batch expiration dates, and send restock indent requests to PHC.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsIndentModalOpen(true)}
            className="btn-primary-white flex items-center gap-2 shadow-md hover:scale-105 transition"
          >
            <Truck className="w-4 h-4" /> Request PHC Restock Indent
          </button>
        </div>
      </div>

      {/* KPI Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border-2 border-slate-200 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Tracked Items</span>
            <Package className="w-5 h-5 text-teal-700" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stockInventory.length} Items</div>
          <p className="text-[11px] text-slate-500">Essential field drugs & diagnostic strips</p>
        </div>

        <div className="p-5 bg-rose-50/80 border-2 border-rose-300 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-rose-800">
            <span className="text-xs font-bold uppercase tracking-wider">Low Stock Warnings</span>
            <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-rose-950">{lowStockCount} Items</div>
          <p className="text-[11px] text-rose-700 font-medium">Below minimum threshold limit</p>
        </div>

        <div className="p-5 bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">Storage Health</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-950">92% Ready</div>
          <p className="text-[11px] text-emerald-800 font-medium">Zero expired batches detected</p>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stock item by name, batch number, or location..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'All Inventory' },
            { id: 'SUPPLEMENTS', label: 'IFA & Calcium' },
            { id: 'EMERGENCY', label: 'ORS & Zinc' },
            { id: 'DIAGNOSTICS', label: 'Test Strips' },
            { id: 'MATERNITY', label: 'Delivery Kits' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${categoryFilter === tab.id ? 'bg-teal-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master Inventory Table */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Real-time Sub-Centre Inventory Ledger
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">Last verified today</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Item Name / Category</th>
                <th className="p-3.5">Available Stock</th>
                <th className="p-3.5">Min Safe Threshold</th>
                <th className="p-3.5">Batch / Expiry</th>
                <th className="p-3.5">Storage Location</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Field Action</th>
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
                  <td className="p-3.5 text-slate-600 font-medium">
                    📍 {item.location}
                  </td>
                  <td className="p-3.5">
                    <Badge
                      variant={item.status === 'CRITICAL_LOW' ? 'rose' : item.status === 'LOW_STOCK' ? 'amber' : 'emerald'}
                      size="sm"
                    >
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setDisburseModalItem(item)}
                      className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-xl font-bold transition inline-flex items-center gap-1"
                    >
                      <MinusCircle className="w-3.5 h-3.5" /> Disburse
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disburse Stock Modal */}
      {disburseModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border-2 border-teal-400 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <MinusCircle className="w-5 h-5 text-teal-700" /> Disburse Stock to Beneficiary
              </h3>
              <button onClick={() => setDisburseModalItem(null)} className="modal-close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleDisburse} className="space-y-4 text-xs">
              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
                <span className="text-[10px] font-bold text-teal-800 uppercase block">Selected Item:</span>
                <strong className="text-slate-900 text-sm block">{disburseModalItem.itemName}</strong>
                <span className="text-[11px] text-slate-500">Available: {disburseModalItem.currentStock} {disburseModalItem.unit}</span>
              </div>

              <div>
                <label className="input-label">Quantity to Disburse *</label>
                <input
                  type="number"
                  min="1"
                  max={disburseModalItem.currentStock}
                  value={disburseQty}
                  onChange={(e) => setDisburseQty(e.target.value)}
                  className="input-field text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="input-label">Beneficiary Name / Patient ID *</label>
                <input
                  type="text"
                  value={disburseBeneficiary}
                  onChange={(e) => setDisburseBeneficiary(e.target.value)}
                  placeholder="e.g. Sunita Devi (PAT-PW-101) or Rampur Household"
                  className="input-field text-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDisburseModalItem(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center gap-1">
                  ✓ Confirm Disbursement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Indent Request Modal */}
      {isIndentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border-2 border-teal-400 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-teal-700" /> PHC Drug Indent Request
              </h3>
              <button onClick={() => setIsIndentModalOpen(false)} className="modal-close-btn">
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                The following low-stock supplies will be compiled into an electronic requisition order and transmitted to <strong>Varanasi Central PHC Drug Warehouse</strong>:
              </p>

              <div className="space-y-1.5 p-3 bg-amber-50 rounded-2xl border border-amber-200">
                {stockInventory
                  .filter((item) => item.status === 'LOW_STOCK' || item.status === 'CRITICAL_LOW')
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                      <span>• {item.itemName}</span>
                      <span className="text-rose-700 font-mono">Req: +{item.minThreshold * 2} {item.unit}</span>
                    </div>
                  ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900">
                ✓ Offline queue will sync the indent order automatically once connection is established.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsIndentModalOpen(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('PHC Indent Requisition Transmitted Successfully! Reference ID: IND-VNS-2026-88');
                    setIsIndentModalOpen(false);
                  }}
                  className="btn-primary"
                >
                  Transmit Indent to PHC
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
