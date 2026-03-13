"use client";

import { useState, useMemo } from "react";
import { Download,  MessageSquare, AlertCircle } from "lucide-react";
import SummaryCard from "@/transcripts/common/SummaryCard"
import FilterCard from "@/transcripts/common/FilterCard"
import ItemCard from "@/transcripts/common/ItemCard"
import TranscriptDrawerCard from "@/transcripts/common/TranscriptDrawerCard"
import { transcriptdata, Transcript, Sentiment, SENTIMENT_CONFIG, STATUS_CONFIG} from '@/lib/transcription';

const TRANSCRIPTS: Transcript[] = transcriptdata 


export default function TranscriptsPage() {
  const [search, setSearch]           = useState("");
  const [sentimentFilter, setSentiment] = useState<Sentiment | "all">("all");
  const [statusFilter, setStatus]     = useState<string>("all");
  const [agentFilter, setAgent]       = useState<string>("all");
  const [open, setOpen]               = useState<Transcript | null>(null);
  const [sortBy, setSortBy]           = useState<"date" | "score" | "duration" | "flags">("date");

  const agents = useMemo(() => [...new Set(TRANSCRIPTS.map(t => t.agent))], []);

  const filtered = useMemo(() => {
    let list = [...TRANSCRIPTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.agent.toLowerCase().includes(q) ||
        t.queue.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q) ||
        t.topics.some(tp => tp.includes(q)) ||
        t.id.toLowerCase().includes(q)
      );
    }
    if (sentimentFilter !== "all") list = list.filter(t => t.sentiment === sentimentFilter);
    if (statusFilter !== "all")    list = list.filter(t => t.status === statusFilter);
    if (agentFilter !== "all")     list = list.filter(t => t.agent === agentFilter);
    list.sort((a, b) => {
      if (sortBy === "score")    return b.score - a.score;
      if (sortBy === "flags")    return b.flags - a.flags;
      if (sortBy === "duration") return b.wordCount - a.wordCount;
      return 0; // date — already ordered
    });
    return list;
  }, [search, sentimentFilter, statusFilter, agentFilter, sortBy]);

  // Summary stats
  const stats = useMemo(() => ({
    total:    TRANSCRIPTS.length,
    flagged:  TRANSCRIPTS.filter(t => t.flags > 0).length,
    avgScore: Math.round(TRANSCRIPTS.reduce((s, t) => s + t.score, 0) / TRANSCRIPTS.length),
    positive: TRANSCRIPTS.filter(t => t.sentiment === "positive").length,
  }), []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
                <MessageSquare size={18} className="text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Transcripts</h1>
            </div>
            <p className="text-slate-400 text-sm ml-11">
              Full call transcripts with speaker labels, sentiment, and flagged moments.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-slate-800 border border-slate-700/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-colors font-mono">
            <Download size={14} />
            Export All
          </button>
        </div>

        {/* ── Summary cards ── */}
        <SummaryCard stats={stats} />

        {/* ── Filters ── */}
        <FilterCard search={search} setSearch={setSearch} 
        sentimentFilter={sentimentFilter} setSentiment={setSentiment} 
        statusFilter={statusFilter} setStatus={setStatus} 
        agentFilter={agentFilter} setAgent={setAgent} 
        agents={agents} sortBy={sortBy} setSortBy={setSortBy} filtered={filtered} TRANSCRIPTS={TRANSCRIPTS}/>

        {/* ── Transcript list ── */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-slate-900/40 border border-slate-700/30 rounded-xl">
              <AlertCircle size={32} className="text-slate-600" />
              <div className="text-center">
                <p className="text-slate-400 font-medium">No transcripts found</p>
                <p className="text-slate-600 text-sm font-mono mt-1">Try adjusting your search or filters</p>
              </div>
            </div>
          ) : filtered.map(t => {
            const SC = SENTIMENT_CONFIG[t.sentiment];
            const ST = STATUS_CONFIG[t.status];
            return (
              <div
                key={t.id}
                onClick={() => setOpen(t)}
                className="group bg-slate-900/60 border border-slate-700/30 rounded-xl p-5 cursor-pointer hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all backdrop-blur-sm"
              > 
                <ItemCard t={t} ST={ST} SC={SC}/>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Transcript Drawer ── */}
      {open && <TranscriptDrawerCard transcript={open} onClose={() => setOpen(null)} />}
    </div>
  );
}