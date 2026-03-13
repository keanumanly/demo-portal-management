'use client';

import React, { useState } from 'react';
import { Clock,  Mic, Flag, ChevronRight } from "lucide-react";
import { Transcript } from '@/lib/transcription';

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
    t: Transcript;
    ST: StatusProps;
    SC: SentimentProps;
}


export default function ItemCard({ t, ST, SC}: Props) {
    return (
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {t.agentAvatar}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-semibold text-white text-sm">{t.agent}</span>
              <span className="text-slate-600 text-xs">·</span>
              <span className="text-slate-400 text-xs font-mono">{t.queue}</span>
              <span className="text-slate-600 text-xs">·</span>
              <span className="text-slate-500 text-xs font-mono">{t.date} {t.time}</span>

              {/* Badges */}
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-mono ${ST.bg} ${ST.color}`}>
                {ST.label}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${SC.bg} ${SC.color}`}>
                {SC.label}
              </span>
            </div>

            {/* Preview */}
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">{t.preview}</p>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {t.topics.map(topic => (
                <span key={topic} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/40 text-slate-500 font-mono">
                  {topic}
                </span>
              ))}
            </div>

            {/* Bottom stats row */}
            <div className="flex items-center gap-5 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {t.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Mic size={11} />
                {t.wordCount} words
              </span>
              {t.flags > 0 && (
                <span className="flex items-center gap-1.5 text-amber-500">
                  <Flag size={11} />
                  {t.flags} flag{t.flags !== 1 ? "s" : ""}
                </span>
              )}
              <span className="flex items-center gap-1.5 ml-auto">
                <span className="text-slate-600">QA</span>
                <span className={
                  t.score >= 85 ? "text-emerald-400" :
                  t.score >= 70 ? "text-amber-400" : "text-rose-400"
                }>{t.score}</span>
              </span>
              {/* Score mini bar */}
              <div className="w-20 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    t.score >= 85 ? "bg-emerald-500" :
                    t.score >= 70 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${t.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chevron */}
          <ChevronRight
            size={16}
            className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1"
          />
        </div>
    );
}