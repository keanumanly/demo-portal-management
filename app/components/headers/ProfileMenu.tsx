'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, User, Settings, Bell, LogOut, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Dropdown from '@/components/common/Dropdown';
import MenuItem from '@/components/common/MenuItem';
import Avatar from '@/components/common/Avatar';
import HelpSupportModal from '@/components/modals/HelpSupportModal';

export default function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Implement logout logic
    alert('Logging out...');
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-400">Team Manager</p>
          </div>
          <Avatar name="Admin User" />
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
        </button>

        {showMenu && (
          <Dropdown onClose={() => setShowMenu(false)} width="w-64">
            {/* User Info */}
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name="Admin User" size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-xs text-slate-400 truncate">admin@callsense.ai</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-400 font-medium">
                  Admin
                </span>
                <span className="px-2 py-1 bg-slate-700/30 border border-slate-700/50 rounded text-xs text-slate-300">
                  Team Manager
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <MenuItem icon={User} label="My Profile" href="/profile" />
              <MenuItem icon={Settings} label="Account Settings" href="/settings" />
              <MenuItem icon={Bell} label="Notification Preferences" href="/settings/notifications" />
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800 my-2" />

            {/* Additional Options */}
            <div className="py-2">
              <MenuItem 
                icon={theme === 'dark' ? Sun : Moon}
                label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                onClick={toggleTheme}
              />
              <MenuItem 
                icon={HelpCircle}
                label="Help & Support"
                onClick={() => {
                  setShowMenu(false);
                  setShowHelpModal(true);
                }}
              />
            </div>

            {/* Logout */}
            <div className="py-2 border-t border-slate-800">
              <MenuItem 
                icon={LogOut}
                label="Logout"
                onClick={handleLogout}
                danger
              />
            </div>
          </Dropdown>
        )}
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <HelpSupportModal onClose={() => setShowHelpModal(false)} />
      )}
    </>
  );
}