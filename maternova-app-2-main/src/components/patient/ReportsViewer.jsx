import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import {
  FileText,
  UploadCloud,
  FileCheck,
  Calendar,
  Building2,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ReportsViewer = ({ patient }) => {
  const { reports, addReport } = useAppData();
  const patientReports = reports.filter((r) => r.patientId === patient.id);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'LAB_TEST',
    facility: 'District Hospital Lab',
    date: new Date().toISOString().split('T')[0],
    summary: '',
    doctorRemarks: '',
    fileName: 'Lab_Report.pdf'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      await addReport({
        patientId: patient.id,
        title: formData.title,
        category: formData.category,
        facility: formData.facility,
        date: formData.date,
        summary: formData.summary,
        doctorRemarks: formData.doctorRemarks || 'Pending doctor review.',
        status: 'REVIEWED_BY_DOCTOR',
        fileType: 'Medical Document',
        fileName: formData.fileName || 'Report_Document.pdf'
      });

      setIsSubmitting(false);
      setIsUploadOpen(false);
      setFormData({
        title: '',
        category: 'LAB_TEST',
        facility: 'District Hospital Lab',
        date: new Date().toISOString().split('T')[0],
        summary: '',
        doctorRemarks: '',
        fileName: 'Lab_Report.pdf'
      });
    } catch (err) {
      console.error('Report upload error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-700" />
            Medical Reports & Diagnostic Records
          </h3>
          <p className="text-xs text-slate-500">
            Longitudinal repository of blood tests, ultrasound imaging, and clinical slips.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Medical Report
        </button>
      </div>

      {patientReports.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2">
          <FileText className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-xs font-bold text-slate-700">No medical reports uploaded yet</h4>
          <p className="text-[11px] text-slate-500">
            Upload blood reports, scan summaries, or referral records to keep the patient history complete.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patientReports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{report.title}</h5>
                    <span className="text-[11px] text-slate-400">{report.facility}</span>
                  </div>
                </div>

                <Badge variant={report.status === 'ATTENTION_REQUIRED' ? 'rose' : 'emerald'} size="sm">
                  {report.category}
                </Badge>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                <div>
                  <strong className="text-slate-900">Findings:</strong> {report.summary}
                </div>
                {report.doctorRemarks && (
                  <div className="text-teal-800">
                    <strong className="text-slate-900">Doctor Advice:</strong> {report.doctorRemarks}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Date: {report.date}</span>
                <span className="font-mono text-[11px] text-teal-700 font-semibold">{report.fileName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Add Medical Diagnostic Report"
        subtitle={`Associate with patient: ${patient.name} (${patient.id})`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="input-label">Report Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Complete Blood Count (CBC) or Anomaly Scan"
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="LAB_TEST">Lab Blood/Urine Test</option>
                <option value="ULTRASOUND">Ultrasound / Imaging</option>
                <option value="PRESCRIPTION">Prescription Slip</option>
                <option value="DISCHARGE_SUMMARY">Discharge Summary</option>
              </select>
            </div>

            <div>
              <label className="input-label">Test Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="input-label">Diagnostic Facility / Hospital</label>
            <input
              type="text"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              placeholder="e.g. PHC Varanasi Lab"
              className="input-field"
            />
          </div>

          <div>
            <label className="input-label">Key Diagnostic Findings / Values *</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter Hemoglobin, Platelets, Sugar levels, or Ultrasound observations..."
              rows="3"
              required
              className="input-field"
            ></textarea>
          </div>

          <div>
            <label className="input-label">Doctor's Clinical Notes / Remarks</label>
            <input
              type="text"
              name="doctorRemarks"
              value={formData.doctorRemarks}
              onChange={handleChange}
              placeholder="e.g. Continue IFA tablets, repeat in 4 weeks"
              className="input-field"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsUploadOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Saving...' : 'Save Report to Local Record'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
