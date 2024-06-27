import { getData } from "./data-fetch";
import { useLocation, Navigate } from "react-router-dom";
import TokenExpirationCheck from "./tokenExpired";
import { useEffect, useState } from "react";
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
          console.log("user: ", data);
          setProfile(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfileData();
    }
  }, [user.id]);
  
  console.log("isloged?", user.isLogged);

  useEffect(() => {
    if (!user.isLogged) {
      setAlert({
        showAlert: true,
        message: "Vous devez etre connecté pour pouvoir poursuivre",
        alertType: "warning"
      });
    }
  }, [user.isLogged]);

  if (user.isLogged) {
    if(profile && profile.isAdmin){
      return (
        <TokenExpirationCheck>
          {children}
        </TokenExpirationCheck>
      )
    } else if (profile && !profile.isAdmin) {
      console.log("is not admin");
      // setAlert({
      //   showAlert: true,
      //   message: "Vous n'etes pas administrateur",
      //   alertType: "error"
      // });
      return <Navigate to="/" />;
    }
  } else {
    // Redirect is handled after the alert is set in the useEffect hook
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
}

export default AdminRoute