'use client';

import React, { useState } from 'react';
import { 
    User,
    Calendar,
    Clock
} from 'lucide-react';
import { DetailedCall } from '@/lib/calldata';

interface Props {
    callData: DetailedCall;
    totalDuration: number;
}

export default function CallTableCard({ callData, totalDuration }: Props) {
    return (
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {callData.agent.avatar}
              </div>
              <div>
                <p className="text-xs text-slate-400">Agent</p>
                <p className="text-sm font-medium text-white">{callData.agent.name}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-mono">{callData.agent.id}</p>
          </div>
  
          <div className="glass-effect rounded-2xl p-6">
            <User className="w-5 h-5 text-slate-400 mb-3" />
            <p className="text-xs text-slate-400 mb-1">Customer</p>
            <p className="text-sm font-medium text-white mb-1">{callData.customer.name}</p>
            <p className="text-xs text-slate-500 font-mono">{callData.customer.phone}</p>
          </div>
  
          <div className="glass-effect rounded-2xl p-6">
            <Calendar className="w-5 h-5 text-slate-400 mb-3" />
            <p className="text-xs text-slate-400 mb-1">Date & Time</p>
            <p className="text-sm font-medium text-white mb-1">{new Date(callData.date).toLocaleDateString()}</p>
            <p className="text-xs text-slate-500">{callData.time}</p>
          </div>
  
          <div className="glass-effect rounded-2xl p-6">
            <Clock className="w-5 h-5 text-slate-400 mb-3" />
            <p className="text-xs text-slate-400 mb-1">Duration</p>
            <p className="text-2xl font-bold text-white font-mono mb-1">{callData.duration}</p>
            <p className="text-xs text-slate-500">{totalDuration} seconds</p>
          </div>
        </div>
    );
}