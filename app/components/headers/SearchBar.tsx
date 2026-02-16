'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search calls, agents, transcripts... (Ctrl+K)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="
          pl-10 pr-4 py-2 w-full
          bg-slate-800/50 border border-slate-700/50 rounded-lg 
          text-sm text-slate-200 placeholder-slate-500 
          focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800 
          transition-all
        "
      />
    </form>
  );
}