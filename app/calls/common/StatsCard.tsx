'use client';

import React, { useState } from 'react';
import { 
    ThumbsUp,
    MessageSquare,
    Phone,
    Clock
} from 'lucide-react';

export default function StatsCard() {
    return (
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Calls Today', 
              value: '1,247', 
              icon: <Phone className="w-5 h-5" />, 
              color: 'from-cyan-500 to-blue-500' 
            },
            { 
              label: 'Avg Duration', 
              value: '4:32', 
              icon: <Clock className="w-5 h-5" />, 
              color: 'from-violet-500 to-purple-500' 
            },
            { 
              label: 'Positive Calls', 
              value: '72.3%', 
              icon: <ThumbsUp className="w-5 h-5" />, 
              color: 'from-emerald-500 to-teal-500' 
            },
            { 
              label: 'Resolved', 
              value: '92.1%', 
              icon: <MessageSquare className="w-5 h-5" />, 
              color: 'from-amber-500 to-orange-500' 
            }
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