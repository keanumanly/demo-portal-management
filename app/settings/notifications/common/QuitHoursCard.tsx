'use client';

import React, { useState } from 'react';
import { VolumeX } from 'lucide-react';

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

interface QuitHoursProps {
    toggleQuietDay: (key: string) => void;
    setSettings: React.Dispatch<React.SetStateAction<SettingProps>>;
    settings: SettingProps;
}

export default function QuitHoursCard({ toggleQuietDay, setSettings, settings }: QuitHoursProps) {
    return (
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <VolumeX className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Quiet Hours</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Mute non-urgent notifications during specific times
                </p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, quietHoursEnabled: !settings.quietHoursEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.quietHoursEnabled ? 'bg-cyan-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.quietHoursEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.quietHoursEnabled && (
            <div className="space-y-6 pt-4 border-t border-slate-800">
              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={settings.quietHoursStart}
                    onChange={(e) => setSettings({ ...settings, quietHoursStart: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">End Time</label>
                  <input
                    type="time"
                    value={settings.quietHoursEnd}
                    onChange={(e) => setSettings({ ...settings, quietHoursEnd: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Days of Week */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3">Active Days</label>
                <div className="flex gap-2">
                  {[
                    { key: 'monday', label: 'Mon' },
                    { key: 'tuesday', label: 'Tue' },
                    { key: 'wednesday', label: 'Wed' },
                    { key: 'thursday', label: 'Thu' },
                    { key: 'friday', label: 'Fri' },
                    { key: 'saturday', label: 'Sat' },
                    { key: 'sunday', label: 'Sun' }
                  ].map((day) => (
                    <button
                      key={day.key}
                      onClick={() => toggleQuietDay(day.key)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        settings.quietDays[day.key as keyof typeof settings.quietDays]
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
    );
}