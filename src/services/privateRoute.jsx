import { useLocation, Navigate } from "react-router-dom";
import TokenExpirationCheck from "./tokenExpired";
import { useEffect } from "react";
//Atom
import { useAtomValue } from 'jotai';
import { userAtom } from "../store/user";
import { useAtom } from "jotai";
import { alertAtom } from "../store/alert";

const PrivateRoute = ({ children }) => {
  const currentUser = useAtomValue(userAtom);
  const location = useLocation();
  const [,setAlert] = useAtom(alertAtom);
  
  console.log("isloged?", currentUser.isLogged);
  useEffect(() => {
    if (!currentUser.isLogged) {
      setAlert({
        showAlert: true,
        message: "Vous devez etre connecté pour pouvoir poursuivre",
        alertType: "warning"
      });
    }
  }, [currentUser.isLogged, setAlert]);

  if (currentUser.isLogged) {
    return (
      <TokenExpirationCheck>
        {children}
      </TokenExpirationCheck>
    );
  } else {
    // Redirect is handled after the alert is set in the useEffect hook
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
}

export default PrivateRoute