'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bell,
  ChevronDown
} from 'lucide-react';
import SearchBar from '@/components/headers/SearchBar';
import QuickStatus from '@/components/headers/QuickStats';
import NotificationDropdown from '@/components/headers/NotificationDropdown';
import ProfileMenu from '@/components/headers/ProfileMenu'
import { QuickStats, notifdata } from '@/lib/mockdata';

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
  todayCalls, 
  avgDuration, 
  sentiment 
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(notifdata);

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
              <ProfileMenu />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}