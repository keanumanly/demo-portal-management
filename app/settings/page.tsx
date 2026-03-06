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
import SideBarCard from '@/settings/common/SideBarCard'
import AccountTabCard from '@/settings/common/AccountTabCard'
import SecurityTabCard from '@/settings/common/SecurityTabCard'
import PreferencesTabCard from '@/settings/common/PreferencesTabCard'

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
        <SideBarCard tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab}/>

        {/* Content */}
        <div className="col-span-3">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <AccountTabCard accountData={accountData} setAccountData={setAccountData} handleSaveAccount={handleSaveAccount}/>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <SecurityTabCard 
            showPassword={showPassword} setShowPassword={setShowPassword} 
            securityData={securityData} setSecurityData={setSecurityData} handleChangePassword={handleChangePassword}/>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <PreferencesTabCard preferences={preferences} setPreferences={setPreferences} handleSavePreferences={handleSavePreferences}/>
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