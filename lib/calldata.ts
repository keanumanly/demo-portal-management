

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


interface agentProps {
    name: string;
    id: string;
    avatar: string;
};

interface customerProps {
    name: string;
    phone: string;
    location: string;
};

interface keyMomentsProps { 
    time: number;
    label: string;
     type: string;
}

export interface DetailedCall {
    id: string;
    callId: string;
    agent: agentProps;
    customer: customerProps;
    phoneNumber: string;
    date: string;
    time: string;
    duration: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    sentimentScore: number;
    topics: string[];
    resolution: boolean;
    keyMoments: keyMomentsProps[];
  }

  export const detailcalldata: DetailedCall[] = [
    {
        id: '1',
        callId: 'CALL-2024-001',
        agent: {
          name: 'Sarah Johnson',
          id: 'AGT-001',
          avatar: 'SJ'
        },
        customer: {
          name: 'John Doe',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY'
        },
        phoneNumber: '+1 (555) 123-4567',
        date: '2024-02-13',
        time: '09:15 AM',
        duration: '5:32',
        sentiment: 'positive',
        sentimentScore: 87.5,
        topics: ['Billing', 'Account', 'Payment'],
        resolution: true,
        keyMoments: [
          { time: 12, label: 'Customer issue identified', type: 'info' },
          { time: 156, label: 'Solution proposed', type: 'success' },
          { time: 289, label: 'Customer satisfied', type: 'success' }
        ]
      },
      {
        id: '2',
        callId: 'CALL-2024-002',
        agent: {
            name: 'Mike Chen',
            id: 'AGT-002',
            avatar: 'MC'
          },
        customer: {
          name: 'Jane Smith',
          phone: '+1 (555) 234-5678',
          location: 'New York, NY'
        },
        phoneNumber: '+1 (555) 234-5678',
        date: '2024-02-13',
        time: '09:28 AM',
        duration: '3:45',
        sentiment: 'neutral',
        sentimentScore: 77.5,
        topics: ['Technical Support'],
        resolution: true,
        keyMoments: [
          { time: 12, label: 'Customer issue identified', type: 'info' },
          { time: 156, label: 'Solution proposed', type: 'success' },
          { time: 289, label: 'Customer satisfied', type: 'success' }
        ]
      },
      {
        id: '3',
        callId: 'CALL-2024-003',
        agent: {
          name: 'Emma Wilson',
          id: 'AGT-003',
          avatar: 'EW'
        },
        customer: {
          name: 'Bob Brown',
          phone: '+1 (555) 345-6789',
          location: 'New York, NY'
        },
        phoneNumber: '+1 (555) 345-6789',
        date: '2024-02-13',
        time: '09:42 AM',
        duration: '7:12',
        sentiment: 'positive',
        sentimentScore: 87.5,
        topics: ['Product Inquiry', 'Sales'],
        resolution: true,
        keyMoments: [
          { time: 12, label: 'Customer issue identified', type: 'info' },
          { time: 156, label: 'Solution proposed', type: 'success' },
          { time: 289, label: 'Customer satisfied', type: 'success' }
        ]
      },
      {
        id: '4',
        callId: 'CALL-2024-004',
        agent: {
          name: 'Alex Kumar',
          id: 'AGT-004',
          avatar: 'AK'
        },
        customer: {
          name: 'Alice Davis',
          phone: '+1 (555) 456-7890',
          location: 'New York, NY'
        },
        phoneNumber: '+1 (555) 456-7890',
        date: '2024-02-13',
        time: '10:05 AM',
        duration: '2:18',
        sentiment: 'negative',
        sentimentScore: 37.5,
        topics: ['Complaint', 'Refund'],
        resolution: false,
        keyMoments: [
          { time: 12, label: 'Customer issue identified', type: 'info' },
          { time: 156, label: 'Solution proposed', type: 'success' },
          { time: 289, label: 'Customer satisfied', type: 'success' }
        ]
      },
      {
        id: '5',
        callId: 'CALL-2024-005',
        agent: {
          name: 'Sarah Johnson',
          id: 'AGT-005',
          avatar: 'SJ'
        },
        customer: {
          name: 'Charlie Wilson',
          phone: '+1 (555) 567-8901',
          location: 'New York, NY'
        },
        phoneNumber: '+1 (555) 567-8901',
        date: '2024-02-13',
        time: '10:22 AM',
        duration: '4:56',
        sentiment: 'positive',
        sentimentScore: 77.5,
        topics: ['Account Setup'],
        resolution: true,
        keyMoments: [
          { time: 12, label: 'Customer issue identified', type: 'info' },
          { time: 156, label: 'Solution proposed', type: 'success' },
          { time: 289, label: 'Customer satisfied', type: 'success' }
        ]
      },
  ]
export interface TranscriptProps { 
      speaker: string; 
      time: string; 
      text: string;
  }

export  const transcriptdata: TranscriptProps[] = [
    { speaker: 'Agent', time: '00:00', text: 'Thank you for calling. This is Sarah. How can I help you today?' },
    { speaker: 'Customer', time: '00:05', text: 'Hi Sarah, I\'m calling about a charge on my account that I don\'t recognize.' },
    { speaker: 'Agent', time: '00:12', text: 'I\'d be happy to help you with that. Let me pull up your account. Can you provide me with your account number?' },
    { speaker: 'Customer', time: '00:20', text: 'Sure, it\'s 12345678.' },
    { speaker: 'Agent', time: '00:25', text: 'Thank you. I see your account here. Looking at your recent transactions, I can see the charge you\'re referring to. Let me explain what that is.' },
    { speaker: 'Customer', time: '00:35', text: 'Yes, please. I\'m really confused about it.' },
    { speaker: 'Agent', time: '00:40', text: 'That charge is for the premium service upgrade you selected last month. It includes additional features like priority support and advanced analytics.' },
    { speaker: 'Customer', time: '00:52', text: 'Oh, I see! I completely forgot about that upgrade. That makes sense now.' },
    { speaker: 'Agent', time: '01:00', text: 'Great! Is there anything else I can help you with today?' },
    { speaker: 'Customer', time: '01:05', text: 'No, that\'s all. Thank you so much for clarifying!' },
    { speaker: 'Agent', time: '01:10', text: 'You\'re very welcome! Have a wonderful day!' }
  ];