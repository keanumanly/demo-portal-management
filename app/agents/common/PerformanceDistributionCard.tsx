'use client';

import React, { useState } from 'react';
import { Award } from 'lucide-react';

export default function PerformanceDistributionCard() {
    
    return (
        <div className="col-span-2 glass-effect rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Performance Distribution</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Excellent (90%+)</span>
                <span className="text-sm font-bold text-emerald-400">4 agents</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '67%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Good (80-90%)</span>
                <span className="text-sm font-bold text-cyan-400">2 agents</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '33%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Needs Improvement 80%</span>
                <span className="text-sm font-bold text-amber-400">0 agents</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: '0%' }}></div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Team Performing Well</span>
              </div>
              <p className="text-xs text-slate-300">100% of agents meeting performance targets</p>
            </div>
          </div>
        </div>
    );
}