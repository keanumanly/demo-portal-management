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
import NotificationTypesCard from '@/settings/notifications/common/NotificationTypesCard';
import DeliveryMethodCard from '@/settings/notifications/common/DeliveryMethodCard';
import FrequencyCard from '@/settings/notifications/common/FrequencyCard';
import QuitHoursCard from '@/settings/notifications/common/QuitHoursCard'


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

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<SettingProps>({
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

  const methods = [
    { key: 'emailNotifications', label: 'Email', icon: Mail, description: 'Send to admin@callsense.ai' },
    { key: 'pushNotifications', label: 'Push', icon: Bell, description: 'Browser notifications' },
    { key: 'smsNotifications', label: 'SMS', icon: Smartphone, description: 'Text messages' }
  ]

  const frequencies = [
    { value: 'realtime', label: 'Real-time', description: 'Instant notifications' },
    { value: 'hourly', label: 'Hourly', description: 'Digest every hour' },
    { value: 'daily', label: 'Daily', description: 'Once per day' },
    { value: 'weekly', label: 'Weekly', description: 'Weekly summary' }
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
        <NotificationTypesCard Notifications={notifTypes} toggleNotificationType={toggleNotificationType} settings={settings}/>

        {/* Delivery Methods */}
        <DeliveryMethodCard methods={methods} toggleNotificationType={toggleNotificationType} settings={settings}/>

        {/* Frequency */}
        <FrequencyCard frequencies={frequencies} setSettings={setSettings} settings={settings}/>

        {/* Quiet Hours */}
        <QuitHoursCard toggleQuietDay={toggleQuietDay} setSettings={setSettings} settings={settings}/>

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