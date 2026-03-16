# VoiceIQ - AI-Powered Call Analysis Portal 🎯

A modern, full-featured call analysis and portal management system built with Next.js 14, TypeScript, and Tailwind CSS. Transform your customer interactions with AI-powered insights, real-time analytics, and comprehensive agent performance tracking.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📸 Screenshots

```
Dashboard → Real-time metrics, call volume charts, sentiment analysis
Call Logs → Searchable history with filters and AI insights
Analytics → Agent performance, trends, and detailed reports
Settings → Full customization with dark/light themes
```

## ✨ Features

### 🎯 Core Functionality
- **AI Call Analysis** - Automated transcription, sentiment analysis, and insights
- **Real-time Dashboard** - Live metrics, call volume, and performance tracking
- **Agent Performance** - Comprehensive leaderboards and individual analytics
- **Advanced Search** - Find calls by agent, customer, keyword, or date range
- **Notification System** - Real-time alerts for escalations and performance issues
- **Multi-user Support** - Role-based access (Admin, Manager, Agent)

### 🎨 User Interface
- **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Glass-morphism UI** - Modern, elegant design with smooth animations
- **Collapsible Sidebar** - Maximize workspace with animated transitions
- **Quick Stats** - At-a-glance metrics in header
- **Toast Notifications** - Non-intrusive alerts and confirmations

### 📊 Analytics & Reporting
- **Call Metrics** - Duration, sentiment, resolution rates
- **Sentiment Analysis** - AI-powered emotion detection with color-coded indicators
- **Performance Trends** - Track improvements over time
- **Export Reports** - PDF and Excel export functionality
- **Custom Filters** - Filter by date, agent, sentiment, category
- **Data Visualization** - Charts, graphs, and interactive dashboards

### ⚙️ Settings & Configuration
- **Account Settings** - Email, phone, language, timezone
- **Security** - Password change, 2FA, session management
- **Notification Preferences** - Granular control over alerts
- **Quiet Hours** - Schedule notification-free periods
- **Profile Management** - Edit personal and professional info
- **Help & Support** - Built-in FAQ, contact forms, and live chat

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18.x or higher
npm, yarn, or pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/voiceiq-portal.git
cd voiceiq-portal
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
voiceiq-portal/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx                    # Dashboard
│   │   ├── calls/
│   │   │   ├── page.tsx                # Call logs list
│   │   │   └── [id]/page.tsx           # Call details
│   │   ├── agents/
│   │   │   └── page.tsx                # Agent performance
│   │   ├── notifications/
│   │   │   └── page.tsx                # Notifications center
│   │   ├── profile/
│   │   │   └── page.tsx                # User profile
│   │   └── settings/
│   │       ├── page.tsx                # Account settings
│   │       └── notifications/
│   │           └── page.tsx            # Notification preferences
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Main header
│   │   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   │   └── LayoutClient.tsx        # Client layout wrapper
│   │   ├── headers/
│   │   │   ├── SearchBar.tsx           # Global search
│   │   │   ├── QuickStats.tsx          # Header metrics
│   │   │   ├── NotificationDropdown.tsx # Notifications
│   │   │   └── ProfileMenu.tsx         # User menu
│   │   ├── common/
│   │   │   ├── Dropdown.tsx            # Reusable dropdown
│   │   │   ├── MenuItem.tsx            # Menu items
│   │   │   ├── Avatar.tsx              # User avatars
│   │   │   └── Badge.tsx               # Count badges
│   │   ├── modals/
│   │   │   └── HelpSupportModal.tsx    # Help modal
│   │   └── charts/
│   │       └── CallVolumeChart.tsx     # Data visualizations
│   ├── contexts/
│   │   └── ThemeContext.tsx            # Dark/light theme
│   ├── lib/
│   │   ├── mockdata.ts                 # Sample data
│   │   └── utils.ts                    # Utility functions
│   ├── config/
│   │   └── navigation.ts               # Nav configuration
│   ├── layout.tsx                      # Root layout
│   └── globals.css                     # Global styles
├── public/
│   ├── icons/
│   └── images/
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Key Pages & Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Dashboard | Metrics, charts, recent calls |
| `/calls` | Call Logs | Search, filter, pagination |
| `/calls/[id]` | Call Details | Transcript, audio, insights |
| `/agents` | Agent Performance | Leaderboard, stats, trends |
| `/notifications` | Notifications | Filter, search, bulk actions |
| `/profile` | User Profile | Edit info, view activity |
| `/settings` | Account Settings | Security, preferences, danger zone |
| `/settings/notifications` | Notification Prefs | Types, frequency, quiet hours |

