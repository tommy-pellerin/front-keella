import { useLocation, Navigate, useParams } from "react-router-dom";
import { getData } from "../../services/data-fetch";
//Atom
import { useAtomValue } from 'jotai';
import { userAtom } from "../../store/user";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";

function checkOwner(currentUser, objectToCompare) {
  console.log("object à comparer:",objectToCompare);
  //flash
  return currentUser.id === objectToCompare.id;
}

const OwnerRoute = ({ children }) => {
  const currentUser = useAtomValue(userAtom);
  const { workout_id } = useParams();
  const { user_id } = useParams();
  const { reservation_id } = useParams();
  const location = useLocation();
  const [isOwner, setIsOwner] = useState(null);
  const [,setAlert] = useAtom(alertAtom);

  useEffect(() => {
    //check if currentUser is the owner of the workout
    if(workout_id){
      const getWorkout = async () => {
        try {
          const data = await getData(`/workouts/${workout_id}`);
          console.log(data);
          setIsOwner(checkOwner(currentUser, data.host));
        } catch (error) {
          console.error(error);
        }
      };
      getWorkout();
    }
    //check if currentUser is the owner of the profile
    if(user_id){
      const getUser = async () => {
        try {
          const data = await getData(`/users/${user_id}`);
          console.log(data);
          setIsOwner(checkOwner(currentUser, data));
        } catch (error) {
          console.error(error);
        }
      };
      getUser();
    }
    //check if currentUser is the owner of the reservation
    if(reservation_id){
      const getReservation = async () => {
        try {
          const data = await getData(`/reservations/${reservation_id}`);
          console.log(data);
          setIsOwner(checkOwner(currentUser, data.user));
        } catch (error) {
          console.error(error);
        }
      };
      getReservation();
    }
    
  }, [reservation_id, user_id, workout_id]);
  
  useEffect(() => {
    if (isOwner === false) {
      setAlert({
        showAlert: true,
        message: "Vous n'etre pas autorisé à rentrer car vous n'etes pas l'auteur de la page",
        alertType: "error"
      });
    }
  }, [isOwner]);
  
  if (isOwner === null) {
    return <div>Loading...</div>; // Or your loading spinner
  }
  
  if (!isOwner) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      {console.log("you are owner")}
      {children}
    </>      
  )
  
}

export default OwnerRoute