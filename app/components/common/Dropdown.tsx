'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface DropdownProps {
  children: ReactNode;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: string;
}

export default function Dropdown({ 
  children, 
  onClose, 
  position = 'right',
  width = 'w-auto'
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`
        absolute ${position === 'right' ? 'right-0' : 'left-0'} mt-2 ${width}
        glass-effect border border-slate-700/50 rounded-xl 
        shadow-2xl overflow-hidden
        animate-in fade-in slide-in-from-top-2 duration-200
      `}
    >
      {children}
    </div>
  );
}