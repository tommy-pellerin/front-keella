import { Navigate, useParams } from "react-router-dom";
import { getData } from "../../services/data-fetch";
import { toast } from 'react-toastify';
//Atom
import { useAtomValue } from 'jotai';
import { userAtom } from "../../store/user";
import { useEffect, useState } from "react";

function checkOwner(currentUser, objectToCompare) {
  console.log("object à comparer:",objectToCompare, currentUser);
  //flash
  return currentUser.id === objectToCompare.id;
}

const OwnerRoute = ({ children }) => {
  const currentUser = useAtomValue(userAtom);
  const { workout_id } = useParams();
  const { user_id } = useParams();
  const [isOwner, setIsOwner] = useState(null);

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
    //check if currentUser is the owner of the profile and check if currentUser is the owner of the reservations
    if(user_id){
      const getUser = async () => {
        try {
          const data = await getData(`/users/${user_id}`);
          // console.log(data);
          setIsOwner(checkOwner(currentUser, data));
        } catch (error) {
          console.error(error);
        }
      };
      getUser();
    }
    
  }, [user_id, workout_id]);
  
  useEffect(() => {
    if (isOwner === false) {
      toast.error("Vous n'etre pas autorisé à rentrer car vous n'etes pas l'auteur de la page");
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