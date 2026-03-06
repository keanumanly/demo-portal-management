'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface Props {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    marketingEmails: boolean;
}

interface SideBarProps {
    preferences: Props;
    setPreferences: React.Dispatch<React.SetStateAction<Props>>;
    handleSavePreferences: () => void;
}

export default function PreferencesTabCard({ preferences, setPreferences, handleSavePreferences }: SideBarProps) {
    return (
        <div className="space-y-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly analytics summary' },
                { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive product updates and news' }
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{pref.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{pref.description}</p>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, [pref.key]: !preferences[pref.key as keyof typeof preferences] })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences[pref.key as keyof typeof preferences] ? 'bg-cyan-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences[pref.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}

              <button
                onClick={handleSavePreferences}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
    );
}