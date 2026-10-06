import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchIssueById } from '../services/api';
import { Issue } from '../types';
import { RepairVerificationCard } from '../components/RepairVerificationCard';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  ShieldAlert,
  Building2,
  AlertCircle,
  CheckCircle2,
  Activity,
  Zap,
  Layers,
  Sparkles,
} from 'lucide-react';

export const IssueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIssue() {
      if (!id) return;
      try {
        const data = await fetchIssueById(id);
        setIssue(data);
      } catch (err) {
        setError(`Issue #${id} not found.`);
      } finally {
        setLoading(false);
      }
    }
    loadIssue();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center space-y-4">
        <div className="animate-spin h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-slate-400 text-sm font-medium">Fetching Incident #{id} from Municipal Database...</p>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Incident Not Found</h2>
        <p className="text-sm text-slate-400">{error || 'The requested issue ID does not exist.'}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700"
        >
          Return to Command Center
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Command Center
        </Link>
        <span className="text-xs font-mono text-slate-400">
          Created: {new Date(issue.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* HEADER BAR */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-white">{issue.type}</h1>
              <span className="text-sm font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800 font-bold">
                #{issue.id}
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-1">
              <MapPin className="h-4 w-4 text-emerald-400" /> {issue.locationName} ({issue.zone})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-extrabold uppercase px-3 py-1.5 rounded-full ${
                issue.severity === 'CRITICAL'
                  ? 'bg-red-950/80 text-red-400 border border-red-800'
                  : issue.severity === 'HIGH'
                  ? 'bg-orange-950/80 text-orange-400 border border-orange-800'
                  : 'bg-yellow-950/80 text-yellow-400 border border-yellow-800'
              }`}
            >
              {issue.severity} Severity
            </span>

            <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              {issue.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">AI Priority Score</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-red-400 font-mono">{issue.priorityScore}</span>
              <span className="text-xs text-slate-500 font-bold">/100 ({issue.priorityLevel})</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">Clustered Reports</span>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-5 w-5 text-indigo-400" />
              <span className="text-2xl font-extrabold text-slate-100">{issue.reports} Reports</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">Age Unresolved</span>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-2xl font-extrabold text-slate-100">{issue.ageInDays} Days</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">Assigned Department</span>
            <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-200">
              <Building2 className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="line-clamp-1">{issue.department}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRIORITY EXPLANATION CARD */}
      <div className="bg-gradient-to-r from-cyan-950/40 to-slate-900 p-5 rounded-2xl border border-cyan-800/60 shadow-xl flex items-start gap-3.5">
        <Zap className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider block">
            Priority Engine Intelligence Rationale
          </span>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {issue.priorityExplanation}
          </p>
        </div>
      </div>

      {/* TWO COLUMN DETAILS: IMAGE & TECHNICAL DIAGNOSTIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Original Defect Image & AI Detection */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
            Original Citizen Defect Capture
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {Math.round(issue.confidence * 100)}% Confidence
            </span>
          </h3>
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-64">
            <img src={issue.image} alt={issue.type} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-300 block uppercase">Technical Inspection Note</span>
            <p className="text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {issue.description}
            </p>
          </div>
        </div>

        {/* Right: Recommended Action & Risk Factors */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-100 text-sm">Dispatched Action Plan</h3>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] text-cyan-400 font-bold uppercase">Recommended Field Action</span>
              <p className="text-xs text-slate-200 font-medium">{issue.recommendedAction}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase">Assessed Hazards & Risks</span>
              <div className="space-y-2">
                {issue.riskFactors.map((risk, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/40 text-xs text-red-300 flex items-start gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/50 flex items-center justify-between text-xs text-indigo-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <Layers className="h-3.5 w-3.5 text-indigo-400" /> Spatial Cluster Buffer: 50 meters
            </span>
            <span className="font-mono text-[10px] text-indigo-400">17 Reports Merged</span>
          </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
          Incident Audit Timeline
          <span className="text-xs text-slate-400 font-normal">({issue.timeline.length} Events Logged)</span>
        </h3>

        <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 pl-6">
          {issue.timeline.map((event, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full bg-cyan-500 border-4 border-slate-900 group-hover:scale-125 transition-transform"></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-cyan-400">{event.label}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {event.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI REPAIR VERIFICATION CARD SECTION */}
      <RepairVerificationCard issue={issue} onUpdate={(updated) => setIssue(updated)} />
    </div>
  );
};
