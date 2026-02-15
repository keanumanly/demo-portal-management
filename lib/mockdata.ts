
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