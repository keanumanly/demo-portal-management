'use client';

import React, { useState } from 'react';
import { 
    ThumbsUp,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { DetailedCall } from '@/lib/calldata';

interface InsightProps { 
    label: string; 
    value: string;
    status: string; 
}

interface Props {
    callData: DetailedCall;
    insights: InsightProps[];
}

export default function AnalysisCard({ callData, insights }: Props) {

    return (
        <div className="space-y-6">
          {/* Sentiment */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Sentiment Analysis</h3>
            
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgb(51, 65, 85)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - callData.sentimentScore / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(16, 185, 129)" />
                      <stop offset="100%" stopColor="rgb(6, 182, 212)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{callData.sentimentScore}%</p>
                    <p className="text-xs text-slate-400">Positive</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Positive Outcome</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Positive</span>
                <span className="text-sm font-bold text-emerald-400">87.5%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '87.5%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Neutral</span>
                <span className="text-sm font-bold text-slate-400">10.2%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500" style={{ width: '10.2%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Negative</span>
                <span className="text-sm font-bold text-rose-400">2.3%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '2.3%' }}></div>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Topics Discussed</h3>
            <div className="flex flex-wrap gap-2">
              {callData.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-sm text-cyan-400 font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Call Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">{insight.label}</p>
                    <p className="text-sm font-medium text-white">{insight.value}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-1 ${
                    insight.status === 'excellent' ? 'bg-emerald-400' :
                    insight.status === 'good' ? 'bg-cyan-400' : 'bg-amber-400'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Status */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              {callData.resolution ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  {callData.resolution ? 'Issue Resolved' : 'Follow-up Required'}
                </p>
                <p className="text-xs text-slate-400">
                  {callData.resolution ? 'Customer satisfied with solution' : 'Escalation needed'}
                </p>
              </div>
            </div>
          </div>
        </div>
    );
}