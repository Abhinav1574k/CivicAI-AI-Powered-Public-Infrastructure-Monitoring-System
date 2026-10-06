import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  AlertTriangle,
  LayoutDashboard,
  Sparkles,
  Zap,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Layers,
  Activity,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 py-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-800/60 shadow-lg">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-300">
              Next-Gen Municipal Infrastructure AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Smarter Cities.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Faster Repairs.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            AI-powered infrastructure monitoring that detects public issues, prioritizes what matters most, and verifies repairs using computer vision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/report"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-950/50 hover:scale-105"
            >
              <AlertTriangle className="h-5 w-5" />
              Report an Issue
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-base flex items-center justify-center gap-3 transition-all shadow-lg hover:scale-105"
            >
              <LayoutDashboard className="h-5 w-5 text-cyan-400" />
              Open Command Center
            </Link>
          </div>

          {/* Visually Impressive Command Center Preview Banner */}
          <div className="mt-16 relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl bg-slate-900/90 group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none"></div>

            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">civic-ai.gov/dashboard</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-semibold">
                <Activity className="h-3.5 w-3.5" /> LIVE MUNICIPAL STREAM
              </span>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Preview Card 1 */}
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/60 font-bold">
                    CRITICAL #1042
                  </span>
                  <span className="text-xs font-extrabold text-cyan-400 font-mono">Priority 94/100</span>
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Deep Structural Pothole</h4>
                <p className="text-xs text-slate-400">MG Road Junction • 17 Citizen Reports Clustered</p>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> AI Priority Auto-Escalated
                </div>
              </div>

              {/* Preview Card 2 */}
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800/60 font-bold">
                    HIGH #812
                  </span>
                  <span className="text-xs font-extrabold text-amber-400 font-mono">Priority 91/100</span>
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Overflowing Storm Drain</h4>
                <p className="text-xs text-slate-400">Indiranagar 100ft Road • Public Health Risk</p>
                <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-semibold pt-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Work Order #WO-8841 Dispatched
                </div>
              </div>

              {/* Preview Card 3 */}
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 font-bold">
                    VERIFIED #331
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">96% Accuracy</span>
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Streetlight Fixture Restored</h4>
                <p className="text-xs text-slate-400">Koramangala 5th Block • Restored 100% Lumens</p>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> AI Repair Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-extrabold">
            Core Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            3 Core Capabilities Built for Municipal Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Capability 1 */}
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all duration-300 group shadow-xl">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">AI Computer Vision Detection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gemini Multi-Modal Vision instant classification of potholes, waterlogging, damaged pavement, and dark corridors with severity analysis.
            </p>
          </div>

          {/* Capability 2 */}
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-indigo-500/50 transition-all duration-300 group shadow-xl">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Priority Intelligence Engine</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Algorithmic priority matrix factoring AI severity score (40%), report frequency (20%), issue age (15%), and traffic exposure vector.
            </p>
          </div>

          {/* Capability 3 */}
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-emerald-500/50 transition-all duration-300 group shadow-xl">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Automated Repair Verification</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Post-repair photo analysis verifying complete defect remediation prior to work order closure and contractor payment release.
            </p>
          </div>
        </div>
      </section>

      {/* WORKFLOW PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-extrabold">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Detect → Prioritize → Resolve → Verify
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs font-extrabold">STEP 1</span>
              <h4 className="font-extrabold text-lg text-white">Detect</h4>
              <p className="text-xs text-slate-400">Citizen uploads photo; AI identifies issue type & severity.</p>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 font-mono text-xs font-extrabold">STEP 2</span>
              <h4 className="font-extrabold text-lg text-white">Prioritize</h4>
              <p className="text-xs text-slate-400">Priority Engine calculates 0-100 score & merges duplicate reports.</p>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-950 text-amber-400 font-mono text-xs font-extrabold">STEP 3</span>
              <h4 className="font-extrabold text-lg text-white">Resolve</h4>
              <p className="text-xs text-slate-400">Dispatched automatically to responsible municipal department.</p>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono text-xs font-extrabold">STEP 4</span>
              <h4 className="font-extrabold text-lg text-white">Verify</h4>
              <p className="text-xs text-slate-400">Computer vision checks field completion photo against baseline.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Explore Live Command Center <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
