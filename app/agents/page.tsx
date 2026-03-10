'use client';

import React from 'react';
import { 
  Users,
  Phone,
  Clock,
  TrendingUp,
  Star,
  Award,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import StatsCard from '@/agents/common/StatsCard'
import TopPerformerCard from '@/agents/common/TopPerformerCard'
import PerformanceDistributionCard from '@/agents/common/PerformanceDistributionCard'
import AgentCard from '@/agents/common/AgentCard'
import { Agent, agentsdata } from '@/lib/agent';

export default function AgentsPage() {
  const agents: Agent[] = agentsdata

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">Agent Performance</h2>
        <p className="text-slate-400 font-mono text-sm">Monitor and analyze agent metrics</p>
      </div>

      {/* Overview Stats */}
      <StatsCard />

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Top Performers */}
        <TopPerformerCard agents={agents}/>

        {/* Performance Distribution */}
        <PerformanceDistributionCard />
      </div>

      {/* Agents Grid */}
      <AgentCard agents={agents}/>
    </div>
  );
}