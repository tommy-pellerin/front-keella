import React from 'react';
import WorkoutList from './workoutList';
import SearchWorkout from './searchWorkout';
import { Helmet } from 'react-helmet';

function WorkoutIndex() {
    return (
        <>
            <Helmet>
                <title>Keella | Les workouts</title>
                <meta name="description" content="La liste de tous les workouts" />
            </Helmet>
            <div>
                <SearchWorkout />
                <WorkoutList />
            </div>
        </>
    );
}

export default WorkoutIndex;
