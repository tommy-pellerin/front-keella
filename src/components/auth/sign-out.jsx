import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { authSignOut } from "../../services/auth-fetch";
import { alertAtom } from "../../store/alert";
import checkTokenExpiration from "../../services/checkToken";

export default function SignOut() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [,setAlert] = useAtom(alertAtom);

  const checkTokenAndLocalStorage = () =>{
    const tokenStatus = checkTokenExpiration();
    if(tokenStatus.isValid){
      console.log("Token is valid");
    } else {
      if (tokenStatus.reason === "notFound") {
        // Check if user data is in local storage and seems valid
        const localUserData = localStorage.getItem("user");
        if (localUserData) {
          setUser({ id: "", email: "", isLogged: false });
          console.log("local storage present but token not found");
          setAlert({
            showAlert: true,
            message: "Votre connection a expiré, veuillez vous reconnecter",
            alertType: "warning"
          });
          navigate("/sign-in");
          return
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
        return
      }
    }
  }

  const handleSignOut = async () => {

    const tokenStatus = checkTokenAndLocalStorage();
    if (tokenStatus.isValid) {
      try {
        await authSignOut("/users/sign_out");
        setUser({ id: "", email: "", isLogged: false });
        setAlert({
          showAlert:true,
          message:"Nous somme triste de vous voir partir...",
          alertType:"warning"
        })
        navigate("/sign-in");
      } catch (error) {
        console.error(error);
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
  return (
    <div onClick={handleSignOut}>Se déconnecter</div>
  );
}
