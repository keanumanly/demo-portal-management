'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    ThumbsUp,
    MessageSquare,
    ThumbsDown,
    FileText,
    Play
} from 'lucide-react';

interface Call {
  id: string;
  callId: string;
  agent: string;
  customer: string;
  phoneNumber: string;
  date: string;
  time: string;
  duration: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  resolution: boolean;
}

interface TableProps {
    filteredCalls: Call[];
}

export default function CallTableCard({ filteredCalls }: TableProps) {
    return (
        <div className="glass-effect rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Call ID</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Agent</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Topics</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sentiment</th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                    <td className="py-4 px-4">
                      <span className="text-cyan-400 font-mono text-sm font-medium">{call.callId}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {call.agent.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-white text-sm">{call.agent}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white text-sm font-medium">{call.customer}</p>
                        <p className="text-slate-400 text-xs font-mono">{call.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white text-sm">{new Date(call.date).toLocaleDateString()}</p>
                        <p className="text-slate-400 text-xs">{call.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-white text-sm">{call.duration}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {call.topics.map((topic, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 bg-slate-700/30 border border-slate-700/50 rounded text-xs text-slate-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        call.sentiment === 'positive'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : call.sentiment === 'neutral'
                          ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {call.sentiment === 'positive' ? <ThumbsUp className="w-3 h-3" /> : 
                         call.sentiment === 'neutral' ? <MessageSquare className="w-3 h-3" /> : 
                         <ThumbsDown className="w-3 h-3" />}
                        {call.sentiment}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/calls/${call.id}`}
                          className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors text-cyan-400"
                          title="View Details"
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors text-cyan-400"
                          title="Play Recording"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              Showing <span className="font-medium text-white">{filteredCalls.length}</span> of{' '}
              <span className="font-medium text-white">1,247</span> calls
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    page === 1
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
    );
}