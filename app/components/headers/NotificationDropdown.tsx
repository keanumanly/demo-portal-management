'use client';

import React from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';

interface Notification {
    id: string;
    type: 'critical' | 'alert' | 'info';
    title: string;
    message: string;
    time: string;
    date: string;
    read: boolean;
    category: 'calls' | 'agents' | 'system' | 'reports';
  }

interface NotifProps {
    unreadCount: number;
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  }

export default function NotificationDropdown({unreadCount, notifications, setNotifications}: NotifProps){

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

    return (
        <div className="absolute right-0 mt-2 w-80 glass-effect border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`
                    w-full p-4 text-left hover:bg-slate-800/30 transition-colors border-b border-slate-800/50 last:border-0
                    ${!notif.read ? 'bg-slate-800/20' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notif.type === 'critical' ? 'bg-red-500' :
                      notif.type === 'alert' ? 'bg-amber-500' : 'bg-cyan-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{notif.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
          <div className="p-3 border-t border-slate-800">
            <Link 
              href="/notifications"
              className="text-xs text-cyan-400 hover:text-cyan-300 w-full text-center block transition-colors"
            >
              View all notifications
            </Link>
          </div>
        </div>
    );
}