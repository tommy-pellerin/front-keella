import { useState, useEffect } from "react"
import { getData, postData } from "../../services/data-fetch";
import { useParams, Link, useNavigate } from "react-router-dom";
//atom
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { alertAtom } from "../../store/alert";
import ImageCarrousel from "./ImageCarrousel";
//security
import checkTokenExpiration from "../../services/checkToken";
import WorkoutRating from "../rating/WorkoutRating";

const WorkoutShow = () => {
  const [quantity,setQuantity] = useState(1)
  const [workout, setWorkout] = useState({});
  const { workout_id } = useParams();
  const [workout_images,setWorkout_images] = useState([])
  const [workoutCategory,setWorkoutCategory] = useState(null)
  const [workoutCategoryLoading,setWorkoutCategoryLoading] = useState(false)
  const navigate = useNavigate();

  //use atom
  const [,setAlert] = useAtom(alertAtom);
  const [user, setUser] = useAtom(userAtom);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }
  function formatTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('fr-FR', options);
  }
  //loading data to show
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

  //manage quantity
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

  //handle booking
  const handleReservation = (e) => {
    e.preventDefault();

    //check authentication
    if (!user.isLogged){
      setAlert({
        showAlert: true,
        message: "Vous devez etre connecté pour pouvoir réserver",
        alertType: "warning"
      });
      navigate("/sign-in");
      return
    }
    //check token expiration
    if (checkTokenExpiration()) {
      setAlert({
        showAlert: true,
        message: "Votre session a expiré. Veuillez vous reconnecter.",
        alertType: "warning"
      });
      setUser({ id: "", email: "", isLogged: false });
      navigate("/sign-in");
      return
    }
    
    console.log(workout);
    const body = 
    {
      "reservation":{
        "workout_id": workout.id,
        "quantity": quantity,
      }
    };
    const bookPlaces = async () => {
      if(window.confirm("Vous allez etre débité du montant indiqué, etes vous sure de vouloir continuer ?")) {
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
      <div className="border-y border-black bg-gray-200 my-10 h-2/5">
      {workout_images && workout_images.length > 0 ? 
        <ImageCarrousel images={workout_images}/>
        : 
        (workoutCategoryLoading ?
          <div>is loading...</div>
          :
          (workout.category&& workout.category.category_image ?
            <ImageCarrousel images={[workout.category.category_image]}/>
            :
            <p className="text-center">No image attached and no category image</p>
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
                  
                  <Link to={`/profile/${workout.host.id}`} className="flex gap-2 items-center">
                    <p>Hote : {workout.host.username}</p>
                    {workout.host && 
                          <div className="h-8 w-8 border rounded-full flex justify-center items-center overflow-hidden">
                            {workout.host.avatar ? <img src={workout.host.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User avatar"/>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            }
                          </div>
                    }
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
              <h3>Total à payer : {workout.price*quantity} €</h3>
              <div className="flex justify-between items-center">
                <h3>Nombre de place : </h3>
                {/* Buttons are disabled when on conditions */}
                <div className="flex justify-around items-center my-3">
                  <button className="button-red-small" onClick={decreaseQuantity} disabled={quantity <= 1} aria-label="minus one place">-</button>
                  <h3 className="mx-3">{quantity}</h3>
                  <button className="button-green-small" onClick={increaseQuantity} disabled={quantity >= workout.available_places} aria-label="add one place">+</button>
                </div>
              </div>
            </div>
            {quantity > workout.available_places ?
            <button className="button-primary-large" disabled={quantity > workout.available_places}>Il n&apos;y a plus de place</button>
            :
            <>
            <button className="button-primary-large" onClick={handleReservation} disabled={quantity > workout.available_places}>Envoyer une demande de réservation</button>
            </>
            }

          </div>
        </div>

        <div className="my-5">
        <WorkoutRating workoutId={workout.id}/>
        </div>
      </div>

      
    </>
  )
}

export default WorkoutShow