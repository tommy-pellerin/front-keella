import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from '../store/user';
import { alertAtom } from "../store/alert";

import checkTokenExpiration from './checkToken';

const TokenExpirationCheck = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const location = useLocation();
  const [,setAlert] = useAtom(alertAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    if(checkTokenExpiration()){
      setIsTokenExpired(true);
    }
  }, []);

  useEffect(() => {
    if (isTokenExpired) {
      console.log("token expired or not found or invalid");
      setAlert({
        showAlert: true,
        message: "Votre connection a expiré, veuillez vous reconnecter",
        alertType: "warning"
      });
      setUser({ id: "", email: "", isLogged: false });
      setRedirectToSignIn(true);
    }
  }, [isTokenExpired]);

  if (redirectToSignIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  console.log("token not expired");
  return children;
};

export default TokenExpirationCheck;