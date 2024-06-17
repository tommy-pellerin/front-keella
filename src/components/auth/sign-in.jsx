import { authSignInUp } from "../../services/auth-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { useNavigate } from "react-router-dom";
import AuthForm from "./auth-form";

export default function SignIn() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const handleLogin = async ({ email, password }) => {
    try {
      const user = await authSignInUp("/users/sign_in", {
        user: { email, password },
      });
      setUser({
        email: user.user.email,
        isLogged: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthForm onSubmit={handleLogin} buttonText="Login" />;
}
