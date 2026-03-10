
export interface Agent {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy';
    totalCalls: number;
    avgDuration: string;
    sentimentScore: number;
    resolutionRate: number;
    rating: number;
  }

export const agentsdata: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    status: 'online',
    totalCalls: 1247,
    avgDuration: '4:32',
    sentimentScore: 92.5,
    resolutionRate: 95.8,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'MC',
    status: 'online',
    totalCalls: 1089,
    avgDuration: '5:15',
    sentimentScore: 88.3,
    resolutionRate: 91.2,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'EW',
    status: 'busy',
    totalCalls: 956,
    avgDuration: '3:48',
    sentimentScore: 90.1,
    resolutionRate: 93.5,
    rating: 4.8
  },
  {
    id: '4',
    name: 'Alex Kumar',
    avatar: 'AK',
    status: 'online',
    totalCalls: 834,
    avgDuration: '4:05',
    sentimentScore: 85.7,
    resolutionRate: 89.3,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    avatar: 'LR',
    status: 'offline',
    totalCalls: 721,
    avgDuration: '5:42',
    sentimentScore: 87.9,
    resolutionRate: 90.1,
    rating: 4.7
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: 'DK',
    status: 'online',
    totalCalls: 1156,
    avgDuration: '4:18',
    sentimentScore: 91.2,
    resolutionRate: 94.3,
    rating: 4.8
  }
];