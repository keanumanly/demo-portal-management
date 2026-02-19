'use client';

import React, { useState } from 'react';

interface Props {
    label: string,
    value: string,
    change: string
}
interface StatsProps {
  stats: Props[]
}

export default function StatsCard({ stats }: StatsProps) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-effect rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white font-mono mb-1">{stat.value}</p>
            <p className="text-xs text-emerald-400 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>
    );
}