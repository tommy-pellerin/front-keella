import React,{useState,useEffect} from 'react'
import { getData } from '../../services/data-fetch'

function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const getWorkouts = async () => {
          try {
            const data = await getData(`/workouts`);
            const sortedData = data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
            console.log(sortedData);
            setWorkouts(sortedData);
          } catch (error) {
            console.error(error);
          }
        };
        getWorkouts();
      }, []);

      const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

  return (
    <div className='max-w-screen-lg mx-auto p-4'>
        <h2 className='text-center font-bold'>{workouts.length} Résultats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {workouts.slice(0, visibleCount).map((workout)=>
    <div key={workout.id} className="flex flex-col bg-slate border shadow-sm rounded-xl ">
            <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D" alt="Image Description"></img>
        <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800">
            {workout.title}
        </h3>
        <p className="mt-1 text-gray-500">
            {workout.description}            
        </p>
        <ul>
            <li className="mt-1 text-gray-500 ">Prix : {workout.price}</li>
            <li className="mt-1 text-gray-500 ">Durée : {workout.duration}</li>
            <li className="mt-1 text-gray-500 ">Nombre de place : {workout.max_participants}</li>
            <li className="mt-1 text-gray-500 ">Date : {workout.start_date}</li>

        </ul>
            <a className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                S'inscrire
            </a>
        </div>
    </div>
        )}
    </div>
    {visibleCount < workouts.length && (
                <div className="flex justify-center mt-6">
                    <button onClick={loadMore} className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Load More
                    </button>
                </div>
            )}
    </div>
  )
}

export default WorkoutList