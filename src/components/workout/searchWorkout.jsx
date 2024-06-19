import React,{ useState } from "react";
import { getData } from '../../services/data-fetch'

function SearchWorkout({ onSearch }) {
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time,setTime] = useState('');
    const [categorie, setCategorie] = useState('');
    const [participants, setParticipants] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Effectuez ici les requêtes adaptées avec les données du formulaire
    const queryParams = new URLSearchParams({
      city,
      date,
      time,
      categorie,
      participants
    }).toString();
    try {
        console.log(queryParams);
        const response = await getData(`/workouts/search?${queryParams}`);
        onSearch(response);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
      };

  return (
    <div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative flex">
          <input 
          type="search" 
          id="city-search" 
          className="block w-1/2 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
          placeholder="City" 
          value={city}
          onChange={(e)=> setCity(e.target.value)}
        />
          <input 
          type="date" 
          id="date-search" 
          className="block w-1/2 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50" 
          placeholder="Date"
          value={date}
          onChange={(e)=> setDate(e.target.value)}
        />
        <input 
          type="time"
          step="1800" 
          id="time-search" 
          className="block w-1/2 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50" 
          placeholder="Time"
          value={time}
          onChange={(e)=> setTime(e.target.value)}
        />
          <input 
          type="search" 
          id="tags-search" 
          className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50" 
          placeholder="Tags"
          value={categorie}
          onChange={(e)=> setCategorie(e.target.value)}
        />
          <input 
          type="search" 
          id="participants-search" 
          className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50" 
          placeholder="Places"
          value={participants}
          onChange={(e)=> setParticipants(e.target.value)}
        />
          <button 
          type="submit" 
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchWorkout;