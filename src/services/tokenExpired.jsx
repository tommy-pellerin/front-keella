import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { alertAtom } from "../store/alert";

import checkTokenExpiration from './checkToken';

const TokenExpirationCheck = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const location = useLocation();
  const [,setAlert] = useAtom(alertAtom);

  useEffect(() => {
    if(checkTokenExpiration()){
      setIsTokenExpired(true);
    }
  }, []);

  useEffect(() => {
    if (isTokenExpired) {
      console.log("token expired");
      setAlert({
        showAlert: true,
        message: "Votre connection a expiré, veuillez vous reconnecter",
        alertType: "warning"
      });
    }
  }, [isTokenExpired]);

  if (isTokenExpired) {
    // console.log("token expired");
    return <Navigate to="/sign-in" state={{ from: location }} />;
  } else {
    console.log("token not expired");
    return children;
  }

};

export default TokenExpirationCheck;