import React from 'react'
import WorkoutList from './workoutList';
import SearchWorkout from './searchWorkout';
function WorkoutIndex() {

  return (
    <>
    <SearchWorkout/>
    <div className='max-w-screen-lg mx-auto p-4'>
        <WorkoutList/>
    </div>
    </>
  )
}

export default WorkoutIndex