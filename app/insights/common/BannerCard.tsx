'use client';

import React, { useState } from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface Props {
    criticalCount: number;
    warningCount: number;
    setActiveSeverity: React.Dispatch<React.SetStateAction<string>>;
    setTab: React.Dispatch<React.SetStateAction<"insights"|"coaching"|"keywords"|"patterns">>;
}

export default function BannerCard({ criticalCount, warningCount, setActiveSeverity, setTab }: Props) {
    return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/8 border border-rose-500/25">
          <div className="p-1.5 rounded-lg bg-rose-500/15"><AlertTriangle size={14} className="text-rose-400" /></div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-rose-300">{criticalCount} critical signal{criticalCount > 1 ? "s" : ""} detected</span>
            <span className="text-sm text-slate-400 ml-2">— {warningCount} additional warning{warningCount > 1 ? "s" : ""} require attention.</span>
          </div>
          <button onClick={() => { setActiveSeverity("critical"); setTab("insights"); }}
            className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1">
            View all <ChevronRight size={12} />
          </button>
        </div>
    );
}