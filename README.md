# KODEX - Workout Logging App

A modern, breathtaking workout logging application built with React, TypeScript, and Vite.

## Features

- 🎨 **Beautiful Modern UI** - Dark blue gradient background with #13B8B1 accent color
- ⏱️ **Workout Timer** - Real-time timer that tracks your workout duration
- 📋 **Workout Templates** - Create and manage your workout routines (coming soon)
- 📊 **Past Workouts** - View your workout history and progress (coming soon)
- 💪 **Exercise Tracking** - Track exercises, sets, and reps during your workout

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Cotihormiga/KODEX.git
cd KODEX
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
KODEX/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx       # Main landing page with categories
│   │   ├── LandingPage.css       # Landing page styles
│   │   ├── CurrentWorkoutPage.tsx # Active workout page with timer
│   │   └── CurrentWorkoutPage.css # Workout page styles
│   ├── App.tsx                    # Main app component
│   ├── App.css                    # App styles
│   ├── index.css                  # Global styles
│   └── main.tsx                   # App entry point
├── public/                        # Static assets
└── index.html                     # HTML template
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with gradients, animations, and effects

## UI Design

- **Primary Background**: Dark blue gradient (`#0a1929` to `#1a2332`)
- **Accent Color**: Cyan/teal (`#13B8B1`)
- **Features**: Glassmorphism effects, smooth animations, responsive design

## License

MIT
