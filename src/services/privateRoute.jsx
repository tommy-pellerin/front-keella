import { useLocation, Navigate } from "react-router-dom";
import TokenExpirationCheck from "./tokenExpired";

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
  if (currentUser.isLogged) {
    return (
      <TokenExpirationCheck>
        {children}
      </TokenExpirationCheck>
    )
  } else {
    setAlert({
      showAlert:true,
      message:"Vous devez etre connecté pour pouvoir poursuivre",
      alertType:"warning"
    })
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
}

export default PrivateRoute