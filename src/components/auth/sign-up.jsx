import { authSignInUp } from "../../services/auth-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "./auth-form";
import { toast } from 'react-toastify';

export default function SignIn() {
  const navigate = useNavigate();
  const [,setUser] = useAtom(userAtom);

  useEffect(() => {
    document.title = "Keella | Inscription";
  }, []);

  const handleSignup = async ({ username, email, password }) => {
    try {
      const user = await authSignInUp("/users", {
        user: { username, email, password },
      });
      setUser({
        id: user.user.id,
        email: user.user.email,
        isLogged: true,
      });
      toast.success("Bonjour et Bienvenue !");
      navigate("/");
    } catch (error) {
      // console.error(error);
      toast.error("Une erreur est survenue. Veuillez vérifier votre email et mot de passe");
    }
  };

  return (
  <div className="text-center my-5">
    <h1>Inscription</h1>
    <AuthForm onSubmit={handleSignup} buttonText="Accepter et continuer" />
  </div>
  )
}
