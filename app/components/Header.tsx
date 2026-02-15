'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import SearchBar from '@/components/headers/SearchBar';
import QuickStatus from '@/components/headers/QuickStats';
import NotificationDropdown from '@/components/headers/NotificationDropdown';
import { QuickStats } from '@/lib/mockdata';

interface HeaderProps {
  todayCalls?: number;
  avgDuration?: string;
  sentiment?: number;
}

interface Notification {
  id: string;
  type: 'critical' | 'alert' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Header({ 
  todayCalls = 1247, 
  avgDuration = '4:32', 
  sentiment = 87 
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: '1', 
      type: 'critical', 
      title: 'Call escalation needed', 
      message: 'Customer needs supervisor assistance',
      time: '2 min ago', 
      read: false 
    },
    { 
      id: '2', 
      type: 'alert', 
      title: 'Sentiment dropped 15%', 
      message: 'Negative sentiment spike detected',
      time: '30 min ago', 
      read: false 
    },
    { 
      id: '3', 
      type: 'info', 
      title: 'Weekly report ready', 
      message: 'Your analytics report is available',
      time: '2 hours ago', 
      read: true 
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="glass-effect border-b border-slate-800/50 px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <SearchBar />
        <div className="flex items-center gap-4">
          <QuickStatus 
            todayCalls={QuickStats.calls}
            avgDuration={QuickStats.duration}
            sentiment={QuickStats.sentiment}
            />
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <NotificationDropdown 
              unreadCount={unreadCount}
              notifications={notifications}
              setNotifications={setNotifications}
              />
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-400">Team Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 glass-effect border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
                {/* User Info */}
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

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