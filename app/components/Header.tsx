'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  todayCalls?: number;
  avgDuration?: string;
  sentiment?: number;
}

export default function Header({ 
  todayCalls = 1247, 
  avgDuration = '4:32', 
  sentiment = 87 
}: HeaderProps) {
  return (
    <header className="glass-effect border-b border-slate-800/50 px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search calls, agents, transcripts..."
            className="
              pl-10 pr-4 py-2 w-96
              bg-slate-800/50 border border-slate-700/50 rounded-lg 
              text-sm text-slate-200 placeholder-slate-500 
              focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800 
              transition-all
            "
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="flex items-center gap-6 px-4 py-2 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <StatItem label="Today" value={todayCalls.toLocaleString()} />
            <Divider />
            <StatItem label="Avg Duration" value={avgDuration} />
            <Divider />
            <StatItem label="Sentiment" value={`${sentiment}%`} valueColor="text-emerald-400" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">Team Manager</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper Components
function StatItem({ 
  label, 
  value, 
  valueColor = 'text-white' 
}: { 
  label: string; 
  value: string; 
  valueColor?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className={`text-sm font-bold font-mono ${valueColor}`}>{value}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-slate-700" />;
}