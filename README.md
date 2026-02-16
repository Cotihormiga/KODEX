# KODEX - Gym Workout Tracker 💪

A beautiful and functional gym workout logging website with a stunning front-end and robust backend.

## Features

- 🏋️ **Log Workouts**: Track exercises, sets, reps, weight, and notes
- 📊 **Statistics Dashboard**: View total workouts, sets, reps, and exercises
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations and gradients
- 🔍 **Sorting & Filtering**: Sort workouts by date or exercise name
- 💾 **Persistent Storage**: All data saved to JSON file
- ⚡ **Real-time Updates**: Instant feedback and statistics updates

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Storage**: JSON file-based persistence
- **Design**: Modern gradients, glassmorphism, smooth animations

## Installation

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

## API Endpoints

- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Add a new workout
- `DELETE /api/workouts/:id` - Delete a workout
- `GET /api/stats` - Get workout statistics

## Project Structure

```
KODEX/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Beautiful CSS styles
│   └── app.js          # Frontend JavaScript
├── server.js           # Express backend
├── package.json        # Dependencies
└── README.md           # Documentation
```

## License

MIT

## Author

Built with 💪 and dedication