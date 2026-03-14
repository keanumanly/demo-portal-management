'use client';

import React, { useState, ElementType } from 'react';
interface Props {
    sentimentData: { label: string; pos: number; neu: number; neg: number }[];
}

export default function SentimentTrendCard({ sentimentData }: Props) {

    function SentimentStack({ data }: { data: { label: string; pos: number; neu: number; neg: number }[] }) {
      return (
        <div className="flex items-end gap-1.5 w-full h-28">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col gap-px">
              <div className="flex flex-col rounded-sm overflow-hidden" style={{ height: 96 }}>
                <div className="bg-rose-500/65 transition-all" style={{ height: `${d.neg}%` }} title={`Neg ${d.neg}%`} />
                <div className="bg-slate-600/50 transition-all" style={{ height: `${d.neu}%` }} title={`Neu ${d.neu}%`} />
                <div className="bg-emerald-500/70 transition-all flex-1" title={`Pos ${d.pos}%`} />
              </div>
              <span className="text-xs font-mono text-slate-600 text-center mt-1">{d.label}</span>
            </div>
          ))}
        </div>
      );
    }
    

    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Sentiment Trend</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Positive / Neutral / Negative</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70" /> Pos</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-600/50" /> Neu</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500/65" /> Neg</span>
            </div>
          </div>
          <SentimentStack data={sentimentData} />
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-xs font-mono">
            {["pos","neu","neg"].map((k, i) => {
              const last = sentimentData[sentimentData.length - 1];
              const val = last[k as "pos"|"neu"|"neg"];
              const first = sentimentData[0];
              const prev = first[k as "pos"|"neu"|"neg"];
              const delta = val - prev;
              const colors = ["text-emerald-400","text-slate-400","text-rose-400"];
              const labels = ["Positive","Neutral","Negative"];
              return (
                <span key={k} className={`${colors[i]}`}>
                  {labels[i]}: {val}%
                  <span className={`ml-1 text-slate-600`}>
                    ({delta >= 0 ? "+" : ""}{delta})
                  </span>
                </span>
              );
            })}
          </div>
        </div>
    );
}