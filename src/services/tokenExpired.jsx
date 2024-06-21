import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

import { useAtom } from "jotai";
import { alertAtom } from "../store/alert";

const TokenExpirationCheck = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const location = useLocation();
  const [,setAlert] = useAtom(alertAtom);

  const checkTokenExpiration = () => {
    console.log("token check");
    let token = Cookies.get("keellauth"); // replace with your JWT token
    if (token) {
      token = token.replace("Bearer ", ""); // remove "Bearer " from the token
      try {
        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const dateNow = new Date();
        const expirationDate = new Date(decodedToken.exp * 1000); // convert to milliseconds
        console.log(`Token expiration date: ${expirationDate.toLocaleString()}`);

        if (decodedToken.exp < dateNow.getTime() / 1000) {
          setIsTokenExpired(true);
        }
      } catch (e) {
        console.error("Invalid JWT token");
        setIsTokenExpired(true);
      }
    } else {
      console.error("No JWT token found");
      setIsTokenExpired(true);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
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