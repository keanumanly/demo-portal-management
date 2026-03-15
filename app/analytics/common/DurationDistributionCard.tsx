'use client';

import React, { useState, ElementType } from 'react';


interface Props {
    DURATION_DIST: { label: string; pct: number; color: string }[];
}

export default function DurationDistributionCard({ DURATION_DIST }: Props) {

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Duration Distribution</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">% of calls by length</p>
            </div>
          </div>
          {/* Donut-style stacked bar */}
          <div className="flex gap-1.5 h-8 rounded-lg overflow-hidden mb-5">
            {DURATION_DIST.map(d => (
              <div key={d.label} className={`${d.color} flex items-center justify-center transition-all hover:opacity-80`}
                style={{ width: `${d.pct}%` }} title={`${d.label}: ${d.pct}%`}>
                {d.pct >= 14 && <span className="text-xs font-mono text-white/80 whitespace-nowrap">{d.pct}%</span>}
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            {DURATION_DIST.map(d => (
              <div key={d.label} className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-sm ${d.color} flex-shrink-0`} />
                <span className="text-sm text-slate-300 w-16">{d.label}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-xs font-mono text-slate-400 w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <p className="text-xs text-slate-400">
              <span className="text-amber-400 font-mono">Note: </span>
              38% of calls fall in the 5–10m range. Calls over 10m have a 14% lower resolution rate on average.
            </p>
          </div>
        </div>
    );
}