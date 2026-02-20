'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Clock,
  Volume2,
  VolumeX,
  Save
} from 'lucide-react';
import NotificationTypesCard from '@/settings/notifications/common/NotificationTypesCard'

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Types
    callEscalations: true,
    sentimentAlerts: true,
    agentPerformance: true,
    systemUpdates: false,
    weeklyReports: true,
    
    // Delivery Methods
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Frequency
    frequency: 'realtime', // realtime, hourly, daily, weekly
    
    // Quiet Hours
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    quietDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true
    }
  });
  const notifTypes = [
    { 
      key: 'callEscalations', 
      label: 'Call Escalations', 
      description: 'Get notified when a call requires supervisor intervention',
      icon: Bell,
      color: 'text-red-400'
    },
    { 
      key: 'sentimentAlerts', 
      label: 'Sentiment Alerts', 
      description: 'Receive alerts when sentiment scores drop significantly',
      icon: Volume2,
      color: 'text-amber-400'
    },
    { 
      key: 'agentPerformance', 
      label: 'Agent Performance', 
      description: 'Updates about agent performance and metrics',
      icon: Bell,
      color: 'text-blue-400'
    },
    { 
      key: 'systemUpdates', 
      label: 'System Updates', 
      description: 'Platform updates, maintenance, and new features',
      icon: Bell,
      color: 'text-cyan-400'
    },
    { 
      key: 'weeklyReports', 
      label: 'Weekly Reports', 
      description: 'Receive weekly analytics summary every Monday',
      icon: Bell,
      color: 'text-emerald-400'
    }
  ]

  const handleSave = () => {
    console.log('Saving notification settings:', settings);
    // TODO: Implement API call
    alert('Notification settings saved!');
  };

  const toggleNotificationType = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const toggleQuietDay = (day: string) => {
    setSettings({
      ...settings,
      quietDays: {
        ...settings.quietDays,
        [day]: !settings.quietDays[day as keyof typeof settings.quietDays]
      }
    });
  };

  return (
    <div>
      {/* Back Button */}
      <Link 
        href="/settings"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Notification Preferences</h1>
        <p className="text-slate-400 font-mono text-sm">Manage how and when you receive notifications</p>
      </div>

      <div className="space-y-6">
        {/* Notification Types */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Notification Types</h3>
          </div>
          
          <p className="text-sm text-slate-400 mb-6">
            Choose which notifications you want to receive
          </p>
          
          <NotificationTypesCard Notifications={notifTypes} toggleNotificationType={toggleNotificationType} settings={settings}/>
        </div>

        {/* Delivery Methods */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Delivery Methods</h3>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Choose how you want to receive notifications
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'emailNotifications', label: 'Email', icon: Mail, description: 'Send to admin@callsense.ai' },
              { key: 'pushNotifications', label: 'Push', icon: Bell, description: 'Browser notifications' },
              { key: 'smsNotifications', label: 'SMS', icon: Smartphone, description: 'Text messages' }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.key}
                  onClick={() => toggleNotificationType(method.key)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    settings[method.key as keyof typeof settings]
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${settings[method.key as keyof typeof settings] ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      settings[method.key as keyof typeof settings]
                        ? 'bg-cyan-500 border-cyan-500'
                        : 'border-slate-600'
                    }`}>
                      {settings[method.key as keyof typeof settings] && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white mb-1">{method.label}</p>
                  <p className="text-xs text-slate-400">{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequency */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Notification Frequency</h3>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Control how often you receive non-urgent notifications
          </p>

          <div className="grid grid-cols-4 gap-3">
            {[
              { value: 'realtime', label: 'Real-time', description: 'Instant notifications' },
              { value: 'hourly', label: 'Hourly', description: 'Digest every hour' },
              { value: 'daily', label: 'Daily', description: 'Once per day' },
              { value: 'weekly', label: 'Weekly', description: 'Weekly summary' }
            ].map((freq) => (
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

        {/* Quiet Hours */}
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

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all"
          >
            <Save className="w-5 h-5" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}