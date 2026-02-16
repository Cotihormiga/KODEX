// API Base URL
const API_URL = window.location.origin;

// State
let workouts = [];
let sortBy = 'date-desc';

// DOM Elements
const workoutForm = document.getElementById('workoutForm');
const workoutsList = document.getElementById('workoutsList');
const sortSelect = document.getElementById('sortBy');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    loadWorkouts();
    loadStats();
    
    // Event listeners
    workoutForm.addEventListener('submit', handleSubmit);
    sortSelect.addEventListener('change', handleSort);
});

// Initialize form
function initializeForm() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

// Load workouts from API
async function loadWorkouts() {
    try {
        const response = await fetch(`${API_URL}/api/workouts`);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        
        workouts = await response.json();
        renderWorkouts();
    } catch (error) {
        console.error('Error loading workouts:', error);
        showError('Failed to load workouts');
    }
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/api/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        
        const stats = await response.json();
        updateStats(stats);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Update stats display
function updateStats(stats) {
    document.getElementById('totalWorkouts').textContent = stats.totalWorkouts;
    document.getElementById('totalSets').textContent = stats.totalSets;
    document.getElementById('totalReps').textContent = stats.totalReps;
    document.getElementById('totalExercises').textContent = stats.exercises;
    
    // Animate numbers
    animateValue('totalWorkouts', 0, stats.totalWorkouts, 1000);
    animateValue('totalSets', 0, stats.totalSets, 1000);
    animateValue('totalReps', 0, stats.totalReps, 1000);
    animateValue('totalExercises', 0, stats.exercises, 1000);
}

// Animate number counting
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        exercise: document.getElementById('exercise').value.trim(),
        sets: document.getElementById('sets').value,
        reps: document.getElementById('reps').value,
        weight: document.getElementById('weight').value,
        date: document.getElementById('date').value,
        notes: document.getElementById('notes').value.trim()
    };
    
    try {
        const response = await fetch(`${API_URL}/api/workouts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Failed to add workout');
        
        const newWorkout = await response.json();
        
        // Show success message
        showSuccess('Workout added successfully! 💪');
        
        // Reset form
        workoutForm.reset();
        document.getElementById('date').valueAsDate = new Date();
        
        // Reload data
        await loadWorkouts();
        await loadStats();
        
    } catch (error) {
        console.error('Error adding workout:', error);
        showError('Failed to add workout');
    }
}

// Handle sorting
function handleSort(e) {
    sortBy = e.target.value;
    renderWorkouts();
}

// Render workouts list
function renderWorkouts() {
    if (workouts.length === 0) {
        workoutsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏃‍♂️</div>
                <h3>No workouts yet!</h3>
                <p>Start logging your workouts to track your progress</p>
            </div>
        `;
        return;
    }
    
    // Sort workouts
    const sortedWorkouts = sortWorkouts([...workouts]);
    
    // Render workout cards
    workoutsList.innerHTML = sortedWorkouts.map(workout => createWorkoutCard(workout)).join('');
    
    // Add delete event listeners
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const workoutId = e.target.closest('.btn-danger').dataset.id;
            handleDelete(workoutId);
        });
    });
}

// Sort workouts based on selected option
function sortWorkouts(workoutsToSort) {
    switch (sortBy) {
        case 'date-desc':
            return workoutsToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'date-asc':
            return workoutsToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'exercise':
            return workoutsToSort.sort((a, b) => a.exercise.localeCompare(b.exercise));
        default:
            return workoutsToSort;
    }
}

// Create workout card HTML
function createWorkoutCard(workout) {
    const date = new Date(workout.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const weightDisplay = workout.weight ? `${workout.weight} kg` : 'Body weight';
    
    return `
        <div class="workout-card">
            <div class="workout-header">
                <div>
                    <h3 class="workout-title">${escapeHtml(workout.exercise)}</h3>
                    <div class="workout-date">📅 ${date}</div>
                </div>
                <button class="btn btn-danger" data-id="${workout.id}">
                    <span class="btn-icon">🗑️</span>
                    Delete
                </button>
            </div>
            
            <div class="workout-details">
                <div class="workout-detail">
                    <span class="detail-label">Sets</span>
                    <span class="detail-value">${workout.sets}</span>
                </div>
                <div class="workout-detail">
                    <span class="detail-label">Reps</span>
                    <span class="detail-value">${workout.reps}</span>
                </div>
                <div class="workout-detail">
                    <span class="detail-label">Weight</span>
                    <span class="detail-value">${weightDisplay}</span>
                </div>
                <div class="workout-detail">
                    <span class="detail-label">Total Volume</span>
                    <span class="detail-value">${workout.sets * workout.reps} reps</span>
                </div>
            </div>
            
            ${workout.notes ? `
                <div class="workout-notes">
                    <strong>Notes:</strong> ${escapeHtml(workout.notes)}
                </div>
            ` : ''}
        </div>
    `;
}

// Handle delete
async function handleDelete(workoutId) {
    if (!confirm('Are you sure you want to delete this workout?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/workouts/${workoutId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete workout');
        
        showSuccess('Workout deleted successfully');
        
        // Reload data
        await loadWorkouts();
        await loadStats();
        
    } catch (error) {
        console.error('Error deleting workout:', error);
        showError('Failed to delete workout');
    }
}

// Show success message
function showSuccess(message) {
    showToast(message, 'success');
}

// Show error message
function showError(message) {
    showToast(message, 'error');
}

// Show toast notification
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add toast animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
