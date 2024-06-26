import React, { useState,useEffect } from 'react';
import { getData } from '../../services/data-fetch';

function SearchWorkout({ onSearch, fetchDefaultWorkouts }) {
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category_id, setCategorie] = useState('');
    const [categories, setCategories] = useState([]);
    const [participants, setParticipants] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getData('/categories');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city && !date && !time && !category_id && !participants) {
            return;
        }
        const queryParams = new URLSearchParams({
            city,
            date,
            time,
            category_id,
            participants
        }).toString();
        try {
            console.log(queryParams);
            const response = await getData(`/workouts?${queryParams}&sort=start_date`);
            console.log(response);
            onSearch(response);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    return (
        <div className='pt-8'>
            <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative flex">
                    <input
                        type="search"
                        id="city-search"
                        className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="date"
                        id="date-search"
                        className="block w-1/3 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                        id="time-search"
                        className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <option value="">Durée</option>
                        {[...Array(16)].map((_, index) => {
                            const value = (index + 1) * 30;
                            const hours = Math.floor(value / 60);
                            const minutes = value % 60;
                            return (
                                <option key={value} value={value}>
                                    {hours > 0 ? `${hours}h ` : ''}{minutes > 0 ? `${minutes} min` : ''}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        type="search"
                        id="tags-search"
                        className="block w-1/3 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="Categories"
                        value={category_id}
                        onChange={(e) => setCategorie(e.target.value)}
                        >
                        <option value="">Catégorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <input
                        type="search"
                        id="participants-search"
                        className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="Places"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
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
