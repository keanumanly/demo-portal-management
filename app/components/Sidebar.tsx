'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { navigationItems } from '@/lib/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`
      fixed left-0 top-0 h-full z-50 
      glass-effect border-r border-slate-800/50
      transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex flex-col h-full p-6">

        <div className="flex items-center gap-3 mb-12">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <svg className="w-8 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          {!isCollapsed ? 
          <>
            <div>
              <h1 className="text-xl font-bold text-white">VocalIQ</h1>
              <p className="text-xs text-slate-400 font-mono">AI Analytics</p>
            </div>
          </> 
          : <></>}
          
          <button
            onClick={() => onToggleCollapse()}
            className="absolute -right-3 top-8 w-6 h-6 rounded-full
              bg-slate-900 border border-slate-700
              flex items-center justify-center
              text-slate-300 hover:text-white"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navigationItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={idx}
                href={item.href}
                className={`
                  flex items-center rounded-xl transition-all
                  ${isCollapsed ? 'justify-center px-4 py-3' : 'gap-3 px-4 py-3'}
                  ${isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Live Stats Card */}
        {!isCollapsed && 
        <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <h3 className="text-sm font-semibold text-cyan-400">Live Now</h3>
          </div>
          <p className="text-2xl font-bold text-white font-mono mb-1">23</p>
          <p className="text-xs text-slate-300">Active calls being analyzed</p>
        </div>
        }
      </div>
    </aside>
  );
}