import checkTokenExpiration from "./checkToken";

const checkTokenAndLocalStorage = (user, setUser, setAlert, navigate) =>{
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
        setAlert({
          showAlert: true,
          message: "Votre connection a expiré, veuillez vous reconnecter",
          alertType: "warning"
        });
        navigate("/sign-in");
        return false
      }
    } else {
      // For expired or invalid token
      console.log("token expired or invalid");
      setAlert({
        showAlert: true,
        message: "Votre connection a expiré, veuillez vous reconnecter",
        alertType: "warning"
      });
      navigate("/sign-in");
      return false
    }
  }
}

export default checkTokenAndLocalStorage