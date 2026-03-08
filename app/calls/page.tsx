'use client';

import React, { useState } from 'react';
import StatsCard from '@/calls/common/StatsCard'
import FiltersCard from '@/calls/common/FiltersCard'
import CallTableCard from '@/calls/common/CallTableCard'
import { Call, mockcalldata } from '@/lib/calldata';

export default function CallsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const calls: Call[] = mockcalldata

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