import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';

interface AnalyticsSectionProps {
  analytics?: {
    byCategory: { name: string; count: number }[];
    bySeverity: { name: string; count: number; color: string }[];
    resolutionTrend: { month: string; resolved: number; reported: number }[];
  };
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ analytics }) => {
  const categories = analytics?.byCategory || [
    { name: 'Potholes', count: 98 },
    { name: 'Damaged Roads', count: 64 },
    { name: 'Overflow Drains', count: 42 },
    { name: 'Streetlights', count: 28 },
    { name: 'Waterlogging', count: 16 },
  ];

  const severities = analytics?.bySeverity || [
    { name: 'Critical', count: 18, color: '#ef4444' },
    { name: 'High', count: 48, color: '#f97316' },
    { name: 'Medium', count: 112, color: '#eab308' },
    { name: 'Low', count: 70, color: '#22c55e' },
  ];

  const trend = analytics?.resolutionTrend || [
    { month: 'May', reported: 120, resolved: 110 },
    { month: 'Jun', reported: 145, resolved: 138 },
    { month: 'Jul', reported: 190, resolved: 175 },
    { month: 'Aug', reported: 210, resolved: 198 },
    { month: 'Sep', reported: 248, resolved: 220 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart 1: Category Distribution */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <BarChart3 className="h-4 w-4 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-sm">Issues by Category</h3>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }}
              />
              <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Severity Distribution */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <PieIcon className="h-4 w-4 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-sm">Issues by Severity</h3>
        </div>
        <div className="h-56 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severities}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
              >
                {severities.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-3 text-[11px] mt-1 font-semibold">
          {severities.map((item) => (
            <span key={item.name} className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-300">{item.name} ({item.count})</span>
            </span>
          ))}
        </div>
      </div>

      {/* Chart 3: Resolution Trend */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-sm">Resolution Efficiency Trend</h3>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" strokeWidth={2} />
              <Area type="monotone" dataKey="reported" stroke="#64748b" fillOpacity={0} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
