import React, { useState, useEffect } from 'react';
import './CurrentWorkoutPage.css';

interface CurrentWorkoutPageProps {
  onEndWorkout: () => void;
}

const CurrentWorkoutPage: React.FC<CurrentWorkoutPageProps> = ({ onEndWorkout }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleEndWorkout = () => {
    setIsRunning(false);
    onEndWorkout();
  };

  return (
    <div className="current-workout-page">
      <header className="workout-header">
        <button className="back-btn" onClick={handleEndWorkout}>
          ← Back
        </button>
        <h1 className="workout-title">Active Workout</h1>
      </header>

      <main className="workout-main">
        <div className="timer-section">
          <div className="timer-circle">
            <div className="timer-display">
              <span className="timer-label">Duration</span>
              <span className="timer-time">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          
          <div className="timer-controls">
            <button 
              className={`control-btn ${isRunning ? 'pause' : 'play'}`}
              onClick={toggleTimer}
            >
              {isRunning ? '⏸' : '▶'}
            </button>
          </div>
        </div>

        <div className="workout-content">
          <div className="info-card">
            <div className="info-item">
              <span className="info-icon">🏋️</span>
              <div className="info-text">
                <h3>Exercises</h3>
                <p className="info-value">0</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">🔄</span>
              <div className="info-text">
                <h3>Sets Completed</h3>
                <p className="info-value">0</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">💪</span>
              <div className="info-text">
                <h3>Total Reps</h3>
                <p className="info-value">0</p>
              </div>
            </div>
          </div>

          <div className="add-exercise-section">
            <button className="add-exercise-btn">
              <span className="add-icon">+</span>
              <span>Add Exercise</span>
            </button>
          </div>
        </div>

        <div className="workout-actions">
          <button className="end-workout-btn" onClick={handleEndWorkout}>
            Finish Workout
          </button>
        </div>
      </main>
    </div>
  );
};

export default CurrentWorkoutPage;
