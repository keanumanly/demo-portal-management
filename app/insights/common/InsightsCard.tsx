'use client';

import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronRight, Minus } from 'lucide-react';
import { InsightCard, SEVERITY_CONFIG, TYPE_ICON } from '@/lib/insights';

interface Props {
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
    activeSeverity: string;
    setActiveSeverity: React.Dispatch<React.SetStateAction<string>>;
    filtered: InsightCard[];
}

export default function InsightsCard({ activeFilter, setActiveFilter, activeSeverity, setActiveSeverity, filtered }: Props) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1.5">
              {["all","alert","trend","coaching","keyword","pattern"].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all border ${activeFilter === f
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600"}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 ml-auto">
              {["all","critical","warning","info","success"].map(s => (
                <button key={s} onClick={() => setActiveSeverity(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all border ${activeSeverity === s
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {filtered.map(insight => {
              const sc = SEVERITY_CONFIG[insight.severity];
              const Icon = TYPE_ICON[insight.type];
              const isExpanded = expanded === insight.id;
              return (
                <div key={insight.id}
                  className={`border rounded-xl transition-all cursor-pointer hover:brightness-110 ${sc.border} ${sc.bg}`}
                  onClick={() => setExpanded(isExpanded ? null : insight.id)}>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-slate-800/60 mt-0.5 flex-shrink-0 ${sc.icon}`}><Icon size={14} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${sc.badge}`}>{sc.label}</span>
                          <span className="text-xs text-slate-500 font-mono capitalize">{insight.type}</span>
                          {insight.agent && <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono">{insight.agent}</span>}
                          <span className="text-xs text-slate-600 font-mono ml-auto">{insight.timestamp}</span>
                        </div>
                        <h3 className="font-semibold text-white text-sm mb-1">{insight.title}</h3>
                        {insight.metric && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-white font-mono">{insight.metric}</span>
                            <span className={`flex items-center gap-0.5 text-xs font-mono font-semibold ${
                              insight.trend === "up" && insight.severity !== "success" ? "text-rose-400" :
                              insight.trend === "up" ? "text-emerald-400" :
                              insight.trend === "down" && insight.severity === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                              {insight.trend === "up" ? <ArrowUpRight size={13}/> : insight.trend === "down" ? <ArrowDownRight size={13}/> : <Minus size={13}/>}
                              {insight.metricDelta}
                            </span>
                          </div>
                        )}
                        {isExpanded && <p className="text-sm text-slate-300 leading-relaxed mb-3">{insight.body}</p>}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {insight.tags.map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/30 text-slate-500 font-mono">#{t}</span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight size={15} className={`text-slate-600 flex-shrink-0 mt-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
}