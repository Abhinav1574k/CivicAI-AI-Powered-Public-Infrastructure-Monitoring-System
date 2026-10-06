import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Cpu,
  ArrowRight,
  RefreshCw,
  ShieldAlert,
  Building2,
  Activity,
  FileCheck,
} from 'lucide-react';
import { analyzeImageFile, submitIssueReport } from '../services/api';
import { AIAnalysisResult, Issue } from '../types';

export const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedIssue, setSubmittedIssue] = useState<Issue | null>(null);

  // Preset demo image option if user doesn't upload custom file
  const handleSelectSample = (url: string) => {
    setImagePreview(url);
    setSelectedFile(null);
    setAnalysisResult(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeImageFile(selectedFile || undefined);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Error analyzing image:', err);
    } finally {
      setTimeout(() => setAnalyzing(false), 800);
    }
  };

  const handleSubmitReport = async () => {
    if (!analysisResult) return;
    setSubmitting(true);
    try {
      const sampleImg = imagePreview || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
      const created = await submitIssueReport({
        type: analysisResult.issueType,
        severity: analysisResult.severity,
        confidence: analysisResult.confidence,
        department: analysisResult.department,
        description: analysisResult.description,
        recommendedAction: analysisResult.recommendedAction,
        riskFactors: analysisResult.riskFactors,
        image: sampleImg,
        locationName: 'MG Road Junction, Ward 112',
        latitude: 12.9716,
        longitude: 77.5946,
      });
      setSubmittedIssue(created);
    } catch (err) {
      console.error('Error submitting issue:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedIssue) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="h-20 w-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h2 className="text-3xl font-extrabold text-white">Your report has been submitted.</h2>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-mono font-semibold block">
            Generated Incident Identifier
          </span>
          <div className="text-4xl font-extrabold font-mono text-cyan-400 bg-slate-950 py-3 px-6 rounded-xl border border-cyan-800/60 inline-block shadow-lg">
            {submittedIssue.id}
          </div>
          <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
            Report registered under <strong>{submittedIssue.department}</strong> with an initial AI Priority Score of{' '}
            <span className="text-cyan-400 font-bold">{submittedIssue.priorityScore}/100</span>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate(`/issues/${submittedIssue.id}`)}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            View Issue Details <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm"
          >
            Open Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
            Citizen Portal
          </span>
          <span className="text-xs text-slate-400 font-medium">CivicAI Multi-Modal Upload</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-2">Report Infrastructure Issue</h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload an image of a public defect. Gemini AI Vision automatically classifies severity, risk, and department assignment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Image Upload / Demo Selector */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Upload Defect Image
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/60 bg-slate-950 group h-64">
                <img src={imagePreview} alt="Upload preview" className="h-full w-full object-cover" />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedFile(null);
                    setAnalysisResult(null);
                  }}
                  className="absolute top-3 right-3 px-3 py-1 bg-slate-950/90 text-red-400 border border-red-800 text-xs font-bold rounded-lg"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="h-64 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-900/50 hover:bg-slate-900 transition-all flex flex-col items-center justify-center cursor-pointer p-6 text-center group">
                <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-slate-200">Click or drag image here</span>
                <span className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WEBP (Max 10MB)</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Quick Demo Image Selection */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-semibold block">Or select a demo infrastructure photo:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectSample('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80')}
                className="p-1 rounded-lg border border-slate-800 hover:border-cyan-500 bg-slate-900 overflow-hidden text-left"
              >
                <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80" alt="Pothole" className="h-14 w-full object-cover rounded" />
                <span className="text-[10px] font-bold text-slate-300 block text-center mt-1">Pothole</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80')}
                className="p-1 rounded-lg border border-slate-800 hover:border-cyan-500 bg-slate-900 overflow-hidden text-left"
              >
                <img src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=400&q=80" alt="Drain" className="h-14 w-full object-cover rounded" />
                <span className="text-[10px] font-bold text-slate-300 block text-center mt-1">Drain</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80')}
                className="p-1 rounded-lg border border-slate-800 hover:border-cyan-500 bg-slate-900 overflow-hidden text-left"
              >
                <img src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80" alt="Streetlight" className="h-14 w-full object-cover rounded" />
                <span className="text-[10px] font-bold text-slate-300 block text-center mt-1">Light</span>
              </button>
            </div>
          </div>

          {/* Location Badge */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Location</span>
                <span className="text-xs font-bold text-slate-200">Using current location (MG Road, Ward 112)</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              GPS Lock
            </span>
          </div>

          {/* Action 2: Analyze Button */}
          {imagePreview && !analysisResult && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-950/50 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                  Analyzing image with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </button>
          )}
        </div>

        {/* RIGHT: AI Analysis Output */}
        <div className="space-y-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            2. AI Computer Vision Diagnostic
          </label>

          {analysisResult ? (
            <div className="bg-slate-900/90 border border-cyan-800/60 rounded-2xl p-6 space-y-5 shadow-2xl relative">
              {/* Header result */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-extrabold text-slate-400 block uppercase">Issue Classification</span>
                  <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    {analysisResult.issueType}
                    <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
                      {Math.round(analysisResult.confidence * 100)}% Confidence
                    </span>
                  </h3>
                </div>

                <span
                  className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                    analysisResult.severity === 'CRITICAL'
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : analysisResult.severity === 'HIGH'
                      ? 'bg-orange-950 text-orange-400 border border-orange-800'
                      : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                  }`}
                >
                  {analysisResult.severity}
                </span>
              </div>

              {/* Demo mode banner if applicable */}
              {analysisResult.isDemoMode && (
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-center justify-between text-xs text-amber-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Activity className="h-3.5 w-3.5 text-amber-400" /> AI Demo Mode
                  </span>
                  <span className="text-[10px] text-amber-400/80">GEMINI_API_KEY environment variable unconfigured</span>
                </div>
              )}

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Risk Score</span>
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">
                    {analysisResult.riskScore}/100
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Recommended Dept</span>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">
                    {analysisResult.department}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Recommended Action</span>
                <p className="text-xs text-slate-200 font-medium bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {analysisResult.recommendedAction}
                </p>
              </div>

              {/* Risk Factors */}
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Assessed Risk Factors</span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {analysisResult.riskFactors.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Explanation */}
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800">
                "{analysisResult.description}"
              </p>

              {/* Submit Button */}
              <button
                onClick={handleSubmitReport}
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-950/50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-slate-950" /> Submitting Report...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Submit Report to Municipal System
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="h-72 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col items-center justify-center text-center">
              <Cpu className="h-10 w-10 text-slate-600 mb-3" />
              <span className="text-sm font-bold text-slate-400">Awaiting Image Input</span>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Select or upload a defect image on the left, then click "Analyze with AI" to generate real-time diagnostic output.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
