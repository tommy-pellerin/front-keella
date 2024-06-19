import { authSignInUp } from "../../services/auth-fetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthForm from "./auth-form";

//atom
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { alertAtom } from "../../store/alert";

export default function SignIn() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [,setAlert] = useAtom(alertAtom);

  useEffect(() => {
    document.title = "Keella | Connection";
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const user = await authSignInUp("/users/sign_in", {
        user: { email, password },
      });
      if(user){
        setAlert({
          showAlert:true,
          message:"Bonjour, nous somme ravis de vous revoir !",
          alertType:"success"
        })
      }
      setUser({
        email: user.user.email,
        isLogged: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error); 
      setAlert({
        showAlert:true,
        message:"Une erreur est survenue. Veuillez vérifier votre email et mot de passe",
        alertType:"error"
      })
    }
  };

  return (
    
    <div className="text-center my-5">
      <h1>Connection</h1>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
    </div>
    )
}
