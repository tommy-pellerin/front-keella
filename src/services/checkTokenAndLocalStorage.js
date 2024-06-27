import checkTokenExpiration from "./checkToken";
import { toast } from 'react-toastify';

const checkTokenAndLocalStorage = (user, setUser, navigate) =>{
  const tokenStatus = checkTokenExpiration();
  if(tokenStatus.isValid){
    console.log("Token is valid");
    return true
  } else {
    if (tokenStatus.reason === "notFound") {
      // Check if user data is in local storage and seems valid
      console.log("id:",user.id);
      if (user.id) {
        setUser({ id: "", email: "", isLogged: false });
        console.log("local storage present but token not found");
        toast.info("Votre connection a expiré, veuillez vous reconnecter");
        navigate("/sign-in");
        return false
      }
    } else {
      // For expired or invalid token
      setUser({ id: "", email: "", isLogged: false });
      console.log("token expired or invalid");
      toast.info("Votre connection a expiré, veuillez vous reconnecter");
      navigate("/sign-in");
      return false
    }
  }
}

export default checkTokenAndLocalStorage