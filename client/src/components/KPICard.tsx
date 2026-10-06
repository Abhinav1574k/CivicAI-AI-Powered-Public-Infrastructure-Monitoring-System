import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  badgeText?: string;
  badgeType?: 'danger' | 'warning' | 'success' | 'info';
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass,
  badgeText,
  badgeType = 'info',
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-200 shadow-xl group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${colorClass} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-extrabold tracking-tight text-slate-100">
          {value}
        </span>

        {badgeText && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              badgeType === 'danger'
                ? 'bg-red-950/80 text-red-400 border border-red-800/60'
                : badgeType === 'warning'
                ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                : badgeType === 'success'
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60'
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-slate-400 font-medium">
        {subtitle}
      </p>
    </div>
  );
};
