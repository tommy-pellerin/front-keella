import { useState, useEffect } from "react"
import { getData, postData } from "../../services/data-fetch";
import { useParams } from "react-router-dom";

const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)
  const [workout, setWorkout] = useState([]);
  const { workout_id } = useParams();
  const [workout_images,setWorkout_images] = useState("")

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }
  function formatTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('fr-FR', options);
  }

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const data = await getData(`/workouts/${workout_id}`);
        console.log(data);
        setWorkout(data);
        if(data.workout_images){
          setWorkout_images(data.workout_images)
        }
      } catch (error) {
        console.error(error);
      }
    };
    getWorkouts();
  }, [workout_id]);

  const increaseQuantity = () => {
    if(quantity >= workout.available_places){
      return
    }
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    if(quantity <= 1){
      return
    }
    setQuantity(quantity - 1)
  }

  const handleReservation = (e) => {
    e.preventDefault();
    const body = 
    {
      "reservation":{
        "workout_id": workout.id,
        "quantity": quantity,
        "total": (quantity*workout.price),
        "status": "pending",
      }
    };
    const bookPlaces = async () => {
      try {
        const data = await postData(`/reservations`,body);
        console.log(data);
        if(data){
          alert("Votre demande de réservation a été envoyé")
        }
      } catch (error) {
        console.error(error);
      }
    };
    bookPlaces();
  }

  return(
    <>
      <div className="border border-black my-5">
        {workout_images ? workout_images : "Pas d'images"}
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
            <p>Début de la séance : {formatDate(workout.start_date)} à {formatTime(workout.start_date)}</p>
            <p>Fin de la séance : {formatDate(workout.end_date)} à {formatTime(workout.end_date)}</p>
            <p>Durée de la séance : {workout.duration}</p>
            <div>
              <p>Nombre de place max : {workout.max_participants}</p>
              <p>Nombre de place disponible : {workout.available_places}</p>
              <p>Nombre de place : {quantity}</p>
              <div className="flex justify-around">
                {/* Buttons are disabled when on conditions */}
                <button className="border" onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                <button className="border" onClick={increaseQuantity} disabled={quantity >= workout.available_places}>+</button>
              </div>
            </div>
            <button className="border" onClick={handleReservation}>Envoyer une demande de réservation</button>
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