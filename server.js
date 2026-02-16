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

    // Validate data types and ranges
    const parsedSets = parseInt(sets);
    const parsedReps = parseInt(reps);
    const parsedWeight = weight ? parseFloat(weight) : null;

    if (isNaN(parsedSets) || parsedSets <= 0) {
      return res.status(400).json({ error: 'Sets must be a positive integer' });
    }
    if (isNaN(parsedReps) || parsedReps <= 0) {
      return res.status(400).json({ error: 'Reps must be a positive integer' });
    }
    if (weight && (isNaN(parsedWeight) || parsedWeight <= 0)) {
      return res.status(400).json({ error: 'Weight must be a positive number' });
    }
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res.status(400).json({ error: 'Date must be in YYYY-MM-DD format' });
    }

    const workouts = await readWorkouts();
    // Generate more reliable unique ID with timestamp and random component
    const newWorkout = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      exercise,
      sets: parsedSets,
      reps: parsedReps,
      weight: parsedWeight,
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
