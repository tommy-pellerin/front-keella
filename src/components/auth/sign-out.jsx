import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { authSignOut } from "../../services/auth-fetch";
import checkTokenAndLocalStorage from "../../services/checkTokenAndLocalStorage";
import { toast } from 'react-toastify';

export default function SignOut() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleSignOut = async () => {

    const tokenStatus = checkTokenAndLocalStorage(user, setUser, navigate);
    //if tokenStatus = true means token is not expired or invalid
    if (tokenStatus) {
      try {
        await authSignOut("/users/sign_out");
        setUser({ id: "", email: "", isLogged: false });
        toast.info("Nous somme triste de vous voir partir...");
        navigate("/sign-in");
      } catch (error) {
        console.error(error);
        if (error.response) {
          error.response.json().then((body) => {
            // console.error('Erreur du serveur:', body.error);
            toast.error(`${body.error}`);
          });
        }
      }
    }
  };
  return (
    <button onClick={handleSignOut}>Se déconnecter</button>
  );
}
