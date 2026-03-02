'use client';

import React, { useState } from 'react';
import { 
  Globe,
  Mail,
  Phone,
  Save,
  Clock
} from 'lucide-react';

interface Props {
    email: string;
    phone: string;
    language: string;
    timezone: string;
}

interface SideBarProps {
    accountData: Props;
    setAccountData: React.Dispatch<React.SetStateAction<Props>>;
    handleSaveAccount: () => void;
}

export default function AccountTabCard({ accountData, setAccountData, handleSaveAccount }: SideBarProps) {
    return (
        <div className="space-y-6">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
            
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <p className="text-xs text-emerald-400 mt-1">✓ Verified</p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={accountData.phone}
                  onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>

              {/* Language */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Globe className="w-4 h-4" />
                  Language
                </label>
                <select
                  value={accountData.language}
                  onChange={(e) => setAccountData({ ...accountData, language: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Clock className="w-4 h-4" />
                  Timezone
                </label>
                <select
                  value={accountData.timezone}
                  onChange={(e) => setAccountData({ ...accountData, timezone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveAccount}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
    );
}