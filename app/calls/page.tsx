'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Play,
  FileText
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

export default function CallsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const calls: Call[] = [
    {
      id: '1',
      callId: 'CALL-2024-001',
      agent: 'Sarah Johnson',
      customer: 'John Doe',
      phoneNumber: '+1 (555) 123-4567',
      date: '2024-02-13',
      time: '09:15 AM',
      duration: '5:32',
      sentiment: 'positive',
      topics: ['Billing', 'Account'],
      resolution: true
    },
    {
      id: '2',
      callId: 'CALL-2024-002',
      agent: 'Mike Chen',
      customer: 'Jane Smith',
      phoneNumber: '+1 (555) 234-5678',
      date: '2024-02-13',
      time: '09:28 AM',
      duration: '3:45',
      sentiment: 'neutral',
      topics: ['Technical Support'],
      resolution: true
    },
    {
      id: '3',
      callId: 'CALL-2024-003',
      agent: 'Emma Wilson',
      customer: 'Bob Brown',
      phoneNumber: '+1 (555) 345-6789',
      date: '2024-02-13',
      time: '09:42 AM',
      duration: '7:12',
      sentiment: 'positive',
      topics: ['Product Inquiry', 'Sales'],
      resolution: true
    },
    {
      id: '4',
      callId: 'CALL-2024-004',
      agent: 'Alex Kumar',
      customer: 'Alice Davis',
      phoneNumber: '+1 (555) 456-7890',
      date: '2024-02-13',
      time: '10:05 AM',
      duration: '2:18',
      sentiment: 'negative',
      topics: ['Complaint', 'Refund'],
      resolution: false
    },
    {
      id: '5',
      callId: 'CALL-2024-005',
      agent: 'Sarah Johnson',
      customer: 'Charlie Wilson',
      phoneNumber: '+1 (555) 567-8901',
      date: '2024-02-13',
      time: '10:22 AM',
      duration: '4:56',
      sentiment: 'positive',
      topics: ['Account Setup'],
      resolution: true
    },
  ];

  const filteredCalls = calls.filter(call => {
    const matchesSearch = 
      call.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.callId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      call.sentiment === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">Call Logs</h2>
        <p className="text-slate-400 font-mono text-sm">Complete history of all recorded calls</p>
      </div>

      {/* Stats Cards */}
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

      {/* Search and Filters */}
      <div className="glass-effect rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by agent, customer, or call ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Sentiment Filter */}
          <div className="flex items-center gap-2">
            {[
              { label: 'All', value: 'all' },
              { label: 'Positive', value: 'positive' },
              { label: 'Neutral', value: 'neutral' },
              { label: 'Negative', value: 'negative' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all text-slate-200 text-sm">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all text-white text-sm font-medium">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Calls Table */}
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
    </div>
  );
}