# OpenManus Frontend - Integrated with Backend

A modern, responsive frontend interface for OpenManus that replicates the Bolt.new UI/UX experience and integrates seamlessly with the OpenManus backend.

## Features

- 🎨 **Modern Dark Theme** - Beautiful dark interface with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all device sizes
- ⚡ **Fast & Performant** - Built with Vite and optimized for speed
- 🎭 **Smooth Animations** - Framer Motion powered transitions
- 🔧 **Component-Based** - Reusable, maintainable component architecture
- ♿ **Accessible** - Built with accessibility best practices
- 🚀 **GitHub Integration** - Import repositories with validation and error handling
- 🤖 **AI Agent Interface** - Run different types of AI agents (Manus, Browser, SWE, Data Analysis)
- 📊 **Real-time Status** - Live agent execution monitoring with step-by-step progress
- 🔄 **Repository Management** - Import, manage, and switch between GitHub repositories
- 🌐 **Backend Integration** - Seamless connection to OpenManus Python backend

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful, customizable icons
- **Context API** - State management for agent and repository data

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd openmanus-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the OpenManus backend (in a separate terminal):
```bash
# Navigate to the OpenManus backend directory
cd path/to/OpenManus
python main.py
```

The backend should be running on `http://localhost:8000` for the frontend to connect properly.

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── Header.tsx      # Main navigation header
│   ├── WelcomeScreen.tsx # Hero section and quick start
│   ├── ImportModal.tsx # GitHub repository import modal
│   ├── Dashboard.tsx   # Main dashboard interface
│   ├── AgentInterface.tsx # AI agent interaction component
│   ├── RepositoryManager.tsx # Repository management
│   ├── ConnectionStatus.tsx # Backend connection indicator
│   └── Toast.tsx       # Toast notification system
├── contexts/           # React contexts for state management
│   ├── ToastContext.tsx # Toast notifications
│   └── OpenManusContext.tsx # OpenManus backend integration
├── services/           # API services and backend integration
│   └── api.ts         # OpenManus API client
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## Key Components

### Header
- Responsive navigation with logo and actions
- Import repository button
- Clean, modern design
- Dashboard navigation

### Dashboard
- Tabbed interface for different functionalities
- Collapsible sidebar navigation
- Real-time connection status
### WelcomeScreen
- Hero section with gradient text effects
- Quick start template buttons
- Feature highlights
- Responsive grid layout

### ImportModal
- GitHub URL validation
- Error handling with user-friendly messages
- Loading states and animations
- Permission error simulation

### AgentInterface
- Select different agent types (Manus, Browser, SWE, Data Analysis)
- Submit prompts and monitor execution
- Real-time step-by-step progress tracking
- Agent history and results display

### RepositoryManager
- View imported repositories
- Repository details (stars, forks, language, etc.)
- Select active repository for agent operations
- Refresh repository list

### ConnectionStatus
- Real-time backend connection monitoring
- Connection retry functionality
- Visual connection indicators

### Toast System
- Context-based notification system
- Multiple toast types (success, error, warning, info)
- Auto-dismiss functionality
- Smooth animations

## Customization

### Backend Configuration
The frontend connects to the OpenManus backend at `http://localhost:8000` by default. You can modify this in `src/services/api.ts`:

```typescript
const api = new OpenManusAPI({ 
  baseUrl: 'http://your-backend-url:port' 
})
```

### Colors
The color scheme can be customized in `tailwind.config.js`. The current theme uses:
- Primary: Blue gradient
- Secondary: Purple gradient
- Background: Dark gray tones
- Accents: Various gradient combinations

### Animations
Animations are handled by Framer Motion and can be customized in individual components. Common patterns include:
- Fade in/out
- Slide transitions
- Scale effects
- Stagger animations

### Components
All components are built with:
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Accessibility considerations

## Backend Integration

The frontend integrates with the OpenManus Python backend through:

- **Agent Operations**: Run different types of AI agents with real-time monitoring
- **Repository Management**: Import and manage GitHub repositories
- **Health Monitoring**: Check backend connection status
- **Error Handling**: Graceful degradation when backend is unavailable

### API Endpoints
- `POST /api/agent/run` - Execute an AI agent
- `GET /api/agent/{id}/status` - Get agent execution status
- `POST /api/repository/import` - Import a GitHub repository
- `GET /api/repositories` - List imported repositories
- `GET /api/health` - Backend health check

## Building for Production

```bash
npm run build
```

## Architecture Decisions

1. **State Management**: Used React Context API for global state management instead of Redux for simplicity
2. **API Integration**: Created a dedicated API service layer for backend communication
3. **Real-time Updates**: Implemented polling for agent status updates (WebSocket support can be added later)
4. **Error Handling**: Graceful degradation when backend is unavailable with demo mode fallbacks
5. **Component Structure**: Maintained separation between UI components and business logic

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details