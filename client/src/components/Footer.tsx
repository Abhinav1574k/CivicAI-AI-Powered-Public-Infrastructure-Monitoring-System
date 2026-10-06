import React from 'react';
import { Cpu, ShieldCheck, MapPin, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight">CivicAI</span>
              <span className="text-xs text-slate-500 block">AI Public Infrastructure Monitoring System</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-cyan-400" /> Gemini Vision Multi-Modal</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-400" /> Geo-Spatial Clustering</span>
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Priority Engine v2.4</span>
          </div>

          <div className="text-xs text-slate-500">
            CivicAI Municipal Infrastructure Engine • Hackathon Demo Edition
          </div>
        </div>
      </div>
    </footer>
  );
};
