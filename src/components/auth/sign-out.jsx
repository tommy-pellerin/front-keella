import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { authSignOut } from "../../services/auth-fetch";

export default function SignOut() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const handleSignOut = async () => {
    try {
      await authSignOut("/users/sign_out");
      setUser({ email: "", isLogged: false });
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleSignOut}>Sign out</button>;
}
