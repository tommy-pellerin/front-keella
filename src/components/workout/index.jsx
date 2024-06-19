import React, { useState } from 'react'
import WorkoutList from './workoutList';
import SearchWorkout from './searchWorkout';
function WorkoutIndex() {
    const [searchResults, setSearchResults] = useState(null);
  return (
    <>
    <div className='max-w-screen-lg mx-auto p-4'>
        <SearchWorkout onSearch={setSearchResults} />
        <WorkoutList searchResults={searchResults} />
    </div>
    </>
  )
}

export default WorkoutIndex