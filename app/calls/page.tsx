'use client';

import React, { useState } from 'react';
import StatsCard from '@/calls/common/StatsCard'
import FiltersCard from '@/calls/common/FiltersCard'
import CallTableCard from '@/calls/common/CallTableCard'

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
      <StatsCard />

      {/* Search and Filters */}
      <FiltersCard searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>

      {/* Calls Table */}
      <CallTableCard filteredCalls={filteredCalls}/>
    </div>
  );
}