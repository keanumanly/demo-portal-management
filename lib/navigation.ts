import { 
    Activity,
    Phone, 
    MessageSquare, 
    Brain, 
    Users, 
    BarChart3, 
    Settings,
    type LucideIcon
  } from 'lucide-react';
  
  export interface NavItem {
    icon: LucideIcon;
    label: string;
    href: string;
  }
  
  export const navigationItems: NavItem[] = [
    { 
      icon: Activity, 
      label: 'Dashboard', 
      href: '/' 
    },
    { 
      icon: Phone, 
      label: 'Call Logs', 
      href: '/calls' 
    },
    { 
      icon: MessageSquare, 
      label: 'Transcripts', 
      href: '/transcripts' 
    },
    { 
      icon: Brain, 
      label: 'AI Insights', 
      href: '/insights' 
    },
    { 
      icon: Users, 
      label: 'Agents', 
      href: '/agents' 
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      href: '/analytics' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/settings' 
    }
  ];