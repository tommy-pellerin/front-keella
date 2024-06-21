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

  const handleSignOut = async () => {
    if (checkTokenExpiration()) {
      setAlert({
        showAlert: true,
        message: "Votre session a expiré. Veuillez vous reconnecter.",
        alertType: "warning"
      });
      setUser({ email: "", isLogged: false });
      navigate("/sign-in");
    } else {
      try {
        await authSignOut("/users/sign_out");
        setUser({ email: "", isLogged: false });
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
    <div onClick={handleSignOut}>Sign out</div>
  );
}
