'use client';

import React, { useState, ElementType } from 'react';

interface QueueProps { 
    name: string; 
    color: string;
    calls: number;
    pct: number;
    fcr: number; 
    avgScore: number;
    dot: string; 
}

interface Props {
    QUEUES: QueueProps[];
}

export default function QueueCard({ QUEUES }: Props) {

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/30">
            <h3 className="text-sm font-semibold text-white">Queue Breakdown</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Volume and quality by queue</p>
          </div>
          <div className="divide-y divide-slate-800/40">
            {QUEUES.map(q => (
              <div key={q.name} className="px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${q.dot}`} />
                    <span className="text-sm text-white">{q.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>QA <span className={q.avgScore >= 80 ? "text-emerald-400" : q.avgScore >= 70 ? "text-amber-400" : "text-rose-400"}>{q.avgScore}</span></span>
                    <span>FCR <span className="text-cyan-400">{q.fcr}%</span></span>
                    <span className="text-white font-bold">{q.calls}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${q.color} rounded-full`} style={{ width: `${q.pct}%` }} />
                </div>
                <div className="text-xs font-mono text-slate-600 mt-1">{q.pct}% of total volume</div>
              </div>
            ))}
          </div>
        </div>
    );
}