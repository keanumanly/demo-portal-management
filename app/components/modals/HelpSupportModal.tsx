'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, HelpCircle, Mail, MessageCircle, Book, Search } from 'lucide-react';

interface HelpSupportModalProps {
  onClose: () => void;
}

export default function HelpSupportModal({ onClose }: HelpSupportModalProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'docs' | 'chat'>('faq');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const faqs = [
    { question: 'How do I reset my password?', answer: 'Go to Settings > Security > Change Password.' },
    { question: 'How do I enable notifications?', answer: 'Navigate to Settings > Notifications.' },
    { question: 'Where can I view call recordings?', answer: 'Go to Call Logs.' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="glass-effect border border-slate-700/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Help & Support</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800/50 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex border-b border-slate-800">
          {[
            { id: 'faq', label: 'FAQ', icon: Book },
            { id: 'contact', label: 'Contact', icon: Mail },
            { id: 'docs', label: 'Docs', icon: Search },
            { id: 'chat', label: 'Live Chat', icon: MessageCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm ${
                activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="p-4 bg-slate-800/30 rounded-lg">
                  <summary className="cursor-pointer font-medium text-white">{faq.question}</summary>
                  <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          )}
          {/* Add other tabs content here */}
        </div>
      </div>
    </div>
  );
}