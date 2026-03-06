'use client';

import React, { useState } from 'react';
import { 
    EyeOff,
    Eye,
    Smartphone,
    Lock
} from 'lucide-react';

interface Props {
    current: boolean;
    new: boolean;
    confirm: boolean;
}
interface SecurityDataProps {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
}

interface SideBarProps {
    showPassword: Props;
    setShowPassword: React.Dispatch<React.SetStateAction<Props>>;
    securityData: SecurityDataProps;
    setSecurityData: React.Dispatch<React.SetStateAction<SecurityDataProps>>;
    handleChangePassword: () => void;
}

export default function SecurityTabCard({ showPassword, setShowPassword, securityData, setSecurityData, handleChangePassword }: SideBarProps) {
    return (
        <div className="space-y-6">
          {/* Change Password */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>
            
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 pr-10 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 pr-10 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 pr-10 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-medium transition-all"
              >
                <Lock className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Two-Factor Authentication</h3>
            <p className="text-sm text-slate-400 mb-6">
              Add an extra layer of security to your account
            </p>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium text-white">Authenticator App</p>
                  <p className="text-xs text-slate-400">
                    {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSecurityData({ ...securityData, twoFactorEnabled: !securityData.twoFactorEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securityData.twoFactorEnabled ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
    );
}