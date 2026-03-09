'use client';

import React, { useState } from 'react';
import { 
    Pause,
    Play,
    Volume2
} from 'lucide-react';
import { DetailedCall, TranscriptProps } from '@/lib/calldata';

interface Props {
    callData: DetailedCall;
    totalDuration: number;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    transcript: TranscriptProps[];
}

export default function AudioPlayerCard({ callData, currentTime, setCurrentTime, totalDuration, isPlaying, setIsPlaying, transcript }: Props) {

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="col-span-2 space-y-6">
          {/* Audio Player */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Call Recording</h3>
            
            {/* Waveform Visualization */}
            <div className="mb-6 h-24 bg-slate-800/50 rounded-lg p-4 flex items-center gap-1">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-sm transition-all"
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                    opacity: i < (currentTime / totalDuration) * 60 ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 flex items-center justify-center text-white transition-all shadow-lg"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={totalDuration}
                    value={currentTime}
                    onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(6, 182, 212) 0%, rgb(6, 182, 212) ${(currentTime / totalDuration) * 100}%, rgb(51, 65, 85) ${(currentTime / totalDuration) * 100}%, rgb(51, 65, 85) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-400 font-mono">{formatTime(currentTime)}</span>
                    <span className="text-xs text-slate-400 font-mono">{callData.duration}</span>
                  </div>
                </div>

                <button className="p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Key Moments */}
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Moments</p>
                <div className="space-y-2">
                  {callData.keyMoments.map((moment, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTime(moment.time)}
                      className="w-full flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          moment.type === 'success' ? 'bg-emerald-400' : 'bg-cyan-400'
                        }`}></div>
                        <span className="text-sm text-white">{moment.label}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{formatTime(moment.time)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Transcript</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {transcript.map((line, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-xs text-slate-500 font-mono w-12 flex-shrink-0">{line.time}</span>
                  <div className="flex-1">
                    <span className={`text-sm font-semibold ${
                      line.speaker === 'Agent' ? 'text-cyan-400' : 'text-slate-300'
                    }`}>
                      {line.speaker}:
                    </span>
                    <p className="text-sm text-slate-300 mt-1">{line.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}