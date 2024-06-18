import { useState, useEffect } from "react"
import { getData, postData } from "../../services/data-fetch";
import { useParams, Link } from "react-router-dom";
const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)
  const [workout, setWorkout] = useState([]);
  const { workout_id } = useParams();
  const [workout_images,setWorkout_images] = useState("")
  //use tailwind alert
  const [showAlert, setShowAlert] = useState(false);

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
      if(window.confirm("Are you sure you want to send this reservation?")) {
        try {
          const data = await postData(`/reservations`,body);
          console.log(data);
          if(data){
            setShowAlert(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    bookPlaces();
  }

  return(
    <>
      {showAlert && (
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500">
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            Votre demande de réservation a été envoyé
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      )}

      <div className="border border-black my-5">
        {workout_images ? workout_images : "Pas d'images"}
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
                <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={increaseQuantity} disabled={quantity >= workout.available_places}>+</button>
              </div>
            </div>
            {/* {quantity > workout.available_places ?
            <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" disabled={quantity > workout.available_places}>Il n&apos;y a plus de place</button>
            :
            <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={handleReservation} disabled={quantity > workout.available_places}>Envoyer une demande de réservation</button>
            } */}
            <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={handleReservation}>Envoyer une demande de réservation</button>

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