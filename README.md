# Demo - Call Analysis Platform

A sophisticated SaaS analytics dashboard for analyzing customer service calls, tracking agent performance, and extracting AI-powered insights from call recordings.

## 🎯 Platform Overview

Platform is designed for customer service teams, call centers, and sales organizations to analyze call quality, sentiment, and performance metrics in real-time.

### Key Features

- 📞 **Call Analytics Dashboard** - Real-time metrics and trends
- 🎙️ **Audio Player & Transcripts** - Listen to calls with synchronized transcripts
- 🧠 **AI Sentiment Analysis** - Automated positive/neutral/negative detection
- 👥 **Agent Performance Tracking** - Individual and team metrics
- 📊 **Visual Reports** - Interactive charts and data visualizations
- 🔍 **Advanced Search & Filters** - Find specific calls quickly
- ⚡ **Live Call Monitoring** - Track active calls in real-time

## 📁 Project Structure

```
app/
├── layout.tsx                 → Root layout with sidebar navigation
├── globals.css               → Global styles
├── page.tsx                  → Dashboard homepage
├── calls/
│   ├── page.tsx              → Call logs list
│   └── [id]/
│       └── page.tsx          → Individual call details
└── agents/
    └── page.tsx              → Agent performance metrics
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
```
http://localhost:3000
```

## 📊 Features Breakdown

### Dashboard (`/`)
- Animated metric cards (total calls, avg duration, sentiment, resolution)
- Weekly call volume chart
- Sentiment breakdown (positive/neutral/negative)
- Recent calls table
- Live call counter

### Call Logs (`/calls`)
- Searchable call history
- Filter by sentiment
- Date range selection
- Export functionality
- Quick play/view actions
- Pagination

### Call Details (`/calls/[id]`)
- Audio player with visual waveform
- Full transcript with timestamps
- Sentiment analysis circle chart
- Key moments timeline
- Call insights (talk ratio, response time, keywords)
- Topic detection
- Resolution status

### Agents (`/agents`)
- Top performers leaderboard
- Performance distribution
- Individual agent cards with:
  - Total calls
  - Average duration
  - Sentiment scores
  - Resolution rates
  - Star ratings
- Team-wide statistics

## 💡 Use Cases

### Customer Service Teams
- Monitor call quality
- Track customer satisfaction
- Identify training opportunities
- Measure resolution rates

### Sales Teams
- Analyze sales call effectiveness
- Track conversion metrics
- Identify best practices
- Coach team members

### Quality Assurance
- Review call compliance
- Check keyword usage
- Monitor agent performance
- Spot trends and issues

## 🎯 Key Metrics Tracked

1. **Call Volume** - Total calls per day/week/month
2. **Call Duration** - Average time per call
3. **Sentiment Score** - AI-detected customer emotion
4. **Resolution Rate** - % of issues resolved
5. **Agent Performance** - Individual and team stats
6. **Response Time** - How quickly agents respond
7. **Talk Ratio** - Agent vs customer talk time
8. **Dead Air** - Silence detection

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: DM Sans, JetBrains Mono

## 🎨 Design Elements

### Color Palette
- Primary: Cyan (`#06b6d4`) to Blue (`#3b82f6`)
- Success: Emerald (`#10b981`)
- Warning: Amber (`#f59e0b`)
- Error: Rose (`#f43f5e`)
- Background: Slate gradients

### Components
- Glass-morphism cards
- Gradient metric cards
- Animated waveforms
- Circular progress indicators
- Status badges
- Interactive charts

## 📱 Responsive Design

All pages are fully responsive and work on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (375px+)

## 🔮 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Advanced filtering and search
- [ ] Custom date range picker
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] API integration
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard

## 🎓 Learning Resources

This dashboard demonstrates:
- Next.js App Router file-based routing
- TypeScript with React
- Tailwind CSS custom styling
- Component composition
- State management with hooks
- Dynamic routes with parameters
- Responsive design patterns

## 📝 Customization

### Change Colors
Look for gradient classes in components:
```tsx
from-cyan-500 to-blue-500  // Change to your brand colors
```

### Update Mock Data
Replace arrays in each page:
```tsx
const calls = [...] // Add your API call here
```

### Add New Pages
Create new files in `/app` directory:
```
app/analytics/page.tsx  →  /analytics route
app/reports/page.tsx    →  /reports route
```

## 🤝 Contributing

This is a demo/template project. Feel free to:
- Fork and modify for your needs
- Use as learning material
- Build upon for production use

## 📄 License

MIT License - Free to use and modify

## 🙏 Acknowledgments

- Design inspired by modern SaaS analytics platforms
- Icons by Lucide React
- Fonts by Google Fonts

---

Built with ❤️ for call center teams and customer service professionals