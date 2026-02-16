'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  User, 
  Shield, 
  Bell, 
  Globe,
  Lock,
  Mail,
  Phone,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Clock
} from 'lucide-react';

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'account';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Account settings state
  const [accountData, setAccountData] = useState({
    email: 'admin@callsense.ai',
    phone: '+1 (555) 123-4567',
    language: 'en',
    timezone: 'America/New_York'
  });

  // Security settings state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell }
  ];

  const handleSaveAccount = () => {
    console.log('Saving account settings:', accountData);
    // TODO: Implement API call
    alert('Account settings saved!');
  };

  const handleChangePassword = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Changing password...');
    // TODO: Implement API call
    alert('Password changed successfully!');
    setSecurityData({
      ...securityData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
    // TODO: Implement API call
    alert('Preferences saved!');
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    // TODO: Implement API call
    alert('Account deletion initiated');
    setShowDeleteModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-slate-400 font-mono text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="col-span-1">
          <div className="glass-effect rounded-2xl p-4 sticky top-24">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3">
          {/* Account Tab */}
          {activeTab === 'account' && (
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
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
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
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
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
          )}

          {/* Danger Zone */}
          <div className="glass-effect rounded-2xl p-6 border-2 border-red-500/20">
            <h3 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-slate-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 font-medium transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect border border-red-500/30 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-red-400 mb-2">Delete Account</h3>
            <p className="text-sm text-slate-300 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}