'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleSidebar} />
      <main className={isCollapsed ? 'ml-20' : 'ml-72'}>
        <Header />
        <div className='p-8'>{children}</div>
      </main>
    </>
  );
}