import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchWorkout() {
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [category_id, setCategorie] = useState('');
    const [categories, setCategories] = useState([]);
    const [participants, setParticipants] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getData('/categories');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        loadCategories();

        // Initialiser les valeurs des champs de formulaire à partir des paramètres de l'URL
        setCity(searchParams.get('city') || '');
        setDate(searchParams.get('date') || '');
        setTime(searchParams.get('time') || '');
        setCategorie(searchParams.get('category_id') || '');
        setParticipants(searchParams.get('participants') || '');
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            city,
            date,
            time,
            category_id,
            participants
        }).toString();
        if (queryParams === 'city=&date=&time=&category_id=&participants=') {
            navigate('/workouts');
        } else {
            navigate(`/workouts?${queryParams}`);
        }
    };

    return (
        <div className='pt-8'>
            <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                <div className="relative flex">
                    <input
                        type="search"
                        id="city-search"
                        className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="Ville"
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
                        type="number"
                        min="1"
                        id="participants-search"
                        className="block w-1/4 p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                        placeholder="Places minimum"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="button-primary-small">
                        Loupe
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchWorkout;
