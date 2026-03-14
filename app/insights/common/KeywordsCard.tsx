'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Target, AlertTriangle, Flame } from 'lucide-react';
import { KeywordStat } from '@/lib/insights';

interface Props {
    KEYWORDS: KeywordStat[];
    HOUR_HEATMAP: number[];
    maxHeat: number;
}

export default function KeywordsCard({ KEYWORDS, HOUR_HEATMAP, maxHeat}: Props) {

    return (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/30 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Keyword Frequency</span>
              <span className="text-xs font-mono text-slate-500">Last 7 days</span>
            </div>
            <div className="divide-y divide-slate-800/60">
              {KEYWORDS.map(kw => (
                <div key={kw.word} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800/30 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${kw.sentiment === "positive" ? "bg-emerald-400" : kw.sentiment === "negative" ? "bg-rose-400" : "bg-slate-400"}`} />
                  <span className="font-mono text-sm text-white flex-1">"{kw.word}"</span>
                  <span className="text-xs font-mono text-slate-500 w-24 text-center">{kw.category}</span>
                  <span className="text-sm font-bold text-white w-8 text-right">{kw.count}</span>
                  <span className={`text-xs font-mono w-14 text-right flex items-center justify-end gap-0.5 ${kw.delta > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                    {kw.delta > 0 ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}{Math.abs(kw.delta)}%
                  </span>
                  <div className="w-16 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${kw.sentiment === "positive" ? "bg-emerald-500" : kw.sentiment === "negative" ? "bg-rose-500" : "bg-slate-500"}`} style={{ width: `${Math.min((kw.count/89)*100,100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">Call Volume by Hour</span>
              <span className="text-xs font-mono text-slate-500">Avg weekly pattern</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5 mb-3">
              {HOUR_HEATMAP.map((v, i) => {
                const intensity = v / maxHeat;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-full rounded-md transition-all" style={{ height: `${Math.max(8, intensity*56)}px`, background: `rgba(6,182,212,${0.1+intensity*0.85})`, boxShadow: intensity > 0.6 ? `0 0 8px rgba(6,182,212,${intensity*0.4})` : "none" }} title={`${i}:00 — ${v} calls`} />
                    <span className="text-xs font-mono text-slate-600">{i}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 px-3 py-2.5 rounded-lg bg-amber-500/8 border border-amber-500/15">
              <div className="flex items-center gap-2 mb-1"><AlertTriangle size={11} className="text-amber-400" /><span className="text-xs font-mono text-amber-400">Pattern detected</span></div>
              <p className="text-xs text-slate-400">Monday 8–10 AM shows 12% lower sentiment than weekly average. Consider staffing additional senior agents during this window.</p>
            </div>
          </div>
        </div>
    );
}