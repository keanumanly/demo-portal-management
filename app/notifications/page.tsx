'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  Search,
  CheckCheck,
  AlertCircle,
  Info,
  AlertTriangle
} from 'lucide-react';
import { notifdata } from '@/lib/mockdata';
import FilterMenu from '@/notifications/common/filter'

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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(notifdata);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [unreadCount, setUnReadCount] = useState(0);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      const matchesType =
        selectedType === 'all' ||
        (selectedType === 'unread' && !notif.read) ||
        (selectedType === 'read' && notif.read);
  
      const matchesCategory =
        selectedCategory === 'all' ||
        notif.category === selectedCategory;
  
      const matchesSearch =
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase());
  
      return matchesType && matchesCategory && matchesSearch;
    });
  }, [notifications, selectedType, selectedCategory, searchQuery]);

  useEffect(() => {
    let isMounted = true;
    const Count = notifications.filter(n => !n.read).length;
    setUnReadCount(Count)
  
    return () => {
      isMounted = false;
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setSelectedIds([]);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(notif => !selectedIds.includes(notif.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(filteredNotifications.map(notif => notif.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-cyan-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Notifications</h1>
        <p className="text-slate-400 font-mono text-sm">
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </p>
      </div>
      
      <FilterMenu 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery} 
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      deselectAll={deselectAll}
      deleteSelected={deleteSelected}
      selectAll={selectAll} 
      markAllAsRead={markAllAsRead} />

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No notifications found</h3>
            <p className="text-sm text-slate-400">
              {searchQuery ? 'Try adjusting your search or filters' : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`
                glass-effect rounded-2xl p-6 transition-all hover:translate-y-[-2px]
                ${!notif.read ? 'border-l-4 border-cyan-500' : ''}
                ${selectedIds.includes(notif.id) ? 'ring-2 ring-cyan-500/50' : ''}
              `}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleSelect(notif.id)}
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedIds.includes(notif.id)
                      ? 'bg-cyan-500 border-cyan-500'
                      : 'border-slate-600 hover:border-cyan-500'
                    }
                  `}
                >
                  {selectedIds.includes(notif.id) && <Check className="w-3 h-3 text-white" />}
                </button>

                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-1">
                        {notif.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-slate-500">{notif.time}</span>
                    <span className={`
                      px-2 py-0.5 rounded text-xs font-medium
                      ${notif.type === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        notif.type === 'alert' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}
                    `}>
                      {notif.category}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
                      title="Mark as read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredNotifications.length > 0 && (
        <div className="flex items-center justify-between mt-8 glass-effect rounded-2xl p-4">
          <p className="text-sm text-slate-400">
            Showing <span className="font-medium text-white">{filteredNotifications.length}</span> of{' '}
            <span className="font-medium text-white">{notifications.length}</span> notifications
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              Previous
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium transition-all">
              1
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              2
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              3
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              4
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              5
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              6
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              7
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              8
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              9
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-300 transition-all">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}