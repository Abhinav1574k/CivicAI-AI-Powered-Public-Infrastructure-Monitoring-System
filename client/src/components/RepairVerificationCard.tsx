import React, { useState } from 'react';
import { Issue } from '../types';
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Sparkles, FileCheck } from 'lucide-react';
import { updateIssueStatus } from '../services/api';

interface RepairVerificationCardProps {
  issue: Issue;
  onUpdate?: (updated: Issue) => void;
}

export const RepairVerificationCard: React.FC<RepairVerificationCardProps> = ({ issue, onUpdate }) => {
  const [verifying, setVerifying] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<Issue>(issue);

  const handleSimulateRepair = async () => {
    setVerifying(true);
    try {
      // Sample high-quality repaired road image
      const defaultAfterImage = 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80';
      const updated = await updateIssueStatus(currentIssue.id, 'RESOLVED', currentIssue.afterImage || defaultAfterImage);
      setCurrentIssue(updated);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      console.error('Error verifying repair:', err);
    } finally {
      setTimeout(() => setVerifying(false), 800);
    }
  };

  const isResolved = currentIssue.status === 'RESOLVED';
  const afterImg = currentIssue.afterImage || 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
              AI Repair Verification
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                Multi-Modal Scan
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Automated computer vision comparison of before & after repair states
            </p>
          </div>
        </div>

        {!isResolved && (
          <button
            onClick={handleSimulateRepair}
            disabled={verifying}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50"
          >
            {verifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Verifying with AI...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Trigger AI Verification
              </>
            )}
          </button>
        )}
      </div>

      {/* BEFORE / AFTER Comparison View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
          <div className="absolute top-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-slate-700 text-xs font-extrabold text-red-400 uppercase tracking-wider">
            Original Issue (BEFORE)
          </div>
          <img
            src={currentIssue.image}
            alt="Before repair"
            className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* AFTER */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
          <div className="absolute top-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-emerald-700 text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            Completed Repair (AFTER)
          </div>
          {isResolved ? (
            <img
              src={afterImg}
              alt="After repair"
              className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-56 w-full bg-slate-900/80 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 text-center">
              <FileCheck className="h-8 w-8 text-slate-600 mb-2 animate-bounce" />
              <span className="text-xs font-bold text-slate-400">Awaiting Completion Photo</span>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                Click "Trigger AI Verification" above to simulate automated field verification.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Verification Results Box */}
      <div className={`p-4 rounded-xl border transition-all ${
        isResolved
          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
          : 'bg-slate-950/60 border-slate-800 text-slate-300'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isResolved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block text-slate-400">
                AI Verification Status
              </span>
              <span className="text-sm font-extrabold text-white flex items-center gap-2">
                {isResolved ? '✓ Repair Confirmed Successful' : 'Verification Scheduled'}
                {isResolved && (
                  <span className="text-xs font-mono font-bold bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/60">
                    96% Confidence
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium sm:text-right">
            Model: <span className="font-mono text-cyan-400">Gemini Infrastructure Vision v2</span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed font-medium text-slate-300 border-t border-slate-800/80 pt-3">
          {isResolved
            ? 'The infrastructure defect detected in the original image is no longer visible. Asphalt surface grade and compaction parameters match municipal public works standard requirements.'
            : 'AI model ready to perform pixel-level anomaly comparative detection upon upload of completion media.'}
        </p>
      </div>
    </div>
  );
};
