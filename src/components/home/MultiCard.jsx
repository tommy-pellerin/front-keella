import React, { useState, useEffect } from 'react';
import WorkoutList from '../workout/workoutList';
import { getData } from '../../services/data-fetch';

const MultiCard = () => {
  const [limitedWorkouts, setLimitedWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const data = await getData(`/workouts`);
        const sortedData = data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        console.log(sortedData);
        // Limitez les données aux trois premières cartes
        setLimitedWorkouts(sortedData.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };
    getWorkouts();
  }, []);

  return (
    <div>
      <WorkoutList workouts={limitedWorkouts} />
    </div>
  );
};

export default MultiCard;