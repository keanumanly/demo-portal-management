'use client';

import React, { useState } from 'react';
import { Bell, Mail } from 'lucide-react';

interface Props {
    key: string,
    label: string, 
    description: string,
    icon: React.ElementType
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

interface MethodsProps {
    methods: Props[],
    toggleNotificationType: (key: string) => void,
    settings: SettingProps
}

export default function DeliveryMethodCard({ methods, toggleNotificationType, settings }: MethodsProps) {
    return (
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Delivery Methods</h3>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Choose how you want to receive notifications
          </p>

          <div className="grid grid-cols-3 gap-4">
            {methods.map((method) => {
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
    );
}