'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  Search,
  CheckCheck,
  AlertCircle,
  Info,
  AlertTriangle
} from 'lucide-react';

interface FilterProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedIds: string[];
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
    deselectAll: ()=> void;
    deleteSelected:  ()=> void;
    selectAll:  ()=> void;
    markAllAsRead:  ()=> void;
}



export default function FilterMenu({
    searchQuery, setSearchQuery, 
    selectedType, setSelectedType,
    selectedCategory, setSelectedCategory,
    selectedIds, setSelectedIds,
    deselectAll, deleteSelected,
    selectAll, markAllAsRead }: FilterProps) {

    return(
    <div className="glass-effect rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
            </div>

            <div className="flex gap-2">
                {[
                { value: 'all', label: 'All' },
                { value: 'unread', label: 'Unread' },
                { value: 'read', label: 'Read' }
                ].map((type) => (
                <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type.value
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                    {type.label}
                </button>
                ))}
            </div>

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all"
            >
                <option value="all">All Categories</option>
                <option value="calls">Calls</option>
                <option value="agents">Agents</option>
                <option value="system">System</option>
                <option value="reports">Reports</option>
            </select>
        </div>

        
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
            <span className="text-sm text-cyan-400 font-medium">
              {selectedIds.length} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={deselectAll}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Deselect All
              </button>
              <button
                onClick={deleteSelected}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 text-xs font-medium transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Delete Selected
              </button>
            </div>
          </div>
        )}


        <div className="flex gap-2 mt-4">
          <button
            onClick={selectAll}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Select All
          </button>
          <span className="text-slate-600">•</span>
          <button
            onClick={markAllAsRead}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Mark All as Read
          </button>
        </div>
    </div>
    );
}