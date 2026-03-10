'use client';

import React, { useState } from 'react';
import { 
    Users,
    Star,
    Phone,
    Clock
} from 'lucide-react';
import { Agent } from '@/lib/agent';

interface Props {
    agents: Agent[];
}

export default function TopPerformerCard({ agents }: Props) {
    const topPerformers = agents.sort((a, b) => b.sentimentScore - a.sentimentScore).slice(0, 3);
    
    return (
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((agent, idx) => (
              <div key={agent.id} className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-xl">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {agent.avatar}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{agent.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-400">{agent.rating} rating</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">{agent.sentimentScore}%</p>
                  <p className="text-xs text-slate-400">sentiment</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}