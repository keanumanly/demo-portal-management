'use client';

import React, { useState } from 'react';

interface Props {
    action: string,
    time: string,
    type: string
}
interface ActivityProps {
    activity: Props[]
}

export default function RecentCard({ activity }: ActivityProps) {
    return (
        <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {activity.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}