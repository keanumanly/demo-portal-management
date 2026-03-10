'use client';

import React, { useState } from 'react';
import { 
    MessageSquare,
    Star,
    Phone,
    Clock,
    ThumbsUp
} from 'lucide-react';
import { Agent } from '@/lib/agent';

interface Props {
    agents: Agent[];
}

export default function AgentCard({ agents }: Props) {
    
    return (
        <div className="grid grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="glass-effect rounded-2xl p-6 hover:translate-y-[-4px] transition-transform">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                      {agent.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                      agent.status === 'online' ? 'bg-emerald-400' :
                      agent.status === 'busy' ? 'bg-amber-400' : 'bg-slate-500'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                    <p className="text-sm text-slate-400 capitalize">{agent.status}</p>
                  </div>
                </div>
  
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-white">{agent.rating}</span>
                </div>
              </div>
  
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <Phone className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-400 mb-1">Calls</p>
                  <p className="text-lg font-bold text-white font-mono">{agent.totalCalls}</p>
                </div>
                <div>
                  <Clock className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-400 mb-1">Avg Time</p>
                  <p className="text-lg font-bold text-white font-mono">{agent.avgDuration}</p>
                </div>
                <div>
                  <ThumbsUp className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-400 mb-1">Sentiment</p>
                  <p className="text-lg font-bold text-emerald-400 font-mono">{agent.sentimentScore}%</p>
                </div>
                <div>
                  <MessageSquare className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-xs text-slate-400 mb-1">Resolution</p>
                  <p className="text-lg font-bold text-cyan-400 font-mono">{agent.resolutionRate}%</p>
                </div>
              </div>
  
              {/* Performance Bars */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Customer Satisfaction</span>
                    <span className="text-xs font-bold text-white">{agent.sentimentScore}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        agent.sentimentScore >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                        agent.sentimentScore >= 80 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                        'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`}
                      style={{ width: `${agent.sentimentScore}%` }}
                    ></div>
                  </div>
                </div>
  
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Resolution Rate</span>
                    <span className="text-xs font-bold text-white">{agent.resolutionRate}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${agent.resolutionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    );
}