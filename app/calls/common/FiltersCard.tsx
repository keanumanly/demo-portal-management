'use client';

import React, { useState } from 'react';
import { 
    Search,
    Calendar,
    Download,
} from 'lucide-react';

interface FilterProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function FiltersCard({ searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }: FilterProps) {
    return (
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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
              <button className="flex items-center gap-2 px-4 py-2.5 cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all text-slate-200 text-sm">
                <Calendar className="w-4 h-4" />
                Date Range
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all text-white text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
    );
}