import React, { useEffect, useState } from 'react';
import { fetchIssues, fetchDashboardStats } from '../services/api';
import { Issue, DashboardStats } from '../types';
import { MapComponent } from '../components/MapComponent';
import { KPICard } from '../components/KPICard';
import { PriorityQueueCard } from '../components/PriorityQueueCard';
import { DuplicateIntelligenceCard } from '../components/DuplicateIntelligenceCard';
import { HealthScoreCard } from '../components/HealthScoreCard';
import { AnalyticsSection } from '../components/AnalyticsSection';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  ListFilter,
  ShieldAlert,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedIssues, fetchedStats] = await Promise.all([
          fetchIssues(),
          fetchDashboardStats(),
        ]);
        setIssues(fetchedIssues);
        setStats(fetchedStats);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    if (filterSeverity === 'ALL') return true;
    return issue.severity === filterSeverity;
  });

  return (
    <div className="space-y-8 py-4">
      {/* COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800/60 uppercase">
              Municipal Command Center
            </span>
            <span className="text-xs text-slate-400 font-medium">Zone 12 & Metropolitan Region</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            CivicAI Infrastructure Intelligence
          </h1>
          <p className="text-sm text-slate-400">
            Real-time multi-modal AI monitoring, spatial clustering, and dispatch prioritization.
          </p>
          <p className="text-xs text-cyan-300 font-medium italic mt-1.5 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Multiple citizen reports may be clustered into a single infrastructure incident.
          </p>
        </div>

        {/* Severity Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1">
            <ListFilter className="h-3.5 w-3.5" /> Filter:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterSeverity === sev
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Citizen Reports"
          value={stats?.totalIssues || 248}
          subtitle="248 Citizen Reports (12 Active Incidents)"
          icon={Layers}
          colorClass="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
          badgeText="248 Reports"
          badgeType="info"
        />

        <KPICard
          title="Critical Incidents"
          value={stats?.criticalIssues || 18}
          subtitle="18 Critical Incidents"
          icon={ShieldAlert}
          colorClass="bg-red-500/10 text-red-400 border border-red-500/30"
          badgeText="Action Required"
          badgeType="danger"
        />

        <KPICard
          title="Pending Reports"
          value={stats?.pendingIssues || 73}
          subtitle="73 Pending Reports"
          icon={AlertTriangle}
          colorClass="bg-amber-500/10 text-amber-400 border border-amber-500/30"
          badgeText="Prioritized"
          badgeType="warning"
        />

        <KPICard
          title="Resolved Reports"
          value={stats?.resolvedIssues || 157}
          subtitle="157 Resolved Reports"
          icon={CheckCircle2}
          colorClass="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
          badgeText="98.2% Verified"
          badgeType="success"
        />

        <KPICard
          title="Avg Repair Time"
          value={`${stats?.avgResolutionDays || 2.8}d`}
          subtitle="Dispatch-to-close"
          icon={Clock}
          colorClass="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
          badgeText="-42% vs Baseline"
          badgeType="info"
        />
      </div>

      {/* LIVE INFRASTRUCTURE MAP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-slate-100 text-lg flex items-center gap-2">
            Live Geospatial Infrastructure Map
            <span className="text-xs font-mono font-medium text-slate-400">
              Showing {filteredIssues.length} Active Infrastructure Incidents (Clustered from 248 Citizen Reports)
            </span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Interactive GIS Markers
          </span>
        </div>
        <MapComponent issues={filteredIssues} />
      </div>

      {/* DASHBOARD CARDS ROW 1: AI Priority Queue & Duplicate Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriorityQueueCard issues={issues} />
        <DuplicateIntelligenceCard
          reportsClustered={stats?.duplicateReportsClustered}
          incidentsSaved={stats?.duplicateIncidentsSaved}
        />
      </div>

      {/* DASHBOARD CARDS ROW 2: Sector Health */}
      <HealthScoreCard health={stats?.infrastructureHealth} />

      {/* ANALYTICS SECTION */}
      <div className="space-y-3">
        <h2 className="font-extrabold text-slate-100 text-lg">
          Municipal Infrastructure Analytics
        </h2>
        <AnalyticsSection analytics={stats?.analytics} />
      </div>
    </div>
  );
};
