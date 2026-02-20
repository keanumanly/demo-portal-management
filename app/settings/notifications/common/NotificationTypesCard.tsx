'use client';

import React, { useState } from 'react';
import { Bell } from 'lucide-react';

interface Props {
    key: string,
    label: string, 
    description: string,
    icon: React.ElementType,
    color: string
}

interface DaysProps {
  monday: Boolean,
  tuesday: Boolean,
  wednesday: Boolean,
  thursday: Boolean,
  friday: Boolean,
  saturday: Boolean,
  sunday: Boolean
}

interface SettingProps {
  callEscalations: Boolean,
  sentimentAlerts: Boolean,
  agentPerformance: Boolean,
  systemUpdates: Boolean,
  weeklyReports: Boolean,
  emailNotifications: Boolean,
  pushNotifications: Boolean,
  smsNotifications: Boolean,
  frequency: string,
  quietHoursEnabled: Boolean,
  quietHoursStart: string,
  quietHoursEnd: string,
  quietDays: DaysProps
}

interface ActivityProps {
    Notifications: Props[],
    toggleNotificationType: (key: string) => void,
    settings: SettingProps
}

export default function NotificationTypesCard({ Notifications, toggleNotificationType, settings }: ActivityProps) {
    return (

      <div className="space-y-4">
        {Notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="flex items-start justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${item.color}`} />
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleNotificationType(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  settings[item.key as keyof typeof settings] ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    );
}