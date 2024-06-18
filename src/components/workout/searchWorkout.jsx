import React,{ useState } from "react";

function SearchWorkout() {
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [tags, setTags] = useState('');
    const [participants, setParticipants] = useState('')
  return (
    <div>
      <form className="max-w-lg mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative flex">
          <input 
          type="search" 
          id="city-search" 
          className="block w-1/2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
          placeholder="City" 
          value={city}
          onChange={(e)=> setCity(e.target.value)}
          required />
          <input 
          type="search" 
          id="date-search" 
          className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500" 
          placeholder="Date"
          value={date}
          onChange={(e)=> setDate(e.target.value)}
          required />
          <input 
          type="search" 
          id="tags-search" 
          className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500" 
          placeholder="Tags"
          value={tags}
          onChange={(e)=> setTags(e.target.value)}
          required />
          <input 
          type="search" 
          id="participants-search" 
          className="block w-1/2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500" 
          placeholder="Participants"
          value={participants}
          onChange={(e)=> setParticipants(e.target.value)}
          required />
          <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchWorkout;
