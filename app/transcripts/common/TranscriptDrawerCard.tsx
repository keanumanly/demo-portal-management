'use client';

import React, { useState, useMemo } from 'react';
import { X, Flag, Search, Download } from "lucide-react";
import { Transcript, STATUS_CONFIG, SENTIMENT_CONFIG, SPEAKER_CONFIG } from '@/lib/transcription';

interface SentimentProps { 
    label: string; 
    color: string;  
    bg: string;   
    dot: string;
    Icon: React.ElementType; 
}

interface StatusProps { 
    label: string; 
    color: string;  
    bg: string; 
}

interface Props {
    transcript: Transcript;
    onClose: () => void ;
}


export default function TranscriptDrawerCard({ transcript, onClose }: Props) {
    const [search, setSearch] = useState("");

    const lines = useMemo(() => {
      if (!search.trim()) return transcript.lines;
      return transcript.lines.filter(l => l.text.toLowerCase().includes(search.toLowerCase()));
    }, [transcript.lines, search]);
  

    function ScoreBar({ score }: { score: number }) {
        const color = score >= 85 ? "from-emerald-500 to-emerald-400"
                    : score >= 70 ? "from-amber-500 to-amber-400"
                    : "from-rose-500 to-rose-400";
        return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${score}%` }} />
            </div>
            <span className="text-xs font-mono text-slate-300 w-6 text-right">{score}</span>
        </div>
        );
    }

    function highlightText(text: string, query: string) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
        {text.slice(0, idx)}
        <mark className="bg-cyan-500/25 text-cyan-300 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
        </>
    );
    }

    return (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    
          {/* Drawer */}
          <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-700/50 flex flex-col h-full overflow-hidden shadow-2xl">
    
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/60 flex items-start justify-between gap-4 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-500">{transcript.callId}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${STATUS_CONFIG[transcript.status].bg} ${STATUS_CONFIG[transcript.status].color}`}>
                    {STATUS_CONFIG[transcript.status].label}
                  </span>
                </div>
                <h2 className="text-white font-semibold text-lg">{transcript.queue}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-mono">
                  <span>{transcript.agent}</span>
                  <span>·</span>
                  <span>{transcript.date}</span>
                  <span>·</span>
                  <span>{transcript.duration}</span>
                  <span>·</span>
                  <span>{transcript.wordCount} words</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex-shrink-0">
                <X size={18} />
              </button>
            </div>
    
            {/* Stats row */}
            <div className="px-6 py-3 border-b border-slate-700/30 bg-slate-800/30 flex gap-6 flex-shrink-0">
              <div>
                <div className="text-xs text-slate-500 font-mono mb-0.5">QA SCORE</div>
                <ScoreBar score={transcript.score} />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono mb-1">SENTIMENT</div>
                <div className={`text-xs font-mono flex items-center gap-1.5 ${SENTIMENT_CONFIG[transcript.sentiment].color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${SENTIMENT_CONFIG[transcript.sentiment].dot}`} />
                  {SENTIMENT_CONFIG[transcript.sentiment].label}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono mb-1">FLAGS</div>
                <div className={`text-xs font-mono flex items-center gap-1.5 ${transcript.flags > 0 ? "text-amber-400" : "text-slate-400"}`}>
                  <Flag size={11} />
                  {transcript.flags} moment{transcript.flags !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 font-mono mb-1">TOPICS</div>
                <div className="flex flex-wrap gap-1">
                  {transcript.topics.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>
    
            {/* Search */}
            <div className="px-6 py-3 border-b border-slate-700/30 flex-shrink-0">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search transcript..."
                  className="w-full bg-slate-800 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    <X size={12} />
                  </button>
                )}
              </div>
              {search && (
                <div className="text-xs text-slate-500 font-mono mt-1.5">
                  {lines.length} of {transcript.lines.length} lines match
                </div>
              )}
            </div>
    
            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-600">
                  <Search size={28} />
                  <p className="text-sm font-mono">No lines match "{search}"</p>
                </div>
              ) : lines.map(line => (
                <div
                  key={line.id}
                  className={`flex gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    line.flagged ? "bg-amber-500/5 border border-amber-500/15" : "hover:bg-slate-800/50"
                  }`}
                >
                  {/* Timestamp */}
                  <span className="text-xs font-mono text-slate-600 w-10 flex-shrink-0 pt-0.5">{line.at}</span>
    
                  {/* Speaker */}
                  <div className="w-20 flex-shrink-0">
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${SPEAKER_CONFIG[line.speaker].bg} ${SPEAKER_CONFIG[line.speaker].color}`}>
                      {SPEAKER_CONFIG[line.speaker].label}
                    </span>
                  </div>
    
                  {/* Text */}
                  <p className={`flex-1 text-sm leading-relaxed ${line.flagged ? "text-slate-200" : "text-slate-300"}`}>
                    {search ? highlightText(line.text, search) : line.text}
                  </p>
    
                  {/* Right — flag + sentiment */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {line.flagged && <Flag size={11} className="text-amber-400" />}
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 ${SENTIMENT_CONFIG[line.sentiment].dot}`} title={line.sentiment} />
                  </div>
                </div>
              ))}
            </div>
    
            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-700/30 bg-slate-800/30 flex items-center justify-between flex-shrink-0">
              <span className="text-xs font-mono text-slate-600">{transcript.id} · {transcript.lines.length} lines</span>
              <button className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-700/50">
                <Download size={12} />
                Export .txt
              </button>
            </div>
          </div>
        </div>
    );
}