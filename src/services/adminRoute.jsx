import { getData } from "./data-fetch";
import { useLocation, Navigate } from "react-router-dom";
import TokenExpirationCheck from "./tokenExpired";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
//Atom
import { useAtom } from 'jotai';
import { userAtom } from "../store/user";
import { alertAtom } from "../store/alert";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const [,setAlert] = useAtom(alertAtom);
  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user.isLogged) {
      // Fetch and set profile data if user is logged in
      const fetchProfileData = async () => {
        try {
          const data = await getData(`/users/${user.id}`);
          setProfile(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfileData();
    }
  }, [user.id]);
  
  useEffect(() => {
    if (!user.isLogged) {
      toast.warning("Vous devez etre connecté pour pouvoir poursuivre");
    }
  }, [user.isLogged]);

  useEffect(() => {
    if (user.isLogged && profile && !profile.isAdmin) {
      toast.error("Vous n'etes pas administrateur");
    }
  }, [user.isLogged, profile]);

  if (user.isLogged) {
    if(profile && profile.isAdmin){
      return (
        <TokenExpirationCheck>
          {children}
        </TokenExpirationCheck>
      )
    } else if (profile && !profile.isAdmin) {
      return <Navigate to="/" />;
    }
  } else {
    // Redirect is handled after the alert is set in the useEffect hook
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
}

export default AdminRoute