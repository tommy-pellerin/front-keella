import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAtom } from "jotai";
import { userAtom } from '../store/user';
import { toast } from 'react-toastify';
import checkTokenExpiration from './checkToken';
import Cookies from "js-cookie";

const TokenExpirationCheck = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const location = useLocation();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    //if token expired redirect to sign-in
    const tokenStatus = checkTokenExpiration();
    if(tokenStatus.isValid){
      console.log("Token is valid");
    } else {
      if (tokenStatus.reason === "notFound") {
        // Check if user data is in local storage and seems valid
        const localUserData = localStorage.getItem("user");
        if (!localUserData) {
          setIsTokenExpired(true);
        }
        // Additional checks can be added here to validate localUserData
      } else {
        // For expired or invalid token
        setIsTokenExpired(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isTokenExpired) {
      toast.warning("Votre connection a expiré, veuillez vous reconnecter");
      setUser({ id: "", email: "", isLogged: false });
      Cookies.remove("keellauth");
      setRedirectToSignIn(true);
    }
  }, [isTokenExpired]);

  if (redirectToSignIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default TokenExpirationCheck;