## 🎨 Component Architecture

### Layout Components

#### Header
```tsx
import Header from '@/components/layout/Header';

<Header 
  todayCalls={1247}
  avgDuration="4:32"
  sentiment={87}
/>
```

**Features:**
- Global search with keyboard shortcut (Ctrl+K)
- Quick stats (today's calls, avg duration, sentiment)
- Notification dropdown with unread badge
- Profile menu with theme toggle

#### Sidebar
```tsx
import Sidebar from '@/components/layout/Sidebar';

<Sidebar 
  navItems={navigationItems}
  isCollapsed={isCollapsed}
  onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
/>
```

**Features:**
- Collapsible with smooth animations
- Active route highlighting
- Live stats card
- Tooltips when collapsed

### Common Components

All components are fully typed and reusable:

```tsx
// Dropdown
<Dropdown onClose={() => {}} position="right" width="w-64">
  {/* Content */}
</Dropdown>

// MenuItem
<MenuItem icon={Settings} label="Settings" href="/settings" />

// Avatar
<Avatar name="John Doe" size="lg" />

// Badge
<Badge count={5} max={9} />
```

## 🔧 Configuration

### Theme Configuration

Dark/light mode with system preference detection:

```tsx
// app/contexts/ThemeContext.tsx
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// In your component
const { theme, toggleTheme } = useTheme();
```

### Navigation Configuration

Centralized navigation in `app/config/navigation.ts`:

```typescript
export const navigationItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    href: '/' 
  },
  { 
    id: 'calls', 
    label: 'Call Logs', 
    icon: Phone, 
    href: '/calls' 
  },
  // ... more items
];
```

### Mock Data

Sample data in `app/lib/mockdata.ts`:

```typescript
export const QuickStats = {
  calls: 1247,
  duration: "4:32",
  sentiment: 87
};

export const notifdata: Notification[] = [
  // ... notification data
];
```

## 🎨 Styling

### Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
```

### Global Styles

```css
/* app/globals.css */

/* Glass-morphism effect */
.glass-effect {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Light mode */
.light .glass-effect {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.3);
}
```

## 🔐 Authentication (Future)

Ready for authentication integration:

```tsx
// Example with NextAuth.js
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <Dashboard user={session.user} />;
}
```

## 📊 Data Integration

### API Integration

```typescript
// app/lib/api.ts
export async function getCalls(filters: CallFilters) {
  const response = await fetch('/api/calls', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
  return response.json();
}

// Usage in component
const calls = await getCalls({
  dateRange: 'last_7_days',
  sentiment: 'positive',
});
```

### State Management

Currently using React Context. Ready for:
- Redux Toolkit
- Zustand
- React Query / SWR

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel Deployment

```bash
vercel --prod
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.voiceiq.com
NEXT_PUBLIC_APP_URL=https://voiceiq.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://voiceiq.com
```

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Dashboard with real-time metrics
- [x] Call logs with search and filters
- [x] Agent performance tracking
- [x] Notification system
- [x] Settings and preferences
- [x] Dark/light mode

### Phase 2 (In Progress) 🚧
- [ ] Real-time audio transcription
- [ ] Advanced AI sentiment analysis
- [ ] Custom report builder
- [ ] Email notifications
- [ ] Mobile app (React Native)

### Phase 3 (Planned) 📋
- [ ] Multi-tenant support
- [ ] Advanced analytics with ML
- [ ] Integration marketplace
- [ ] White-label options
- [ ] API for third-party integrations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run type-check
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing framework
- **Tailwind CSS** - Utility-first CSS
- **Lucide Icons** - Beautiful icon set
- **Vercel** - Hosting and deployment

## 📞 Support

- **Documentation**: [docs.voiceiq.com](https://docs.voiceiq.com)
- **Email**: support@voiceiq.com
- **Discord**: [Join our community](https://discord.gg/voiceiq)
- **Issues**: [GitHub Issues](https://github.com/yourusername/voiceiq-portal/issues)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

Last updated: March 2026