'use client';

import React, { useState, ElementType } from 'react';


interface Props {
    TALK_RATIO: { queue: string; agent: number; customer: number }[];
}

export default function TalkRatioCard({ TALK_RATIO }: Props) {

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Talk Ratio</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Agent vs Customer by queue</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/60" /> Agent</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-violet-500/50" /> Customer</span>
            </div>
          </div>
          <div className="space-y-3">
            {TALK_RATIO.map(row => (
              <div key={row.queue}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-slate-400 w-20">{row.queue}</span>
                  <div className="flex-1 flex gap-0.5 rounded-md overflow-hidden mx-3 h-5">
                    <div className="bg-cyan-500/60 flex items-center justify-center transition-all"
                      style={{ width: `${row.agent}%` }}>
                      <span className="text-xs font-mono text-white/80">{row.agent}%</span>
                    </div>
                    <div className="bg-violet-500/50 flex items-center justify-center transition-all"
                      style={{ width: `${row.customer}%` }}>
                      <span className="text-xs font-mono text-white/70">{row.customer}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
            <p className="text-xs text-slate-400">
              <span className="text-cyan-400 font-mono">Insight: </span>
              Cancellations queue shows highest customer talk ratio (56%) — customers need more space to express concerns before resolution attempts.
            </p>
          </div>
        </div>
    );
}