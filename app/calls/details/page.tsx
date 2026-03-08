'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Phone,
  Clock,
  Calendar,
  User,
  MapPin,
  Play,
  Pause,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

export default function CallDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const totalDuration = 332; // 5:32 in seconds

  // Mock data - in real app, fetch based on params.id
  const callData = {
    callId: 'CALL-2024-001',
    agent: {
      name: 'Sarah Johnson',
      id: 'AGT-001',
      avatar: 'SJ'
    },
    customer: {
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY'
    },
    date: '2024-02-13',
    time: '09:15 AM',
    duration: '5:32',
    sentiment: 'positive',
    sentimentScore: 87.5,
    topics: ['Billing', 'Account', 'Payment'],
    resolution: true,
    keyMoments: [
      { time: 12, label: 'Customer issue identified', type: 'info' },
      { time: 156, label: 'Solution proposed', type: 'success' },
      { time: 289, label: 'Customer satisfied', type: 'success' }
    ]
  };

  const transcript = [
    { speaker: 'Agent', time: '00:00', text: 'Thank you for calling. This is Sarah. How can I help you today?' },
    { speaker: 'Customer', time: '00:05', text: 'Hi Sarah, I\'m calling about a charge on my account that I don\'t recognize.' },
    { speaker: 'Agent', time: '00:12', text: 'I\'d be happy to help you with that. Let me pull up your account. Can you provide me with your account number?' },
    { speaker: 'Customer', time: '00:20', text: 'Sure, it\'s 12345678.' },
    { speaker: 'Agent', time: '00:25', text: 'Thank you. I see your account here. Looking at your recent transactions, I can see the charge you\'re referring to. Let me explain what that is.' },
    { speaker: 'Customer', time: '00:35', text: 'Yes, please. I\'m really confused about it.' },
    { speaker: 'Agent', time: '00:40', text: 'That charge is for the premium service upgrade you selected last month. It includes additional features like priority support and advanced analytics.' },
    { speaker: 'Customer', time: '00:52', text: 'Oh, I see! I completely forgot about that upgrade. That makes sense now.' },
    { speaker: 'Agent', time: '01:00', text: 'Great! Is there anything else I can help you with today?' },
    { speaker: 'Customer', time: '01:05', text: 'No, that\'s all. Thank you so much for clarifying!' },
    { speaker: 'Agent', time: '01:10', text: 'You\'re very welcome! Have a wonderful day!' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const insights = [
    { label: 'Talk Ratio', value: 'Agent 45% / Customer 55%', status: 'good' },
    { label: 'Response Time', value: '2.3s average', status: 'good' },
    { label: 'Keywords Match', value: '12 compliance terms', status: 'good' },
    { label: 'Dead Air', value: '0 instances', status: 'excellent' }
  ];

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

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold gradient-text mb-2">{callData.callId}</h2>
          <p className="text-slate-400 font-mono text-sm">Detailed call analysis and transcript</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all text-slate-200 text-sm">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all text-white text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {callData.agent.avatar}
            </div>
            <div>
              <p className="text-xs text-slate-400">Agent</p>
              <p className="text-sm font-medium text-white">{callData.agent.name}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-mono">{callData.agent.id}</p>
        </div>

        <div className="glass-effect rounded-2xl p-6">
          <User className="w-5 h-5 text-slate-400 mb-3" />
          <p className="text-xs text-slate-400 mb-1">Customer</p>
          <p className="text-sm font-medium text-white mb-1">{callData.customer.name}</p>
          <p className="text-xs text-slate-500 font-mono">{callData.customer.phone}</p>
        </div>

        <div className="glass-effect rounded-2xl p-6">
          <Calendar className="w-5 h-5 text-slate-400 mb-3" />
          <p className="text-xs text-slate-400 mb-1">Date & Time</p>
          <p className="text-sm font-medium text-white mb-1">{new Date(callData.date).toLocaleDateString()}</p>
          <p className="text-xs text-slate-500">{callData.time}</p>
        </div>

        <div className="glass-effect rounded-2xl p-6">
          <Clock className="w-5 h-5 text-slate-400 mb-3" />
          <p className="text-xs text-slate-400 mb-1">Duration</p>
          <p className="text-2xl font-bold text-white font-mono mb-1">{callData.duration}</p>
          <p className="text-xs text-slate-500">{totalDuration} seconds</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Audio Player & Transcript */}
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

        {/* Sidebar - Analysis */}
        <div className="space-y-6">
          {/* Sentiment */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Sentiment Analysis</h3>
            
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgb(51, 65, 85)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - callData.sentimentScore / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(16, 185, 129)" />
                      <stop offset="100%" stopColor="rgb(6, 182, 212)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{callData.sentimentScore}%</p>
                    <p className="text-xs text-slate-400">Positive</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Positive Outcome</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Positive</span>
                <span className="text-sm font-bold text-emerald-400">87.5%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '87.5%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Neutral</span>
                <span className="text-sm font-bold text-slate-400">10.2%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500" style={{ width: '10.2%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Negative</span>
                <span className="text-sm font-bold text-rose-400">2.3%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: '2.3%' }}></div>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Topics Discussed</h3>
            <div className="flex flex-wrap gap-2">
              {callData.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-sm text-cyan-400 font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Call Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">{insight.label}</p>
                    <p className="text-sm font-medium text-white">{insight.value}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-1 ${
                    insight.status === 'excellent' ? 'bg-emerald-400' :
                    insight.status === 'good' ? 'bg-cyan-400' : 'bg-amber-400'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Status */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              {callData.resolution ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  {callData.resolution ? 'Issue Resolved' : 'Follow-up Required'}
                </p>
                <p className="text-xs text-slate-400">
                  {callData.resolution ? 'Customer satisfied with solution' : 'Escalation needed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}