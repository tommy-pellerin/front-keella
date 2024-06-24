import { useState, useEffect } from "react"
import { getData, postData } from "../../services/data-fetch";
import { useParams, Link } from "react-router-dom";

import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";
import ImageCarrousel from "./ImageCarrousel";
import Checkout from "../payment/checkout";

const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)
  const [workout, setWorkout] = useState({});
  const { workout_id } = useParams();
  const [workout_images,setWorkout_images] = useState([])
  const [workoutCategory,setWorkoutCategory] = useState(null)
  const [workoutCategoryLoading,setWorkoutCategoryLoading] = useState(false)
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
    // setWorkoutCategoryLoading(true)
    const getWorkouts = async () => {
      try {
        const data = await getData(`/workouts/${workout_id}`);
        console.log(data);
        setWorkout(data);
        if(data.image_urls){
          setWorkout_images(data.image_urls)
        } else if(data.category.category_image){
          setWorkoutCategory(data.category)
          // setWorkoutCategoryLoading(false)
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
    console.log(workout);
    const body = 
    {
      "reservation":{
        "workout_id": workout.id,
        "quantity": quantity,
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
            setWorkout(prevWorkout => ({
              ...prevWorkout,
              available_places: prevWorkout.available_places - quantity
            }));
            setQuantity(1)
          }
        } catch (error) {
          console.error('Error caught in calling function:', error);
          if (error.response) {
            console.log(error.response);
            error.response.json().then((body) => {
              console.error('Erreur du serveur:', body.error);
              setAlert({
                showAlert:true,
                message: `${body.error}`,
                alertType:"error"
              })
            });
          }
          
        }
      }
    };
    bookPlaces();
  }

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h${remainingMinutes}`;
    }
  }

  return(
    <>
      <div className="border-y border-purple-900 bg-gray-300 my-10 h-2/5">
      {workout_images && workout_images.length > 0 ? 
        <ImageCarrousel images={workout_images}/>
        : 
        (workoutCategoryLoading ?
          <div>is loading...</div>
          :
          (workout.category&& workout.category.category_image ?
            <ImageCarrousel images={[workout.category.category_image]}/>
            : 
            "No image attached and no category image"
          )
        )
      }
      </div>

      <div className="container mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">

          <div className="lg:col-span-2 px-5">
            <div className="flex justify-between my-3 border-b-2">
              <div>
                <h1>{workout.title}</h1>
                {workout.category ?
                <p>Category : <strong>{workout.category.name}</strong></p>
                :
                "Loading..."
                }
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

          <div className="lg:col-span-1 flex flex-col bg-slate border shadow-lg rounded-xl p-4 md:p-5">
            <h2>Prix de la séance : {workout.price} €</h2>
            <p>Début de la séance : {formatDate(workout.start_date)} à {formatTime(workout.start_date)}</p>
            <p>Fin de la séance : {formatDate(workout.end_date)} à {formatTime(workout.end_date)}</p>
            <p>Durée de la séance : {formatDuration(workout.duration)}</p>
            
            <div>
              <p>Nombre de place max : {workout.max_participants}</p>
              <p>Nombre de place disponible : {workout.available_places}</p>
              <h3>Nombre de place : {quantity}</h3>
              <h3>Total à payer : {workout.price*quantity} €</h3>
              <div className="flex justify-around">
                {/* Buttons are disabled when on conditions */}
                <button className="button-red-small" onClick={decreaseQuantity} disabled={quantity <= 1} aria-label="minus one place">-</button>
                <button className="button-green-small" onClick={increaseQuantity} disabled={quantity >= workout.available_places} aria-label="add one place">+</button>
              </div>
            </div>
            {quantity > workout.available_places ?
            <button className="button-primary-large" disabled={quantity > workout.available_places}>Il n&apos;y a plus de place</button>
            :
            <>
            <button className="button-primary-large" onClick={handleReservation} disabled={quantity > workout.available_places}>Envoyer une demande de réservation</button>
            <Checkout />
            </>
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