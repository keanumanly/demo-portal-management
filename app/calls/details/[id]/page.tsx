'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import Link from 'next/link';
import { 
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import InfoCard from "@/calls/details/[id]/common/InfoCard"
import AudioPlayerCard from "@/calls/details/[id]/common/AudioPlayerCard"
import AnalysisCard from "@/calls/details/[id]/common/AnalysisCard"
import { DetailedCall, detailcalldata, transcriptdata } from '@/lib/calldata';

export default function CallDetailPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const totalDuration = 332; // 5:32 in seconds
  const [callData, SetcallData] = useState<DetailedCall | null>(null)

  const transcript = transcriptdata

  const insights = [
    { label: 'Talk Ratio', value: 'Agent 45% / Customer 55%', status: 'good' },
    { label: 'Response Time', value: '2.3s average', status: 'good' },
    { label: 'Keywords Match', value: '12 compliance terms', status: 'good' },
    { label: 'Dead Air', value: '0 instances', status: 'excellent' }
  ];

  useEffect(() => {
    const call = detailcalldata.find(item => item.callId === params.id);
    SetcallData(call ?? null);
  },[params.id, detailcalldata])

  return (
    <div>
      {/* Back Button */}
      <Link 
        href="/calls"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Call Logs
      </Link>

      {
        callData && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold gradient-text mb-2">{callData.callId}</h2>
                <p className="text-slate-400 font-mono text-sm">Detailed call analysis and transcript</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all text-slate-200 text-sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 cursor-pointer  bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all text-white text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
      
            {/* Info Cards */}
            <InfoCard callData={callData} totalDuration={totalDuration}/>
      
            {/* Main Content */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Audio Player & Transcript */}
              <AudioPlayerCard callData={callData} currentTime={currentTime} setCurrentTime={setCurrentTime} totalDuration={totalDuration} 
              isPlaying={isPlaying} setIsPlaying={setIsPlaying} transcript={transcript} />
      
              {/* Sidebar - Analysis */}
              <AnalysisCard callData={callData} insights={insights} />
            </div>
          </>
        )
      }
    </div>
  );
}