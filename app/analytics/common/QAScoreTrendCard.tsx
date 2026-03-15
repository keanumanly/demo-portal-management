'use client';

import React, { useState, ElementType } from 'react';
import { TrendingUp } from "lucide-react";
interface Props {
    qaData: { label: string; score: number; team: number }[];
}

export default function QAScoreTrendCard({ qaData }: Props) {

    function LineChart({ data, height = 100 }: {
      data: { label: string; score: number; team: number }[];
      height?: number;
    }) {
      const allVals = data.flatMap(d => [d.score, d.team]);
      const min = Math.min(...allVals) - 4;
      const max = Math.max(...allVals) + 4;
      const range = max - min;
      const w = 100 / (data.length - 1);
    
      const pts = (key: "score" | "team") =>
        data.map((d, i) => `${i * w},${100 - ((d[key] - min) / range) * 100}`).join(" ");
    
      return (
        <div style={{ height }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            ))}
            {/* Team line */}
            <polyline points={pts("team")} fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="1.2" strokeDasharray="2 2" />
            {/* Score line */}
            <polyline points={pts("score")} fill="none" stroke="#06b6d4" strokeWidth="1.8" />
            {/* Score area fill */}
            <polyline
              points={`0,100 ${pts("score")} 100,100`}
              fill="url(#scoreGrad)" opacity="0.15"
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Dots on score line */}
            {data.map((d, i) => (
              <circle key={i} cx={i * w} cy={100 - ((d.score - min) / range) * 100}
                r="1.8" fill="#06b6d4" stroke="#0f172a" strokeWidth="0.8" />
            ))}
          </svg>
          {/* X labels */}
          <div className="flex justify-between mt-1">
            {data.map((d, i) => (
              <span key={i} className="text-xs font-mono text-slate-600">{d.label}</span>
            ))}
          </div>
        </div>
      );
    }

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">QA Score Trend</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Team avg vs benchmark</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-cyan-500 rounded" /> Score
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-px bg-violet-400/60 border-t border-dashed border-violet-400/60" /> Team
              </span>
            </div>
          </div>
          <LineChart data={qaData} height={120} />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/60 text-xs font-mono">
            <span className="text-slate-500">Start: <span className="text-white">{qaData[0].score}</span></span>
            <span className="text-slate-500">Current: <span className="text-cyan-400">{qaData[qaData.length-1].score}</span></span>
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp size={11}/> +{qaData[qaData.length-1].score - qaData[0].score} pts
            </span>
          </div>
        </div>
    );
}