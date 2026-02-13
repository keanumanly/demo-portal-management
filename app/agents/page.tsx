'use client';

import React from 'react';
import { 
  Users,
  Phone,
  Clock,
  TrendingUp,
  Star,
  Award,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  totalCalls: number;
  avgDuration: string;
  sentimentScore: number;
  resolutionRate: number;
  rating: number;
}

export default function AgentsPage() {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      status: 'online',
      totalCalls: 1247,
      avgDuration: '4:32',
      sentimentScore: 92.5,
      resolutionRate: 95.8,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'MC',
      status: 'online',
      totalCalls: 1089,
      avgDuration: '5:15',
      sentimentScore: 88.3,
      resolutionRate: 91.2,
      rating: 4.7
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'EW',
      status: 'busy',
      totalCalls: 956,
      avgDuration: '3:48',
      sentimentScore: 90.1,
      resolutionRate: 93.5,
      rating: 4.8
    },
    {
      id: '4',
      name: 'Alex Kumar',
      avatar: 'AK',
      status: 'online',
      totalCalls: 834,
      avgDuration: '4:05',
      sentimentScore: 85.7,
      resolutionRate: 89.3,
      rating: 4.6
    },
    {
      id: '5',
      name: 'Lisa Rodriguez',
      avatar: 'LR',
      status: 'offline',
      totalCalls: 721,
      avgDuration: '5:42',
      sentimentScore: 87.9,
      resolutionRate: 90.1,
      rating: 4.7
    },
    {
      id: '6',
      name: 'David Kim',
      avatar: 'DK',
      status: 'online',
      totalCalls: 1156,
      avgDuration: '4:18',
      sentimentScore: 91.2,
      resolutionRate: 94.3,
      rating: 4.8
    }
  ];

  const topPerformers = agents
    .sort((a, b) => b.sentimentScore - a.sentimentScore)
    .slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">Agent Performance</h2>
        <p className="text-slate-400 font-mono text-sm">Monitor and analyze agent metrics</p>
      </div>

      {/* Overview Stats */}
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

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Top Performers */}
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

        {/* Performance Distribution */}
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
      </div>

      {/* Agents Grid */}
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
    </div>
  );
}