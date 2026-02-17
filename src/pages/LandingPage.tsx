import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onStartWorkout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartWorkout }) => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="app-title">KODEX</h1>
      </header>

      <main className="landing-main">
        <div className="categories-section">
          <div className="category-card">
            <div className="category-icon">📋</div>
            <h2>Workout Templates</h2>
            <p>Create and manage your workout routines</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📊</div>
            <h2>Past Workouts</h2>
            <p>View your workout history and progress</p>
          </div>
        </div>

        <div className="start-workout-container">
          <button 
            className="start-workout-btn"
            onClick={onStartWorkout}
            aria-label="Start Workout"
          >
            <span className="plus-icon">+</span>
          </button>
          <p className="start-workout-label">Start Workout</p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
