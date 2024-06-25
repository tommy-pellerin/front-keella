import React, { useState, useRef } from 'react';
import WorkoutList from './workoutList';
import SearchWorkout from './searchWorkout';

function WorkoutIndex() {
    const [searchResults, setSearchResults] = useState(null);
    const workoutListRef = useRef();

    return (
        <div>
            <SearchWorkout
                onSearch={(results) => setSearchResults(results)}
                fetchDefaultWorkouts={() => workoutListRef.current.fetchDefaultWorkouts()}
            />
            <WorkoutList searchResults={searchResults} ref={workoutListRef} />
        </div>
    );
}

export default WorkoutIndex;
