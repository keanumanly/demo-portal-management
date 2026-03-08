

export interface Call {
    id: string;
    callId: string;
    agent: string;
    customer: string;
    phoneNumber: string;
    date: string;
    time: string;
    duration: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    topics: string[];
    resolution: boolean;
  }

export const mockcalldata: Call[] =  [
    {
      id: '1',
      callId: 'CALL-2024-001',
      agent: 'Sarah Johnson',
      customer: 'John Doe',
      phoneNumber: '+1 (555) 123-4567',
      date: '2024-02-13',
      time: '09:15 AM',
      duration: '5:32',
      sentiment: 'positive',
      topics: ['Billing', 'Account'],
      resolution: true
    },
    {
      id: '2',
      callId: 'CALL-2024-002',
      agent: 'Mike Chen',
      customer: 'Jane Smith',
      phoneNumber: '+1 (555) 234-5678',
      date: '2024-02-13',
      time: '09:28 AM',
      duration: '3:45',
      sentiment: 'neutral',
      topics: ['Technical Support'],
      resolution: true
    },
    {
      id: '3',
      callId: 'CALL-2024-003',
      agent: 'Emma Wilson',
      customer: 'Bob Brown',
      phoneNumber: '+1 (555) 345-6789',
      date: '2024-02-13',
      time: '09:42 AM',
      duration: '7:12',
      sentiment: 'positive',
      topics: ['Product Inquiry', 'Sales'],
      resolution: true
    },
    {
      id: '4',
      callId: 'CALL-2024-004',
      agent: 'Alex Kumar',
      customer: 'Alice Davis',
      phoneNumber: '+1 (555) 456-7890',
      date: '2024-02-13',
      time: '10:05 AM',
      duration: '2:18',
      sentiment: 'negative',
      topics: ['Complaint', 'Refund'],
      resolution: false
    },
    {
      id: '5',
      callId: 'CALL-2024-005',
      agent: 'Sarah Johnson',
      customer: 'Charlie Wilson',
      phoneNumber: '+1 (555) 567-8901',
      date: '2024-02-13',
      time: '10:22 AM',
      duration: '4:56',
      sentiment: 'positive',
      topics: ['Account Setup'],
      resolution: true
    },
  ];