import { useState, useEffect } from "react"
import { getData } from "../../services/data-fetch";
import { useParams } from "react-router-dom";

const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)
  const [workout, setWorkout] = useState([]);
  const { workout_id } = useParams();
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const data = await getData(`/workouts/${workout_id}`);
        console.log(data);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      }
    };
    getWorkouts();
  }, [workout_id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    setQuantity(quantity - 1)
  }
  return(
    <>
      <div className="border border-black my-5">
        Images
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 my-5">

          <div className="col-span-2">
            <div className="flex my-3">
              <div>
                <h1>{workout.title}</h1>
                <p>petite description</p>
              </div>
              <div>Notes :</div>
            </div>
            <div className="my-3">
              <p>Description:</p>
              <p>{workout.description}</p>
            </div>
          </div>

          <div className="col-span-1">
            <h2>Prix : {workout.price}</h2>
            <p>Data</p>
            <p>Début de la séance :{workout.start_date}</p>
            <p>Fin de la séance :</p>
            <p>{workout.duration}</p>
            <div>
              <p>Nombre de place max : {workout.max_participants}</p>
              <p>Nombre de place disponible :</p>
              <p>Nombre de place : {quantity}</p>
              <div className="flex justify-around">
                <button className="border" onClick={increaseQuantity}>+</button>
                <button className="border" onClick={decreaseQuantity}>-</button>
              </div>  
            </div>
            <button className="border">Envoyer une demande de réservation</button>
          </div>
        </div>

        <div className="my-5">
          Commentaires
        </div>
      </div>
    </>
  )
}

export default WorkoutShow