'use client';

interface HeaderProps {
    todayCalls: number;
    avgDuration: string;
    sentiment: number;
  }

function StatItem({ 
    label, 
    value, 
    valueColor = 'text-white' 
  }: { 
    label: string; 
    value: string; 
    valueColor?: string;
  }) {
    return (
      <div className="text-center">
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className={`text-sm font-bold font-mono ${valueColor}`}>{value}</p>
      </div>
    );
  }
  
  function Divider() {
    return <div className="w-px h-8 bg-slate-700" />;
  }

export default function QuickStatus({ todayCalls, avgDuration, sentiment }: HeaderProps){

    return (
        <div className="hidden lg:flex items-center gap-6 px-4 py-2 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <StatItem label="Today" value={todayCalls.toLocaleString()} />
          <Divider />
          <StatItem label="Avg Duration" value={avgDuration} />
          <Divider />
          <StatItem label="Sentiment" value={`${sentiment}%`} valueColor="text-emerald-400" />
        </div>
    );
}