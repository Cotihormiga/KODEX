const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'workouts.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

// Read workouts from file
async function readWorkouts() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading workouts:', error);
    return [];
  }
}

// Write workouts to file
async function writeWorkouts(workouts) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(workouts, null, 2));
  } catch (error) {
    console.error('Error writing workouts:', error);
    throw error;
  }
}

// API Routes

// Get all workouts
app.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await readWorkouts();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Add a new workout
app.post('/api/workouts', async (req, res) => {
  try {
    const { exercise, sets, reps, weight, date, notes } = req.body;
    
    if (!exercise || !sets || !reps || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workouts = await readWorkouts();
    const newWorkout = {
      id: Date.now().toString(),
      exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : null,
      date,
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    workouts.push(newWorkout);
    await writeWorkouts(workouts);
    
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add workout' });
  }
});

// Delete a workout
app.delete('/api/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workouts = await readWorkouts();
    const filteredWorkouts = workouts.filter(w => w.id !== id);
    
    if (workouts.length === filteredWorkouts.length) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    
    await writeWorkouts(filteredWorkouts);
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// Get workout statistics
app.get('/api/stats', async (req, res) => {
  try {
    const workouts = await readWorkouts();
    const stats = {
      totalWorkouts: workouts.length,
      totalSets: workouts.reduce((sum, w) => sum + w.sets, 0),
      totalReps: workouts.reduce((sum, w) => sum + (w.sets * w.reps), 0),
      exercises: [...new Set(workouts.map(w => w.exercise))].length
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Start server
async function startServer() {
  await initDataFile();
  app.listen(PORT, () => {
    console.log(`🏋️ Gym Tracker Server running on http://localhost:${PORT}`);
  });
}

startServer();
