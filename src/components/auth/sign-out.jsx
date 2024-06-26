import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { authSignOut } from "../../services/auth-fetch";
import { alertAtom } from "../../store/alert";
import checkTokenAndLocalStorage from "../../services/checkTokenAndLocalStorage";

export default function SignOut() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [,setAlert] = useAtom(alertAtom);

  const handleSignOut = async () => {

    const tokenStatus = checkTokenAndLocalStorage(user, setUser, setAlert, navigate);
    //if tokenStatus = true means token is not expired or invalid
    if (tokenStatus) {
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
