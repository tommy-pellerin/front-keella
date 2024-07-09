import { useLocation, Navigate } from "react-router-dom";
import TokenExpirationCheck from "./tokenExpired";
import { useEffect } from "react";
import { toast } from 'react-toastify';
//Atom
import { useAtomValue } from 'jotai';
import { userAtom } from "../store/user";

const PrivateRoute = ({ children }) => {
  const currentUser = useAtomValue(userAtom);
  const location = useLocation();
  
  useEffect(() => {
    if (!currentUser.isLogged) {
      toast.warning("Vous devez etre connecté pour pouvoir poursuivre");
    }
  }, [currentUser.isLogged]);

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