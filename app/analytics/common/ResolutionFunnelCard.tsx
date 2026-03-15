'use client';

import React, { useState, ElementType } from 'react';
import { TrendingUp } from "lucide-react";

interface Props {
    FUNNEL: { label: string; value: number; pct: number; color: string }[];
}

export default function ResolutionFunnelCard({ FUNNEL }: Props) {

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Resolution Funnel</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Call journey breakdown</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {FUNNEL.map((stage, i) => (
              <div key={stage.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-600 w-4">{i+1}</span>
                    <span className="text-sm text-slate-300">{stage.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{stage.value.toLocaleString()}</span>
                    <span className={`text-xs font-mono font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                      {stage.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stage.color} rounded-full`}
                    style={{ width: `${stage.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}