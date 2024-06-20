import { authSignInUp } from "../../services/auth-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthForm from "./auth-form";
import Alert from "../../styles/Alert.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  
  useEffect(() => {
    document.title = "Keella | Connection";
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const user = await authSignInUp("/users/sign_in", {
        user: { email, password },
      });
      if(user){
        setShowAlert(true);
        setAlertType('success'); // Set alert type to 'success'
      }
      setUser({
        id: user.user.id,
        email: user.user.email,
        isLogged: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setAlertType('error'); // Set alert type to 'error'
    }
  };

  return (
    <>
    <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={alertType === 'success' ? `Bonjour, nous somme ravis de vous revoir !` : "Une erreur est survenue. Veuillez vérifier votre email et mot de passe"} type={alertType} />
    <div className="text-center my-5">
      <h1>Connection</h1>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
      
    </div>
    </>
    )
}
