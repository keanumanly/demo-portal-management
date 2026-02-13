'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause
} from 'lucide-react';

export default function DashboardPage() {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const [isLiveActive, setIsLiveActive] = useState(true);

  useEffect(() => {
    const targets = {
      totalCalls: 12847,
      avgDuration: 272,
      sentiment: 87.3,
      resolution: 92.1
    };

    Object.entries(targets).forEach(([key, target]) => {
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: current }));
      }, 16);
    });
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const metrics = [
    {
      title: 'Total Calls',
      value: Math.floor(animatedValues.totalCalls || 0).toLocaleString(),
      change: 12.5,
      trend: 'up',
      icon: <Phone className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Avg Call Duration',
      value: formatDuration(animatedValues.avgDuration || 0),
      change: -8.2,
      trend: 'down',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Positive Sentiment',
      value: `${(animatedValues.sentiment || 0).toFixed(1)}%`,
      change: 5.3,
      trend: 'up',
      icon: <ThumbsUp className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Resolution Rate',
      value: `${(animatedValues.resolution || 0).toFixed(1)}%`,
      change: 3.1,
      trend: 'up',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const recentCalls = [
    { id: '1', agent: 'Sarah Johnson', customer: 'John Doe', duration: '5:32', sentiment: 'positive', status: 'completed' },
    { id: '2', agent: 'Mike Chen', customer: 'Jane Smith', duration: '3:45', sentiment: 'neutral', status: 'completed' },
    { id: '3', agent: 'Emma Wilson', customer: 'Bob Brown', duration: '7:12', sentiment: 'positive', status: 'completed' },
    { id: '4', agent: 'Alex Kumar', customer: 'Alice Davis', duration: '2:18', sentiment: 'negative', status: 'escalated' },
  ];

  const weeklyData = [
    { day: 'Mon', calls: 1840, avgSentiment: 85 },
    { day: 'Tue', calls: 2120, avgSentiment: 88 },
    { day: 'Wed', calls: 2340, avgSentiment: 82 },
    { day: 'Thu', calls: 2580, avgSentiment: 90 },
    { day: 'Fri', calls: 2280, avgSentiment: 87 },
    { day: 'Sat', calls: 1650, avgSentiment: 84 },
    { day: 'Sun', calls: 1430, avgSentiment: 86 },
  ];

  const maxCalls = Math.max(...weeklyData.map(d => d.calls));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">Analytics Dashboard</h2>
        <p className="text-slate-400 font-mono text-sm">Real-time call analysis and performance metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="glass-effect rounded-2xl p-6 hover:translate-y-[-4px] transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} bg-opacity-20`}>
                {metric.icon}
              </div>
            </div>
            
            <h3 className="text-slate-400 text-sm font-medium mb-2">{metric.title}</h3>
            <p className="text-3xl font-bold text-white mb-2 font-mono">{metric.value}</p>
            
            <div className="flex items-center gap-1">
              {metric.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-400" />
              )}
              <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {Math.abs(metric.change)}%
              </span>
              <span className="text-sm text-slate-500">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Weekly Call Volume */}
        <div className="col-span-2 glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Weekly Call Volume</h3>
              <p className="text-sm text-slate-400">Calls and sentiment trends</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLiveActive(!isLiveActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isLiveActive 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/30'
                }`}
              >
                {isLiveActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isLiveActive ? 'Live' : 'Paused'}
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between h-64 gap-3">
            {weeklyData.map((data, idx) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end h-52">
                  <div
                    className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(data.calls / maxCalls) * 100}%`,
                      transitionDelay: `${idx * 50}ms`
                    }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 font-mono mb-0.5">{data.day}</p>
                  <p className="text-xs font-bold text-white">{data.calls}</p>
                  <p className={`text-xs font-medium ${
                    data.avgSentiment >= 85 ? 'text-emerald-400' : data.avgSentiment >= 70 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {data.avgSentiment}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Sentiment Analysis</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">Positive</span>
                </div>
                <span className="text-sm font-bold text-white">72.3%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '72.3%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">Neutral</span>
                </div>
                <span className="text-sm font-bold text-white">20.1%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-slate-500 to-slate-400 rounded-full" style={{ width: '20.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4 text-rose-400" />
                  <span className="text-sm text-slate-300">Negative</span>
                </div>
                <span className="text-sm font-bold text-white">7.6%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full" style={{ width: '7.6%' }}></div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Above Target</span>
              </div>
              <p className="text-xs text-slate-300">Sentiment scores improved by 5.3%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Calls</h3>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            View all →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Agent</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sentiment</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr key={call.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {call.agent.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-white text-sm">{call.agent}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 text-sm">{call.customer}</td>
                  <td className="py-4 px-4 font-mono text-white text-sm">{call.duration}</td>
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
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      call.status === 'completed'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}