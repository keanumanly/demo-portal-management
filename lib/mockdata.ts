
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
  

// export interface Stats {
//     icon: LucideIcon;
//     calls: number;
//     duration: string;
// }

export interface Stats {
    calls: number;
    duration: string;
    sentiment: number;
} 
export const QuickStats: Stats = 
{ 
  calls: 1247, 
  duration: '4:32',
  sentiment: 87 
}


export interface Notiftypes {
    id: string;
    type: 'critical' | 'alert' | 'info';
    title: string;
    message: string;
    time: string;
    date: string;
    read: boolean;
    category: 'calls' | 'agents' | 'system' | 'reports';
}
export const notifdata: Notiftypes[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Call escalation needed',
      message: 'Customer John Doe requires supervisor assistance on call #12345',
      time: '2 min ago',
      date: '2024-02-15',
      read: false,
      category: 'calls'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Sentiment score dropped 15%',
      message: 'Negative sentiment spike detected across 23 calls in the last hour',
      time: '30 min ago',
      date: '2024-02-15',
      read: false,
      category: 'calls'
    },
    {
      id: '3',
      type: 'info',
      title: 'Weekly report ready',
      message: 'Your weekly analytics report for Feb 8-14 is now available for download',
      time: '2 hours ago',
      date: '2024-02-15',
      read: true,
      category: 'reports'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Agent performance alert',
      message: 'Sarah Johnson has handled 45 calls today, approaching daily limit',
      time: '3 hours ago',
      date: '2024-02-15',
      read: false,
      category: 'agents'
    },
    {
      id: '5',
      type: 'info',
      title: 'System maintenance scheduled',
      message: 'Scheduled maintenance on Feb 20, 2024 from 2:00 AM - 4:00 AM EST',
      time: '1 day ago',
      date: '2024-02-14',
      read: true,
      category: 'system'
    },
  ]