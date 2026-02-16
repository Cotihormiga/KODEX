# KODEX - Gym Workout Tracker 💪

A beautiful and functional gym workout logging website with a stunning front-end and robust backend.

## 🚀 Quick Start - No Installation Required!

**Want to try it immediately without installing anything?**

Simply open `standalone.html` in your web browser! This version:
- ✨ Works instantly - just double-click and open in any browser
- 💾 Saves data in your browser's localStorage
- 🎨 Has the exact same beautiful UI
- 📱 Works completely offline
- 🔒 All data stays on your computer

**To use standalone version:**
1. Download or open `standalone.html`
2. Double-click to open in your default browser (or right-click → Open with → choose browser)
3. Start logging workouts immediately!

## Features

- 🏋️ **Log Workouts**: Track exercises, sets, reps, weight, and notes
- 📊 **Statistics Dashboard**: View total workouts, sets, reps, and exercises
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations and gradients
- 🔍 **Sorting & Filtering**: Sort workouts by date or exercise name
- 💾 **Persistent Storage**: All data saved locally (localStorage or JSON file)
- ⚡ **Real-time Updates**: Instant feedback and statistics updates
- 🗑️ **Delete Functionality**: Remove workouts with confirmation dialog
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js (server version only)
- **Storage**: localStorage (standalone) or JSON file-based (server version)
- **Design**: Modern gradients, glassmorphism, smooth animations

## Installation (Full Server Version)

If you want to run the full server version with Node.js backend:

1. Clone the repository:
```bash
git clone https://github.com/Cotihormiga/KODEX.git
cd KODEX
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Add a Workout**: Fill in the workout form with exercise details and click "Add Workout"
2. **View Statistics**: Check the dashboard at the top to see your progress
3. **Sort Workouts**: Use the dropdown to sort by date or exercise name
4. **Delete Workouts**: Click the delete button on any workout card

## API Endpoints (Server Version)

- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Add a new workout
- `DELETE /api/workouts/:id` - Delete a workout
- `GET /api/stats` - Get workout statistics

## Project Structure

```
KODEX/
├── standalone.html     # No-install version (open directly in browser)
├── public/
│   ├── index.html      # Main HTML file (server version)
│   ├── styles.css      # Beautiful CSS styles
│   └── app.js          # Frontend JavaScript
├── server.js           # Express backend
├── package.json        # Dependencies
└── README.md           # Documentation
```

## Two Versions Explained

### Standalone Version (`standalone.html`)
- 🎯 **Best for**: Quick testing, personal use, no server needed
- 💾 **Storage**: Browser localStorage
- 🔧 **Setup**: None - just open the file
- 🌐 **Network**: Works offline

### Server Version (`npm start`)
- 🎯 **Best for**: Production use, team environments, persistent data
- 💾 **Storage**: JSON file on server
- 🔧 **Setup**: Requires Node.js and npm install
- 🌐 **Network**: Requires server running

## License

MIT

## Author

Built with 💪 and dedication