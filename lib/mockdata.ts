
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
    read: boolean; 
}
export const notifdata: Notiftypes[] = [
    { 
      id: "1", 
      type: 'critical', 
      title: 'Call escalation needed', 
      message: 'Customer needs supervisor assistance',
      time: '2 min ago', 
      read: false 
    },
    { 
      id: "2", 
      type: 'alert', 
      title: 'Sentiment dropped 15%', 
      message: 'Negative sentiment spike detected',
      time: '30 min ago', 
      read: false 
    },
    { 
      id: "3", 
      type: 'info', 
      title: 'Weekly report ready', 
      message: 'Your analytics report is available',
      time: '2 hours ago', 
      read: true 
    },
]