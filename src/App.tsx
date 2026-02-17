import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CurrentWorkoutPage from './pages/CurrentWorkoutPage';
import './App.css';

function App() {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
  };

  const handleEndWorkout = () => {
    setIsWorkoutActive(false);
  };

  return (
    <div className="app">
      {isWorkoutActive ? (
        <CurrentWorkoutPage onEndWorkout={handleEndWorkout} />
      ) : (
        <LandingPage onStartWorkout={handleStartWorkout} />
      )}
    </div>
  );
}

export default App;
