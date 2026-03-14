'use client';

import React, { useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { Range } from '@/lib/analytics';

interface Props {
    range: string;
    setRange: React.Dispatch<React.SetStateAction<Range>>;
    refreshing: boolean
    setRefreshing :React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ControlsCard({ range, setRange, refreshing, setRefreshing }: Props) {

    return (
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-slate-900/60 border border-slate-700/30 rounded-lg p-1">
            {(["7d","30d","90d"] as Range[]).map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${range === r
                  ? "bg-cyan-600 text-white shadow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 900); }}
            className="p-2 rounded-lg cursor-pointer bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={14} className={refreshing ? "animate-spin text-cyan-400" : ""} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg bg-slate-800 border border-slate-700/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-colors font-mono">
            <Download size={13} /> Export
          </button>
        </div>
    );
}