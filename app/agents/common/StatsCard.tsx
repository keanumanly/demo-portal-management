'use client';

import React, { useState } from 'react';
import { 
    Users,
    Star,
    Phone,
    Clock
} from 'lucide-react';

export default function StatsCard() {
    return (
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Agents', value: '12', icon: <Users className="w-5 h-5" />, color: 'from-cyan-500 to-blue-500' },
            { label: 'Total Calls Today', value: '847', icon: <Phone className="w-5 h-5" />, color: 'from-violet-500 to-purple-500' },
            { label: 'Avg Response Time', value: '23s', icon: <Clock className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500' },
            { label: 'Team Satisfaction', value: '89.2%', icon: <Star className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' }
          ].map((stat, idx) => (
            <div key={idx} className="glass-effect rounded-2xl p-6">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-white font-mono">{stat.value}</p>
            </div>
          ))}
        </div>
    );
}