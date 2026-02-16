import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

export default function MenuItem({ 
  icon: Icon, 
  label, 
  href, 
  onClick, 
  danger = false
}: MenuItemProps) {
  const className = `
    w-full flex items-center gap-3 px-4 py-2.5
    text-sm hover:bg-slate-800/50 transition-colors
    ${danger ? 'text-red-400 hover:text-red-300' : 'text-slate-300 hover:text-white'}
  `;

  const content = (
    <>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
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