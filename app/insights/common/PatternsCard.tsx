'use client';

import React, { useState } from 'react';
import { Sparkles, Users, MessageSquare, Zap } from 'lucide-react';
import { PatternItem } from '@/lib/insights';

interface Props {
    PATTERNS: PatternItem[];
}

export default function PatternsCard({ PATTERNS }: Props) {

    return (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-white">Call Reason Breakdown</span>
              <span className="text-xs font-mono text-slate-500">AI-classified</span>
            </div>
            <div className="space-y-4">
              {PATTERNS.map(p => (
                <div key={p.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300">{p.label}</span>
                    <span className="text-sm font-mono font-bold text-white">{p.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${p.color} rounded-full`} style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-white">Sentiment Drift (7 days)</span>
              <span className="text-xs font-mono text-slate-500">Daily avg</span>
            </div>
            <div className="space-y-3">
              {[
                { day: "Mon", pos: 31, neu: 44, neg: 25 },
                { day: "Tue", pos: 38, neu: 42, neg: 20 },
                { day: "Wed", pos: 42, neu: 41, neg: 17 },
                { day: "Thu", pos: 45, neu: 38, neg: 17 },
                { day: "Fri", pos: 48, neu: 36, neg: 16 },
                { day: "Sat", pos: 52, neu: 34, neg: 14 },
                { day: "Sun", pos: 50, neu: 35, neg: 15 },
              ].map(day => (
                <div key={day.day} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500 w-7">{day.day}</span>
                  <div className="flex-1 flex gap-0.5 h-5 rounded-md overflow-hidden">
                    <div className="bg-emerald-500/70 flex items-center justify-center" style={{ width: `${day.pos}%` }}><span className="text-xs font-mono text-white/80">{day.pos}%</span></div>
                    <div className="bg-slate-600/50 flex items-center justify-center" style={{ width: `${day.neu}%` }}><span className="text-xs font-mono text-slate-400">{day.neu}%</span></div>
                    <div className="bg-rose-500/60 flex items-center justify-center" style={{ width: `${day.neg}%` }}><span className="text-xs font-mono text-white/70">{day.neg}%</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800">
              {[{ label:"Positive",color:"bg-emerald-500/70"},{ label:"Neutral",color:"bg-slate-600/50"},{ label:"Negative",color:"bg-rose-500/60"}].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><div className={`w-2.5 h-2.5 rounded-sm ${l.color}`}/><span className="text-xs font-mono text-slate-500">{l.label}</span></div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Sparkles size={14} className="text-violet-400" /><span className="text-sm font-semibold text-white">AI Recommendations</span></div>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: Users,         color: "from-rose-500 to-pink-500",   title: "Retention intervention",   body: "Assign James Okafor to a 1-on-1 coaching session focused on empathy language and interruption control before next week's shifts." },
                { icon: MessageSquare, color: "from-amber-500 to-orange-500", title: "Update retention script",  body: "The 34% spike in 'cancel' keyword and competitor mentions suggests the current retention offer script is underperforming. Refresh with competitive pricing data." },
                { icon: Zap,           color: "from-cyan-500 to-blue-500",    title: "Optimize lookup speed",   body: "Dead air spikes in Tech Support correlate with CRM lookup latency. Reducing lookup time by 2s could improve QA scores by an estimated 4–6 points." },
              ].map(rec => (
                <div key={rec.title} className="flex gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${rec.color} opacity-80 flex-shrink-0 h-fit`}><rec.icon size={13} className="text-white" /></div>
                  <div><h4 className="text-sm font-semibold text-white mb-1">{rec.title}</h4><p className="text-xs text-slate-400 leading-relaxed">{rec.body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}