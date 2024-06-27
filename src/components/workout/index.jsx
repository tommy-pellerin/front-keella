import React from 'react';
import WorkoutList from './workoutList';
import SearchWorkout from './searchWorkout';

function WorkoutIndex() {
    return (
        <div>
            <SearchWorkout />
            <WorkoutList />
        </div>
    );
}

export default WorkoutIndex;
