import React from 'react';
import { Issue } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Zap, ShieldAlert, Clock, Users } from 'lucide-react';

interface PriorityQueueCardProps {
  issues: Issue[];
}

export const PriorityQueueCard: React.FC<PriorityQueueCardProps> = ({ issues }) => {
  const navigate = useNavigate();

  // Sort by priorityScore descending and pick top 5
  const topIssues = [...issues].sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 5);

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                AI Recommended Repair Queue
              </h3>
              <p className="text-xs text-slate-400">
                Automated priority scoring matrix
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/60 font-semibold">
            Top 5 Critical
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {topIssues.map((issue, idx) => (
            <div
              key={issue.id}
              onClick={() => navigate(`/issues/${issue.id}`)}
              className="group p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-extrabold text-sm text-cyan-400 group-hover:scale-105 transition-transform">
                  #{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {issue.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">#{issue.id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-slate-500" /> {issue.reports} reports
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-500" /> {issue.ageInDays}d unresolved
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Priority</div>
                  <div className={`text-base font-extrabold ${
                    issue.priorityScore >= 90 ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {issue.priorityScore}<span className="text-xs text-slate-500">/100</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-400 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
