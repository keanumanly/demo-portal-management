'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface Props {
    value: string;
    label: string; 
    description: string;
}

interface DaysProps {
  monday: Boolean;
  tuesday: Boolean;
  wednesday: Boolean;
  thursday: Boolean;
  friday: Boolean;
  saturday: Boolean;
  sunday: Boolean;
}

interface SettingProps {
  callEscalations: Boolean;
  sentimentAlerts: Boolean;
  agentPerformance: Boolean;
  systemUpdates: Boolean;
  weeklyReports: Boolean;
  emailNotifications: Boolean;
  pushNotifications: Boolean;
  smsNotifications: Boolean;
  frequency: string;
  quietHoursEnabled: Boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  quietDays: DaysProps;
}

interface FrequencyProps {
    frequencies: Props[];
    setSettings: React.Dispatch<React.SetStateAction<SettingProps>>;
    settings: SettingProps;
}

export default function FrequencyCard({ frequencies, setSettings, settings }: FrequencyProps) {
    return (
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Notification Frequency</h3>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Control how often you receive non-urgent notifications
          </p>

          <div className="grid grid-cols-4 gap-3">
            {frequencies.map((freq) => (
              <button
                key={freq.value}
                onClick={() => setSettings({ ...settings, frequency: freq.value })}
                className={`p-4 rounded-xl text-left transition-all border-2 ${
                  settings.frequency === freq.value
                    ? 'bg-cyan-500/10 border-cyan-500/30'
                    : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-700/50'
                }`}
              >
                <p className={`text-sm font-medium mb-1 ${
                  settings.frequency === freq.value ? 'text-cyan-400' : 'text-white'
                }`}>
                  {freq.label}
                </p>
                <p className="text-xs text-slate-400">{freq.description}</p>
              </button>
            ))}
          </div>
        </div>
    );
}