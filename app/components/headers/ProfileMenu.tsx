'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';


function MenuDivider() {
    return <div className="h-px bg-slate-800 my-2" />;
  }
  
  function MenuItem({ 
    icon: Icon, 
    label, 
    href, 
    onClick, 
    danger 
  }: {
    icon: any;
    label: string;
    href?: string;
    onClick?: () => void;
    danger?: boolean;
  }) {
    const className = `
      w-full flex items-center gap-3 px-4 py-2.5
      text-sm hover:bg-slate-800/50 transition-colors
      ${danger ? 'text-red-400 hover:text-red-300' : 'text-slate-300 hover:text-white'}
    `;
  
    const content = (
      <>
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{label}</span>
      </>
    );
  
    if (href) {
      return (
        <Link href={href} className={className}>
          {content}
        </Link>
      );
    }
  
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

export default function ProfileMenu(){
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    return(
        <div className="absolute right-0 mt-2 w-64 glass-effect border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
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
            <MenuDivider />
            <MenuItem 
              icon={isDarkMode ? Sun : Moon} 
              label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
            <MenuItem icon={HelpCircle} label="Help & Support" href="/help" />
          </div>

          {/* Logout */}
          <div className="py-2 border-t border-slate-800">
            <MenuItem 
              icon={LogOut} 
              label="Logout" 
              onClick={() => console.log('Logout clicked')}
              danger 
            />
          </div>
        </div>
        );
}