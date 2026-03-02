'use client';

import React, { useState } from 'react';

interface Props {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface SideBarProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: Props[];
}

export default function SideBarCard({ activeTab, setActiveTab, tabs }: SideBarProps) {
    return (
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
    );
}