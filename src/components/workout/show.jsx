import { useState, useEffect } from "react"
import { getData, postData } from "../../services/data-fetch";
import { useParams, Link } from "react-router-dom";

import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";

const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)
  const [workout, setWorkout] = useState({});
  const { workout_id } = useParams();
  const [workout_images,setWorkout_images] = useState([])

  //use alert component
  const [,setAlert] = useAtom(alertAtom);

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
        if(data.image_urls){
          setWorkout_images(data.image_urls)
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
      if(window.confirm("Are you sure you want to send this reservation?")) {
        try {
          const data = await postData(`/reservations`,body);
          console.log(data);
          if(data){
            setAlert({
              showAlert:true,
              message:"Votre demande a bien été envoyée !",
              alertType:"success"
            })
          }
        } catch (error) {
          console.error(error);
          setAlert({
            showAlert:true,
            message:"Une erreur est survenue. Veuillez réessayer",
            alertType:"error"
          })
        }
      }
    };
    bookPlaces();
  }

  return(
    <>
      <div className="border border-black my-5 h-2/5">
      {workout_images && workout_images.length > 0 ? 
        workout_images.map((image,index) => {
          console.log(image);
          return <img src={image} key={index} alt="workout-image"/>
        })
      : 
      "Pas d'images"}
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 my-5">

          <div className="col-span-2">
            <div className="flex justify-between my-3 border-b-2">
              <div className="">
                <h1>{workout.title}</h1>
                <p>Notes :</p>
              </div>
              <div>
                {workout.host ?
                  <Link to={`/profile/${workout.host.id}`}>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  </Link>
                :
                  "Loading..."
                }
              </div>
            </div>
            <div className="my-3 border-b-2">
              <p>Description:</p>
              <p>{workout.description}</p>
            </div>
          </div>

          <div className="col-span-1 flex flex-col bg-slate border shadow-lg rounded-xl p-4 md:p-5">
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
                <button className="button-red-small" onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                <button className="button-green-small" onClick={increaseQuantity} disabled={quantity >= workout.available_places}>+</button>
              </div>
            </div>
            {quantity > workout.available_places ?
            <button className="button-primary-large" disabled={quantity > workout.available_places}>Il n&apos;y a plus de place</button>
            :
            <button className="button-primary-large" onClick={handleReservation} disabled={quantity > workout.available_places}>Envoyer une demande de réservation</button>
            }
            {/* <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={handleReservation}>Envoyer une demande de réservation</button> */}

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