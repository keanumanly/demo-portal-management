'use client';

import React from 'react';
import { Search,  ChevronDown } from "lucide-react";
import { Transcript, Sentiment } from '@/lib/transcription';

interface Props {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    sentimentFilter: string;
    setSentiment: React.Dispatch<React.SetStateAction<Sentiment | "all">>;
    statusFilter: string;
    setStatus:  React.Dispatch<React.SetStateAction<string>>;
    agentFilter: string;
    setAgent: React.Dispatch<React.SetStateAction<string>>;
    agents: string[];
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<"score" | "date" | "duration" | "flags">>;
    filtered: Transcript[];
    TRANSCRIPTS: Transcript[];
}


export default function FilterCard({ search, setSearch, sentimentFilter, setSentiment, statusFilter, setStatus, 
    agentFilter, setAgent, agents, sortBy, setSortBy, filtered, TRANSCRIPTS }: Props) {
    return (
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search transcripts, agents, topics..."
                className="w-full bg-slate-800 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>

            {/* Sentiment */}
            <div className="relative">
              <select
                value={sentimentFilter}
                onChange={e => setSentiment(e.target.value as any)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatus(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
                <option value="follow-up">Follow-up</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Agent */}
            <div className="relative">
              <select
                value={agentFilter}
                onChange={e => setAgent(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Agents</option>
                {agents.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="date">Sort: Date</option>
                <option value="score">Sort: Score</option>
                <option value="flags">Sort: Flags</option>
                <option value="duration">Sort: Length</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Result count */}
            <div className="flex items-center px-3 text-xs text-slate-500 font-mono">
              {filtered.length} of {TRANSCRIPTS.length} results
            </div>
          </div>
        </div>
    );
}