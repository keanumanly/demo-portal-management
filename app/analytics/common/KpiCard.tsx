'use client';

import React, { useState, ElementType } from 'react';
import { Minus, ArrowUpRight, ArrowDownRight,
    Phone, Clock, Target, Star, Users, Activity } from 'lucide-react';
    import { AGENTS } from '@/lib/analytics';

interface Props {
    totalCalls: number;
    fcrRate: number;
}

export default function KpiCard({ totalCalls, fcrRate }: Props) {
    const kpis = [
      { label: "Total Calls",      value: totalCalls,         unit: "",    delta: +12, icon: Phone,      color: "from-cyan-500 to-blue-500", deltaGood: "down" },
      { label: "Avg Duration",     value: "7m 14s",           unit: "",    delta: -8,  icon: Clock,      color: "from-violet-500 to-purple-500", deltaGood: "down" },
      { label: "FCR Rate",         value: `${fcrRate}%`,      unit: "",    delta: +5,  icon: Target,     color: "from-emerald-500 to-teal-500", deltaGood: "down" },
      { label: "Avg QA Score",     value: 80,                 unit: "/100",delta: +6,  icon: Star,       color: "from-amber-500 to-orange-500", deltaGood: "down" },
      { label: "Agents Active",    value: AGENTS.length,      unit: "",    delta: 0,   icon: Users,      color: "from-slate-500 to-slate-400", deltaGood: "down" },
      { label: "Escalation Rate",  value: "11%",              unit: "",    delta: -3,  icon: Activity,   color: "from-rose-500 to-pink-500",    deltaGood: "down" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpis.map(kpi => {
            const isGood = kpi.deltaGood === "down" ? kpi.delta < 0 : kpi.delta > 0;
            const isFlat = kpi.delta === 0;
            return (
              <div key={kpi.label} className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-mono leading-tight">{kpi.label}</span>
                  <div className={`p-1 rounded-md bg-gradient-to-br ${kpi.color} opacity-70`}>
                    <kpi.icon size={11} className="text-white" />
                  </div>
                </div>
                <div className={`text-xl font-bold bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent leading-none`}>
                  {kpi.value}{kpi.unit}
                </div>
                <div className={`flex items-center gap-0.5 mt-1.5 text-xs font-mono ${
                  isFlat ? "text-slate-500" : isGood ? "text-emerald-400" : "text-rose-400"}`}>
                  {isFlat
                    ? <Minus size={11} />
                    : kpi.delta > 0
                    ? <ArrowUpRight size={11} />
                    : <ArrowDownRight size={11} />}
                  {isFlat ? "No change" : `${Math.abs(kpi.delta)}% vs prev`}
                </div>
              </div>
            );
          })}
        </div>
    );
}