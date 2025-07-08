# OpenManus Frontend

A modern, responsive frontend interface for OpenManus that replicates the Bolt.new UI/UX experience.

## Features

- 🎨 **Modern Dark Theme** - Beautiful dark interface with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all device sizes
- ⚡ **Fast & Performant** - Built with Vite and optimized for speed
- 🎭 **Smooth Animations** - Framer Motion powered transitions
- 🔧 **Component-Based** - Reusable, maintainable component architecture
- ♿ **Accessible** - Built with accessibility best practices
- 🚀 **GitHub Integration** - Import repositories with validation and error handling

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful, customizable icons

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── Header.tsx      # Main navigation header
│   ├── WelcomeScreen.tsx # Hero section and quick start
│   ├── ImportModal.tsx # GitHub repository import modal
│   └── Toast.tsx       # Toast notification system
├── contexts/           # React contexts for state management
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## Key Components

### Header
- Responsive navigation with logo and actions
- Import repository button
- Clean, modern design

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

### Toast System
- Context-based notification system
- Multiple toast types (success, error, warning, info)
- Auto-dismiss functionality
- Smooth animations

## Customization

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

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details