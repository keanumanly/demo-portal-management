'use client';

import React, { useState, ElementType } from 'react';
import { Minus, ArrowUpRight, ArrowDownRight,
    Phone, Clock, Target, Star, Users, Activity } from 'lucide-react';
    import { AGENTS } from '@/lib/analytics';

interface Props {
    volumeData: { label: string; calls: number; resolved: number }[];
    totalCalls: number;
    totalResolved: number;
    fcrRate: number;
}

export default function CallVolumeCard({ volumeData, totalCalls, totalResolved, fcrRate }: Props) {

    function BarGroup({ data, height = 120 }: { data: { label: string; calls: number; resolved: number }[]; height?: number }) {
      const max = Math.max(...data.map(d => d.calls));
      return (
        <div className="flex items-end gap-2 w-full" style={{ height }}>
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 items-end" style={{ height: height - 20 }}>
                {/* Total bar */}
                <div className="flex-1 rounded-t-sm bg-cyan-500/25 hover:bg-cyan-500/40 transition-colors relative group"
                  style={{ height: `${(d.calls / max) * 100}%` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{d.calls}</div>
                </div>
                {/* Resolved bar */}
                <div className="flex-1 rounded-t-sm bg-emerald-500/50 hover:bg-emerald-500/70 transition-colors relative group"
                  style={{ height: `${(d.resolved / max) * 100}%` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-emerald-400 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{d.resolved}</div>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-600">{d.label}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Call Volume</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Total vs Resolved</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/40" /> Total</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50" /> Resolved</span>
            </div>
          </div>
          <BarGroup data={volumeData} height={140} />
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-xs font-mono">
            <span className="text-slate-500">Total: <span className="text-white">{totalCalls}</span></span>
            <span className="text-slate-500">Resolved: <span className="text-emerald-400">{totalResolved}</span></span>
            <span className="text-slate-500">FCR: <span className="text-cyan-400">{fcrRate}%</span></span>
          </div>
        </div>
    );
}